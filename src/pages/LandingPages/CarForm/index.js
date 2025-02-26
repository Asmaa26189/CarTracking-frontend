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

// Sections components
import BaseLayout from "layouts/sections/components/BaseLayout";
import View from "layouts/sections/components/View";

// Forms page components
import CarForm from "layouts/sections/input-areas/forms/components/CarForm";

// Forms page components code
import formSimpleCode from "layouts/sections/input-areas/forms/components/FormSimple/code";

function Forms() {
  const handleFormSuccess = (data) => {
    console.log("Form submitted successfully:", data);
  };
  return (
    <BaseLayout
      breadcrumb={[
        { label: "main", route: "/presention" },
        { label: "All Cars", route: "/cars" },
        { label: "Car" },
      ]}
    >
      <View code={formSimpleCode} >
        <CarForm
         onSubmitSuccess={handleFormSuccess} // Handle form submission success 
        />
      </View>
    </BaseLayout>
  );
}

export default Forms;
