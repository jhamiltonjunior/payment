import { PostgresHelper } from "./postgresHelper"

export const connectionObject = {
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.BD_TABLE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
}

export class PostgresUserRepository {
  constructor() {
    this.postgresHelper = new PostgresHelper(connectionObject)
  }

  async findUserById(id) {
    const result = await this.postgresHelper.query('SELECT * FROM users WHERE user_id = $1', [id])

    return result.rows[0]
  }

  async add(user) {
    const hash = await this.hash(user.password)
    await this.postgresHelper.reader(
      `INSERT INTO users(
        user_id, name, email, password, user_payment_id
      )
      VALUES (
        $1, $2, $3, $4, $5
      )
      RETURNING user_id`,
      [uuidv4(), user.name, user.email, hash, null]
    )
  }

  async update (user) {

    await this.postgresHelper.writer(
      `
      UPDATE users
      SET
      user_payment_id = $1
      
      WHERE
        email = $2`,
      [user.userPaymentId, user.email]
    )
  }
}