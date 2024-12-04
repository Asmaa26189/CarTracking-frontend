/*
=========================================================
* NUBA AUTO - v2.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-kit-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/
//src\layouts\pages\landing-pages\ownerForm.js
// NUBA AUTO pages
import OwnerForm from "pages/LandingPages/OwnerForm";
import { useState } from "react";

export default function OwnerFormPage() {
  const [ownerToEdit, setOwnerToEdit] = useState(null);

  const handleFormSuccess = (data) => {
    console.log("Form submitted successfully:", data);
    setOwnerToEdit(null); // Clear the editing state after success
  };
  return <OwnerForm 
  existingOwner={ownerToEdit} // Pass an object to edit; leave null for new
  onSubmitSuccess={handleFormSuccess} // Handle form submission success
  />;
}
