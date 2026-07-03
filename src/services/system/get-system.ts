export interface SystemStats {
  cpu: number;

  memory: {
    used: number;
    total: number;
  };

  disk: {
    total: number;
    used: number;
    available: number;
    percent: number;
  };

  uptime: number;

  hostname: string;

  platform: string;

  cores: number;

  load: number[];

  services: {
  name: string;
  online: boolean;
}[];

}


export async function getSystem(): Promise<SystemStats> {
  const res = await fetch("/api/system/stats");

  if (!res.ok) {
    throw new Error("Impossible de récupérer les statistiques.");
  }

  return res.json();
}