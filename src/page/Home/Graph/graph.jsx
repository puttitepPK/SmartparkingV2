import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";

import "./graph.css";

ChartJS.register(BarElement, CategoryScale, LinearScale);

const GraphComponent = () => {
  const [data, setData] = useState({
    A: 65,
    B: 85,
    C: 50,
  });

  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");

  // กำหนดวันปัจจุบัน
  const today = new Date();
  const maxDate = new Date();
  maxDate.setDate(today.getDate() + 7); // จำกัดวันที่ให้ไม่เกิน 7 วันข้างหน้า

  const formatDate = (date) => {
    return date.toISOString().split("T")[0];
  };

  const handleRandomize = () => {
    setData({
      A: Math.floor(Math.random() * 101),
      B: Math.floor(Math.random() * 101),
      C: Math.floor(Math.random() * 101),
    });
  };

  // ทำการสุ่มใหม่ทุกครั้งที่เปลี่ยนวันที่หรือเวลา
  useEffect(() => {
    if (selectedDate && selectedTime) {
      handleRandomize();
    }
  }, [selectedDate, selectedTime]);

  const chartData = {
    labels: ["อาคาร A", "อาคาร B", "อาคาร C"],
    datasets: [
      {
        label: "เปอร์เซ็นต์ที่จอด",
        data: [data.A, data.B, data.C],
        backgroundColor: ["#FD6E2B", "#FD6E2B", "#FD6E2B"],
        borderColor: ["#B8B1C3", "#B8B1C3", "#B8B1C3"], // สีเส้นขอบ
        borderWidth: 3, // ความหนาของเส้นขอบ
      },
    ],
  };

  const options = {
    scales: {
      x: {
        ticks: {
          color: "#000000", // เปลี่ยนสีตัวเลขแกน X
        },
        grid: {
          color: "#adadad", // เปลี่ยนสีเส้นตารางของแกน X
        },
      },
      y: {
        beginAtZero: true,
        max: 100, // เพิ่มพื้นที่เผื่อด้านบนให้ใหญ่กว่า 100%
        ticks: {
          color: "#000000", // เปลี่ยนสีตัวเลขแกน Y
        },
        grid: {
          color: "#adadad", // เปลี่ยนสีเส้นตารางของแกน Y
        },
      },
    },
  };

  // Custom Plugin สำหรับแสดงเปอร์เซ็นต์บนแท่ง
  const plugins = [
    {
      id: "displayPercentage",
      afterDatasetsDraw: (chart) => {
        const { ctx, data } = chart;
        chart.data.datasets.forEach((dataset, i) => {
          const meta = chart.getDatasetMeta(i);
          meta.data.forEach((bar, index) => {
            const value = dataset.data[index];
            ctx.save();
            ctx.font = "20px ";
            ctx.fillStyle = "#473366"; // สีของตัวอักษร
            ctx.textAlign = "center";
            ctx.fillText(`${value}%`, bar.x, bar.y - 5); // แสดงตัวเลขเหนือแท่ง
            ctx.restore();
          });
        });
      },
    },
  ];

  return (
    <div className="graphall">
      <div className="dategraphtime">
        <input
          type="date"
          className="form-control custom-date-pickerG2"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          min={formatDate(today)} // กำหนดวันเริ่มต้นเป็นวันนี้
          max={formatDate(maxDate)} // กำหนดวันสูงสุดเป็น 7 วันจากวันนี้
        />
        <input
          type="time"
          className="form-control custom-date-pickerGT"
          value={selectedTime}
          onChange={(e) => setSelectedTime(e.target.value)}
        />
      </div>

      <div className="titlegraph1">
        <p>สถานะอาคารว่าง</p>
      </div>


      <Bar data={chartData} options={options} plugins={plugins} />
    </div>
  );
};

export default GraphComponent;
