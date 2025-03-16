import amqp from "amqplib";
import debug from "debug";
const log: debug.IDebugger = debug("app:amqp");
const connectionUrl = "amqp://localhost:5672";

export class PubSub {
	async publishToQueue(queueName: string, data: any) {
		try {
			log("Conectando a RabbitMQ");
			const connection = await amqp.connect(connectionUrl);
			const channel = await connection.createChannel();
			await channel.assertQueue(queueName);
			channel.sendToQueue(queueName, Buffer.from(JSON.stringify(data)));
			log(`Message sent to queue: ${queueName}`);
		} catch (error) {
			log(error);
		}
	}
	async consumeFromQueue(queueName: string, callback: any) {
		try {
			log("Conectando a RabbitMQ");
			const connection = await amqp.connect(connectionUrl);
			const channel = await connection.createChannel();
			await channel.assertQueue(queueName);

			channel.consume(queueName, (message) => {
				if (message) {
					log(`Message received from queue: ${queueName}`);
					channel.ack(message);
				}
				callback(message);
			});
		} catch (error) {
			log(error);
		}
	}
}
export default new PubSub();
