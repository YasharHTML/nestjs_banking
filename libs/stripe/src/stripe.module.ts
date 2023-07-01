import { Module } from '@nestjs/common';
import { StripeService } from './stripe.service';
import { StripeModule as _StripeModule } from 'nestjs-stripe';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    _StripeModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        apiKey: configService.getOrThrow<string>('STRIPE_SECRET_KEY'),
        apiVersion: configService.getOrThrow<string>('STRIPE_API_VERSION') as "2022-11-15",
      }),
    }),
  ],
  providers: [StripeService],
  exports: [StripeService],
})
export class StripeModule {}
