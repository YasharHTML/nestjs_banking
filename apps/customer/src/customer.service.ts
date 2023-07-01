import { FirebaseService } from '@app/firebase';
import { StripeService } from '@app/stripe';
import { CustomerCreationDto } from '@app/types';
import { Injectable } from '@nestjs/common';
import { Stripe } from 'stripe';

@Injectable()
export class CustomerService {
  constructor(
    private readonly firebaseService: FirebaseService,
    private readonly stripeService: StripeService,
  ) {}

  getCustomers(params: Stripe.Issuing.CardholderListParams) {
    return this.stripeService.stripe.issuing.cardholders.list(params);
  }

  async createCustomer({
    email,
    name,
    password,
    surname,
    phoneNumber,
    customerData,
    address,
  }: CustomerCreationDto) {
    try {
      const user = await this.firebaseService.auth.createUser({
        displayName: name + ' ' + surname,
        email,
        password,
        phoneNumber,
      });

      const customer = { individual: undefined, company: undefined };

      switch (customerData.type) {
        case 'individual':
          customer.individual = {
            dob: customerData.dob,
            first_name: customerData.firstName,
            last_name: customerData.lastName,
          };
          break;
        case 'company':
          customer.company = {
            tax_id: customerData.taxId,
          };
          break;
      }

      await this.stripeService.stripe.issuing.cardholders.create({
        name: name + surname,
        phone_number: phoneNumber,
        email,
        billing: { address },
        type: customerData.type,
        status: 'inactive',
        metadata: {
          uid: user.uid,
        },
        ...customer,
      });

      return {
        message: 'success',
      };
    } catch (error) {
      throw error;
    }
  }
}
