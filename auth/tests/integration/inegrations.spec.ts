import request from "supertest"
import {app} from"../../src/app"



it("checks home route returns hello world", async () =>{
  return await request(app)
  .get("/")
  .expect(200)
})