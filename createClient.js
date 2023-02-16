(async () => {
  // eslint-disable-next-line no-undef
  const data = await fetch(String(process.env.ASAAS_CUSTOMERS_SANDBOX), {
    method: 'POST',
    body: `{  "name": "${httpResponse.body.name}",
    "email": "${httpResponse.body.email}",
    "mobilePhone": "${httpResponse.body.mobilePhone}",
    "cpfCnpj": "${httpResponse.body.cpfCnpj}",
    "notificationDisabled": ${httpResponse.body.notificationDisabled}
  }`,
    headers: {
      'Content-Type': 'application/json',
      access_token: `${process.env.ASAAS_API_KEY_SANDBOX}`
    },
  })

  console.log(data.status)
})()