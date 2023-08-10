import { Response, Request, } from "express"


const Sorting = (req:Request, results:any) =>{
try {
        const sorts:any = req.query.sort
        let key = sorts.split(':')[0]
        let val = sorts.split(':')[1]
      
        if(val === "asc"){
            return results.sort((a:any,b:any) => a[`${key}`].localeCompare(b[`${key}`]))

        }
        if(val === "desc"){
            return results.sort((a:any,b:any) => a[`${key}`].localeCompare(b[`${key}`])).reverse()    

        }

} catch (error) {
    console.log(error)
}
}

export default Sorting