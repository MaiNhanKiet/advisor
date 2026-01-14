import { MongoClient, ServerApiVersion } from "mongodb"

const uri =
    process.env.MONGODB_URI ??
    "mongodb://kietmn:kietdeptrai123@mongodb_container:27017/advisor?authSource=admin"

const options = {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    },
}

let client: MongoClient | null = null
let clientPromise: Promise<MongoClient> | null = null

export function getMongoClient(): Promise<MongoClient> {
    if (!clientPromise) {
        client = new MongoClient(uri, options)
        clientPromise = client.connect()
    }
    return clientPromise
}


