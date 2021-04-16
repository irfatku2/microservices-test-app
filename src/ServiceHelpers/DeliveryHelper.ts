import { Context } from 'moleculer';
import { Message } from "@Entities";

export namespace DeliveryHelper {
    const prefix: string = 'delivery';

    export const send = async (
        ctx: Context,
        params: Message,
    ): Promise<void> => await ctx.call(`${prefix}.send`, params);
}