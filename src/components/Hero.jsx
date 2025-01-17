import React from "react";
import { useLoaderData } from "react-router-dom";
import { Link } from "react-router-dom";

const Hero = () => {
  const { products } = useLoaderData();

  return (
    <>
      <div className="grid lg:grid-cols-2 gap-24 items-center">
        <div>
          <h1 className="max-w-2xl text-4xl font-bold tracking-tight sm:text-6xl">
            Welcome To Our Shop
          </h1>
          <p className="mt-8 max-w-xl text-lg leading-8">
            Discover our wide range of products, all at your fingertips. From
            handcrafted crafts to unique gifts, we have it all. Start exploring
            now!{" "}
            <span role="img" aria-label="Smiling face with sunglasses">
              😎
            </span>{" "}
            Enjoy your shopping!
          </p>
          <div className="mt-10">
            <Link to="/products" className="btn btn-primary">
              Our Product
            </Link>
          </div>
        </div>
        {/* Slider */}
        <div className="hidden lg:carousel carousel-center bg-neutral rounded-box space-x-4 p-4 scroll-snap">
          {products.map((item, index) => (
            <div className="carousel-item scroll-snap-start" key={index}>
              <img
                src={`http://localhost:3011${item.image.replace(
                  "/images",
                  ""
                )}`}
                alt={item.name}
                className="w-40 h-40 object-cover rounded-md"
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Hero;
