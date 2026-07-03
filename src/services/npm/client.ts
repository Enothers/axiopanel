const BASE_URL = process.env.NPM_URL!;
const USER = process.env.NPM_EMAIL!;
const PASSWORD = process.env.NPM_PASSWORD!;

let token: string | null = null;

async function authenticate() {
  const res = await fetch(`${BASE_URL}/api/tokens`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      identity: USER,
      secret: PASSWORD,
    }),
  });

  const data = await res.json();

  token = data.token;

  return token;
}

export async function npmFetch(path: string) {
  if (!token) {
    await authenticate();
  }

  return fetch(`${BASE_URL}${path}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  });
}