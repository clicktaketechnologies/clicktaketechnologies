import { config } from "dotenv";
config({ override: true });
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schemaObj from "../src/lib/schema.ts";

const pool = new Pool({ connectionString: process.env.DIRECT_URL });
const db = drizzle(pool, { schema: schemaObj.schema });

async function main() {
  console.log("schemaObj.cmsTypography:", typeof schemaObj.cmsTypography);
  console.log("schemaObj.siteSettings:", typeof schemaObj.siteSettings);
  
  // Try direct Drizzle query
  try {
    const r = await db.select().from(schemaObj.cmsTypography);
    console.log("✓ Direct Drizzle query on cmsTypography:", r.length);
  } catch (e: any) {
    console.log("✗ Drizzle direct failed:", e.message);
    console.log("  stack:", e.stack?.split("\n").slice(0, 5).join("\n  "));
  }
  
  try {
    const r = await db.select().from(schemaObj.siteSettings);
    console.log("✓ Direct Drizzle query on siteSettings:", r.length);
  } catch (e: any) {
    console.log("✗ Drizzle direct failed:", e.message);
  }
  
  // Now via prisma shim
  const { prisma } = await import("../src/lib/db.ts");
  
  // With explicit empty object
  try {
    const r = await prisma.cmsTypography.findMany({});
    console.log("✓ prisma.cmsTypography.findMany({}):", r.length);
  } catch (e: any) {
    console.log("✗ with {} failed:", e.message);
  }
  
  // With no args
  try {
    const r = await prisma.cmsTypography.findMany();
    console.log("✓ prisma.cmsTypography.findMany():", r.length);
  } catch (e: any) {
    console.log("✗ with no args failed:", e.message);
    console.log("  stack:", e.stack?.split("\n").slice(0, 6).join("\n  "));
  }
}

main().then(() => process.exit(0)).catch(e => { console.error(e); process.exit(1); });
