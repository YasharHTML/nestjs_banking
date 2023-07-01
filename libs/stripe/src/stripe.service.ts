import { Injectable } from '@nestjs/common';
import { InjectStripe } from 'nestjs-stripe';
import { Stripe } from 'stripe';

@Injectable()
export class StripeService {
  constructor(@InjectStripe() private readonly _stripe: Stripe) {}
  
  get stripe() {
    return this._stripe;
  }
}
