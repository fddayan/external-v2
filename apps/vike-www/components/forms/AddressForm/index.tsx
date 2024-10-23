import React, { useContext } from "react";
import { AddressFormProps, Address } from "./addressForm.model";
import { TextField, Space } from "@src/components/nessie-web";
import { TranslationContext } from "@src/components/translation/TranslationContext";
import { Grid } from "@src/components/Grid";

export function validateAddressData(data: Address) {
  return data.name && data.address1 && data.city && data.state && data.country && data.email;
}

const AddressForm = (props: AddressFormProps) => {
  const { addressFormData, setAddressFormData } = props;

  const t = useContext(TranslationContext);

  return (
    <div>
      <TextField
        label={t.translate("directus.page_mentors_surveys.mailing_name") + " *"}
        name="name"
        value={addressFormData.name}
        onChange={(v: string) => {
          setAddressFormData({ ...addressFormData, name: v });
        }}
        required
      />
      <Space size="xs" />
      <TextField
        label={t.translate("directus.page_mentors_surveys.mailing_company")}
        name="company"
        value={addressFormData.company}
        onChange={(v: string) => {
          setAddressFormData({ ...addressFormData, company: v });
        }}
      />
      <Space size="xs" />
      <TextField
        label={t.translate("directus.page_mentors_surveys.mailing_address") + " *"}
        name="address1"
        value={addressFormData.address1}
        onChange={(v: string) => {
          setAddressFormData({ ...addressFormData, address1: v });
        }}
        required
      />
      <Space size="xs" />
      <TextField
        label={t.translate("directus.page_mentors_surveys.mailing_address") + " 2"}
        name="address2"
        value={addressFormData.address2}
        onChange={(v: string) => {
          setAddressFormData({ ...addressFormData, address2: v });
        }}
      />
      <Space size="xs" />
      <Grid columns={2} gapSize="xs">
        <TextField
          label={t.translate("directus.page_mentors_surveys.mailing_city") + " *"}
          name="city"
          value={addressFormData.city}
          onChange={(v: string) => {
            setAddressFormData({ ...addressFormData, city: v });
          }}
          required
        />
        <TextField
          label={t.translate("directus.page_mentors_surveys.mailing_state") + " *"}
          name="state"
          value={addressFormData.state}
          onChange={(v: string) => {
            setAddressFormData({ ...addressFormData, state: v });
          }}
          required
        />
        <TextField
          label={t.translate("directus.page_mentors_surveys.mailing_zip") + " *"}
          name="zip"
          value={addressFormData.zip}
          onChange={(v: string) => {
            setAddressFormData({ ...addressFormData, zip: v });
          }}
          required
        />
        <TextField
          label={t.translate("directus.page_mentors_surveys.mailing_country") + " *"}
          name="country"
          value={addressFormData.country}
          onChange={(v: string) => {
            setAddressFormData({ ...addressFormData, country: v });
          }}
          required
        />
      </Grid>
      <Space size="xs" />
      <TextField
        label={t.translate("directus.page_mentors_surveys.mailing_email") + " *"}
        name="email"
        type="email"
        value={addressFormData.email}
        onChange={(v: string) => {
          setAddressFormData({ ...addressFormData, email: v });
        }}
        required
      />
      <Space size="xs" />
      <TextField
        label={t.translate("directus.page_mentors_surveys.mailing_phone")}
        name="phone"
        value={addressFormData.phone}
        onChange={(v: string) => {
          setAddressFormData({ ...addressFormData, phone: v });
        }}
      />
    </div>
  );
};

export default AddressForm;
