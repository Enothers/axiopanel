import fs from "fs";
import path from "path";

import { query } from "@/lib/db";

interface Migration {
  migration: string;
}

export async function migrate() {
  await query(`
    CREATE TABLE IF NOT EXISTS migrations (
      id INT AUTO_INCREMENT PRIMARY KEY,
      migration VARCHAR(255) NOT NULL UNIQUE,
      executed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `);

  const folder = path.join(
    process.cwd(),
    "src/database/migrations"
  );

  const files = fs
    .readdirSync(folder)
    .sort();

  const executed = await query<Migration[]>(
    "SELECT migration FROM migrations"
  );

  const executedSet = new Set(
    executed.map((m) => m.migration)
  );

  for (const file of files) {
    if (executedSet.has(file)) {
      continue;
    }

    console.log(`➡️ Exécution de ${file}`);

    try {
      const sql = fs.readFileSync(
        path.join(folder, file),
        "utf8"
      );

      await query(sql);

      await query(
        "INSERT INTO migrations (migration) VALUES (?)",
        [file]
      );

      console.log(`✅ ${file}`);
    } catch (error) {
      console.error(`❌ Erreur dans ${file}`);
      console.error(error);
      throw error;
    }
  }
}