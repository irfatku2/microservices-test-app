import { ServiceBroker } from "moleculer";
import { Message } from "@Entities";
const { ValidationError } = require("moleculer").Errors;
const request = require("supertest");
const ServiceSchema = require("../services/request.service");
const ApiSchema = require("../services/api.service");
const MessageSchema = require("../services/message.service");

describe("Test api.service", () => {
    const broker = new ServiceBroker({ logger: false });
    const service = broker.createService(ServiceSchema);
    const apiService = broker.createService(ApiSchema);
    MessageSchema.actions.send = jest.fn(() => Promise.resolve("Fake console log"));
    const messageService = broker.createService(MessageSchema);

    const incorrectRequestBody = {
        user: "qwe",
        timestamp: 124656
    };
    const correctRequestBody: Message = {
        user: "qwe",
        timestamp: 124656,
        message: "qweq"
    };

    beforeAll(async () => await broker.start());
    afterAll(async () => await broker.stop());

    describe("Http checks", () => {
        it("should reject with a ValidationError", async () => {
            const res = await request(apiService.server)
                .post("/")
                .send(incorrectRequestBody);
            const resBody = JSON.parse(res.text);
            expect(res.statusCode).toBe(422);
            expect(resBody.name).toEqual("ValidationError");
        });

        it("should process the request", async () => {
            const res = await request(apiService.server)
                .post("/")
                .send(correctRequestBody);
            expect(res.statusCode).toBe(200);
        });
    });

    describe("Microservice checks", () => {
        it("should reject with a ValidationError", async () => {
            expect.assertions(1);
            const result = broker.call("message.handleMessage", incorrectRequestBody);
            await expect(result).rejects.toBeInstanceOf(ValidationError);
        });

        it("should process the request", async () => {
            const result = await broker.call("message.handleMessage", correctRequestBody);
            expect(result).toBe("Fake console log");
        });
    });
});