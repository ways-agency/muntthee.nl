export const getBolAccessToken = async () => {
  const { bolClientId, bolClientSecret } = useRuntimeConfig();

  const basicCredentials = Buffer.from(
    `${bolClientId}:${bolClientSecret}`,
  ).toString("base64");

  const response = await $fetch<{ access_token: string }>(
    "https://login.bol.com/token",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Basic ${basicCredentials}`,
      },
      body: new URLSearchParams({ grant_type: "client_credentials" }),
    },
  );

  return response.access_token;
};
