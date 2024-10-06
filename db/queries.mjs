import pool from "./pool.mjs";

const Db = () => {
  const query = async () => {
    const res = await pool.query("SELECT * FROM miniboard");
    return res.rows;
  };

  const insert = async (title, text, author) => {
    return await pool.query(
      "INSERT INTO miniboard (title, text, author) VALUES ($1, $2, $3)",
      [title, text, author]
    );
  };

  return { query, insert };
};

export default Db();
