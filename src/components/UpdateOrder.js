import React, { useState,  useEffect } from 'react';
import { useHistory, Link } from 'react-router-dom';

const orders = [
    {
        "id": 4633499533378,
        "name": "Test 1",
        "quantity": 3,
        "product_id": 4460755157058,
        "orderId": 7,
        "orderDate": "2020-04-14T06:15:23.000Z"
    },
    {
        "id": 4633579421762,
        "name": "Test 2",
        "quantity": 1,
        "product_id": 4467615531074,
        "orderId": 6,
        "orderDate": "2020-04-14T06:42:47.000Z"
    },
    {
        "id": 4633579454530,
        "name": "Test 1",
        "quantity": 2,
        "product_id": 4460755157058,
        "orderId": 6,
        "orderDate": "2020-04-14T06:42:47.000Z"
    },
    {
        "id": 4684687114306,
        "name": "Test 4",
        "quantity": 4,
        "product_id": 4467830194242,
        "orderId": 3,
        "orderDate": "2020-04-24T10:07:57.000Z"
    },
    {
        "id": 4684738265154,
        "name": "Test 1",
        "quantity": 2,
        "product_id": 4460755157058,
        "orderId": 3,
        "orderDate": "2020-04-24T10:07:57.000Z"
    },
    {
        "id": 4684890800194,
        "name": "Test 6",
        "quantity": 100,
        "product_id": 4455579123778,
        "orderId": 2,
        "orderDate": "2020-04-24T11:41:40.000Z"
    },
    {
        "id": 4684890832962,
        "name": "Test 7",
        "quantity": 60,
        "product_id": 4455579025474,
        "orderId": 2,
        "orderDate": "2020-04-24T11:41:40.000Z"
    }
] 

export const UpdateOrder = (route) => {
  let history = useHistory();
  
  const [selectedOrder, setSelectedOrder] = useState({
    id: null,
    name: "",
    product_id: "",
    orderDate: "",
  });

  const currentOrderId = route.match.params.id;

  useEffect(() => {
    const orderId = currentOrderId;
     const selectedOrder = orders.find(
       (currentOrderTraversal) => currentOrderTraversal.id === parseInt(orderId)
     );
    setSelectedOrder(selectedOrder);
  }, [currentOrderId, orders]);

  const onSubmit = (e) => {
    e.preventDefault();
    history.push("/");
  };

  const handleOnChange = (userKey, newValue) =>
    setSelectedOrder({ ...selectedOrder, [userKey]: newValue });

  if (!selectedOrder || !selectedOrder.id) {
    return <div>Invalid Order ID.</div>;
  }

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
              onChange={(e) => handleOnChange("status", e.target.value)}
              type="text"
              placeholder="Enter Status"
            />
          </div>
          <div className="flex items-center justify-between">
            <button className="block mt-5 bg-green-400 w-full hover:bg-green-500 text-white font-bold py-2 px-4 rounded focus:text-gray-600 focus:shadow-outline">
              Edit Order
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