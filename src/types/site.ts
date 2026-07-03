export interface Site {
  id: string;

  name: string;

  domain: string;

  status: "online" | "offline";

  ssl: boolean;

  github?: string;

  path: string;

  container: string;

  database?: string;

  redis?: string;

  createdAt: string;
}