import { redisCachingWrapper } from '../db/redis';
import {Request, Response, NextFunction} from 'express';


const cacheMiddleware = (str:string) =>{return redisCachingWrapper(str)}
export default cacheMiddleware