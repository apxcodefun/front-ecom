import { createBrowserRouter, RouterProvider } from "react-router-dom";

// Import Components
import AboutView from "./pages/aboutView";
import HomeView from "./pages/homeView";
import CartView from "./pages/cartView";
import OrderView from "./pages/orderView";
import ProductView from "./pages/productView";
import LoginView from "./pages/auth/loginView";
import RegisterView from "./pages/auth/registerView";
import PublicLayout from "./layouts/publicLayout";
import DetailProduct from "./pages/DetailProduct";
import CheckoutView from "./pages/CheckoutView";
import Error from "./pages/Error";
import CreateProduct from "./pages/CreateProduct";
import EditProduct from "./pages/EditProduct";
// Loader
import { loader as HomeLoader } from "./pages/homeView";
import { loader as ProductLoader } from "./pages/productView";
import { loader as CheckoutLoader } from "./pages/CheckoutView";
import { loader as OrderLoader } from "./pages/orderView";
import { loader as CreateProductLoader } from "./pages/CreateProduct";
import { loader as EditProductLoader } from "./pages/EditProduct";

// Action
import { action as loginAction } from "./pages/auth/loginView"; // Add action here if needed
import { action as registerAction } from "./pages/auth/registerView"; // Add action here if needed

// Storage
import { store } from "./store";
const router = createBrowserRouter([
  {
    path: "/",
    element: <PublicLayout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <HomeView />,
        loader: HomeLoader, // Add loader here if needed
      },
      {
        path: "products",
        element: <ProductView />,
        loader: ProductLoader, // Add loader here if needed
      },
      {
        path: "products/create",
        element: <CreateProduct />,
        loader: CreateProductLoader(store), // Add loader here if needed
      },
      {
        path: "products/:id/edit",
        element: <EditProduct />,
        loader: EditProductLoader(store), // Add loader here if needed
      },
      {
        path: "product/:id",
        element: <DetailProduct />,
      },
      {
        path: "/orders",
        element: <OrderView />,
        loader: OrderLoader(store), // Add loader here if needed
      },
      {
        path: "checkout",
        element: <CheckoutView />,
        loader: CheckoutLoader(store), // Add loader here if needed
      },
      {
        path: "cart",
        element: <CartView />,
      },
      {
        path: "about",
        element: <AboutView />,
      },
    ],
  },
  {
    path: "/login",
    element: <LoginView />,
    action: loginAction(store),
  },
  {
    path: "/register",
    element: <RegisterView />,
    action: registerAction(store), // Add action here if needed
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
