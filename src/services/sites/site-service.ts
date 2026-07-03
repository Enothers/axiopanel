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
  ssl: boolean;
}

export async function createSite(
  site: CreateSiteInput
) {
  await query(
    `
INSERT INTO sites
(
  name,
  domain,
  type,
  github,
  branch,
  ssl,
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
      site.ssl,
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
    ssl: site.ssl,
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