import { dockerService } from "@/services/docker/service";

export async function getServicesStatus() {
  const containers =
    await dockerService.getContainers();

  const services = [
    "npm",
    "portainer",
    "mariadb",
    "redis",
    "uptime-kuma",
    "beszel",
    "axioweb",
    "axiopanel",
  ];

  return services.map((service) => {
    const container = containers.find(
      (c) => c.name === service
    );

    return {
      name: service,
      online: container?.state === "running",
    };
  });
}