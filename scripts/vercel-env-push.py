#!/usr/bin/env python3
"""
Push all production env vars to Vercel project across all 3 environments
(Production, Preview, Development), then trigger a fresh production deploy.

SECURITY NOTE: This script previously hardcoded ALL production secrets
(Vercel PAT, Supabase DB URLs, Gmail app password, Turnstile secret,
NextAuth secret, Cloudinary keys, superadmin password, provider
encryption key, cron secret) directly in source. That was a security
incident. The script now reads EVERY value from the operator's
environment at runtime — no credentials in source control.

Usage:
    set -a && . ./.env && set +a
    VERCEL_API_TOKEN=vcp_xxx python3 scripts/vercel-env-push.py
"""
import os
import sys
import json
import time
import urllib.request
import urllib.error

TOKEN = os.environ.get("VERCEL_API_TOKEN")
if not TOKEN:
    sys.exit("ERROR: set VERCEL_API_TOKEN env var before running this script.")
PROJECT_NAME = "clicktaketechnologies"
API_BASE = "https://api.vercel.com"

ENV_VARS = [
    ("DATABASE_URL", os.environ.get("DATABASE_URL", "")),
    ("DIRECT_URL", os.environ.get("DIRECT_URL", "")),
    ("NEXT_PUBLIC_SUPABASE_URL", os.environ.get("NEXT_PUBLIC_SUPABASE_URL", "")),
    ("NEXT_PUBLIC_SUPABASE_ANON_KEY", os.environ.get("NEXT_PUBLIC_SUPABASE_ANON_KEY", "")),
    ("GMAIL_USER", os.environ.get("GMAIL_USER", "")),
    ("GMAIL_APP_PASSWORD", os.environ.get("GMAIL_APP_PASSWORD", "")),
    ("SMTP_HOST", os.environ.get("SMTP_HOST", "smtp.gmail.com")),
    ("SMTP_PORT", os.environ.get("SMTP_PORT", "465")),
    ("SMTP_SECURE", os.environ.get("SMTP_SECURE", "true")),
    ("SMTP_USER", os.environ.get("SMTP_USER", "")),
    ("SMTP_PASS", os.environ.get("SMTP_PASS", "")),
    ("MAIL_FROM", os.environ.get("MAIL_FROM", "")),
    ("LEADS_EMAIL", os.environ.get("LEADS_EMAIL", "")),
    ("PROVIDER_ALERT_TO", os.environ.get("PROVIDER_ALERT_TO", "")),
    ("NEXT_PUBLIC_TURNSTILE_SITE_KEY", os.environ.get("NEXT_PUBLIC_TURNSTILE_SITE_KEY", "")),
    ("TURNSTILE_SECRET_KEY", os.environ.get("TURNSTILE_SECRET_KEY", "")),
    ("NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME", os.environ.get("NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME", "")),
    ("NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET", os.environ.get("NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET", "")),
    ("CLOUDINARY_CLOUD_NAME", os.environ.get("CLOUDINARY_CLOUD_NAME", "")),
    ("CLOUDINARY_UPLOAD_PRESET", os.environ.get("CLOUDINARY_UPLOAD_PRESET", "")),
    ("SUPERADMIN_EMAIL", os.environ.get("SUPERADMIN_EMAIL", "")),
    ("SUPERADMIN_PASSWORD", os.environ.get("SUPERADMIN_PASSWORD", "")),
    ("NEXTAUTH_URL", os.environ.get("NEXTAUTH_URL", "")),
    ("NEXTAUTH_SECRET", os.environ.get("NEXTAUTH_SECRET", "")),
    ("PROVIDER_CREDENTIALS_ENCRYPTION_KEY", os.environ.get("PROVIDER_CREDENTIALS_ENCRYPTION_KEY", "")),
    ("CRON_SECRET", os.environ.get("CRON_SECRET", "")),
]

ENVS = ["production", "preview", "development"]

def api(method, path, body=None):
    url = f"{API_BASE}{path}"
    headers = {
        "Authorization": f"Bearer {TOKEN}",
        "Content-Type": "application/json",
    }
    data = json.dumps(body).encode() if body is not None else None
    req = urllib.request.Request(url, data=data, headers=headers, method=method)
    try:
        with urllib.request.urlopen(req, timeout=30) as resp:
            return resp.status, json.loads(resp.read().decode())
    except urllib.error.HTTPError as e:
        body_text = e.read().decode() if e.fp else ""
        try:
            return e.code, json.loads(body_text)
        except:
            return e.code, body_text
def api(method, path, body=None):
    url = f"{API_BASE}{path}"
    headers = {
        "Authorization": f"Bearer {TOKEN}",
        "Content-Type": "application/json",
    }
    data = json.dumps(body).encode() if body is not None else None
    req = urllib.request.Request(url, data=data, headers=headers, method=method)
    try:
        with urllib.request.urlopen(req, timeout=30) as resp:
            return resp.status, json.loads(resp.read().decode())
    except urllib.error.HTTPError as e:
        body_text = e.read().decode() if e.fp else ""
        try:
            return e.code, json.loads(body_text)
        except:
            return e.code, body_text

def find_project():
    """Find the clicktaketechnologies project by listing user's projects."""
    page = 0
    while True:
        status, data = api("GET", f"/v9/projects?limit=100&skip={page*100}")
        if status != 200:
            print(f"ERROR listing projects: HTTP {status}", data)
            sys.exit(1)
        projects = data.get("projects", [])
        if not projects:
            break
        for p in projects:
            name = p.get("name", "")
            # Match exact or contains
            if name == "clicktaketechnologies" or "clicktake" in name.lower():
                return p
        page += 1
        if len(projects) < 100:
            break
    return None

