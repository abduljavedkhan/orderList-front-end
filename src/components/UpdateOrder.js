import React, { useState, useEffect, useContext } from "react";
import { useHistory, Link } from "react-router-dom";
import { AppContext } from "../Context/AppContext";

export const UpdateOrder = (route) => {
  const { orderListRes } = useContext(AppContext);

  let history = useHistory();

  const [selectedOrder, setSelectedOrder] = useState({
    order_id: null,
    product_id: "",
    quantity: "",
    orderDate: "",
    status: "",
  });

  const currentOrderId = route.match.params.id;
  useEffect(() => {
    const orderId = currentOrderId;
    const selectedOrder = orderListRes.find(
      (currentOrderTraversal) =>
        currentOrderTraversal.order_id === parseInt(orderId)
    );
    setSelectedOrder(selectedOrder);
  }, [currentOrderId, orderListRes]);

  const handleOnStatusChange = (userKey, newValue) =>
    setSelectedOrder({ ...selectedOrder, [userKey]: newValue });

  const handleOnQuantityChange = (userKey, newValue) =>
    setSelectedOrder({ ...selectedOrder, [userKey]: newValue });

  if (!selectedOrder || !selectedOrder.order_id) {
    return <div>Invalid Order ID.</div>;
  }

  const onSubmit = (e) => {
    e.preventDefault();
    const updateOrderAPI = async () => {
      try {
        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        let requestOptions = {
          method: "PATCH",
          headers: myHeaders,
          body: JSON.stringify({
            status: selectedOrder.status,
            quantity: selectedOrder.quantity,
          }),
          redirect: "follow",
        };
        const res = await fetch(
          `https://rest-api-orderlist.herokuapp.com/api/orders/` +
            selectedOrder.order_id,
          requestOptions
        );
        const dataR = await res.json();
        switch (res["status"]) {
          case 200:
            if (dataR) {
              history.push("/");
            }
            break;
          case 500:
            console.log("status ", dataR["status"]);
            console.log("message ", dataR["message"]);
            break;
          default:
            console.log("Order Update result default ", JSON.stringify(dataR));
        }
      } catch (e) {
        console.log("Order update method: error Catch message ", e.message);
      }
    };
    updateOrderAPI();
  };

  return (
    <>
      <div className="w-full max-w-sm container mt-20 mx-auto">
        <form onSubmit={onSubmit}>
          <div className="w-full  mb-5">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="status"
            >
              Status
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:text-gray-600 focus:shadow-outline"
              value={selectedOrder.status}
              onChange={(e) => handleOnStatusChange("status", e.target.value)}
              type="text"
              placeholder="Enter Status"
            />
          </div>
          <div className="w-full  mb-5">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="quantity"
            >
              Quantity
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:text-gray-600 focus:shadow-outline"
              value={selectedOrder.quantity}
              onChange={(e) =>
                handleOnQuantityChange("quantity", e.target.value)
              }
              type="number"
              placeholder="Enter Quantity"
            />
          </div>
          <div className="flex items-center justify-between">
            <button className="block mt-5 bg-green-400 w-full hover:bg-green-500 text-white font-bold py-2 px-4 rounded focus:text-gray-600 focus:shadow-outline">
              Update Order
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
