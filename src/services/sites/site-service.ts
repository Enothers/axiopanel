import { query } from "@/lib/db";

import { deploySite } from "./engine";

interface CreateSiteInput {
  type: string;
  name: string;
  domain: string;
  github?: string;
  branch?: string;
  image?: string;
  port: string;

  // Le formulaire envoie encore "ssl"
  ssl?: boolean;

  // Nouveau nom en base
  ssl_enabled?: boolean;
}

export async function createSite(
  site: CreateSiteInput
) {
  const sslEnabled =
    site.ssl_enabled ?? site.ssl ?? false;

  await query(
    `
INSERT INTO sites
(
  name,
  domain,
  type,
  github,
  branch,
  ssl_enabled,
  status
)
VALUES (?, ?, ?, ?, ?, ?, ?)
`,
    [
      site.name,
      site.domain,
      site.type,
      site.github ?? null,
      site.branch ?? null,
      sslEnabled,
      "offline",
    ]
  );

  const result = await deploySite({
  name: site.name,
  domain: site.domain,
  type: site.type,
  github: site.github,
  branch: site.branch,
  image: site.image,
  port: site.port,
  ssl_enabled: sslEnabled,
});

  await query(
    `
UPDATE sites
SET
  status = ?,
  docker_container = ?,
  internal_port = ?,
  external_port = ?,
  deployed_at = NOW(),
  last_deployment_log = ?
WHERE name = ?
`,
    [
      result.success ? "online" : "offline",
      result.container,
      result.internalPort,
      result.externalPort,
      result.logs,
      site.name,
    ]
  );

  return result;
}