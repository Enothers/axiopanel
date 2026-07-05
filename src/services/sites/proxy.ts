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
  try {
    const token = await login();

    const payload = {
      domain_names: [domain],

      forward_scheme: "http",
      forward_host: container,
      forward_port: port,

      access_list_id: 0,
      certificate_id: 0,

      ssl_forced: false,
      http2_support: false,
      hsts_enabled: false,
      hsts_subdomains: false,

      caching_enabled: false,
      block_exploits: false,

      allow_websocket_upgrade: false,
      trust_forwarded_proto: false,

      advanced_config: "",

      locations: [],

      meta: {},
    };

    console.log("🌐 Création Proxy Host");
    console.log(JSON.stringify(payload, null, 2));

    const { data } = await axios.post(
      `${API}/api/nginx/proxy-hosts`,
      payload,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log("✅ Proxy créé :", data);

    return data;
  } catch (error: any) {
    console.error("❌ Erreur NPM");
    console.error(
      error.response?.data ?? error.message
    );

    throw error;
  }
}