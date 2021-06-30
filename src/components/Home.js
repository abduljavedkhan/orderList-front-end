import React from "react";
import { Header } from "./Header";
import { OrderList } from "./OrderList";

export const Home = () => {
  return (
    <>
      <div className="container mx-auto">
        <h3 className="text-center text-3xl mt-20 text-base leading-8 text-black font-bold tracking-wide uppercase">
          Order List with Products
        </h3>
        <Header />
        <OrderList />
      </div>
    </>
  );
}