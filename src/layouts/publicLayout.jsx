import { Outlet, useNavigation } from "react-router-dom";
import Header from "./../components/header";
import Nav from "./../components/nav";
import Footer from "./../components/footer";
import Loading from "./../components/loading";

const publicLayout = () => {
  const navigation = useNavigation();
  const isPageLoading = navigation.state == "loading";
  return (
    <>
      <Header />
      <Nav />
      {isPageLoading ? (
        <Loading />
      ) : (
        <main className="mx-auto max-w-6xl px-8 py-20 min-h-[80vh]">
          <Outlet />
        </main>
      )}
      <Footer />
    </>
  );
};

export default publicLayout;
