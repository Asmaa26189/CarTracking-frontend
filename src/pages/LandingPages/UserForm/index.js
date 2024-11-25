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
import UserForm from "layouts/sections/input-areas/forms/components/UserForm";

// Forms page components code
import formSimpleCode from "layouts/sections/input-areas/forms/components/FormSimple/code";

function Forms() {
  return (
    <BaseLayout
      breadcrumb={[
        { label: "main", route: "/presention" },
        { label: "All Users", route: "/users" },
        { label: "User" },
      ]}
    >
      <View code={formSimpleCode} >
        <UserForm />
      </View>
    </BaseLayout>
  );
}

export default Forms;
