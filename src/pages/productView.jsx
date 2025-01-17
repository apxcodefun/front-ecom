import customAPI from "./../api";
import { useLoaderData, Link } from "react-router-dom";
import Filter from "./../components/Filter";
import CartProduct from "./../components/CartProduct";
import Pagination from "./../components/Pagination";
import { useSelector } from "react-redux";

export const loader = async ({ request }) => {
  const params = Object.fromEntries([
    ...new URL(request.url).searchParams.entries(),
  ]);
  const { data } = await customAPI.get("/product", { params: params });

  const products = data.data;
  const pagination = data.pagination;

  return { products, params, pagination };
};

const productView = () => {
  const { products, pagination } = useLoaderData();
  const user = useSelector((state) => state.userState.user);

  return (
    <>
      <Filter />
      {user && user.role === "admin" && (
        <div className="flex justify-end">
          <Link to="/products/create" className="btn btn-secondary">
            Add Product
          </Link>
        </div>
      )}
      <h3 className="text-lg text-primary font-bold text-right my-3">
        Total : {pagination.totalProduct} Product
      </h3>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-7 mt-5">
        {!products.length ? (
          <div className="flex justify-center text-5xl">No product found.</div>
        ) : (
          products.map((item) => (
            <CartProduct key={item._id} item={item} user={user} />
          ))
        )}
      </div>
      <div className="mt-5 flex justify-center">
        <Pagination />
      </div>
    </>
  );
};

export default productView;
