import React from "react";
import Footer from "./Footer";

const ShippingPage = () => {
  return (
    <>
      <div
        style={{
          minHeight: "100vh",
          backgroundColor: "var(--base-200)",
          paddingTop: "10rem",
          paddingBottom: "4rem",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "flex-start",
            marginLeft: "25%",
            width: "50%",
            flexDirection: "column",
            gap: "2rem",
          }}
        >
          <div>
            <h2
              style={{
                fontFamily: "'PP Neue Montreal', sans-serif",
                fontSize: "4rem",
                fontWeight: 700,

                letterSpacing: "1px",
                lineHeight: "4.4rem",
              }}
            >
              Shipping & Return Policy
            </h2>
          </div>

          <h3
            style={{
              fontFamily: "'PP Neue Montreal', sans-serif",
              fontSize: "3.5rem",
              fontWeight: 700,
              marginTop: "4rem",
              letterSpacing: "1px",
              lineHeight: "4.4rem",
            }}
          >
            Shipping
          </h3>
          <h4
            style={{
              fontFamily: "'PP Neue Montreal', sans-serif",
              fontSize: "3rem",
              fontWeight: 500,

              letterSpacing: "0px",
              lineHeight: "4.4rem",
            }}
          >
            Processing Time
          </h4>
          <p
            style={{
              fontFamily: "'PP Neue Montreal', sans-serif",
              fontSize: "1.4rem",
              fontWeight: 400,
              lineHeight: "3rem",
              letterSpacing: "1px",
            }}
          >
            All orders are processed within 1–2 business days. Orders are not
            shipped on weekends or public holidays in Uruguay.
          </p>
          <p
            style={{
              fontFamily: "'PP Neue Montreal', sans-serif",
              fontSize: "1.4rem",
              fontWeight: 400,
              lineHeight: "3rem",
              letterSpacing: "1px",
            }}
          >
            During high-volume periods, shipments may be delayed slightly. Thank
            you for your patience.
          </p>
          <h4
            style={{
              fontFamily: "'PP Neue Montreal', sans-serif",
              fontSize: "3rem",
              fontWeight: 500,
              marginTop: "2rem",
              letterSpacing: "0px",
              lineHeight: "4.4rem",
            }}
          >
            Shipping Rates & Delivery Estimates
          </h4>
          <p
            style={{
              fontFamily: "'PP Neue Montreal', sans-serif",
              fontSize: "1.4rem",
              fontWeight: 400,
              lineHeight: "3rem",
              letterSpacing: "1px",
            }}
          >
            Shipping costs are calculated at checkout based on your location.
          </p>
          <p
            style={{
              fontFamily: "'PP Neue Montreal', sans-serif",
              fontSize: "3rem",
              fontWeight: 500,
              marginTop: "2rem",
              letterSpacing: "0px",
              lineHeight: "4.4rem",
            }}
          >
            Estimated delivery times:
          </p>
          <p
            style={{
              fontFamily: "'PP Neue Montreal', sans-serif",
              fontSize: "1.4rem",
              fontWeight: 400,
              marginLeft: "3rem",
              letterSpacing: "1px",
              lineHeight: "3rem",
            }}
          >
            <b> Within Uruguay:</b> 2–5 business days
          </p>
          <p
            style={{
              fontFamily: "'PP Neue Montreal', sans-serif",
              fontSize: "1.4rem",
              fontWeight: 400,
              marginLeft: "3rem",
              lineHeight: "3rem",
              letterSpacing: "1px",
            }}
          >
            <b>International:</b> 7–21 business days (varies by destination and
            customs processing)
          </p>
          <p
            style={{
              fontFamily: "'PP Neue Montreal', sans-serif",
              fontSize: "1.4rem",
              fontWeight: 400,
              lineHeight: "3rem",
              letterSpacing: "1px",
            }}
          >
            Delivery times are estimates and may vary based on postal service
            performance.
          </p>
          <h4
            style={{
              fontFamily: "'PP Neue Montreal', sans-serif",
              fontSize: "3rem",
              fontWeight: 500,
              marginTop: "2rem",
              letterSpacing: "0px",
              lineHeight: "4.4rem",
            }}
          >
            Order Tracking
          </h4>
          <p
            style={{
              fontFamily: "'PP Neue Montreal', sans-serif",
              fontSize: "1.4rem",
              fontWeight: 400,
              lineHeight: "3rem",
              letterSpacing: "1px",
            }}
          >
            Once your order has been shipped, you will receive a confirmation
            email with a tracking number. Tracking may take up to 24 hours to
            become active.{" "}
          </p>
          <h4
            style={{
              fontFamily: "'PP Neue Montreal', sans-serif",
              fontSize: "3rem",
              fontWeight: 500,
              marginTop: "2rem",
              letterSpacing: "0px",
              lineHeight: "4.4rem",
            }}
          >
            Customs, Duties & Taxes
          </h4>
          <p
            style={{
              fontFamily: "'PP Neue Montreal', sans-serif",
              fontSize: "1.4rem",
              fontWeight: 400,
              lineHeight: "3rem",
              letterSpacing: "1px",
            }}
          >
            For international orders, customs duties, taxes, or other fees may
            apply. These charges are the buyer’s responsibility and are not
            included in our prices or shipping costs.
          </p>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "flex-start",
            marginLeft: "25%",
            width: "50%",
            flexDirection: "column",
            gap: "2rem",
            marginTop: "9rem",
          }}
        >
          <h3
            style={{
              fontFamily: "'PP Neue Montreal', sans-serif",
              fontSize: "4rem",
              fontWeight: 700,

              letterSpacing: "1px",
              lineHeight: "4.4rem",
            }}
          >
            Returns
          </h3>
          <p
            style={{
              fontFamily: "'PP Neue Montreal', sans-serif",
              fontSize: "1.4rem",
              fontWeight: 400,
              lineHeight: "3rem",
              letterSpacing: "1px",
            }}
          >
            We want you to be happy with your purchase. If something isn’t
            right, we’re here to help.
          </p>
          <h4
            style={{
              fontFamily: "'PP Neue Montreal', sans-serif",
              fontSize: "3rem",
              fontWeight: 500,
              marginTop: "2rem",
              letterSpacing: "0px",
              lineHeight: "4.4rem",
            }}
          >
            Return Window
          </h4>
          <p
            style={{
              fontFamily: "'PP Neue Montreal', sans-serif",
              fontSize: "1.4rem",
              fontWeight: 400,
              lineHeight: "3rem",
              letterSpacing: "1px",
            }}
          >
            You may return items within <b>30 days</b> of receiving your order.
            Products must be unused, in their original condition, and in
            original packaging.
          </p>
          <p
            style={{
              fontFamily: "'PP Neue Montreal', sans-serif",
              fontSize: "1.4rem",
              fontWeight: 400,
              lineHeight: "3rem",
              letterSpacing: "1px",
            }}
          >
            To request a return, please contact us at{" "}
            <b>ujjawalkr81@gmail.com</b> with your order number and reason for
            return.
          </p>
          <h4
            style={{
              fontFamily: "'PP Neue Montreal', sans-serif",
              fontSize: "3rem",
              fontWeight: 500,
              marginTop: "2rem",
              letterSpacing: "0px",
              lineHeight: "4.4rem",
            }}
          >
            Refunds
          </h4>
          <p
            style={{
              fontFamily: "'PP Neue Montreal', sans-serif",
              fontSize: "1.4rem",
              fontWeight: 400,
              lineHeight: "3rem",
              letterSpacing: "1px",
            }}
          >
            Once we receive and inspect your return, we will notify you of the
            approval or rejection. If approved, your refund will be processed to
            your original payment method.
          </p>
          <h4
            style={{
              fontFamily: "'PP Neue Montreal', sans-serif",
              fontSize: "3rem",
              fontWeight: 500,
              marginTop: "2rem",
              letterSpacing: "0px",
              lineHeight: "4.4rem",
            }}
          >
            Exchanges
          </h4>
          <p
            style={{
              fontFamily: "'PP Neue Montreal', sans-serif",
              fontSize: "1.4rem",
              fontWeight: 400,
              lineHeight: "3rem",
              letterSpacing: "1px",
            }}
          >
            We only replace items if they are defective or damaged. If you need
            to exchange an item, contact us at <b>ujjawalkr81@gmail.com</b>.
          </p>
          <h4
            style={{
              fontFamily: "'PP Neue Montreal', sans-serif",
              fontSize: "3rem",
              fontWeight: 500,
              marginTop: "2rem",
              letterSpacing: "0px",
              lineHeight: "4.4rem",
            }}
          >
            Return Shipping
          </h4>
          <p
            style={{
              fontFamily: "'PP Neue Montreal', sans-serif",
              fontSize: "1.4rem",
              fontWeight: 400,
              lineHeight: "3rem",
              letterSpacing: "1px",
            }}
          >
            Customers are responsible for return shipping costs unless the
            return is due to our error (e.g., incorrect or defective item).
          </p>
          <h4
            style={{
              fontFamily: "'PP Neue Montreal', sans-serif",
              fontSize: "3rem",
              fontWeight: 500,
              marginTop: "2rem",
              letterSpacing: "0px",
              lineHeight: "4.4rem",
            }}
          >
            Need Help?{" "}
          </h4>
          <p
            style={{
              fontFamily: "'PP Neue Montreal', sans-serif",
              fontSize: "1.4rem",
              fontWeight: 400,
              lineHeight: "3rem",
              letterSpacing: "1px",
            }}
          >
            If you have any questions about shipping or returns, please reach
            out to us at <b>ujjawalkr81@gmail.com</b>.
          </p>
          <p
            style={{
              fontFamily: "'PP Neue Montreal', sans-serif",
              fontSize: "1.4rem",
              fontWeight: 400,
              lineHeight: "3rem",
              letterSpacing: "1px",
            }}
          >
            <i>This document was last updated on 4 July, 2026.</i>
          </p>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default ShippingPage;
