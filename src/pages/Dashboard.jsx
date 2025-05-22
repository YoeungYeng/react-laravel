import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SideLefe from "../component/SideLefe";
import NavBar from "../component/NavBar";
import Footer from "../component/Footer";
import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { adminToken, apiUrl } from "../component/htpds";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const Dashboard = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [orderData, setOrderData] = useState({
    labels: [],
    datasets: [
      {
        data: [],
        backgroundColor: ["#a29bfe", "#00cec9", "#fd79a8"],
        hoverOffset: 4,
      },
    ],
  });

  const fetchOrder = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${apiUrl}/order`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${adminToken()}`,
        },
      });

      const result = await response.json();
      if (result.status === 200) {
        setOrders(result.data);

        // For pie chart
        const labels = result.data.map((item) => item.name);
        const values = result.data.map((item) => item.grand_total);

        setOrderData({
          labels,
          datasets: [
            {
              data: values,
              backgroundColor: ["#a29bfe", "#00cec9", "#fd79a8", "#fab1a0", "#ffeaa7"],
              hoverOffset: 4,
            },
          ],
        });
      } else {
        console.log("Fetch Orders Error:", result.message);
      }
      setLoading(false);
    } catch (error) {
      console.error("Fetch Orders Error:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrder();
  }, []);

  const getStatusStyle = (status) => {
    switch (status) {
      case "DONE":
        return "bg-green-100 text-green-700";
      case "PROGRESS":
        return "bg-yellow-100 text-yellow-700";
      case "ON HOLD":
        return "bg-blue-100 text-blue-700";
      case "REJECTED":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <>
      <SideLefe />
      <div className="-mt-2 sm:ml-64 min-h-screen bg-[#f5f3fb] p-6 space-y-8">
        <div className="p-4 rounded-lg dark:border-gray-700">
          <div className="gap-4 mb-4">
            <div className="rounded-sm bg-gray-50 dark:bg-gray-800">
              <NavBar />
            </div>
          </div>

          {/* Chart Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-white p-6 rounded-2xl shadow-md h-[400px]">
              <h2 className="text-lg font-semibold mb-4">
                Visit And Sales Statistics
              </h2>
              <div className="h-[300px]">
                <Bar
                  data={{
                    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
                    datasets: [
                      {
                        label: "CHN",
                        backgroundColor: "#a29bfe",
                        data: [12, 19, 3, 5, 2, 3, 9],
                      },
                      {
                        label: "USA",
                        backgroundColor: "#fd79a8",
                        data: [2, 3, 20, 5, 1, 4, 7],
                      },
                      {
                        label: "UK",
                        backgroundColor: "#74b9ff",
                        data: [3, 10, 13, 15, 22, 30, 40],
                      },
                    ],
                  }}
                  options={{ responsive: true, maintainAspectRatio: false }}
                />
              </div>
            </div>

            {/* Pie Chart */}
            <div className="bg-white p-6 rounded-2xl shadow-md h-[400px]">
              <h2 className="text-lg font-semibold mb-4">Orders</h2>
              <div className="h-[300px]">
                <Pie
                  data={orderData}
                  options={{ responsive: true, maintainAspectRatio: false }}
                />
              </div>
            </div>
          </div>

          {/* Orders Table */}
          <div className="bg-white shadow-md rounded-md overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-700">
                Recent Orders
              </h2>
            </div>
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payment</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {orders.map((order) => (
                  <tr key={order.trackingId}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {order.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {order.email}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {order.grand_total}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusStyle(order.payment_status)}`}>
                        {order.payment_status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {order.status}
                    </td>
                    
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <Footer />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
