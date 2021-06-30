import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";

export const AddOrder = () => {
  let history = useHistory();

  const [customerId, setCustId] = useState("54321");
  const [productId, setProductId] = useState("");
  const [status, setStatus] = useState("");
  const [quantity, setQuantity] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    const addOrderAPI = async () => {
      try {
        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        let requestOptions = {
          method: "POST",
          headers: myHeaders,
          body: JSON.stringify({
            customer_id: customerId,
            status: status,
            quantity: quantity,
            product_id: productId,
          }),
          redirect: "follow",
        };
        const res = await fetch(
          `https://rest-api-orderlist.herokuapp.com/api/orders/add`,
          requestOptions
        );
        const dataR = await res.json();
        switch (res["status"]) {
          case 200:
            if (dataR) {
                alert("Success")
              console.log("Add Order Res ", JSON.stringify(dataR));
              history.push("/");
            }
            break;
          case 500:
            console.log("status ", dataR["status"]);
            console.log("message ", dataR["message"]);
            break;
          default:
            console.log("Add Order default ", JSON.stringify(dataR));
        }
      } catch (e) {
        console.log(" error Catch message ", e.message);
      }
    };
    addOrderAPI();
  };

  return (
    <>
      <div className="w-full max-w-sm container mt-20 mx-auto">
        <form onSubmit={onSubmit}>
          <div className="w-full mb-5">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="customerId"
            >
              Cust Id
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:text-gray-600"
              value={customerId}
              type="text"
             disabled="disabled"
              required
            />
          </div>
          <div className="w-full mb-5">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="status"
            >
              status
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:text-gray-600 focus:shadow-outline"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              type="text"
              placeholder="Enter status"
              required
            />
          </div>
          <div className="w-full mb-5">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="quantity"
            >
              quantity
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:text-gray-600 focus:shadow-outline"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              type="number"
              placeholder="Enter Quantity"
              required
            />
          </div>
          <div className="w-full mb-5">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="productId"
            >
              Product Id
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:text-gray-600"
              value={productId}
              onChange={(e) => setProductId(e.target.value)}
              type="text"
              placeholder="Enter ProductId"
              required
            />
          </div>
          <div className="flex items-center justify-between">
            <button className="mt-5 bg-green-400 w-full hover:bg-green-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
              Add Order
            </button>
          </div>
          <div className="text-center mt-4 text-gray-500">
            <Link to="/">Cancel</Link>
          </div>
        </form>
      </div>
    </>
  );
};
