import { NextResponse } from "next/server";

/**
 * /.well-known/jwks.json — JSON Web Key Set (stub).
 *
 * Linked from /.well-known/oauth-authorization-server and
 * /.well-known/oauth-protected-resource. Currently empty because
 * access tokens issued by this site are signed with a key managed by
 * NextAuth + Vercel environment configuration, not published as a JWKS.
 *
 * When RSA-signed JWTs are introduced for outgoing tokens, populate the
 * keys array with the public JWKs.
 *
 * @see https://www.rfc-editor.org/rfc/rfc7517
 */
export const dynamic = "force-static";

export async function GET() {
  return NextResponse.json(
    { keys: [] },
    {
      headers: {
        "content-type": "application/jwk-set+json; charset=utf-8",
        "cache-control": "public, max-age=3600, s-maxage=86400",
        "access-control-allow-origin": "*",
      },
    }
  );
}
