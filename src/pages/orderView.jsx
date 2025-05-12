import { toast } from "react-toastify";
import { redirect, useLoaderData } from "react-router-dom";
import priceFormat from "./../utils/Price";
import customAPI from "./../api";

export const loader = (storage) => async () => {
  const user = storage.getState().userState.user;
  if (!user) {
    toast.warn("Please login first");
    return redirect("/login");
  }

  let orders;
  if (user.role !== "admin") {
    const { data } = await customAPI.get("/order/current/user");
    orders = data.data;
  } else {
    const { data } = await customAPI.get("/order");
    orders = data.data;
  }

  return { orders };
};

const orderView = () => {
  // ambil nilai Loader
  const { orders } = useLoaderData();
  if (!orders.length) {
    return (
      <h1 className="text-center text-primary font-bold text-3xl border-b border-secondary py-3">
        You don't have product order
      </h1>
    );
  }
  return (
    <div className="overflow-x-auto">
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            <th>No</th>
            <th>User</th>
            <th>Product</th>
            <th>Total</th>
            <th>Pay Status</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {orders.map((item, index) => (
            <tr key={index}>
              <th>{index + 1}</th>
              <td>
                <div className="flex items-center gap-3">
                  <div className="avatar">
                    <div className="mask mask-squircle h-12 w-12">
                      <img
                        src="https://img.daisyui.com/images/profile/demo/2@94.webp"
                        alt="Avatar Tailwind CSS Component"
                      />
                    </div>
                  </div>
                  <div>
                    <div className="font-bold">
                      {item.firstName} {item.lastName}
                    </div>
                  </div>
                </div>
              </td>
              <td>
                <ul className="list-disc">
                  {item.itemDetails.map((product) => (
                    <li key={product.product}>
                      {product.name}
                      <br />
                      <span className="font-bold">
                        Jumlah {product.quantity} product
                      </span>
                      <br />
                      {priceFormat(product.price)}
                    </li>
                  ))}
                </ul>
                <br />
              </td>
              <td>{priceFormat(item.total)}</td>
              <th>
                {item.status === "success" ? (
                  <div className="badge badge-success">{item.status}</div>
                ) : item.status === "pending" ? (
                  <div className="badge badge-warning">{item.status}</div>
                ) : (
                  <div className="badge badge-default">{item.status}</div> // Fallback untuk status lainnya
                )}
              </th>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default orderView;
