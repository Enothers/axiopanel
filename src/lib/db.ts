import mariadb from "mariadb";

const pool = mariadb.createPool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,

  connectionLimit: 10,
});

export async function query<T = any>(
  sql: string,
  params: any[] = []
): Promise<T> {
  let conn;

  try {
    conn = await pool.getConnection();

    return await conn.query(sql, params);
  } finally {
    conn?.release();
  }
}

import { migrate } from "@/database/migrate";

migrate();