const request = require("supertest")
const baseURL = "http://localhost:8080"

describe("GET /stocks-api/v1/time-series", () => {
    it("should return 200", async () => {
        const response = await request(baseURL).get("/stocks-api/v1/time-series");
        expect(response.statusCode).toBe(200);
    });
    it("should return the time series data from the Yahoo Finance API", async () => {
        const response = await request(baseURL).get("/stocks-api/v1/time-series");
        expect(response.body.defaultKeyStatistics !== null).toBe(true);
    });
});
