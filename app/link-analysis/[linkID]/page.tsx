'use client'
import React from "react";
import Navbar from "@/app/components/NavBar";
import { QRCodeCanvas } from "qrcode.react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { PieChart, Pie, Cell } from 'recharts';
import { BarChart, Bar } from 'recharts';

const page = () => {
  const url = "bitly.com/3k4j5l6";
  
  // Sample data for the line chart
  const timeData = [
    { date: '04/01', clicks: 40 },
    { date: '04/02', clicks: 20 },
    { date: '04/03', clicks: 15 },
    { date: '04/04', clicks: 40 },
    { date: '04/05', clicks: 30 },
    { date: '04/06', clicks: 10 },
    { date: '04/07', clicks: 35 },
  ];

  // Sample data for device breakdown
  const deviceData = [
    { name: 'Desktop', value: 146 },
    { name: 'E-Reader', value: 101 },
    { name: 'Tablet', value: 70 },
    { name: 'Mobile', value: 50 },
    { name: 'Unknown', value: 14 },
  ];

  const COLORS = ['#00C7BE', '#FF6B6B', '#4A6CF7', '#FFB545', '#E2E8F0'];

  // Sample data for referrers
  const referrerData = [
    { name: 'LinkedIn', value: 40 },
    { name: 'Facebook', value: 5 },
    { name: 'Google', value: 20 },
    { name: 'Twitter', value: 5 },
    { name: 'Bitly', value: 15 },
    { name: 'Direct', value: 8 },
    { name: 'Other', value: 4 },
  ];

  // Sample location data
  const locationData = [
    { country: 'United States', clicks: 205, percentage: 43.2 },
    { country: 'Japan', clicks: 6, percentage: 1.3 },
    { country: 'Mexico', clicks: 19, percentage: 4.0 },
    { country: 'Russian Federation', clicks: 5, percentage: 1.1 },
    { country: 'India', clicks: 27, percentage: 5.7 },
    { country: 'Canada', clicks: 80, percentage: 16.9 },
    { country: 'United Kingdom', clicks: 205, percentage: 43.2 },
    { country: 'France', clicks: 80, percentage: 16.9 },
    { country: 'Germany', clicks: 80, percentage: 16.9 },
    { country: 'Spain', clicks: 80, percentage: 16.9 },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Top performing date */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-4">Top performing date by clicks + scans</h2>
            <div className="text-2xl font-bold mb-2">April 12, 2025</div>
            <div className="text-gray-600">47 Clicks + scans</div>
            <div className="text-sm text-gray-500 mt-2">Apr 17 - Apr 23, 2025</div>
          </div>

          {/* QR Code Section */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-4">QR Code</h2>
            <div className="flex flex-col items-center">
              <QRCodeCanvas value={url} size={200} />
              <p className="mt-4 text-gray-600">Scan to visit: {url}</p>
            </div>
          </div>

          {/* Clicks + scans over time */}
          <div className="bg-white p-6 rounded-lg shadow md:col-span-2">
            <h2 className="text-lg font-semibold mb-4">Clicks + scans over time</h2>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={timeData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="clicks" stroke="#00C7BE" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Device breakdown */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-4">Clicks + scans by device</h2>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={deviceData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    fill="#8884d8"
                    paddingAngle={5}
                    dataKey="value"
                    label={({ name, value }) => `${name}: ${value}`}
                  >
                    {deviceData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Referrer breakdown */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-4">Clicks + scans by referrer</h2>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={referrerData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis dataKey="name" type="category" width={80} />
                  <Tooltip />
                  <Bar dataKey="value" fill="#00C7BE" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Location table */}
          <div className="bg-white p-6 rounded-lg shadow md:col-span-2">
            <h2 className="text-lg font-semibold mb-4">Clicks + scans by location</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">#</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Country</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Clicks + scans</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">%</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {locationData.map((location, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{index + 1}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{location.country}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{location.clicks}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{location.percentage}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
