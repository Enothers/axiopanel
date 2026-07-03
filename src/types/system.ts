export interface SystemStats {
  cpu: number;

  memory: {
    total: number;
    used: number;
    free: number;
    usage: number;
  };

  disk: {
    total: number;
    used: number;
    free: number;
    usage: number;
  };

  uptime: number;

  load: number[];
}