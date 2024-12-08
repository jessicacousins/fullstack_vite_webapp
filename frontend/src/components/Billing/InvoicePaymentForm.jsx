import React, { useState, useEffect } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "./InvoicePaymentForm.css";

const InvoicePaymentForm = () => {
  const { id: invoiceId } = useParams();
  const stripe = useStripe();
  const elements = useElements();
  const [invoice, setInvoice] = useState(null);
  const [clientSecret, setClientSecret] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchInvoice = async () => {
      try {
        const res = await axios.get(`/api/invoices/${invoiceId}`);
        setInvoice(res.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching invoice:", error);
      }
    };
    fetchInvoice();
  }, [invoiceId]);

  const createPaymentIntent = async () => {
    try {
      const res = await axios.post(
        `/api/invoices/${invoiceId}/create-payment-intent`
      );
      setClientSecret(res.data.clientSecret);
    } catch (error) {
      console.error("Error creating payment intent:", error);
      alert("Error creating payment intent");
    }
  };

  useEffect(() => {
    if (invoice && invoice.status !== "paid") {
      createPaymentIntent();
    }
  }, [invoice]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements || !clientSecret) return;

    const cardElement = elements.getElement(CardElement);

    const { error, paymentIntent } = await stripe.confirmCardPayment(
      clientSecret,
      {
        payment_method: {
          card: cardElement,
        },
      }
    );

    if (error) {
      console.error("Payment confirmation error:", error);
      alert("Payment failed");
      return;
    }

    // Payment succeeded
    try {
      await axios.post(`/api/invoices/${invoiceId}/mark-paid`);
      alert("Invoice paid successfully!");
      navigate("/invoices");
    } catch (err) {
      console.error("Error marking invoice as paid:", err);
    }
  };

  if (loading) return <div>Loading invoice...</div>;
  if (!invoice) return <div>Invoice not found</div>;

  //   return (
  //     <div>
  //       <h2>Pay Invoice {invoice.invoiceNumber}</h2>
  //       <p>Amount Due: ${invoice.totalAmount.toFixed(2)}</p>
  //       {invoice.status === "paid" ? (
  //         <p>This invoice is already paid.</p>
  //       ) : (
  //         <form onSubmit={handleSubmit}>
  //           <CardElement />
  //           <button type="submit" disabled={!stripe}>
  //             Pay Invoice
  //           </button>
  //         </form>
  //       )}
  //     </div>
  //   );
  // };

  return (
    <div className="invoice-payment-container">
      <h2 className="invoice-header">Pay Invoice {invoice.invoiceNumber}</h2>
      <div className="invoice-details">
        <p className="amount-due">
          Amount Due: ${invoice.totalAmount.toFixed(2)}
        </p>
      </div>

      {invoice.status === "paid" ? (
        <p className="success-message">This invoice is already paid.</p>
      ) : (
        <form className="payment-form" onSubmit={handleSubmit}>
          <CardElement className="payment-card-element" />
          <button type="submit" className="payment-button" disabled={!stripe}>
            Pay Invoice
          </button>
        </form>
      )}
    </div>
  );
};

export default InvoicePaymentForm;
