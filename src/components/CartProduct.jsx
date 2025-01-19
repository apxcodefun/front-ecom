import React from "react";
import { Link, useRevalidator } from "react-router-dom";
import priceFormat from "./../utils/Price";
import { FaTrash, FaPencilAlt } from "react-icons/fa";
import { toast } from "react-toastify";
import customAPI from "./../api";

const CartProduct = ({ item, user }) => {
  // Menggabungkan base URL dengan path gambar
  const imageUrl = item.image.startsWith("http")
    ? item.image
    : `http://localhost:3011${item.image.replace("/images", "")}`;
  const { revalidate } = useRevalidator();
  console.log(imageUrl);

  return (
    <>
      <div className="card bg-base-100 shadow-xl" key={item._id}>
        <figure className="px-10 pt-10">
          <div className="relative">
            <img src={imageUrl} alt={item.name} className="rounded-xl" />
            {item.stock <= 0 && (
              <span className="absolute top-0 right-0 bg-error font-bold text-2xl">
                Sold Out
              </span>
            )}
          </div>
        </figure>
        <div className="card-body">
          {user && user.role === "admin" && (
            <div className="flex justify-end gap-x-3">
              <FaTrash
                className="text-rend-500 cursor-pointer"
                onClick={async () => {
                  await customAPI.delete(`/product/${item._id}`);
                  toast.info("Product deleted successfully");
                  revalidate();
                }}
              />
              <Link to={`/products/${item._id}/edit`}>
                <FaPencilAlt />
              </Link>
            </div>
          )}
          <h2 className="card-title text-primary">{item.name}</h2>
          <p className="font-bold text-accent">{priceFormat(item.price)}</p>
          <p>{item.description.substring(0, 50)}</p>
          <div className="card-actions">
            <Link to={`/product/${item._id}`} className="btn btn-primary">
              Buy Now
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartProduct;
