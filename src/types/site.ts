export interface Site {
  id: string;

  name: string;

  domain: string;

  repository: string;

  framework: string;

  branch: string;

  containerId?: string;

  databaseId?: string;

  redis?: boolean;

  ssl?: boolean;

  status:
    | "running"
    | "building"
    | "stopped"
    | "error";
}