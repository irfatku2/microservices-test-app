import { Service as MoleculerService } from "moleculer";
import ApiGateway from "moleculer-web";
import { Service } from "moleculer-decorators";

@Service({
    name: "api",
    mixins: [ApiGateway],
    settings: {
        port: process.env.HTTP_PORT || 3000,
        routes: [
            {
                mappingPolicy: "restrict",
                bodyParsers: {
                    json: true,
                },
                aliases: {
                    "POST /": "message.handleMessage"
                },
            },
        ]
    }
})
class ApiService extends MoleculerService { }

module.exports = ApiService;