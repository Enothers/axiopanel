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

  /*
   * Création du Proxy Host
   */

  const { data: proxy } = await axios.post(
    `${API}/api/nginx/proxy-hosts`,
    {
      domain_names: [domain],

      forward_scheme: "http",

      forward_host: container,

      forward_port: port,

      access_list_id: 0,

      certificate_id: 0,

      ssl_forced: false,

      caching_enabled: false,

      block_exploits: false,

      advanced_config: "",

      allow_websocket_upgrade: false,

      http2_support: true,

      enabled: true,

      locations: [],

      hsts_enabled: false,

      hsts_subdomains: false,

      trust_forwarded_proto: false,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  console.log("✅ Proxy créé");

  /*
   * Création du certificat
   */

  const { data: certificate } = await axios.post(
    `${API}/api/nginx/certificates`,
    {
      provider: "letsencrypt",

      nice_name: domain,

      domain_names: [domain],

      meta: {
        letsencrypt_agree: true,
        letsencrypt_email:
          process.env.LETSENCRYPT_EMAIL,
      },
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  console.log("✅ Certificat créé");

  /*
   * Mise à jour du Proxy Host
   */

  await axios.put(
    `${API}/api/nginx/proxy-hosts/${proxy.id}`,
    {
      ...proxy,

      certificate_id: certificate.id,

      ssl_forced: true,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  console.log("✅ SSL activé");

  return proxy.id;
}