import * as USER from "../../../../js/services/authService";
import { useState } from "react";
import { loginSchema } from "../schemas";
import Joi from "joi";
import {
  FormTextInput,
  FormSubmitButton,
  Form,
  FormEmailInput,
  FormPasswordInput,
} from "../../../components/form";
import { ButtonOrangeBg } from "../../../components/buttons";
import { LoginFormStyled } from "./style";

const LogingForm = () => {
  const demoEmail = "demo@demo.com";
  const demoPassword = "demodemo";
  const [globalMessage, setGlobalMessage] = useState("");
  const onError = (errors) => {};
  const handleFormSubmit = (inputs) => {
    USER.authenticatUser({
      email: inputs["email_login"],
      password: inputs["password_login"],
    })
      .then(() => {
        window.location.replace("/");
      })
      .catch((message) => {
        console.log(message);
        setGlobalMessage(message);
      });
  };
  const handleFormSubmitDemo = (inputs) => {
    USER.authenticatUser({
      email: demoEmail,
      password: demoPassword,
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
      <h1>Login</h1>
      <Form onSubmit={handleFormSubmit} schema={loginSchema} onError={onError}>
        <FormEmailInput id="email_login" text="email" />
        <FormPasswordInput id="password_login" text="password" />
        <FormSubmitButton id="submit-button_login">Login</FormSubmitButton>
      </Form>
      <ButtonOrangeBg
        onClick={handleFormSubmitDemo}
        style={{ backgroundColor: "#0077ff", marginTop: "1em" }}
      >
        Demo Account
      </ButtonOrangeBg>

      {globalMessage && (
        <span className="panel-error-message">
          <span>{globalMessage}</span>
        </span>
      )}
    </div>
  );
};

export default LogingForm;
