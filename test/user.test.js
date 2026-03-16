import chai from "chai";
import chaiHttp from "chai-http";
import app from "../server.js";

const expect = chai.expect;

chai.use(chaiHttp);
const request= chai.request 

let userId;


// CREATE USER
describe("POST /api/users", ()=>{

  it("should create a user", (done)=>{

    request(app)
    .post("/api/users")
    .send({
      name:"Senthil",
      email:"senthil@gmail.com",
      age:25
    })
    .end((err,res)=>{

      expect(res).to.have.status(200);
      expect(res.body).to.have.property("_id");

      userId = res.body._id;

      done();
    });

  });

});


// GET ALL USERS
describe("GET /api/users", ()=>{

  it("should get all users", (done)=>{

    request(app)
    .get("/api/users")
    .end((err,res)=>{

      expect(res).to.have.status(200);
      expect(res.body).to.be.an("array");

      done();
    });

  });

});


// QUERY PARAM TEST
describe("GET /api/users?age=25", ()=>{

  it("should filter users by age", (done)=>{

    request(app)
    .get("/api/users?age=25")
    .end((err,res)=>{

      expect(res).to.have.status(200);

      done();
    });

  });

});


// GET BY PARAM
describe("GET /api/users/:id", ()=>{

  it("should get user by id", (done)=>{

    request(app)
    .get("/api/users/"+userId)
    .end((err,res)=>{

      expect(res).to.have.status(200);

      done();
    });

  });

});


// UPDATE USER
describe("PUT /api/users/:id", ()=>{

  it("should update user", (done)=>{

    request(app)
    .put("/api/users/"+userId)
    .send({age:30})
    .end((err,res)=>{

      expect(res).to.have.status(200);

      done();
    });

  });

});


// DELETE USER
describe("DELETE /api/users/:id", ()=>{

  it("should delete user", (done)=>{

    request(app)
    .delete("/api/users/"+userId)
    .end((err,res)=>{

      expect(res).to.have.status(200);

      done();
    });

  });

});
describe("NEGATIVE TEST CASES", ()=>{

  it("should fail if user not found", (done)=>{

    request(app)
    .get("/api/users/12345")
    .end((err,res)=>{

      expect(res).to.have.status(404);

      done();
    });

  });

});