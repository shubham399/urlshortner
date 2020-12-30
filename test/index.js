const request = require("supertest");
const dbHandler = require("./db/mock.js")
const testData = require("./db/testData.json")
const mongoUnit = require('mongo-unit')
const {expect} = require("chai")
describe("#app",async ()=>{
    before(async () => {
        await dbHandler.startDB()
        await mongoUnit.load(testData)
    });
    it("#UP route", async()=>{
        const app = require("../index.js").app;
        let res = await request(app).get("/");
        expect(res.status).to.equal(200)
        expect(res.text).to.match(/My URL Shortner/)
    })
    it("#Create Valid", async()=>{
        const app = require("../index.js").app;
        let res = await request(app).post("/url").send({"url":"https://google.com"});
        expect(res.body).to.have.property('url');
        expect(res.body).to.have.property('slug');
        expect(res.body).to.have.property('_id');
    })
    it("#Create InValidURL", async()=>{
        const app = require("../index.js").app;
        let res = await request(app).post("/url").send({"url":"abc"});
        expect(res.body).to.have.property('error');
        expect(res.body.error).to.equal(true);
        expect(res.body).to.have.property('message');
    })
    it("#Get Valid Redirect", async()=>{
        const app = require("../index.js").app;
        let res = await request(app).get("/abcde")
        expect(res.status).to.equal(302)
        expect(res.headers.location).to.equal("https://shubhkumar.in")
    })
    it("#Get InValid Redirect", async()=>{
        const app = require("../index.js").app;
        let res = await request(app).get("/doesnotexist")
        expect(res.status).to.equal(404)
        expect(res.body.error).to.equal(true);
        expect(res.body.message).to.equal("doesnotexist not found")
    })
    // it("Test2", async()=>{
    //     const app = require("../index.js").app;
    //     let res = await request(app).get("/");
    //     console.log(res.text);
    // })
});
