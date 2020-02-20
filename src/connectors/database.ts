import { FormattedDataForDatabase } from "../types/types";
const { Pool } = require("pg");
const extractValues = require("lodash/values");
const format = require('pg-format');

export async function writeBatchOfTime(time: FormattedDataForDatabase[]) {
  const pool = new Pool({
    user: "doadmin",
    host: "jsnake-economy-do-user-3507145-0.db.ondigitalocean.com",
    database: "defaultdb",
    password: "zlyhv60l9d7g5sbl",
    port: 25060,
    ssl: true
  });

  const client = await pool.connect();

  const existedDates: string[] = time.reduce(
    (acc: string[], time: FormattedDataForDatabase) => {
      return acc.concat(`'${time.date}'`);
    },
    []
  );

  try {
    await client.query("BEGIN");
    await client.query(
      `DELETE FROM hours WHERE date IN (${existedDates.join(", ")})`,
      []
    );
    const keys = Object.keys(time[0]).join(", ");
    const values = time.map(el => extractValues(el));
    const queryText = format(`INSERT INTO hours(${keys}) VALUES %L RETURNING id`, values);
    await client.query(queryText);

    await client.query("COMMIT");
  } catch (e) {
    await client.query("ROLLBACK");
    throw e;
  } finally {
    client.release();
  }

  await pool.end();
}
