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