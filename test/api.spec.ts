import { ServiceBroker } from "moleculer";
import { Message } from "@Entities";
import { DeliveryHelper, MessageHelper } from "@ServiceHelpers";
import request from "supertest";
import DeliverySchema from "../services/delivery.service";
import ApiSchema from "../services/api.service";
import MessageSchema from "../services/message.service";

describe("Test api.service", () => {
    const broker = new ServiceBroker({ logger: false });
    const DeliveryService = broker.createService(DeliverySchema);
    const apiService = broker.createService(ApiSchema);
    const messageService = broker.createService(MessageSchema);

    const spy = jest.spyOn(DeliveryHelper, 'send').mockResolvedValue();

    const correctRequestBody = new Message("Ilias", 124656, "moleculer");

    beforeAll(async () => await broker.start());
    afterAll(async () => await broker.stop());

    describe("Http checks", () => {
        it("should process the request", async () => {
            await request(apiService.server)
                .post("/")
                .send(correctRequestBody);
            expect(spy).toHaveBeenCalledTimes(1);
        });
    });

    describe("Microservice checks", () => {
        it("should process the request", async () => {
            await MessageHelper.handleMessage(broker as any, correctRequestBody);
            expect(spy).toHaveBeenCalledTimes(1);
        });
    });
});