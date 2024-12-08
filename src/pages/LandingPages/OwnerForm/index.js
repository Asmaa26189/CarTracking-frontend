import BaseLayout from "layouts/sections/components/BaseLayout";
import View from "layouts/sections/components/View";
import OwnerForm from "layouts/sections/input-areas/forms/components/OwnerForm";
import formSimpleCode from "layouts/sections/input-areas/forms/components/FormSimple/code";

function Forms() {
  const handleFormSuccess = (data) => {
    console.log("Form submitted successfully:", data);
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
        onSubmitSuccess={handleFormSuccess} // Handle form submission success
        />
      </View>
    </BaseLayout>
  );
}

export default Forms;
