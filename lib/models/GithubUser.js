const pool = require('../utils/pool');

class GithubUser {
  id;
  username;
  email;
  avatar;

  constructor(row) {
    this.id = row.id;
    this.username = row.username;
    this.email = row.email;
    this.avatar = row.avatar;
  }

  static async insert({ username, email, avatar }) {
    if (!username) throw new Error('Please enter a Username');

    const { rows } = await pool.query(
      `INSERT INTO git_users (username, email, avatar) VALUES ($1, $2, $3) RETURNING *`,
      [username, email, avatar]
    );
    return new GithubUser(rows[0]);
  }
}
