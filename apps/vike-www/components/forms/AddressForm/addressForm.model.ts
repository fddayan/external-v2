export interface Address {
  name: string;
  company: string;
  address1: string;
  address2: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  email: string;
  phone: string;
}

export interface AddressFormProps {
  addressFormData: Address;
  setAddressFormData: (addressData: Address) => void;
}
