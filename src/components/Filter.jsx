import React from "react";
import { Form, Link } from "react-router-dom";
import FormInput from "./Form/FormInput";
import FormSelect from "./Form/FormSelect";
import { useLoaderData } from "react-router-dom";
import { Categories } from "./../utils/Categories";

const Filter = () => {
  const { params } = useLoaderData();
  const { name, category } = params;
  const categories = Categories;

  return (
    <Form
      method="get"
      className="bg-base-20 rounded-lg px-8 py-4 grid gap-x-4 gap-y-3 grid-cols-2 items-center"
    >
      <FormInput
        type="text"
        label="Search"
        name="name"
        placeholder="Search products"
        defaultValue={name}
      />
      <FormSelect
        label="Select Category"
        name="category"
        list={categories}
        defaultValue={category || "All"} // Jika category tidak ada, default ke 'All'
      />
      <button className="btn btn-primary" type="submit">
        Search Product
      </button>
      <Link className="btn btn-accent" to="/products">
        Clear
      </Link>
    </Form>
  );
};

export default Filter;
