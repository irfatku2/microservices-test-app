import { Context } from 'moleculer';
import { Message } from "@Entities";

export namespace MessageHelper {
    const prefix: string = 'message';

    export const handleMessage = async (
        ctx: Context,
        params: Message,
    ): Promise<void> => await ctx.call(`${prefix}.handleMessage`, params);
}