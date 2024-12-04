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
//src/pages/LandingPages/OwnerForm/index.js
// Sections components
import BaseLayout from "layouts/sections/components/BaseLayout";
import View from "layouts/sections/components/View";
import { useState } from "react";
// Forms page components
import OwnerForm from "layouts/sections/input-areas/forms/components/OwnerForm";

// Forms page components code
import formSimpleCode from "layouts/sections/input-areas/forms/components/FormSimple/code";

function Forms() {
  const [ownerToEdit, setOwnerToEdit] = useState(null);

  const handleFormSuccess = (data) => {
    console.log("Form submitted successfully:", data);
    setOwnerToEdit(null); // Clear the editing state after success
  };
  return (
    <BaseLayout
      breadcrumb={[
        { label: "main", route: "/presention" },
        { label: "All Owners", route: "/owners" },
        { label: "Owner" },
      ]}
    >
      <View code={formSimpleCode} >
        <OwnerForm
        existingOwner={ownerToEdit} // Pass an object to edit; leave null for new
        onSubmitSuccess={handleFormSuccess} // Handle form submission success
        />
      </View>
    </BaseLayout>
  );
}

export default Forms;
