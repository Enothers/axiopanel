import fs from "fs/promises";
import path from "path";

import { query } from "@/lib/db";

import { removeSite } from "./deploy";

export async function deleteSite(
  id: number
) {
  const [site]: any = await query(
    `
SELECT *
FROM sites
WHERE id = ?
LIMIT 1
`,
    [id]
  );

  if (!site) {
    throw new Error("Site introuvable.");
  }

  const root =
    process.env.SITES_ROOT ??
    "/srv/sites";

  const folder = path.join(
    root,
    site.name
  );

  await removeSite(folder);

  await fs.rm(folder, {
    recursive: true,
    force: true,
  });

  await query(
    `
DELETE FROM sites
WHERE id = ?
`,
    [id]
  );
}