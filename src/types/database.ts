export interface Database {
  id: string;

  name: string;

  user: string;

  host: string;

  port: number;

  size?: number;

  engine: "MariaDB" | "MySQL" | "PostgreSQL";
}