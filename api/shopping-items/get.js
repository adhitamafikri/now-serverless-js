import database from '../_utils/database'

export default async (req, res) => {
  const dbInstance = database()
  try {
    const client = await dbInstance.connect()
    const database = client.db('mern-shopping')
    const collection = database.collection('items')

    const queryLimit = req.query && req.query.limit

    const result = await collection.find()
      .limit(parseInt(queryLimit, 10))
      .toArray()
    dbInstance.disconnect(client)

    return res.status(200).json({
      message: 'getting shopping items',
      result: result
    })
  } catch(error) {
    return res.status(400).json({
      message: 'Something went wrong',
      error: error
    })
  }
}
