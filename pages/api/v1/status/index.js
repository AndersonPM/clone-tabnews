import { createRouter } from "next-connect";
import database from "infra/database.js";
import controller from "infra/controller";

const router = createRouter();

router.get(getHandler);
export default router.handler(controller.errorHandlers);

async function getHandler(request, response) {
  const updatedAt = new Date().toISOString();
  const version = await database.query("SHOW server_version;");
  const max_cnx = await database.query("SHOW MAX_CONNECTIONS;");
  const dbName = process.env.POSTGRES_DB;
  const opened_connections = await database.query({
    text: "SELECT count(*)::int FROM pg_stat_activity WHERE datname = $1;",
    values: [dbName],
  });
  response.status(200).json({
    updated_at: updatedAt,
    dependencies: {
      database: {
        max_connections: parseInt(max_cnx.rows[0].max_connections),
        opened_connections: opened_connections.rows[0].count,
      },
    },
    version: version.rows[0].server_version,
  });
}
