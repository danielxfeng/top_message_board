import pgs from "pg";
import dotenv from "dotenv";
import { argv } from "process";

dotenv.config();

const { Client } = pgs;

const SQL = `
DROP TABLE IF EXISTS miniboard;
CREATE TABLE IF NOT EXISTS miniboard (
  id SERIAL PRIMARY KEY,
  title VARCHAR ( 255 ),
  text VARCHAR ( 255 ),
  author VARCHAR ( 255 ),
  dt TIMESTAMP DEFAULT (now() AT TIME ZONE 'UTC')
);

INSERT INTO miniboard (title, text, author)
VALUES
  ('Hello', 'Hello there', 'Tommi'),
  ('Hi', 'Hi there', 'Mike');
`;

const host = argv[2] || process.env.DB_HOST;

const main = async () => {
  console.log("seeding...");
  const client = new Client({
    connectionString: `postgresql://${process.env.DB_USER}:${process.env.DB_PASS}@${host}:${process.env.DB_PORT}/${process.env.DB_NAME}`,
    ssl: {
      rejectUnauthorized: false,
    },
  });

  try {
    await client.connect();
    await client.query(SQL);
    console.log("Database seeded successfully!");
  } catch (err) {
    console.error("Error executing SQL:", err);
  } finally {
    await client.end();
    console.log("Database connection closed.");
  }
};

main();
