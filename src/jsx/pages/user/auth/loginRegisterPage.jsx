import { useEffect } from "react";
import LogingForm from "./loginForm";
import RegisterForm from "./registerForm";
import { LoginRegisterStyled } from "./style";
import { WithoutUser, WithUser } from "../widthUser";

const LoginRegisterPage = () => {
  // title
  useEffect(() => {
    document.title = "Login page - BestShop.com";
  }, []);
  return (
    <LoginRegisterStyled className="login-register-wrap">
      <LogingForm />
      <RegisterForm />
    </LoginRegisterStyled>
  );
};

export default WithoutUser(LoginRegisterPage);
