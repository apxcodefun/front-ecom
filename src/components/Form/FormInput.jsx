import React from "react";

const FormInput = ({ label, name, type, defaultValue }) => {
  return (
    <label className="form-control">
      <span className="label-text capitalize">{label}</span>
      <input
        type={type}
        name={name}
        defaultValue={defaultValue}
        className="input input-bordered"
      />
    </label>
  );
};

export default FormInput;
