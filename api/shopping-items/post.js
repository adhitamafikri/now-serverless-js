import database from '../_utils/database'

export default async (req, res) => {
  const items = req.body.items

  if (!items) {
    return res.status(400).json({
      message: 'You do not have any items to store',
    })
  }

  try {
    const dbInstance = database()
    const client = await dbInstance.connect()
    const database = client.db('mern-shopping')
    const collection = database.collection('items')

    const result = await collection.insertMany(items)

    return res.status(200).json({
      message: 'posting shopping items',
      result: result
    })
  } catch(error) {
    return res.status(400).json({
      message: 'Something went wrong',
      error: error
    })
  }
}
