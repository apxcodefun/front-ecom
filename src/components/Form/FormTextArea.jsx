import React from "react";

const FormTextArea = ({ label, name, defaultValue }) => {
  return (
    <label className="form-control">
      <span className="label-text capitalize">{label}</span>
      <textarea
        className="textarea textarea-success h-36"
        name={name}
        defaultValue={defaultValue}
      ></textarea>
    </label>
  );
};

export default FormTextArea;
