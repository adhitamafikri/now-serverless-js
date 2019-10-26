import database from '../_utils/database'

export default async (req, res) => {
  const dbInstance = database()
  try {
    const client = await dbInstance.connect()
    const database = client.db('mern-shopping')
    const collection = database.collection('items')

    const itemID = req.body && req.body.id

    const result = await collection.deleteOne({ uuid: itemID })
    dbInstance.disconnect(client)

    if (result.deletedCount === 0) {
      return res.status(404).json({
        message: 'No items were found',
        result: result
      })
    }
    return res.status(200).json({
      message: 'deleting shopping items',
      result: result
    })
  } catch(error) {
    return res.status(400).json({
      message: 'Something went wrong when deleting item',
      error: error
    })
  }
}
