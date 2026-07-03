ALTER TABLE sites
ADD COLUMN internal_port INT NULL AFTER docker_image,
ADD COLUMN external_port INT NULL AFTER internal_port,
ADD COLUMN deployed_at TIMESTAMP NULL AFTER created_at,
ADD COLUMN last_deployment_log LONGTEXT NULL AFTER deployed_at;