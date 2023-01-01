const request = require("supertest")
const baseURL = "http://localhost:8080"

describe("GET /nasa-api/v1/apod", () => {
    it("should return 200", async () => {
        const response = await request(baseURL).get("/nasa-api/v1/apod");
        expect(response.statusCode).toBe(200);
    });
    it("should return the title of the image of the day", async () => {
        const response = await request(baseURL).get("/nasa-api/v1/apod");
        expect(response.body.title === 'The Largest Rock in our Solar System').toBe(true);
    });
});

describe("GET /nasa-api/v1/mars-rover", () => {
    it("should return 200", async () => {
        const response = await request(baseURL).get("/nasa-api/v1/mars-rover");
        expect(response.statusCode).toBe(200);
    });
    it("should return the mars rover data", async () => {
        const response = await request(baseURL).get("/nasa-api/v1/mars-rover");
        expect(response.body.length >= 1).toBe(true);
    });
});

describe("GET /nasa-api/v1/cme-analysis", () => {
    it("should return 200", async () => {
        const response = await request(baseURL).get("/nasa-api/v1/cme-analysis");
        expect(response.statusCode).toBe(200);
    });
    it("should return cme analysis", async () => {
        const response = await request(baseURL).get("/nasa-api/v1/cme-analysis");
        expect(response.body.length >= 1).toBe(true);
    });
});
