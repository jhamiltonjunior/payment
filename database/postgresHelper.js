import { Pool } from 'pg'

export class PostgresHelper {
  pool

  constructor (connectionObject) {
    this.pool = new Pool(connectionObject)
  }

  /**
   * @deprecated
   */
  async query (sql, values) {
    return this.pool.query(sql, values)
  }

  async writer (sql, values) {
    return this.pool.query(sql, values)
  }

  async reader (sql, values) {
    return this.pool.query(sql, values)
  }

  async disconnect () {
    this.pool.end()
  }
}