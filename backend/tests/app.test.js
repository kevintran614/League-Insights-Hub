const request = require("supertest");
const app = require("../server");

jest.setTimeout(10000);

// 1. display-account route
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

  describe("Test 2: User does not enter name and tagline", () => {
    test("/display-account invalid request", async () => {
      const response = await request(app).post("/api/display-account").send({
        gameName: "",
        tagLine: "",
      });

      expect(response.status).toBe(500);
    });
  });
});

// 2. account-champions route
describe("GET /account-champions", () => {
  describe("Test 1: User enters name and tagline", () => {
    test("/display-account valid request", async () => {
      const response = await request(app).post("/api/display-account").send({
        gameName: "notscaredtolose",
        tagLine: "123",
      });

      expect(response.status).toBe(200);
    });
  });
});

// 3. account-find-match route
describe("GET /account-find-match", () => {
  describe("Test 1: User enters name and tagline", () => {
    test("/display-account valid request", async () => {
      const response = await request(app).post("/api/display-account").send({
        gameName: "notscaredtolose",
        tagLine: "123",
      });

      expect(response.status).toBe(200);
    });
  });
});

// 4. account-league-entries route
describe("GET /account-league-entries", () => {
  describe("Test 1: User enters name and tagline", () => {
    test("/display-account valid request", async () => {
      const response = await request(app).post("/api/display-account").send({
        gameName: "notscaredtolose",
        tagLine: "123",
      });

      expect(response.status).toBe(200);
    });
  });
});

// 5. account-matches route
describe("GET /account-matches", () => {
  describe("Test 1: User enters name and tagline", () => {
    test("/display-account valid request", async () => {
      const response = await request(app).post("/api/display-account").send({
        gameName: "notscaredtolose",
        tagLine: "123",
      });

      expect(response.status).toBe(200);
    });
  });
});

// 6. account-total-mastery route
describe("GET /account-total-mastery", () => {
  describe("Test 1: User enters name and tagline", () => {
    test("/display-account valid request", async () => {
      const response = await request(app).post("/api/display-account").send({
        gameName: "notscaredtolose",
        tagLine: "123",
      });

      expect(response.status).toBe(200);
    });
  });
});
