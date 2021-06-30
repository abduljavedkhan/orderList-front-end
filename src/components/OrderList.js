import {  useContext } from "react";

import { Link } from "react-router-dom";
import { AppContext } from "../Context/AppContext";

export const OrderList = () => {

  const {orderListRes, setOrderListRes } = useContext(AppContext)

  const OrderListAPI = async () => {
    try {
      let myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      let requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
      };
      const res = await fetch(`https://rest-api-orderlist.herokuapp.com/api/orders`, requestOptions);
      const dataR = await res.json();
      switch (res["status"]) {
        case 200:
          if (dataR) {
            console.log("Order List Res ", JSON.stringify(dataR));
            setOrderListRes(dataR);
          }
          break;
        case 500:
          console.log("status ", dataR["status"]);
          console.log("message ", dataR["message"]);
          break;
        default:
          console.log("Order List result default ", JSON.stringify(dataR));
      }
    } catch (e) {
      console.log("Order List method: error Catch message ", e.message);
    }
  };

  return (
    <>
      <button
        onClick={OrderListAPI}
        className="block bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-full inline-flex items-center"
        title="Show Data"
        type="submit"
      >
        Show Data
      </button>
      {orderListRes && orderListRes.length > 0 ? (
        <>
          {orderListRes.map((order) => (
            <div
              className="flex items-center bg-gray-100 mb-10 shadow"
              key={order.order_id}
            >
              <div className="flex-auto text-left px-4 py-2 m-2">
                <p className="text-gray-900 leading-none">
                  <label>
                    <strong>Order Id:</strong>
                  </label>{" "}
                  {order.order_id}
                </p>
                <p className="text-gray-600">
                  <label>
                    <strong>Product Id:</strong>
                  </label>{" "}
                  {order.product_id}
                </p>
                <span className="inline-block text-sm font-semibold mt-1">
                  <label>
                    <strong>Order Date:</strong>
                  </label>{" "}
                  {order.created_on}
                </span>
                <p className="text-gray-600">
                  <label>
                    <strong>Quantity:</strong>
                  </label>{" "}
                  {order.quantity}
                </p>
                <p className="text-gray-900 leading-none">
                  <label>
                    <strong>Status:</strong>
                  </label>{" "}
                  {order.status}
                </p>
              </div>
              <div className="flex-auto text-right px-4 py-2 m-2">
                <Link to={`/edit/${order.order_id}`} title="update Status">
                  <div className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold mr-3 py-2 px-4 rounded-full inline-flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="feather feather-edit"
                    >
                      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                    </svg>
                  </div>
                </Link>
              </div>
            </div>
          ))}
        </>
      ) : (
        <p className="text-center bg-gray-100 text-gray-500 py-5">No data.</p>
      )}
    </>
  );
};
