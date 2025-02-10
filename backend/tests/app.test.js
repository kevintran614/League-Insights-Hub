const request = require("supertest");
const app = require("../server");

jest.setTimeout(10000);

describe("POST /display-account", () => {
  describe("Test 1: User enters name and tagline", () => {
    test("/display-account valid request", async () => {
      const response = await request(app).post("/api/display-account").send({
        gameName: "notscaredtolose",
        tagLine: "123",
      });

      expect(response.status).toBe(200);
    });
  });

  //   describe("Test 2: User does not enter name and tagline", () => {
  //     test("/display-account invalid request", async () => {
  //       const response = await request(app).post("/api/display-account").send({
  //         gameName: "",
  //         tagLine: "",
  //       });

  //       expect(response.status).toBe(400);
  //     });
  //   });
});
