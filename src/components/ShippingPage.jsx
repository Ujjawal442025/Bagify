import React from "react";
import Footer from "./Footer";

const ShippingPage = () => {
  return (
    <>
      <div className="shippingreturn">
        <div className="shipping">
          <div className="shipping-header">
            <h2>Shipping & Return Policy</h2>
          </div>

          <h3>Shipping</h3>
          <h4>Processing Time</h4>
          <p>
            All orders are processed within 1–2 business days. Orders are not
            shipped on weekends or public holidays in Uruguay.
          </p>
          <p>
            During high-volume periods, shipments may be delayed slightly. Thank
            you for your patience.
          </p>
          <h4>Shipping Rates & Delivery Estimates</h4>
          <p>
            Shipping costs are calculated at checkout based on your location.
          </p>
          <h4>Estimated delivery times:</h4>
          <p className="bold">
            <b> Within Uruguay:</b> 2–5 business days
          </p>
          <p className="bold">
            <b>International:</b> 7–21 business days (varies by destination and
            customs processing)
          </p>
          <p>
            Delivery times are estimates and may vary based on postal service
            performance.
          </p>
          <h4>Order Tracking</h4>
          <p>
            Once your order has been shipped, you will receive a confirmation
            email with a tracking number. Tracking may take up to 24 hours to
            become active.{" "}
          </p>
          <h4>Customs, Duties & Taxes</h4>
          <p>
            For international orders, customs duties, taxes, or other fees may
            apply. These charges are the buyer’s responsibility and are not
            included in our prices or shipping costs.
          </p>
        </div>
        <div className="return">
          <h3>Returns</h3>
          <p>
            We want you to be happy with your purchase. If something isn’t
            right, we’re here to help.
          </p>
          <h4>Return Window</h4>
          <p>
            You may return items within <b>30 days</b> of receiving your order.
            Products must be unused, in their original condition, and in
            original packaging.
          </p>
          <p>
            To request a return, please contact us at{" "}
            <b>ujjawalkr81@gmail.com</b> with your order number and reason for
            return.
          </p>
          <h4>Refunds</h4>
          <p>
            Once we receive and inspect your return, we will notify you of the
            approval or rejection. If approved, your refund will be processed to
            your original payment method.
          </p>
          <h4>Exchanges</h4>
          <p>
            We only replace items if they are defective or damaged. If you need
            to exchange an item, contact us at <b>ujjawalkr81@gmail.com</b>.
          </p>
          <h4>Return Shipping</h4>
          <p>
            Customers are responsible for return shipping costs unless the
            return is due to our error (e.g., incorrect or defective item).
          </p>
          <h4>Need Help? </h4>
          <p>
            If you have any questions about shipping or returns, please reach
            out to us at <b>ujjawalkr81@gmail.com</b>.
          </p>
          <p>
            <i>This document was last updated on 4 July, 2026.</i>
          </p>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default ShippingPage;
