export interface Deployment {
  id: string;

  siteId: string;

  commit: string;

  author: string;

  branch: string;

  createdAt: string;

  duration: number;

  status:
    | "running"
    | "success"
    | "failed";
}