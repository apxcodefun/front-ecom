import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import customAPI from "./../api";
import { FaPlus } from "react-icons/fa";
import priceFormat from "./../utils/Price";
import { generateSelectAmount } from "../utils";
import { useDispatch } from "react-redux";
import { addItem } from "./../slice/cartSlice";

const DetailProduct = () => {
  let { id } = useParams();
  const [product, setProduct] = useState("");
  const [amount, setAmount] = useState(1);

  // Store
  const dispatch = useDispatch();

  const handleAmount = (e) => {
    setAmount(parseInt(e.target.value));
  };

  const productCart = {
    cartId: product._id + product.name,
    productId: product._id,
    image: product.image,
    name: product.name,
    price: product.price,
    stock: product.stock,
    amount,
  };

  const handleCart = () => {
    dispatch(addItem({ product: productCart }));
  };

  const productData = async () => {
    try {
      const { data } = await customAPI.get(`/product/${id}`);
      // Perbaiki path gambar jika path tidak memiliki base URL
      const modifiedProduct = {
        ...data.data,
        image: data.data.image.startsWith("http")
          ? data.data.image
          : `http://localhost:3011${data.data.image.replace("/images", "")}`,
      };
      setProduct(modifiedProduct);
      // console.log(modifiedProduct);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    productData();
  }, []);

  return (
    <section>
      <div className="card lg:card-side bg-base-300 shadow-xl">
        <figure>
          <div className="relative">
            <img
              src={product.image}
              alt={product.name || "Product"}
              className="w=[400px] h-[500px] object-cover"
            />{" "}
            {product.stock <= 0 && (
              <span className="absolute top-0 right-0 bg-error font-bold text-4xl">
                Sold Out
              </span>
            )}
          </div>
        </figure>
        <div className="card-body">
          <h2 className="card-title">{product.name}</h2>
          <span className="text-3xl text-accent font-bold mt-2">
            {priceFormat(product.price)}
          </span>
          <span className="badge badge-primary">{product.category}</span>
          <span className="mt-3 font-bold">Stok : {product.stock}</span>
          <p className="mt-3">{product.description}</p>
          <div className="card-actions justify-end">
            <div className="p-8 flex flex-col gap-y-4">
              {product.stock > 0 && (
                <>
                  <label className="form-control">
                    <label className="label">
                      <span className="capitalize label-text">Amount</span>
                    </label>
                    <select
                      name="amount"
                      className="select select-bordered"
                      onChange={handleAmount}
                    >
                      {generateSelectAmount(product.stock)}
                    </select>
                  </label>
                  <button
                    className="btn btn-primary btn-lg"
                    onClick={handleCart}
                  >
                    <FaPlus />
                    Keranjang
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DetailProduct;
