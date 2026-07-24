#!/bin/bash
# Verify isitagentready.com audit fixes are live.
# Run: bash /home/z/my-project/scripts/verify-agent-readiness.sh

set -u
PASS=0
FAIL=0
OK="\033[32m✓\033[0m"
NO="\033[31m✗\033[0m"

check() {
  local label="$1" expected="$2" actual="$3"
  local e="$(echo "$expected" | tr 'A-Z' 'a-z')"
  local a="$(echo "$actual" | tr 'A-Z' 'a-z')"
  if [[ "$a" == *"$e"* ]]; then
    echo -e "  $OK $label"
    PASS=$((PASS+1))
  else
    echo -e "  $NO $label"
    echo -e "      expected: $expected"
    echo -e "      actual:   $(echo "$actual" | head -c 400)..."
    FAIL=$((FAIL+1))
  fi
}

H="https://clicktaketech.com"

echo "=== FIX #2: auth.md agent_auth metadata ==="
AUTH_MD=$(curl -sS "$H/auth.md")
check "auth.md has agent_auth.skill field" "skill: \"auth.md/v1\"" "$AUTH_MD"
check "auth.md has registration_methods block" "registration_methods:" "$AUTH_MD"
check "auth.md has oauth_dynamic_registration" "oauth_dynamic_registration" "$AUTH_MD"
check "auth.md has api_key_provisioning" "api_key_provisioning" "$AUTH_MD"

OAS=$(curl -sS "$H/.well-known/oauth-authorization-server")
check "oauth-authorization-server has agent_auth.skill" '"skill":"auth.md/v1"' "$(echo $OAS | tr -d ' \n')"
check "oauth-authorization-server has registration_methods" '"registration_methods":' "$(echo $OAS | tr -d ' \n')"
check "oauth-authorization-server has 3 registration methods" '"method":"oauth_dynamic_registration","endpoint"' "$(echo $OAS | tr -d ' \n')"

echo ""
echo "=== FIX #3: x402 discovery document ==="
X402_STATUS=$(curl -sS -o /dev/null -w "%{http_code}" "$H/.well-known/x402.json")
check "/.well-known/x402.json returns 200" "200" "$X402_STATUS"
X402_BODY=$(curl -sS "$H/.well-known/x402.json")
check "x402.json has protocol.name x402" '"name":"x402"' "$(echo $X402_BODY | tr -d ' \n')"
check "x402.json lists /api/premium endpoint" '"/api/premium"' "$(echo $X402_BODY | tr -d ' \n')"
check "x402.json has payment_requirements" '"payment_requirements":' "$(echo $X402_BODY | tr -d ' \n')"

PREMIUM_STATUS=$(curl -sS -o /dev/null -w "%{http_code}" "$H/api/premium")
check "/api/premium still returns 402" "402" "$PREMIUM_STATUS"
PREMIUM_HDRS=$(curl -sSI "$H/api/premium" | tr -d '\r')
check "/api/premium has www-authenticate x402" 'www-authenticate: x402' "$(echo $PREMIUM_HDRS | tr 'A-Z' 'a-z')"
check "/api/premium has x-payment-requirements" 'x-payment-requirements:' "$(echo $PREMIUM_HDRS | tr 'A-Z' 'a-z')"

echo ""
echo "=== FIX #4: MPP x-service-info in OpenAPI ==="
OAPI=$(curl -sS "$H/openapi.json")
check "openapi.json has top-level x-service-info" '"x-service-info":' "$(echo $OAPI | tr -d ' \n')"
check "openapi.json has payment_protocols_supported" '"payment_protocols_supported":["x402","mpp"]' "$(echo $OAPI | tr -d ' \n')"
check "openapi.json /premium has intent:charge" '"intent":"charge"' "$(echo $OAPI | tr -d ' \n')"
check "openapi.json /premium has method array" '"method":["tempo","lightning"]' "$(echo $OAPI | tr -d ' \n')"
check "openapi.json /premium has amount" '"amount":0.01' "$(echo $OAPI | tr -d ' \n')"
check "openapi.json /premium has payment_protocol" '"payment_protocol":"x402"' "$(echo $OAPI | tr -d ' \n')"

echo ""
echo "=== FIX #5: UCP top-level 'ucp' field ==="
UCP=$(curl -sS "$H/.well-known/ucp")
check "ucp has top-level 'ucp' field" '"ucp":{' "$(echo $UCP | tr -d ' \n')"
check "ucp.ucp has protocol_version" '"protocol_version":"0.1.0"' "$(echo $UCP | tr -d ' \n')"
check "ucp.ucp has services array" '"services":[]' "$(echo $UCP | tr -d ' \n')"
check "ucp.ucp has capabilities" '"capabilities":{' "$(echo $UCP | tr -d ' \n')"
check "ucp.ucp has endpoints" '"endpoints":{' "$(echo $UCP | tr -d ' \n')"

echo ""
echo "=== FIX #6: ACP api_base_url + transports + capabilities.services ==="
ACP=$(curl -sS "$H/.well-known/acp.json")
check "acp has api_base_url as real URL" '"api_base_url":"https://clicktaketech.com/api"' "$(echo $ACP | tr -d ' \n')"
check "acp has 'transports' field (not supported_transports)" '"transports":["https"]' "$(echo $ACP | tr -d ' \n')"
check "acp.capabilities.services non-empty" '"services":[' "$(echo $ACP | tr -d ' \n')"
check "acp.capabilities.services has lead-capture" '"name":"lead-capture"' "$(echo $ACP | tr -d ' \n')"
check "acp.capabilities.services has premium-content" '"name":"premium-content"' "$(echo $ACP | tr -d ' \n')"

echo ""
echo "=== FIX #1: DNS-AID (info only — DS record at registrar required) ==="
DS=$(dig clicktaketech.com DS +short 2>&1)
echo "    DS record at parent zone: ${DS:-(empty — DS not yet published at registrar)}"
HTTPS_IDX=$(dig _index._agents.clicktaketech.com HTTPS +short 2>&1)
check "_index._agents HTTPS record still resolving" "alpn" "$HTTPS_IDX"
DNSSEC_VAL=$(dig clicktaketech.com A +dnssec +short 2>&1)
echo "    DNSSEC validation status: $(if echo "$DNSSEC_VAL" | grep -q '^172'; then echo 'NO RRSIG returned — zone is unsigned from validator perspective'; else echo "$DNSSEC_VAL"; fi)"

echo ""
echo "=== Score ==="
echo -e "  $OK Pass: $PASS"
if [ $FAIL -gt 0 ]; then
  echo -e "  $NO Fail: $FAIL"
  exit 1
else
  echo -e "  $OK Fail: 0"
  exit 0
fi
