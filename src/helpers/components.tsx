"use client"

import React, { useEffect } from "react";

//Component for your page
export const StripePricingTable = () => {

    useEffect(() => {
      const script = document.createElement("script");
      script.src = "https://js.stripe.com/v3/pricing-table.js";
      script.async = true;
      document.body.appendChild(script);
      
      return () => {
        document.body.removeChild(script);
      };
  
    }, []);
  
    return React.createElement("stripe-pricing-table", {
      "pricing-table-id": "prctbl_1NqNx2F20JF39MQTl3P4wUWJ",
      "publishable-key":
        "pk_test_51Nq39PF20JF39MQT4G6gtVhcNardeHvG535TdXnsW7g9vlKv2p9fN27nDegHx3kYpiYCLjOWKDcjJAdB2NwRn8Oz00S2Hg3Xqg",
    });
  
  };