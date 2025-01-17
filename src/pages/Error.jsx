import { Link, useRouteError } from "react-router-dom";

const Error = () => {
  const error = useRouteError();
  if (error.status === 404) {
    return (
      <main className="grid min-h-[100vh] items-center px-8">
        <div className="text-center">
          <h1 className="text-9xl font-bold text-primary">404</h1>
          <p className="font-thin mt-6 leading-7">Not Found</p>
          <div className="mt-10">
            <Link to="/" className="btn btn-primary">
              Go Back to Home
            </Link>
          </div>
        </div>
      </main>
    );
  } else if (error.status === 500) {
    return (
      <main className="grid min-h-[100vh] items-center px-8">
        <div className="text-center">
          <h1 className="text-9xl font-bold text-primary">500</h1>
          <p className="font-thin mt-6 leading-7">Internal Server Error</p>
        </div>
      </main>
    );
  } else if (error.status === 403) {
    return (
      <main className="grid min-h-[100vh] items-center px-8">
        <div className="text-center">
          <h1 className="text-9xl font-bold text-primary">403</h1>
          <p className="font-thin mt-6 leading-7">Forbidden</p>
        </div>
      </main>
    );
  }
};

export default Error;
