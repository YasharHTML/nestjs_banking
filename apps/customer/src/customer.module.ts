import { Module } from '@nestjs/common';
import { CustomerController } from './customer.controller';
import { CustomerService } from './customer.service';
import { FirebaseModule } from '@app/firebase';
import { StripeModule } from '@app/stripe';

@Module({
  imports: [FirebaseModule, StripeModule],
  controllers: [CustomerController],
  providers: [CustomerService],
})
export class CustomerModule {}
