import fs from "fs/promises";
import path from "path";

export interface ComposeSite {
  name: string;
  type: string;
  image?: string;
  port: string;
}

export async function createComposeFile(
  folder: string,
  site: ComposeSite
) {
  const internalPort = getInternalPort(site.type);

  let compose = "";

  if (site.type === "docker") {
    compose = `
services:
  app:
    image: ${site.image}

    container_name: ${site.name}

    restart: unless-stopped

    expose:
      - "${internalPort}"

    networks:
      - proxy

networks:
  proxy:
    external: true
`;
  } else {
    compose = `
services:
  app:
    build:
      context: .
      dockerfile: Dockerfile

    container_name: ${site.name}

    restart: unless-stopped

    env_file:
      - ./app/.env

    expose:
      - "${internalPort}"

    networks:
      - proxy

networks:
  proxy:
    external: true
`;
  }

  await fs.writeFile(
    path.join(folder, "docker-compose.yml"),
    compose.trim()
  );
}

export function getInternalPort(
  type: string
) {
  switch (type) {
    case "php":
    case "static":
      return 80;

    case "laravel":
      return 8000;

    default:
      return 3000;
  }
}