import { Client } from "pg";

async function resetTemplateDb() {
  const client = new Client({
    connectionString:
      "postgres://postgres:postgres@localhost:51214/template1?sslmode=disable",
  });

  try {
    await client.connect();
    console.log("Connected to template1.");

    await client.query("DROP SCHEMA public CASCADE;");
    await client.query("CREATE SCHEMA public;");
    await client.query("GRANT ALL ON SCHEMA public TO postgres;");
    await client.query("GRANT ALL ON SCHEMA public TO public;");

    console.log("Public schema reset successfully.");
  } catch (error) {
    console.error("Template reset error:", error);
  } finally {
    await client.end();
  }
}

resetTemplateDb();
