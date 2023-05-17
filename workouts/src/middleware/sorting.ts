import { Response, Request, } from "express"


const Sorting = (req:Request, results:any) =>{
try {
        const sorts:any = req.query.sort
        let key = sorts.split(':')[0]
        let val = sorts.split(':')[1]
        console.log("key",key)
        console.log("val",val)
     return results.sort((a:any,b:any) => {
        return val === "asc" ? a[key] >= b[key] ? 1 : -1:  a[key] >= b[key] ? -1 : 1
    })    
} catch (error) {
    console.log(error)
}
}

export default Sorting