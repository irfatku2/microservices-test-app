import { Context, Service as MoleculerService } from 'moleculer';
import { Action, Service } from 'moleculer-decorators';
import { Message } from "@Entities";

@Service({
    name: "message",
})
class MessageService extends MoleculerService {
    @Action({
        params: {
            user: { type: "string" },
            timestamp: { type: "number" },
            message: { type: "string" }
        },
    })
    public async handleMessage(ctx: Context<Message>): Promise<void> {
        return await ctx.call("delivery.send", ctx.params);
    }
}

module.exports = MessageService;