import axios from "axios";

const API = process.env.NPM_URL!;

async function login() {
  const { data } = await axios.post(
    `${API}/api/tokens`,
    {
      identity: process.env.NPM_EMAIL,
      secret: process.env.NPM_PASSWORD,
    }
  );

  return data.token;
}

export async function createProxyHost(
  domain: string,
  container: string,
  port: number
) {
  const token = await login();

  await axios.post(
    `${API}/api/nginx/proxy-hosts`,
    {
      domain_names: [domain],

      forward_scheme: "http",

      forward_host: container,

      forward_port: port,

      access_list_id: 0,

      certificate_id: "new",

      ssl_forced: true,

      http2_support: true,

      hsts_enabled: true,

      websocket_support: true,

      block_exploits: true,

      caching_enabled: false,

      meta: {
        letsencrypt_agree: true,
        letsencrypt_email:
          process.env.NPM_EMAIL,
      },
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
}