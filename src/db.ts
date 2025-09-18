import { MongoClient } from "mongodb"

import 'dotenv/config'

const {MONGO_URI} = process.env

export const client = new MongoClient(MONGO_URI as string)
export const db = client.db()