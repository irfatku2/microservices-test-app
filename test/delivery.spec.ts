import { Message } from "@Entities";

const { ServiceBroker } = require('moleculer');
import DeliverySchema from '../services/delivery.service';
import { DeliveryHelper } from "@ServiceHelpers";

describe(' Test message.service', () => {
    const broker = new ServiceBroker({ logger: false });
    const deliveryService = broker.createService(DeliverySchema);
    jest.useFakeTimers();
    console.log = jest.fn();

    const correctRequestBody = new Message("Ilias", 124656, "moleculer");
    const delay: number = correctRequestBody.message.length * 1000;
    const delta: number = 50;

    beforeAll(async () => await broker.start());
    afterAll(async () => await broker.stop());

    it('should console.log message after a given number of seconds(message length)', () => {
        DeliveryHelper.send(broker as any, correctRequestBody);
        expect(console.log).not.toBeCalled();
        jest.advanceTimersByTime(delay);
        expect(console.log).toHaveBeenCalledTimes(1);
        expect(console.log).toHaveBeenCalledWith(correctRequestBody);
    });

    it('should fail if console.log executed earlier or much later', () => {
        DeliveryHelper.send(broker as any, correctRequestBody);
        jest.advanceTimersByTime(delay - delta);
        expect(console.log).not.toHaveBeenCalled();
        jest.advanceTimersByTime(delta * 2);
        expect(console.log).toHaveBeenCalledTimes(1);
        expect(console.log).toHaveBeenCalledWith(correctRequestBody);
    });
});