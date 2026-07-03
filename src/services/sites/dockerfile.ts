import fs from "fs/promises";
import path from "path";

async function exists(file: string) {
  try {
    await fs.access(file);
    return true;
  } catch {
    return false;
  }
}

export async function createDockerfile(
  folder: string,
  type: string
) {
  const appFolder = path.join(folder, "app");

  if (await exists(path.join(appFolder, "Dockerfile"))) {
    return;
  }

  let dockerfile = "";

  switch (type) {
    case "nextjs":
      dockerfile = `
FROM node:22-alpine

WORKDIR /app

COPY ./app/package*.json ./

RUN npm install

COPY ./app .

RUN npm run build

EXPOSE 3000

CMD ["npm","start"]
`;
      break;

    case "node":
      dockerfile = `
FROM node:22-alpine

WORKDIR /app

COPY ./app/package*.json ./

RUN npm install

COPY ./app .

EXPOSE 3000

CMD ["npm","start"]
`;
      break;

    case "laravel":
      dockerfile = `
FROM php:8.3-apache

WORKDIR /var/www/html

COPY ./app .

RUN docker-php-ext-install pdo pdo_mysql

EXPOSE 8000

CMD ["php","artisan","serve","--host=0.0.0.0","--port=8000"]
`;
      break;

    case "php":
      dockerfile = `
FROM php:8.3-apache

WORKDIR /var/www/html

COPY ./app .

EXPOSE 80
`;
      break;

    case "static":
      dockerfile = `
FROM nginx:alpine

COPY ./app /usr/share/nginx/html
`;
      break;

    case "docker":
      return;

    default:
      throw new Error("Type inconnu");
  }

  await fs.writeFile(
    path.join(folder, "Dockerfile"),
    dockerfile.trim()
  );

  await fs.writeFile(
    path.join(folder, ".dockerignore"),
    `
.git
node_modules
.next
dist
build
.env
.env.local
`.trim()
  );
}