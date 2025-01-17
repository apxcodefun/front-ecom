import FormAuth from "./../../components/FormAuth";
import { toast } from "react-toastify";
import customAPI from "./../../api";
import { registerUser } from "./../../slice/userSlice";
import { redirect } from "react-router-dom";

export const action =
  (store) =>
  async ({ request }) => {
    const formInputData = await request.formData();
    const data = Object.fromEntries(formInputData);

    try {
      const res = await customAPI.post("/auth/register", data);
      store.dispatch(registerUser(res.data));
      toast.success("Registration successful!");
      return redirect("/login");
    } catch (error) {
      const errorMessage = error?.response?.data?.message;
      toast.error(errorMessage);
      return null;
    }
  };

const registerView = () => {
  return (
    <main className="bg-gradient-to-r from-violet-500 to-fuchsia-500">
      <FormAuth isRegister={true} />
    </main>
  );
};

export default registerView;
