import { MongoClient  } from "../../deps.ts";

const client = new MongoClient();

const mongoSRVURL = Deno.env.get('MONGO_SRV_URL')!;

await client.connect(
    mongoSRVURL
);

export default client;