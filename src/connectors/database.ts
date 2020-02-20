import { FormattedDataForDatabase } from "../types/types";
const { Pool } = require("pg");
const extractValues = require("lodash/values");
const format = require('pg-format');
require('dotenv-flow').config();

export async function writeBatchOfTime(time: FormattedDataForDatabase[]) {
  const pool = new Pool({
    user: process.env.DATABASE_USER,
    host: process.env.DATABASE_HOST,
    database: process.env.DATABASE_NAME,
    password: process.env.DATABASE_PASS,
    port: process.env.DATABASE_PORT,
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
