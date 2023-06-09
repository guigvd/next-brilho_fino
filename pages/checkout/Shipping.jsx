import AddressForm from "./AddressForm";

const Shipping = ({
  values,
  touched,
  errors,
  handleChange,
  handleBlur,
}) => {
  if (!values) {
    return (
      <div>
        <p>ERRO 404</p>
      </div>
    );
  }

  return (

    <div className="mx-auto my-8">
      {/* BILLING FORM */}
      <div>
        <p className="mb-4 text-lg">Billing Information</p>
        <AddressForm
          type="billingAddress"
          values={values.billingAddress}
          touched={touched}
          errors={errors}
          handleBlur={handleBlur}
          handleChange={handleChange}
        />
      </div>
    </div>
  );
};

export default Shipping;
