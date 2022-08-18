import { Fragment } from "react";
import { useNavigate } from "react-router";
import { UseStore } from "../../../js/services/context/storeContext";

export const WithUser = (Component) => {
  return (props) => (
    <WithUserComponentWrap Component={Component} props={props} />
  );
};

const WithUserComponentWrap = ({ Component, props }) => {
  const { user } = UseStore();
  const navigate = useNavigate();
  if (!user) navigate("/user/login");
  return (
    <Fragment>
      <Component {...props} />
    </Fragment>
  );
};
export const WithoutUser = (Component) => {
  return (props) => (
    <WithoutUserComponentWrap Component={Component} props={props} />
  );
};

const WithoutUserComponentWrap = ({ Component, props }) => {
  const { user } = UseStore();
  const navigate = useNavigate();
  if (user) navigate("/");
  return (
    <Fragment>
      <Component {...props} />
    </Fragment>
  );
};
