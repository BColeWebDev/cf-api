import { createClient } from "redis";
import { EventEmitter } from 'events';
import {Request, Response, NextFunction} from 'express';
// initialize the Redis client variable
let redisClient:any = undefined;

console.log("url-test", process.env.REDIS_PASSWORD);
console.log("url", process.env.REDIS_HOST);


export async function InitializeRedis(){
   // read the Redis connection URL from the envs
   if( process.env.REDIS_PASSWORD &&  process.env.REDIS_HOST && process.env.REDIS_PORT){
    redisClient = createClient({
      password: process.env.REDIS_PASSWORD,
      socket: {
        host: process.env.REDIS_HOST,
        port: Number(process.env.REDIS_PORT),
      },
    }); 

    try {
      await redisClient.connect().then(() => {
        console.log("connected");
        // Write your own code here
        console.log("| Redis Connected ✅");
        console.log("|--------------------------------------------");
      });
    } catch (error) {
      console.error(`Connection to Redis failed with error:`);
      console.error(error);
    }
   }
}

export async function requestToKey(){

}
function isRedisWorking(){
    // verify wheter there is an active connection
  // to a Redis server or not
  return !!redisClient?.isOpen;
}
export async function writeData(key:string, data:string){
  if (isRedisWorking()) {
    try {
      let options = {
        EX: 2000, // 6h
      }
      // write data to the Redis cache
      await redisClient.set(key, data,options);
    } catch (e) {
      console.error(`Failed to cache data for key=${key}`, e);
    }
  }
}

export async function readData(key:string){
  let cachedValue = undefined;
  if (isRedisWorking()) {
    // try to get the cached response from redis
    return await redisClient.get(key);
  }

  return cachedValue;
}
export function redisCachingWrapper(key:string){

 
  //  Acutal Middlware
    return async (req: Request, res: Response, next: NextFunction) =>{
      if(isRedisWorking()){
        console.log("called",req.query)
        console.log("key",key);
        
        const resRedis = await redisClient.get(key);
       const cacheResults = JSON.parse(resRedis)
        console.log(req.query.bodyPart === cacheResults.filters.bodyPart)
        if (
          // If Cache Does'nt exist
          resRedis === null ||
          // For Pagination
          Number(req.query.page) !== cacheResults.page ||
          Number(req.query.limit) !== cacheResults.pageDisplay ||
          // For Filters 
          req.query.bodyPart !== cacheResults.filters.bodyPart ||
          req.query.equipment !== cacheResults.filters.equipment ||
          req.query.target !== cacheResults.filters.target 
          // For Sortation 
        ) {
          // refetch data
          return next();
        }
        // return cache results
        return res.status(200).json(JSON.parse(resRedis));

      }
    }
  }