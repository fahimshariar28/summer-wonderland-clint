import "./CheckoutForm.css";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import Swal from "sweetalert2";

const CheckoutForm = ({ selectedClass, price }) => {
  const stripe = useStripe();
  const elements = useElements();
  const { user } = useAuth();
  const [cardError, setCardError] = useState(null);
  const [axiosSecure] = useAxiosSecure();
  const [clientSecret, setClientSecret] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [transactionId, setTransactionId] = useState(null);

  useEffect(() => {
    if (price > 0) {
      axiosSecure
        .post("/create-payment-intent", { classPrice: price })
        .then((res) => {
          console.log(res.data);
          setClientSecret(res.data.clientSecret);
        });
    }
  }, [price, axiosSecure]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);
    if (card == null) {
      return;
    }

    const { error } = await stripe.createPaymentMethod({
      type: "card",
      card: card,
    });

    if (error) {
      console.log("[error]", error);
      setCardError(error.message);
    } else {
      // console.log("[PaymentMethod]", paymentMethod);
      setCardError(null);
    }

    setProcessing(true);

    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            email: user?.email || "unknown",
            name: user?.displayName || "anonymous",
          },
        },
      });

    if (confirmError) {
      console.log(confirmError);
    }
    console.log(paymentIntent);

    setProcessing(false);
    if (paymentIntent.status === "succeeded") {
      setTransactionId(paymentIntent.id);
      const payment = {
        transactionId: paymentIntent.id,
        email: user?.email,
        name: user?.displayName,
        date: new Date(),
        selectedClassId: selectedClass._id,
        classId: selectedClass.classId,
        className: selectedClass.className,
        classPrice: selectedClass.classPrice,
        status: "paid",
      };
      axiosSecure.post("/payment", payment).then((res) => {
        console.log(res.data);
        if (res.data.insertResult.insertedId) {
          Swal.fire({
            title: "Payment Successful.",
            showClass: {
              popup: "animate__animated animate__fadeInDown",
            },
            hideClass: {
              popup: "animate__animated animate__fadeOutUp",
            },
          });
        }
      });
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <CardElement
          options={{
            style: {
              base: {
                maxWidth: "100%",
                width: "500px",
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />
        <button
          className="btn  btn-primary btn-sm"
          type="submit"
          disabled={!stripe || !clientSecret || processing}
        >
          Pay
        </button>
      </form>
      {cardError && <p className="text-error">{cardError}</p>}
      {transactionId && (
        <p className="text-green-500">
          Transaction complete with transactionId: {transactionId}
        </p>
      )}
    </>
  );
};

export default CheckoutForm;
