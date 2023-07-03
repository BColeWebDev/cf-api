import { Response, Request, } from "express";

const Filtering = (req:Request, results:any)=>{

   
   try {
      var filter = {
         bodyPart: 'back',
  name: '45° side bend'
};
      const filters:any = req.query.filters
      return  results.filter(function(item:any) {
         for (var key in filter) {
           if ((item[key] === undefined )|| (item[key] !== filter["name"] || item[key] !== filter["bodyPart"]))
             return false;
         }
         return true;
       });
      ;
   } catch (error) {
    console.log(error)
   } 
}
export default Filtering