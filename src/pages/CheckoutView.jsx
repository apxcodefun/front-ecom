import CartTotal from "./../components/CartTotal";
import FormInput from "../components/Form/FormInput";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import customAPI from "./../api";
import { toast } from "react-toastify";
import { clearCart } from "./../slice/cartSlice";
import { useNavigate, redirect } from "react-router-dom";

const insertSnapScript = () => {
  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = "https://app.sandbox.midtrans.com/snap/snap.js";
    script.setAttribute(
      "data-client-key",
      import.meta.env.VITE_CLIENT_MIDTRANS
    );

    script.onload = () => resolve();
    script.onerror = () => reject(new Error("Failed to load Snap script"));
    document.body.appendChild(script);
  });
};

export const loader = (storage) => () => {
  const user = storage.getState().userState.user;
  if (!user) {
    toast.warn("Please login first");
    return redirect("/login");
  }
  return null;
};

const CheckoutView = () => {
  const user = useSelector((state) => state.userState.user);
  const carts = useSelector((state) => state.cartState.CartItem);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const loadSnapScript = async () => {
      try {
        await insertSnapScript();
      } catch (error) {
        console.error(error.message);
      }
    };

    loadSnapScript();
  }, []);

  const handleCheckout = async (e) => {
    e.preventDefault();
    const form = e.target;
    const formdata = new FormData(form);

    const data = Object.fromEntries(formdata);

    const newArrayCart = carts.map((item) => {
      return {
        product: item.productId,
        // productId itu di store
        quantity: item.amount,
      };
    });

    try {
      const res = await customAPI.post("/order", {
        email: data.email,
        firstName: data.firstname,
        lastName: data.lastname,
        phone: data.phone,
        cartItem: newArrayCart,
      });

      const snapToken = res.data.token;

      window.snap.pay(snapToken.token, {
        // Optional
        onSuccess: function (result) {
          console.log(result);

          dispatch(clearCart());
          navigate("/orders");
        },
        // Optional
        onPending: function (result) {
          console.log(result);
          alert("pending");
        },
        // Optional
        onError: function (result) {
          console.log(result);
          alert("error");
        },
      });
      toast.success("Checkout Success");
    } catch (error) {
      const errorMessage = error?.response?.data?.message;
      toast.error(errorMessage);
    }

    // Integrasi dengan Midtrans Snap di sini jika diperlukan
  };

  return (
    <>
      <div className="border-b border-primary pb-5 mt-5">
        <h2 className="text-xl font-bold capitalize">Checkout Product</h2>
      </div>
      <div className="mt-8 grid gap-y-8 gap-x-2 lg:grid-cols-12 ">
        {/* Form */}
        <div className="lg:col-span-8">
          <form
            method="POST"
            className="bg-base-300 rounded-md grid grid-y-5 p-5 items-center"
            onSubmit={handleCheckout}
          >
            <div className="grid grid-cols-2 gap-x-4">
              <FormInput label="First Name" type="name" name="firstname" />
              <FormInput label="Last Name" type="name" name="lastname" />
            </div>
            <FormInput
              label="Email"
              type="email"
              name="email"
              defaultValue={user?.email || ""}
            />
            <FormInput label="Phone Number" type="name" name="phone" />
            <button type="submit" className="btn btn-primary mt-5">
              Pay
            </button>
          </form>
        </div>
        {/* Cart */}
        <div className="lg:col-span-4 lg:pl-4">
          <CartTotal />
        </div>
      </div>
    </>
  );
};

export default CheckoutView;
