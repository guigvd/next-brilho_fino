import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Shipping from "./checkout/Shipping";
import Payment from "./checkout/Payment";

import { Stepper, Step, StepLabel } from "@mui/material";
import StepConnector, {
  stepConnectorClasses,
} from "@mui/material/StepConnector";
import Check from "@mui/icons-material/Check";
import { styled } from "@mui/material/styles";

import { Formik } from "formik";
import * as yup from "yup";
import { useState } from "react";
import { useSelector } from "react-redux";

import { loadStripe } from "@stripe/stripe-js";

// STYLE STEPPER
const QontoConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 10,
    left: "calc(-50% + 16px)",
    right: "calc(50% + 16px)",
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: "#784af4",
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: "#784af4",
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    borderColor:
      theme.palette.mode === "dark" ? theme.palette.grey[800] : "#eaeaf0",
    borderTopWidth: 3,
    borderRadius: 1,
  },
}));

const QontoStepIconRoot = styled("div")(({ theme, ownerState }) => ({
  color: theme.palette.mode === "dark" ? theme.palette.grey[700] : "#eaeaf0",
  display: "flex",
  height: 22,
  alignItems: "center",
  ...(ownerState.active && {
    color: "#784af4",
  }),
  "& .QontoStepIcon-completedIcon": {
    color: "#784af4",
    zIndex: 1,
    fontSize: 18,
  },
  "& .QontoStepIcon-circle": {
    width: 8,
    height: 8,
    borderRadius: "50%",
    backgroundColor: "currentColor",
  },
}));

function QontoStepIcon(props) {
  const { active, completed, className } = props;

  return (
    <QontoStepIconRoot ownerState={{ active }} className={className}>
      {completed ? (
        <Check className="QontoStepIcon-completedIcon" />
      ) : (
        <div className="QontoStepIcon-circle" />
      )}
    </QontoStepIconRoot>
  );
}

// STRIPE THINGS
const stripePromise = loadStripe(
  "pk_test_51M9ZzlHbou1FRQSamFf8SwIVLdDEj1ebineJAOKi2ipn0CAhlfzQvadGECNGQY7ITt8EECEUxxKYhUqNo4GvFSRv007aDaapj4"
);

const Checkout = () => {
  const [activeStep, setActiveStep] = useState(0);
  const cart = useSelector((state) => state.cart.cart);
  const isFirstStep = activeStep === 0;
  const isSecondStep = activeStep === 1;

  const handleFormSubmit = async (values, actions) => {
    setActiveStep(activeStep + 1);

    if (isSecondStep) {
      makePayment(values);
    }

    actions.setTouched({});
  };

  async function makePayment(values) {
    const stripe = await stripePromise;
    const requestBody = {
      name: values.name,
      email: values.email,
      products: cart.map(({ _id, name, price, count }) => ({
        _id,
        name,
        price,
        count,
      })),
    };

    const response = await fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requestBody),
    });

    const sessionId = await response.json();
    const sessionIdString = sessionId.sessionId;

    await stripe.redirectToCheckout(
      {
        sessionId: sessionIdString,
      },
      console.log("idteste")
    );
  }

  return (
    <div className="h-screen flex flex-col">
      <Navbar />

      <div className="py-24 w-5/6 mx-auto h-full">
        <Stepper
          activeStep={activeStep}
          className="my-5"
          connector={<QontoConnector />}
        >
          <Step>
            <StepLabel StepIconComponent={QontoStepIcon}>Cobrança</StepLabel>
          </Step>
          <Step>
            <StepLabel StepIconComponent={QontoStepIcon}>Pagamento</StepLabel>
          </Step>
        </Stepper>

        <div>
          <Formik
            onSubmit={handleFormSubmit}
            initialValues={initialValues}
            validationSchema={checkoutSchema[activeStep]}
          >
            {({
              values,
              errors,
              touched,
              handleBlur,
              handleChange,
              handleSubmit,
              setFieldValue,
            }) => (
              <form onSubmit={handleSubmit}>
                {isFirstStep && (
                  <Shipping
                    values={values}
                    errors={errors}
                    touched={touched}
                    handleBlur={handleBlur}
                    handleChange={handleChange}
                    setFieldValue={setFieldValue}
                  />
                )}
                {isSecondStep && (
                  <Payment
                    values={values}
                    errors={errors}
                    touched={touched}
                    handleBlur={handleBlur}
                    handleChange={handleChange}
                    setFieldValue={setFieldValue}
                  />
                )}

                <div className="flex justify-between gap-12">
                  {!isFirstStep && (
                    <button
                      color="secondary"
                      variant="contained"
                      className="bg-neutral-800 hover:bg-transparent hover:text-neutral-800 text-white shadow-sm border-r-0 py-4 px-10 w-full "
                      onClick={() => setActiveStep(activeStep - 1)}
                    >
                      Voltar
                    </button>
                  )}
                  <button
                    type="submit"
                    variant="contained"
                    className="bg-neutral-800 hover:bg-transparent hover:text-neutral-800 text-white shadow-sm border-r-0 py-4 px-10 w-full"
                  >
                    {!isSecondStep ? "Próximo" : "Fazer Pedido"}
                  </button>
                </div>
              </form>
            )}
          </Formik>
        </div>
      </div>

      <Footer />
    </div>
  );
};

// VALORES INICIAIS DOS FORM
const initialValues = {
  billingAddress: {
    firstName: "",
    lastName: "",
    country: "",
    street1: "",
    street2: "",
    city: "",
    state: "",
    zipCode: "",
  },
  email: "",
  name: "",
};

const checkoutSchema = [
  yup.object().shape({
    billingAddress: yup.object().shape({
      firstName: yup.string().required("required"),
      lastName: yup.string().required("required"),
      country: yup.string().required("required"),
      street1: yup.string().required("required"),
      street2: yup.string(),
      city: yup.string().required("required"),
      state: yup.string().required("required"),
      zipCode: yup.string().required("required"),
    }),
  }),
  yup.object().shape({
    email: yup.string().required("required"),
    name: yup.string().required("required"),
  }),
];

export default Checkout;
