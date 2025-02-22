import useSWR from "swr";

async function fetchAPI(key) {
  const response = await fetch(key);
  const responseBody = await response.json();
  return responseBody;
}

export default function statusPage() {
  return (
    <>
      <h1>Status</h1>
      <UpdatedAt />
      <PostgresVersion />
      <UsedConnections />
    </>
  );
}

function UpdatedAt() {
  const { isLoading, data } = useSWR("/api/v1/status", fetchAPI, {
    refreshInterval: 2000,
  });
  let UpdatedAtText = "Carregando...";

  if (!isLoading && data) {
    UpdatedAtText = new Date(data.updated_at).toLocaleString("pt-BR");
  }

  return <div>Ultima Atualização: {UpdatedAtText}</div>;
}

function PostgresVersion() {
  const { isLoading, data } = useSWR("/api/v1/status", fetchAPI, {
    refreshInterval: 2000,
  });
  let PostgresVersionText = "Carregando versão...";

  if (!isLoading && data) {
    PostgresVersionText = data.version;
  }

  return <div>Versão Postgres: {PostgresVersionText}</div>;
}

function UsedConnections() {
  const { isLoading, data } = useSWR("/api/v1/status", fetchAPI, {
    refreshInterval: 2000,
  });
  let UsedConnectionsText = "carregando uso atual...";

  if (!isLoading && data) {
    UsedConnectionsText =
      data.dependencies.database.opened_connections +
      "/" +
      data.dependencies.database.max_connections;
  }

  return <div>Conexões em uso: {UsedConnectionsText}</div>;
}
