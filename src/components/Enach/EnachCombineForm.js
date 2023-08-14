import { useRef } from "react";
import EnachConvertForm from "./EnachConvertForm";
import EnachRegistration from "./EnachRegistration";

const EnachCombineForm = (props) => {
  const submitRef = useRef();
  const handleFormSubmit = () => {};
  return (
    <>
      <EnachRegistration onSubmitForm={handleFormSubmit} />
      <EnachConvertForm ref={(ref) => (submitRef = ref)} />
    </>
  );
};
export default EnachCombineForm;
