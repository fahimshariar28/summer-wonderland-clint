import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";
import { Elements } from "@stripe/react-stripe-js";
import { useLocation } from "react-router-dom";
import SectionTitle from "../../Shared/SectionTitle";
import { Helmet } from "react-helmet-async";

const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_GETWAY_PK);
const Payment = () => {
  const { state } = useLocation();
  const price = state?.classPrice;

  return (
    <div>
      <Helmet>
        <title>Payment | Summer Wonderland</title>
      </Helmet>
      <SectionTitle title="Payment" />
      <Elements stripe={stripePromise}>
        <CheckoutForm selectedClass={state} price={price}></CheckoutForm>
      </Elements>
    </div>
  );
};

export default Payment;
