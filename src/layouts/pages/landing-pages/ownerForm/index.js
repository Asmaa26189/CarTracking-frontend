import OwnerForm from "pages/LandingPages/OwnerForm";

export default function OwnerFormPage() {
  const handleFormSuccess = (data) => {
    console.log("Form submitted successfully:", data);
  };
  return <OwnerForm 
  onSubmitSuccess={handleFormSuccess} // Handle form submission success
  />;
}
