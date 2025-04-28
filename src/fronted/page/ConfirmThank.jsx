import React, { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { useParams } from "react-router-dom";
import { apiUrl, userToken } from "../../component/htpds";

const ConfirmThank = () => {
  const param = useParams();
  const [loading, setLoading] = useState(true);
  const [orderDetail, setOrderDetail] = useState([]);

  const fetchOrderDetail = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${apiUrl}/getOrderDetail/${param.id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${userToken()}`,
        },
      });

      if (!response.ok)
        throw new Error(`HTTP error! Status: ${response.status}`);

      const result = await response.json();
      console.log("Order Details:", result.data);
      setOrderDetail(result.data);
    } catch (error) {
      console.error("Error fetching order details:", error);
      setOrderDetail(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrderDetail();
  }, [param.id]); // Re-fetch if the order ID in the URL changes

  return (
    <>
      <Navbar />

      <div className="bg-gray-100 min-h-screen py-8">
        <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-8">
          {loading ? (
            <div className="text-center">
              <p className="text-gray-600">Loading order details...</p>
            </div>
          ) : !orderDetail ? (
            <div className="text-center">
              <p className="text-red-500 font-semibold">
                Order details not found.
              </p>
            </div>
          ) : (
            <>
              {/* Thank You Message */}
              <div className="mb-6 text-center">
                <h1 className="text-3xl font-semibold text-green-600 mb-2">
                  Thank you for your purchase!
                </h1>
                <p className="text-gray-600 text-sm">
                  Your order will be processed within 24 hours during working
                  days. We will notify you by email once your order has been
                  shipped.
                </p>
              </div>

              {/* Billing Address */}
              {orderDetail && (
                <div className="mb-6 border-b pb-4">
                  <h2 className="text-lg font-semibold text-gray-700 mb-3">
                    Billing address
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-gray-600">
                    <div>
                      <p className="font-medium">Name</p>
                      <p>{orderDetail.name}</p>
                    </div>
                    <div>
                      <p className="font-medium">Address</p>
                      <p>
                        {`${orderDetail.address}, ${orderDetail.city},  ${orderDetail.zip}`}
                      </p>
                    </div>
                    <div>
                      <p className="font-medium">Phone</p>
                      <p>{orderDetail?.mobile}</p>
                    </div>
                    <div>
                      <p className="font-medium">Email</p>
                      <p>{orderDetail?.email}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Order Summary */}
              <div className="mb-6">
                <h2 className="text-lg font-semibold text-gray-700 mb-3">
                  Order Summary
                </h2>
                <div className="bg-gray-50 rounded-md p-4 mb-4">
                  <div className="flex justify-between text-sm text-gray-600 mb-2">
                    <p>Date</p>
                    <p>
                      {orderDetail?.created_at}
                    </p>
                  </div>
                  <div className="flex justify-between text-sm text-gray-600 mb-2">
                    <p>Order Number</p>
                    <p>{orderDetail?.mobile}</p>
                  </div>
                  <div className="flex justify-between text-sm text-gray-600">
                    <p>Payment Method</p>
                    <p>{orderDetail.payment_status}</p>
                  </div>
                </div>

                {/* Order Items */}
                <div className="space-y-4 mb-4">
                  {orderDetail.orderItems?.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center border-b pb-4 last:border-b-0"
                    >
                      
                      <div className="flex-grow">
                        <h3 className="text-sm font-medium text-gray-800">
                          {item.product?.name}
                        </h3>
                        {item.packSize && (
                          <p className="text-xs text-gray-500">
                            Pack: {item.packSize}
                          </p>
                        )}
                        <p className="text-xs text-gray-500">
                          Qty: {item.quantity}
                        </p>
                      </div>
                      <span className="font-semibold text-gray-800 text-sm">
                        ${item.price.toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Order Totals */}
                <div className="border-t pt-4">
                  <div className="flex justify-between text-sm text-gray-600 mb-2">
                    <p>Sub Total</p>
                    <p>${orderDetail.subTotal?.toFixed(2)}</p>
                  </div>
                  <div className="flex justify-between text-sm text-gray-600 mb-2">
                    <p>Shipping</p>
                    <p>${orderDetail.shipping?.toFixed(2)}</p>
                  </div>
                  <div className="flex justify-between text-sm text-gray-600 mb-2">
                    <p>Discount</p>
                    <p>${orderDetail.discount?.toFixed(2)}</p>
                  </div>
                  <div className="flex justify-between font-semibold text-gray-800 text-lg">
                    <p>Order Total</p>
                    <p>${orderDetail.subTotal?.toFixed(2)}</p>
                  </div>
                </div>
              </div>

              {/* Track Order Button */}
              <div className="text-center">
                <button className="bg-red-500 hover:bg-red-600 text-white font-semibold py-3 px-6 rounded-full">
                  Track Your Payment
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      <Footer />
    </>
  );
};

export default ConfirmThank;
