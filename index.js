import { Kafka } from 'kafkajs';
import { config } from 'dotenv';

config();

const clientId = process.env.CLIENT_ID;
const brokers = process.env.BROKERS.split(',').map((broker) => broker.trim());
const topic = process.env.KAFKA_TOPIC;
const params = process.argv.slice(2);

const kafka = new Kafka({
  clientId,
  brokers,
});
const producer = kafka.producer();

async function sendMessage() {
  await producer.connect();
  await producer.send({
    topic,
    messages: [{ value: params.join('\n') }],
  });
  await producer.disconnect();
}

await sendMessage();