def get_existing_envs(project_id):
    """Get existing env vars so we can update vs create."""
    existing = {}
    for env in ENVS:
        status, data = api("GET", f"/v9/projects/{project_id}/env?gitBranch=&decrypt=true&envType={env}")
        if status == 200:
            for entry in data.get("envs", []):
                existing[(entry.get("key"), entry.get("target", [None])[0] if entry.get("target") else None)] = entry
    # Simpler: just list all and key by (key, env)
    status, data = api("GET", f"/v9/projects/{project_id}/env?decrypt=true")
    if status != 200:
        print(f"WARNING: couldn't list existing envs: HTTP {status}", data)
        return {}
    by_key_env = {}
    for entry in data.get("envs", []):
        key = entry.get("key")
        targets = entry.get("target", [])
        for t in targets:
            by_key_env[(key, t)] = entry
    return by_key_env

def main():
    print("=" * 70)
    print(" VERCEL ENV VAR PUSHER")
    print("=" * 70)

    # 1. Find project
    print("\n[1/5] Finding project...")
    project = find_project()
    if not project:
        print("ERROR: Project 'clicktaketechnologies' not found in your Vercel account.")
        print("Available projects listing failed or no match.")
        sys.exit(1)
    project_id = project["id"]
    project_name = project.get("name", "?")
    print(f"  ✓ Found project: {project_name} (id: {project_id})")

    # 2. Get existing env vars
    print("\n[2/5] Listing existing env vars...")
    existing = get_existing_envs(project_id)
    print(f"  ✓ Found {len(existing)} existing env var entries")

    # 3. DELETE existing entries for keys we're about to push
    # Vercel rejects PATCH if type changes (sensitive vs encrypted), so we
    # must delete + recreate. We collect unique entry IDs to delete.
    print("\n[3/5] Deleting existing entries for keys we're pushing...")
    to_delete = set()  # (id) tuples
    push_keys = {k for k, _ in ENV_VARS}
    deleted_count = 0
    for (key, env), entry in existing.items():
        if key in push_keys:
            entry_id = entry.get("id")
            if entry_id and entry_id not in to_delete:
                status, resp = api("DELETE",
                    f"/v9/projects/{project_id}/env/{entry_id}")
                if status in (200, 204):
                    deleted_count += 1
                    to_delete.add(entry_id)
                    print(f"  ✓ Deleted {key} [{env}] (id: {entry_id[:12]}...)")
                else:
                    print(f"  ✗ Failed to delete {key} [{env}] (HTTP {status}): {resp}")
    print(f"  Deleted {deleted_count} existing entries")

    # 4. CREATE fresh entries for all 26 keys × 3 environments
    print("\n[4/5] Creating env vars (26 vars × 3 environments = 78 operations)...")
    created = 0
    failed = 0
    for key, value in ENV_VARS:
        for env in ENVS:
            body = {
                "key": key,
                "value": value,
                "target": [env],
                "type": "encrypted",
            }
            status, resp = api("POST",
                f"/v9/projects/{project_id}/env",
                body)
            if status in (200, 201):
                created += 1
                print(f"  ✓ [{env:11}] {key:45}")
            else:
                failed += 1
                err_msg = resp if isinstance(resp, dict) else str(resp)
                err_msg = err_msg.get("error", {}).get("message", str(err_msg)) if isinstance(err_msg, dict) else str(err_msg)
                print(f"  ✗ [{env:11}] {key:45} FAILED (HTTP {status}): {err_msg}")

    print(f"\n  Summary: {created} created, {failed} failed")

    if failed > 0:
        print("\n⚠️  Some env vars failed. Review above before redeploying.")
        sys.exit(1)

    # 5. Trigger redeploy
    print("\n[5/5] Triggering production redeploy...")
    # Find latest production deployment
    status, data = api("GET", f"/v6/deployments?projectId={project_id}&limit=10&target=production")
    if status != 200 or not data.get("deployments"):
        print(f"  ⚠ Couldn't list deployments (HTTP {status}). You'll need to manually redeploy.")
        return

    latest = data["deployments"][0]
    deploy_id = latest["uid"]
    deploy_url = latest.get("url", "?")
    print(f"  Latest production deploy: {deploy_url} (id: {deploy_id})")

    # Trigger redeploy with the same source
    status, resp = api("POST", f"/v13/deployments",
        {"deploymentId": deploy_id, "target": "production"})
    if status in (200, 201):
        new_id = resp.get("id", "?")
        new_url = resp.get("url", "?")
        print(f"  ✓ Redeploy triggered!")
        print(f"  New deployment id: {new_id}")
        print(f"  Watch at: https://vercel.com/{project_name}/{new_id}")
        print(f"  Live URL when ready: https://{new_url}")
    else:
        print(f"  ⚠ Redeploy trigger failed (HTTP {status}): {resp}")
        print(f"  You can manually redeploy at: https://vercel.com/{project_name}")
        print(f"  → Deployments → click ⋯ on latest → Redeploy")

    print("\n" + "=" * 70)
    print(" DONE — env vars pushed to all 3 environments")
    print("=" * 70)
    print("\nNext steps:")
    print("1. Wait ~3 min for the redeploy to finish")
    print("2. Run `drizzle-kit push` against production DB to create missing tables")
    print("3. Visit https://clicktaketech.com/admin/login → log in")
    print("4. Email: admin@clicktaketech.com  Password: ***REDACTED_ADMIN_PASSWORD***")
    print("\nDon't forget to revoke the API token at:")
    print("https://vercel.com/account/tokens")

if __name__ == "__main__":
    main()
