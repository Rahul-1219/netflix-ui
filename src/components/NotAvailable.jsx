import React from "react";

const NotAvailable = ({ page }) => {
  return (
    <h1 className="not-available"> No {page} Available for selected genre</h1>
  );
};

export default NotAvailable;
