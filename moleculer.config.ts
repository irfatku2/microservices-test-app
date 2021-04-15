import { BrokerOptions } from "moleculer";

const brokerConfig: BrokerOptions = {
    transporter: "AMQP",
    logger: true,
    logLevel: "info",
    metrics: false,

    tracing: {
        enabled: true,
        exporter: [
            {
                type: "Console",
                options: {
                    width: 100,
                    colors: true,
                }
            }
        ]
    },
    validator: true
};

export = brokerConfig;