import FormAuth from "./../../components/FormAuth";
import customAPI from "./../../api";
import { toast } from "react-toastify";
import { redirect } from "react-router-dom";
import { loginUser } from "../../slice/userSlice";

export const action =
  (store) =>
  async ({ request }) => {
    const formInputData = await request.formData();
    const data = Object.fromEntries(formInputData);

    try {
      const res = await customAPI.post("/auth/login", data);
      store.dispatch(loginUser(res.data));
      toast.success("Loggin is Successful");
      return redirect("/");
    } catch (error) {
      const errorMessage = error?.response?.data?.message;
      toast.error(errorMessage);
    }

    return null;
  };

const loginView = () => {
  return (
    <main className="bg-gradient-to-r from-violet-500 to-fuchsia-500">
      <FormAuth />
    </main>
  );
};

export default loginView;
