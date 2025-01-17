import React from "react";
import { useLoaderData, useLocation, useNavigate } from "react-router-dom";

const Pagination = () => {
  const { pagination } = useLoaderData();
  const { page, totalPage } = pagination;
  const navigation = useNavigate();
  const { search, pathname } = useLocation();
  const handlePageChange = (number) => {
    // console.log(number);
    // console.log(search);
    // console.log(pathname);

    const searchParams = new URLSearchParams(search);
    searchParams.set("page", number);
    navigation(`${pathname}?${searchParams.toString()}`);
  };

  const pages = Array.from({ length: totalPage }, (_, index) => index + 1);
  return (
    <div className="join">
      {pages.map((pageNumber) => (
        <button
          key={pageNumber}
          onClick={() => handlePageChange(pageNumber)}
          className={`btn btn-sm border-none join-item ${
            pageNumber === page ? "bg-primary" : ""
          }`}
        >
          {pageNumber}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
