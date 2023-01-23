
import { Response, Request, } from "express"
import Sorting from "./sorting"

const Pagination = (req:Request, data:any) =>{
    const page:number = Number(req.query.page)
   

    const pageDisplay:number = Number(req.query.limit)
    const startIndex = (page - 1) * pageDisplay
    const endIndex = page * pageDisplay

    const results = data.slice(startIndex,endIndex)
   
    if(req.query.sort !== undefined){
        return Sorting(req,results)
    }else{
        return results
    }
    
}


export default Pagination