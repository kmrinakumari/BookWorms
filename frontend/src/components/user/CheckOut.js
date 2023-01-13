import React, { useState } from "react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useNavigate } from "react-router-dom";
import app_config from "../../config";
import Swal from "sweetalert2";

const CheckOut = () => {

  const [novelData, setNovelData] = useState(JSON.parse(sessionStorage.getItem('novel')));
  const [currentUser, setCurrentUser] = useState(JSON.parse(sessionStorage.getItem('user')))
  const url = app_config.apiurl;
  
  const [isPaymentLoading, setPaymentLoading] = useState(false);

  const navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();


  

  const CARD_OPTIONS = {
    iconStyle: "solid",
    style: {
      base: {
        padding: "0.5rem",
        iconColor: "#c4f0ff",
        color: "#000",
        fontWeight: 500,
        fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
        fontSize: "16px",
        fontSmoothing: "antialiased",
        ":-webkit-autofill": {
          color: "#fce883",
        },
        "::placeholder": {
          color: "#87bbfd",
        },
      },
      invalid: {
        iconColor: "#ffc7ee",
        color: "#ffc7ee",
      },
    },
  };

  const getIntent = () => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount: (novelData.selPrice) * 100 }),
    };
    return fetch(url + "/create-payment-intent", requestOptions).then(
      (response) => response.json()
    );
  };

  const completePayment = async (key) => {
    const paymentResult = await stripe.confirmCardPayment(key, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          name: currentUser.name,
        },
      },
    });

    setPaymentLoading(false);
    if (paymentResult.error) {
      alert();
      Swal.fire({
        icon: "error",
        title: "Payment Failed",
        text: paymentResult.error.message,
      });
      console.log(paymentResult.error.message);
    } else {
      if (paymentResult.paymentIntent.status === "succeeded") {
        console.log(paymentResult);

        // saveOrder();
        checkoutSubmit();
      }
    }
  };

  const checkoutSubmit = () => {
    fetch(url + "/order/add", {
      method: "POST",
      body: JSON.stringify({
        user: currentUser._id,
        equipment: novelData._id,
        createdAt: new Date(),
        rent: false,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      console.log(res.status);
      if (res.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Loggedin Successfully",
        });
        // res.json((data) => {
        //   if (data.isAdmin) {
        //     sessionStorage.setItem("admin", JSON.stringify(data));
        //     navigate("/admin/addequipment");
        //   }
        // });
      } else if (res.status === 300) {
        Swal.fire({
          icon: "error",
          title: "Failed",
          text: "Loggedin Failed",
        });
      }
    });
  };

  return (
    <div>
      <section
        className="p-4 p-md-5"
        style={{
          backgroundImage:
            "url(https://img.freepik.com/free-vector/isometric-e-commerce-safety-payment_79603-997.jpg?w=2000)",
        }}
      >
        <div className="row d-flex justify-content-center">
          <div className="col-md-8 col-lg-8 col-xl-7">
          <div className="card rounded-3">
              <div className="card-body p-4">
                <div className="text-center mb-4">
                  <h3>Order Details</h3>
                  <h6>Novel</h6>
                </div>
                <hr />

                <div className="row">
                  <div className="col-md-6">
                    <label><b>Novel Title</b></label>
                    <h1 className="mb-3">{novelData.title}</h1>
                    <label><b>Novel Author</b></label>
                    <h3 className="mb-3">{novelData.author}</h3>
                    <label><b>Novel Publisher</b></label>
                    <h3 className="mb-3">{novelData.publisher}</h3>
                    <label><b>Novel RentPrice</b></label>
                    <h3 className="mb-3">{novelData.rentPrice}</h3>
                    <label><b>Novel SellPrice</b></label>
                    <h3 className="mb-3">{novelData.sellPrice}</h3>
                    
                  </div>
                  <div className="col-md-6">
                    {/* img */}
                    <img src="{novelData.image}"alt=""/>
                    
                    
                  </div>
                </div>
                
              </div>
            </div>
          </div>
          <div className="col-md-4 col-lg-4 col-xl-5">
            <div className="card rounded-3">
              <div className="card-body p-4">
                <div className="text-center mb-4">
                  <h3>Payment Details</h3>
                  <h6>Payment</h6>
                </div>
                <CardElement className="card" options={CARD_OPTIONS} />

                <button
                  disabled={isPaymentLoading}
                  className="mt-5 w-100"
                  
                  type="submit"
                >
                  {isPaymentLoading
                    ? "Loading..."
                    : `Pay ₹${novelData.selPrice}/-`}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CheckOut;
