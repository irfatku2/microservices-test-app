import { Context, Service as MoleculerService } from "moleculer";
import { Action, Method, Service } from 'moleculer-decorators';
import { Message } from "@Entities";

@Service({
    name: "delivery"
})
class DeliveryService extends MoleculerService {
    @Action()
    public send(ctx: Context<Message>): Promise<void> {
        return this.sendToConsole(ctx)
    }
    @Method
    public sendToConsole(ctx: Context<Message>): Promise<void> {
        const { params } = ctx;
        return new Promise(resolve =>
            setTimeout(() => {
                resolve(console.log(params))
            }, params.message.length * 1000)
        )
    }
}

module.exports = DeliveryService;