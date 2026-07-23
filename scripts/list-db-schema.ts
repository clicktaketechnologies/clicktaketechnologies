// Compare DB schema vs Drizzle schema for all tables
import { config } from "dotenv";
config({ override: true });
import { Pool } from "pg";
import * as fs from "fs";

async function main() {
  const pool = new Pool({ connectionString: process.env.DIRECT_URL });
  const client = await pool.connect();
  
  try {
    // Get all tables + their columns from DB
    const dbTables = await client.query(`
      SELECT 
        table_name,
        array_agg(
          column_name || ':' || data_type || 
          CASE WHEN character_maximum_length IS NOT NULL THEN '(' || character_maximum_length || ')' ELSE '' END
          ORDER BY ordinal_position
        ) as columns
      FROM information_schema.columns
      WHERE table_schema = 'public'
      GROUP BY table_name
      ORDER BY table_name;
    `);
    
    console.log("=== DB Tables vs Schema ===\n");
    for (const row of dbTables.rows) {
      console.log(`\n${row.table_name}:`);
      for (const col of row.columns) {
        console.log(`  ${col}`);
      }
    }
    
  } finally {
    client.release();
    await pool.end();
  }
}

main().then(() => process.exit(0)).catch((e) => { console.error("FATAL:", e); process.exit(1); });
