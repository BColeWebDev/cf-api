import request from "supertest"
import {app} from"../../src/app"


describe("GET,POST - Auth Login", () =>{

  // it("checks home route returns hello world", async () =>{
  //   return await request(app)
  //   .get("/")
  //   .expect(200)
  // });
  
  it("POST - Login User", async () =>{
    return await request(app)
      .post("/api/v1/users/register")
      .send({email:"email1@email.com", password:"Shadow18!"})
      .expect(200)
  });
  
  
  it("POST - Register User", async () =>{
    return await request(app)
      .post("/api/v1/users/register")
      .send({first_name:"Brian", last_name:"Cole",email:"email1@email.com", password:"Shadow18!",bio:"Bio",age:28,experience:"begineer", sex:"M", crown_member:true})
      .expect(200)
  });
})

