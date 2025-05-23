import CartProduct from "../components/CartProduct";
import customAPI from "./../api";
import { useLoaderData } from "react-router-dom";
import Hero from "../components/Hero";

export const loader = async ({ request }) => {
  const { data } = await customAPI.get("/product?limit=3");
  const products = data.data;
  return { products };
};

const HomeView = () => {
  const { products } = useLoaderData();
  return (
    <>
      {/* Slider */}
      <div>
        <Hero />
      </div>
      <div className="border-b border-primary pb-5 mt-5">
        <h2 className="text-2xl font-bold capitalize">Daftar Produk</h2>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-7 mt-5">
        {products.map((item) => (
          <CartProduct key={item._id} item={item} />
        ))}
      </div>
    </>
  );
};

export default HomeView;
