import Stripe from "stripe";

export interface CustomerCreationDto {
  name: string;
  surname: string;
  email: string;
  password: string;
  phoneNumber: string;
  customerData:
    | {
        type: 'individual';
        firstName: string;
        lastName: string;
        dob: {
          day: number;
          month: number;
          year: number;
        };
      }
    | {
        type: 'company';
        taxId: string;
      };
  address: Stripe.Issuing.CardholderCreateParams.Billing.Address
}
