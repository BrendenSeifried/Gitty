const pool = require('../utils/pool');

class Post {
  id;
  title;
  description;

  constructor(row) {
    this.id = row.id;
    this.title = row.title;
    this.description = row.description;
  }

  static async getAll() {
    const { rows } = await pool.query('SELECT * FROM user_post');
    return rows.map((data) => new Post(data));
  }

  static async create({ title, description }) {
    const { rows } = await pool.query(
      'INSERT INTO user_post (title, description) VALUES ($1, $2) RETURNING *',
      [title, description]
    );
    return new Post(rows[0]);
  }
}
module.exports = Post;
