export type SiteType =
  | "nextjs"
  | "node"
  | "laravel"
  | "php"
  | "docker"
  | "static";

export interface Site {
  id: number;

  name: string;

  domain: string;

  type: SiteType;

  status:
    | "online"
    | "offline"
    | "building";

  ssl_enabled: boolean;

  github: string | null;

  docker_container: string | null;

  docker_image: string | null;

  branch: string | null;

  created_at: string;
}