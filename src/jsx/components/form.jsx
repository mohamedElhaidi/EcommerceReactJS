import React, { useEffect, useState } from "react";
import Joi from "joi";
import "../../css/form.css";
import { ButtonOrangeBg } from "./buttons";

export const Form = ({
  id,
  onSubmit,
  onError,
  children = [],
  schema = null,
}) => {
  const [inputChildrenElements, setInputChildrenElements] = useState([]);

  const [inputs, setInputs] = useState({});
  const [errors, setErrors] = useState({});
  const setInputsMiddleware = (any) => {
    setInputs(any);
    // console.log(any);
  };
  useEffect(() => {
    setInputChildrenElements(
      React.Children.map(children, (child) => {
        const id = child.props.id;
        if (!id) {
          console.error("Element Form child doesn't have an ID", child);
          return;
        }
        let onChange = handleValueChange;
        let onClick = null;

        if (child.type === FormCheckboxInput) {
          onChange = handleCheckedChange;
        }
        if (child.type === FormSubmitButton) {
          onClick = handleSubmit;
        }
        return React.cloneElement(child, {
          ...child.props,
          onClick,
          onChange,
          value: inputs[id],
          error: errors[id],
        });
      })
    );
  }, [children, inputs, errors]);

  //reading every child and mapping thier keys to values in Input state
  // happens once after first render
  useEffect(() => {
    if (!inputChildrenElements) return;
    if (Object.keys(inputs).length) return;

    let inputInitialValues = {};
    const childrenArray = React.Children.toArray(inputChildrenElements).filter(
      (child) => child.type !== FormSubmitButton
    );

    inputInitialValues = childrenArray.reduce((prev, child) => {
      const id = child.props.id;
      if (id in inputs) return;
      const temp = { ...prev };

      //set initial val
      if (child.props.initialValue) temp[id] = child.props.initialValue;
      else temp[id] = child.type === FormCheckboxInput ? false : "";
      return temp;
    }, {});

    // console.log(inputInitialValues);
    setInputs(inputInitialValues);
  }, [inputChildrenElements]);

  const validateForm = () => {
    if (!schema) return true;
    //get inputs keys
    const keys = {};

    //make new object with key input name and values
    for (const key in inputs) {
      keys[key] = inputs[key];
    }

    //validation
    try {
      const validationResault = schema.validate(keys, { abortEarly: false });
      console.log(validationResault);
      //if we have errors
      if (validationResault.error) {
        const fetchErrors = validationResault.error.details.reduce(
          (prev, currentError) => {
            // add name of inpuut to each one
            const newErrors = { ...prev };

            newErrors[currentError.path[0]] = currentError.message;
            return newErrors;
          },
          {}
        );
        setErrors(fetchErrors);
        if (onError) onError(fetchErrors);
        // console.log(fetchErrors);
        return false;
      }
      //if we dont have errors
      else {
        //clear errors from view
        setErrors({});
        //finish
        return true;
      }
    } catch (err) {
      console.warn("something went wrong during form validation");
      console.error(err);
      return false;
    }
  };

  //handle text ,email ,password
  const handleValueChange = (event) => {
    const id = event.target.id;
    const value = event.currentTarget.value;
    const newInputs = { ...inputs };
    newInputs[id] = value;
    setInputsMiddleware({ ...newInputs });
  };

  //handle checkbox
  const handleCheckedChange = (event) => {
    const checked = event.target.checked;
    const id = event.target.id;
    const newInputs = { ...inputs };
    newInputs[id] = checked;
    setInputsMiddleware({ ...newInputs });
  };

  //handle form submit
  const handleSubmit = (event) => {
    event.preventDefault();
    if (!validateForm()) {
      return;
    }
    onSubmit(inputs);
  };

  return (
    <form id={id} onSubmit={handleSubmit}>
      {inputChildrenElements}
    </form>
  );
};

export const FormTextInput = ({ id, value = "", text, onChange, error }) => {
  // const error = errors.find((e) => e.name === id);
  const errorFieldStyle = {
    backgroundColor: "red",
    color: "white",
    padding: "0.2em",
  };
  return (
    <div className=" input-group">
      <label>{text}</label>
      <input
        placeholder={text}
        type="text"
        id={id}
        value={value}
        onChange={(e) => onChange(e)}
      />
      {error && <div style={errorFieldStyle}>{error}</div>}
    </div>
  );
};
export const FormEmailInput = ({
  id,

  value = "",
  text,
  onChange,
  error,
}) => {
  // const error = errors.find((e) => e.name === id);
  const errorFieldStyle = {
    backgroundColor: "red",
    color: "white",
    padding: "0.2em",
  };
  return (
    <div className=" input-group">
      <label>{text}</label>
      <input
        placeholder={text}
        type="email"
        id={id}
        value={value}
        onChange={(e) => onChange(e)}
      />
      {error && <div style={errorFieldStyle}>{error}</div>}
    </div>
  );
};
export const FormPasswordInput = ({
  id,

  value = "",
  text,
  onChange,
  error,
}) => {
  // const error = errors.find((e) => e.name === id);
  const errorFieldStyle = {
    backgroundColor: "red",
    color: "white",
    padding: "0.2em",
  };
  return (
    <div className=" input-group">
      <label>{text}</label>
      <input
        placeholder={text}
        type="password"
        id={id}
        value={value}
        onChange={(e) => onChange(e)}
      />
      {error && <div style={errorFieldStyle}>{error}</div>}
    </div>
  );
};
export const FormCheckboxInput = ({
  id,
  value = true,
  text,
  onChange,
  error,
}) => {
  // const error = errors.find((e) => e.name === id);
  const errorFieldStyle = {
    backgroundColor: "red",
    color: "white",
    padding: "0.2em",
  };

  //fix for the weird types converting happening
  if (typeof value === String) {
    value = "false" ? false : true;
  }
  return (
    <div className="input-group input-checkbox-group">
      <label className="boxContainer">
        <div>{text}</div>
        <input
          placeholder={text}
          type="checkbox"
          id={id}
          value={id}
          checked={value}
          onChange={(e) => onChange(e)}
        />
        <span className="checkBoxCheckmark checkmark"></span>
      </label>
      {error && <div style={errorFieldStyle}>{error}</div>}
    </div>
  );
};
export const FormRadioboxInput = ({
  id,
  value = true,
  text,
  onChange,
  error,
}) => {
  // const error = errors.find((e) => e.name === id);
  const errorFieldStyle = {
    backgroundColor: "red",
    color: "white",
    padding: "0.2em",
  };

  //fix for the weird types converting happening
  if (typeof value === String) {
    value = "false" ? false : true;
  }
  return (
    <div className="input-group input-checkbox-group">
      <label className="boxContainer">
        <div>{text}</div>
        <input
          placeholder={text}
          type="radio"
          id={id}
          value={id}
          checked={value}
          onChange={(e) => onChange(e)}
        />
        <span className="radioCheckmark"></span>
      </label>
      {error && <div style={errorFieldStyle}>{error}</div>}
    </div>
  );
};

///implement next for radioboxes
// const FormFieldSet = () => {
//   return ( <fieldset>

//   </fieldset> );
// }

export const FormSubmitButton = ({
  id = "submit-button",
  children,
  onClick,
}) => {
  return (
    <ButtonOrangeBg
      id={id}
      className="orange-button"
      type="submit"
      onClick={onClick}
    >
      {children}
    </ButtonOrangeBg>
  );
};
