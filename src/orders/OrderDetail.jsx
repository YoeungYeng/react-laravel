import React, { useEffect, useState } from "react";
import NavBar from "../component/NavBar";
import SideLefe from "../component/SideLefe";
import Footer from "../component/Footer";
import { useParams } from "react-router-dom";
import { adminToken, apiUrl } from "../component/htpds";
import Loading from "../component/Loading";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

const OrderDetail = () => {
  const [order, setOrder] = useState(null);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const handleFormUpdate = async (data) => {
    try {
      const response = await fetch(`${apiUrl}/order/${id}`, {
        method: "POST", // Use PUT for update
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${adminToken()}`,
        },
        body: JSON.stringify(data),
        credentials: "include",
      });

      const result = await response.json();

      if (response.ok && result.status === 200) {
        toast.success("Order updated successfully");
        fetchOrderDetails(); // refresh order data
      } else {
        toast.error(result.message || "Failed to update order.");
      }
    } catch (error) {
      console.error("Submission Error:", error);
      toast.error("An unexpected error occurred.");
    }
  };

  const fetchOrderDetails = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${apiUrl}/order/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${adminToken()}`,
        },
      });

      const result = await response.json();
      if (!response.ok || !result.data) {
        setOrder(null);
        return;
      }

      setOrder(result.data);
      setItems(result.data.item || []);
      reset({
        status: result.data.status,
        payment_status: result.data.payment_status,
      });
    } catch (error) {
      console.error("Error fetching order:", error);
      setOrder(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrderDetails();
  }, [id]);

  if (loading) return <Loading />;
  if (!order) return <p className="p-6 text-red-500">Order not found.</p>;

  return (
    <>
      <SideLefe />
      <div className="sm:ml-64 h-screen">
        <div className="p-4 rounded-lg">
          <NavBar />

          <div className="bg-gray-100 p-6 rounded-md shadow-md">
            {/* Order Header */}
            <div className="flex justify-between items-center mb-4">
              <div>
                <h2 className="text-xl font-semibold">Order: #{order.id}</h2>
                <span className="bg-yellow-200 text-yellow-800 px-2 py-1 rounded-full text-xs font-medium">
                  {order.status}
                </span>
              </div>
              <div>
                <p className="text-gray-600 text-sm">Date</p>
                <p className="text-gray-800 font-medium">{order.created_at}</p>
              </div>
              <div>
                <p className="text-gray-600 text-sm">Payment</p>
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium p-2 block text-center ${
                    order.payment_status === "paid"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {order.payment_status}
                </span>
              </div>
            </div>

            {/* Customer Information */}
            <div className="mb-4">
              <h3 className="text-lg font-semibold mb-2">{order.name}</h3>
              <p className="text-gray-700 text-sm">
                {order.address}, {order.city}
              </p>
              <p className="text-gray-700 text-sm">{order.zip}</p>
            </div>

            {/* Payment Method */}
            <div className="mb-6">
              <p className="text-gray-600 text-sm">Payment Method</p>
              <p className="text-gray-800 font-medium">Stripe</p>
            </div>

            {/* Order Summary */}
            <div className="mt-4">
              <div className="flex justify-between py-2">
                <p className="text-gray-700">Subtotal</p>
                <p className="text-gray-800">${order.subTotal}</p>
              </div>
              <div className="flex justify-between py-2">
                <p className="text-gray-700">Shipping</p>
                <p className="text-gray-800">${order.shipping}</p>
              </div>
              <div className="flex justify-between py-2 font-semibold">
                <p className="text-gray-800">Grand Total</p>
                <p className="text-gray-900">${order.grand_total}</p>
              </div>
            </div>

            {/* Items List */}
            <div className="bg-white p-4 rounded-lg shadow-md mt-6 w-full md:w-[80%]">
              <h1 className="text-2xl mb-4">Items</h1>
              {items.map((item, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center border-b py-3"
                >
                  <div className="flex items-center">
                    <img
                      src={item.product.image}
                      alt="Product"
                      className="w-16 h-16 object-cover mr-4"
                    />
                    <div>
                      <p className="font-medium text-gray-600">
                        {item.product.title}
                      </p>
                    </div>
                  </div>
                  <div className="text-lg font-medium">
                    <p className="text-gray-600">
                      x{item.quantity} @ ${item.product.price}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Status Update Form */}
            <div className="bg-white p-4 rounded-lg shadow-md mt-6">
              <form onSubmit={handleSubmit(handleFormUpdate)}>
                <h3 className="text-lg font-semibold mb-2">Update Order</h3>

                {/* Status Field */}
                <div className="mb-4">
                  <label htmlFor="status">Order Status</label>
                  <select
                    id="status"
                    className="border border-gray-300 rounded-md p-2 w-full mt-2"
                    {...register("status", {
                      required: "Order status is required",
                    })}
                  >
                    <option value="pending">Pending</option>
                    <option value="shipped">Shipped</option>
                    <option value="delivered">Delivered</option>
                    <option value="canceled">Canceled</option>
                  </select>
                  {errors.status && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.status.message}
                    </p>
                  )}
                </div>

                {/* Payment Field */}
                <div className="mb-4">
                  <label htmlFor="payment_status">Payment Status</label>
                  <select
                    id="payment_status"
                    className="border border-gray-300 rounded-md p-2 w-full mt-2"
                    {...register("payment_status", {
                      required: "Payment status is required",
                    })}
                  >
                    <option value="paid">Paid</option>
                    <option value="no paid">No Paid</option>
                  </select>
                  {errors.payment_status && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.payment_status.message}
                    </p>
                  )}
                </div>

                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  type="submit"
                >
                  Update
                </button>
              </form>
            </div>
          </div>

          <Footer />
        </div>
      </div>
    </>
  );
};

export default OrderDetail;
