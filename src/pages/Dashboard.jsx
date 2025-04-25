import React from "react";
import { Link } from "react-router-dom";
import SideLefe from "../component/SideLefe";
import NavBar from "../component/NavBar";
import Footer from "../component/Footer";
import { FaUserCircle } from "react-icons/fa"; // Using FaUserCircle for consistency with the previous example
import { FaShoppingCart } from "react-icons/fa";
import { FaShop } from "react-icons/fa6";
import Cartch from "../component/Cartch";
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
  const tickets = [
    {
      assignee: 'David Grey',
      subject: 'Fund is not recieved',
      status: 'DONE',
      lastUpdate: 'Dec 5, 2017',
      trackingId: 'WD-12345',
      assigneeImage: 'https://via.placeholder.com/40/007bff/ffffff?Text=DG', // Placeholder image
    },
    {
      assignee: 'Stella Johnson',
      subject: 'High loading time',
      status: 'PROGRESS',
      lastUpdate: 'Dec 12, 2017',
      trackingId: 'WD-12346',
      assigneeImage: 'https://via.placeholder.com/40/28a745/ffffff?Text=SJ', // Placeholder image
    },
    {
      assignee: 'Marina Michel',
      subject: 'Website down for one week',
      status: 'ON HOLD',
      lastUpdate: 'Dec 16, 2017',
      trackingId: 'WD-12347',
      assigneeImage: 'https://via.placeholder.com/40/dc3545/ffffff?Text=MM', // Placeholder image
    },
    {
      assignee: 'John Doe',
      subject: 'Loosing control on server',
      status: 'REJECTED',
      lastUpdate: 'Dec 3, 2017',
      trackingId: 'WD-12348',
      assigneeImage: 'https://via.placeholder.com/40/6c757d/ffffff?Text=JD', // Placeholder image
    },
  ];

  const getStatusStyle = (status) => {
    switch (status) {
      case 'DONE':
        return 'bg-green-100 text-green-700';
      case 'PROGRESS':
        return 'bg-yellow-100 text-yellow-700';
      case 'ON HOLD':
        return 'bg-blue-100 text-blue-700';
      case 'REJECTED':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };
  return (
    <>
      <SideLefe />
      <div className="-mt-2 sm:ml-64 min-h-screen bg-[#f5f3fb] p-6 space-y-8">
        <div className="p-4 rounded-lg dark:border-gray-700">
          <div className="gap-4 mb-4">
            <div className="rounded-sm bg-gray-50 dark:bg-gray-800">
              <p className="text-2xl text-gray-400 dark:text-gray-500">
                <NavBar />
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8"> {/* Added mb-8 for spacing */}
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

            <div className="bg-white p-6 rounded-2xl shadow-md h-[400px]">
              <h2 className="text-lg font-semibold mb-4">Traffic Sources</h2>
              <div className="h-[300px]">
                <Pie
                  data={{
                    labels: ["Search Engines", "Direct Click", "Bookmarks"],
                    datasets: [
                      {
                        data: [30, 30, 40],
                        backgroundColor: ["#a29bfe", "#00cec9", "#fd79a8"],
                        hoverOffset: 4,
                      },
                    ],
                  }}
                  options={{ responsive: true, maintainAspectRatio: false }}
                />
              </div>
            </div>
          </div>

          {/* Recent Tickets Table */}
          <div className="bg-white shadow-md rounded-md overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-700">Recent Tickets</h2>
            </div>
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Assignee
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Subject
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Last Update
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tracking ID
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {tickets.map((ticket) => (
                  <tr key={ticket.trackingId}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-8 w-8 rounded-full overflow-hidden">
                          {ticket.assigneeImage ? (
                            <img src={ticket.assigneeImage} alt={ticket.assignee} className="h-full w-full object-cover" />
                          ) : (
                            <FaUserCircle className="h-full w-full text-gray-400" />
                          )}
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{ticket.assignee}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">{ticket.subject}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusStyle(ticket.status)}`}>
                        {ticket.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{ticket.lastUpdate}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{ticket.trackingId}</td>
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