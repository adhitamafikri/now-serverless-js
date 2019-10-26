export default async (req, res, next) => {
  const loginData = {
    email: req.body.email,
    password: req.body.password
  }

  if (loginData.email && loginData.password) {
    const result = await service.login(loginData)
    if (result.error) {
      return res.status(400).json({ ...result })
    }

    // Create and assign a token
    const token = jwt.sign({ _id: result.data._id }, process.env.TOKEN_KEY)

    return res.header('x-access-token', token).status(200).json({ ...result })
  } else {
    return res.status(400).json({
      message: 'Data is not complete!',
      error: true,
      data: null
    })
  }
})
