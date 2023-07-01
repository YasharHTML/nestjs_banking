import { NestFactory } from '@nestjs/core';
import { CustomerModule } from './customer.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

import * as dotenv from 'dotenv';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    CustomerModule,
    {
      transport: Transport.NATS,
      options: {
        servers: process.env.NATS_URL,
        queue: 'customer_queue',
      },
    },
  );
  await app.listen();
}
bootstrap();
