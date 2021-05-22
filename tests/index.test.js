"use strict";

const app = require("../functions/index.js");
const chai = require("chai");
const expect = chai.expect;
var event, context;

describe("Tests index", function() {
  test("verifies unauthorized response", async () => {
    const result = await app.handler(event, context);
    expect(result).to.be.an("object");
    expect(result.body).to.be.an("string");
    expect(result.statusCode).to.equal(401);

    let response = JSON.parse(result.body);
    expect(response).to.be.an("object");
    expect(response.message).to.be.an("string");
    expect(response.message).to.be.equal("Unauthorized Request.");
  });
});