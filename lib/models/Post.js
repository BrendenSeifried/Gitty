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
}
module.exports = Post;
