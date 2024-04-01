import { createClient } from "redis";

let client = createClient({
  password: process.env.REDIS_PASSWORD,
  socket: {
    host: process.env.REDIS_HOST,
    port: Number(process.env.REDIS_PORT),
  },
});

client
  .connect()
  .then(async (res) => {
    console.log("connected");
    // Write your own code here
  })
  .catch((err) => {
    console.log("err happened" + err);
  });

const setKey = async (string: string, value: any) => {
  await client.set(string, value);
};
const getKey = async (string: string) => {
  await client.get(string);
};

export default {
  client,
  getAsync: getKey,
  setAsync: setKey,
};
