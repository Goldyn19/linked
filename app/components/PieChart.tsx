import React from "react";
import { PieChart as RePieChart, Pie, Cell, Tooltip, Legend } from "recharts";

const PieChart = () => {
  const data = [
    { name: "React", value: 40 },
    { name: "Vue", value: 30 },
    { name: "Angular", value: 20 },
    { name: "Svelte", value: 10 },
  ];

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];




  return (
    <div className="flex flex-col items-center p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">
        Frontend Framework Popularity
      </h2>
      <RePieChart width={300} height={300}>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          outerRadius={100}
          fill="#8884d8"
          dataKey="value"
          label
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </RePieChart>
    </div>
  );
};

export default PieChart;
