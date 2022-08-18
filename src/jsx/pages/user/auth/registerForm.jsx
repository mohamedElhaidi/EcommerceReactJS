import * as USER from "../../../../js/services/authService";
import { useState } from "react";
import { loginSchema, registerSchema } from "../schemas";
import {
  FormTextInput,
  FormSubmitButton,
  Form,
  FormEmailInput,
  FormPasswordInput,
} from "../../../components/form";
const RegisterForm = () => {
  const [globalMessage, setGlobalMessage] = useState("");

  const onError = (errors) => {};
  const handleFormSubmit = (inputs) => {
    console.log(inputs);
    USER.registerUser({
      name: inputs["name_register"],
      email: inputs["email_register"],
      password: inputs["password_register"],
    })
      .then(() => {
        window.location.replace("/");
      })
      .catch((message) => {
        console.log(message);
        setGlobalMessage(message);
      });
  };
  return (
    <div className="login-panel panel rounded-small under-shadow">
      <h1>Registe</h1>
      <Form
        onSubmit={handleFormSubmit}
        schema={registerSchema}
        onError={onError}
      >
        <FormTextInput id="name_register" text="name" />
        <FormEmailInput id="email_register" text="email" />
        <FormPasswordInput id="password_register" text="password" />
        <FormPasswordInput id="repassword_register" text="retype password" />

        <FormSubmitButton id="submit-button_register">
          Register
        </FormSubmitButton>
      </Form>

      {globalMessage && (
        <span className="panel-error-message">
          <span>{globalMessage}</span>
        </span>
      )}
    </div>
  );
};

export default RegisterForm;
