import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";
import { Elements } from "@stripe/react-stripe-js";
import useSelectedClass from "../../../hooks/useSelectedClass";

const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_GETWAY_PK);
const Payment = () => {
  const [selectedClass] = useSelectedClass();
  const total = selectedClass?.reduce((acc, item) => acc + item.classPrice, 0);
  const price = parseFloat(total) * 100;

  return (
    <div>
      <h2>Pay for your Class</h2>
      <Elements stripe={stripePromise}>
        <CheckoutForm
          selectedClass={selectedClass}
          price={price}
        ></CheckoutForm>
      </Elements>
    </div>
  );
};

export default Payment;
