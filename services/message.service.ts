import { Context, Service as MoleculerService } from 'moleculer';
import { Action, Service } from 'moleculer-decorators';
import { Message } from "@Entities";
import { DeliveryHelper } from "@ServiceHelpers";

@Service({
    name: "message",
})
export default class MessageService extends MoleculerService {
    @Action({
        params: {
            user: { type: "string" },
            timestamp: { type: "number" },
            message: { type: "string", max: 119 }
        },
    })
    public async handleMessage(ctx: Context<Message>): Promise<void> {
        return await DeliveryHelper.send(ctx, ctx.params);
    }
}