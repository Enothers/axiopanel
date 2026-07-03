import path from "path";

import { createSiteFolder } from "./deploy";
import { createDockerfile } from "./dockerfile";
import {
  createComposeFile,
  getInternalPort,
} from "./compose";
import { cloneRepository } from "./git";
import { detectProjectType } from "./detect";
import { createEnvFile } from "./env";
import { findAvailablePort } from "./ports";
import { createProxyHost } from "./proxy";

import { dockerService } from "@/services/docker/service";

export interface EngineSite {
  name: string;
  domain: string;
  type: string;
  github?: string;
  branch?: string;
  image?: string;
  port: string;
  ssl_enabled: boolean;
  env?: Record<string, string>;
}

export interface DeployResult {
  success: boolean;
  container: string | null;
  internalPort: number;
  externalPort: number;
  logs: string;
}

export async function deploySite(
  site: EngineSite
): Promise<DeployResult> {
  let logs = "";

  try {
    const folder = await createSiteFolder(site.name);

    const appFolder = path.join(folder, "app");

    let projectType = site.type;

    if (site.type !== "docker") {
      if (!site.github) {
        throw new Error(
          "Un dépôt Git est obligatoire pour ce type de projet."
        );
      }

      await cloneRepository(
        site.github,
        appFolder,
        site.branch ?? "main"
      );

      projectType = await detectProjectType(appFolder);
    }

    if (site.env) {
      await createEnvFile(
        folder,
        site.env
      );
    }

    const port =
      site.port ||
      String(await findAvailablePort());

    await createDockerfile(
      folder,
      projectType
    );

    await createComposeFile(folder, {
      name: site.name,
      type: projectType,
      image: site.image ?? "node:22-alpine",
      port,
    });

    logs += await dockerService.buildCompose(folder);

    logs += await dockerService.startCompose(folder);

    await createProxyHost(
      site.domain,
      site.name,
      getInternalPort(projectType)
    );

    return {
      success: true,
      container: site.name,
      internalPort: getInternalPort(projectType),
      externalPort: 0,
      logs,
    };
  } catch (error: any) {
    logs +=
      error?.stderr ??
      error?.stdout ??
      error?.message ??
      "Erreur inconnue.";

    return {
      success: false,
      container: null,
      internalPort: 0,
      externalPort: 0,
      logs,
    };
  }
}