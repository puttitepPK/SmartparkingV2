import React, { useState, useEffect } from "react";
import { Navbar, Nav } from "react-bootstrap";
import { FaSearch, FaHistory, FaUser, FaParking } from "react-icons/fa";
import { IoHome } from "react-icons/io5";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBuildingCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { faAddressCard } from "@fortawesome/free-solid-svg-icons";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

import parkingData from "../../data/parkingData";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

import "./Findparking.css";

function Findparking({}) {
  const location = useLocation();
  const [selectedBuilding, setSelectedBuilding] = useState(null);
  const [selectedFloor, setSelectedFloor] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);

  // const [startTime, setStartTime] = useState(null);
  // const [endTime, setEndTime] = useState(null);

  const [selectedDate, setSelectedDate] = useState(null); // วันที่ที่เลือก
  // const [filteredParking, setFilteredParking] = useState(parkingData);
  const [filteredParking, setFilteredParking] = useState([]);
  const [calculatedStatus, setCalculatedStatus] = useState({}); // เก็บสถานะปุ่มแต่ละอัน

  const today = new Date();
  const maxDate = new Date(today);
  maxDate.setDate(today.getDate() + 7); // วันที่อนุญาตให้เลือกได้ 7 วันล่วงหน้า

  const formatDate = (date) => date.toISOString().split("T")[0];

  // กรองข้อมูลเมื่อเลือกตัวเลือก
  useEffect(() => {
    const isTimeInRange = (selectedTime, range) => {
      if (!selectedTime || !range) return false;
      const [start, end] = range.split("-").map((t) => t.trim());
      const selected = new Date(`1970-01-01T${selectedTime}:00`);
      const rangeStart = new Date(`1970-01-01T${start}:00`);
      const rangeEnd = new Date(`1970-01-01T${end}:00`);
      return selected >= rangeStart && selected <= rangeEnd;
    };

    const filtered = parkingData.filter(
      (item) =>
        (!selectedBuilding || item.building === selectedBuilding) &&
        (!selectedFloor || item.floor === selectedFloor) &&
        (!selectedTime || isTimeInRange(selectedTime, item.time))
    );
    setFilteredParking(filtered);
  }, [selectedBuilding, selectedFloor, selectedTime]);

  //สุ่ม %
  useEffect(() => {
    const calculateAutomaticAvailability = () => {
      if (!selectedDate || !selectedTime) return;

      setCalculatedStatus((prevStatus) => {
        const updatedStatus = { ...prevStatus };

        if (!updatedStatus[selectedDate]) {
          updatedStatus[selectedDate] = {};
        }
        if (!updatedStatus[selectedDate][selectedTime]) {
          updatedStatus[selectedDate][selectedTime] = {};
        }

        filteredParking.forEach((item) => {
          const key = `${item.building}-${item.floor}`;
          if (!updatedStatus[selectedDate][selectedTime][key]) {
            // สุ่มเปอร์เซ็นต์โอกาส
            const randomPercent = Math.floor(Math.random() * 100) + 1;

            // แยกจำนวนช่องจอดที่ใช้งาน/ทั้งหมด
            const [current, total] = item.slots.split("/").map(Number); // แปลงเป็นตัวเลข

            // คำนวณจำนวนช่องจอดว่าง โดยกลับตรรกะ: ยิ่งโอกาสต่ำ ช่องว่างยิ่งเยอะ
            const availableSlots = Math.round(
              ((100 - randomPercent) / 100) * total
            );

            updatedStatus[selectedDate][selectedTime][key] = {
              percent: randomPercent, // เก็บเปอร์เซ็นต์
              slots: `${availableSlots}/${total}`, // เก็บสถานะช่องจอด
            };
          }
        });

        return updatedStatus;
      });
    };

    calculateAutomaticAvailability();
  }, [filteredParking, selectedDate, selectedTime]);

  // ฟังก์ชันรีเซ็ตค่า
  const resetFilters = () => {
    setSelectedBuilding(null);
    setSelectedFloor(null);
    setSelectedTime("");
  };

  return (
    <div style={{ minHeight: "100%" }}>
      <div className="box2">
        <img
          src="./Metthier Master Logo.png"
          alt="My Logo"
          className="Logo2-image"
        />
      </div>

      <div className="main-content3">
        <h2 className="text-center">
          ค้นหาลานจอดรถ <FaSearch className="iconPark" size={31} />
        </h2>
        <div className="boxback">
          <div className="photoparking">
            <img src="parking.png" alt="" className="parking" />
          </div>
          <div className="dropdown">
            {/* Dropdown วันที่ */}
            <div className="search-section">
              <input
                type="date"
                className="form-control custom-date-picker"
                placeholder="วันที่"
                min={formatDate(today)}
                max={formatDate(maxDate)}
                value={selectedDate || ""}
                onChange={(e) => setSelectedDate(e.target.value)}
              />
            </div>

            <input
              type="time"
              className="form-control custom-date-pickerGT2"
              value={selectedTime || ""}
              onChange={(e) => setSelectedTime(e.target.value)}
            />
          </div>

          {/*กล่องล่าง */}
          <div className="dropdown2">
            <button
              className="btn btn-light dropdown-toggle "
              type="button"
              id="dropdownMenuButton"
              data-bs-toggle="dropdown"
              aria-expanded="false"
              style={{ marginRight: "20px", marginLeft: "4px", width: "150px" }}
            >
              <i
                className="bi bi-building"
                style={{ marginRight: "10px", color: "#2e2e2e" }}
              ></i>{" "}
              {/* ไอคอน */}
              {selectedBuilding || "อาคาร"}
            </button>
            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
              <li>
                <button
                  className="dropdown-item"
                  onClick={() => setSelectedBuilding(null)}
                >
                  อาคาร
                </button>
              </li>
              <li>
                <button
                  className="dropdown-item"
                  onClick={() => setSelectedBuilding("อาคาร A")}
                >
                  อาคาร A
                </button>
              </li>
              <li>
                <button
                  className="dropdown-item"
                  onClick={() => setSelectedBuilding("อาคาร B")}
                >
                  อาคาร B
                </button>
              </li>
              <li>
                <button
                  className="dropdown-item"
                  onClick={() => setSelectedBuilding("อาคาร C")}
                >
                  อาคาร C
                </button>
              </li>
            </ul>

            {/* Dropdown ชั้น */}
            <button
              className="btn btn-light dropdown-toggle"
              type="button"
              id="dropdownFloor"
              data-bs-toggle="dropdown"
              aria-expanded="false"
              style={{ marginRight: "4px", width: "150px" }}
            >
              <i
                className="bi bi-p-square"
                style={{
                  marginRight: "8px",
                  color: "#2e2e2e",
                  marginTop: "2px",
                }}
              ></i>
              {selectedFloor || "เลือกลาน"}
            </button>
            <ul className="dropdown-menu" aria-labelledby="dropdownFloor">
              <li>
                <button
                  className="dropdown-item"
                  onClick={() => setSelectedFloor(null)}
                >
                  เลือกลาน
                </button>
              </li>
              <li>
                <button
                  className="dropdown-item"
                  onClick={() => setSelectedFloor("ลาน 1")}
                >
                  ลาน 1
                </button>
              </li>
              <li>
                <button
                  className="dropdown-item"
                  onClick={() => setSelectedFloor("ลาน 2")}
                >
                  ลาน 2
                </button>
              </li>
              <li>
                <button
                  className="dropdown-item"
                  onClick={() => setSelectedFloor("ลาน 3")}
                >
                  ลาน 3
                </button>
              </li>
            </ul>
          </div>

          {/* แสดงรายการลานจอดรถ */}
          <div className="parking-list">
            {filteredParking.map((item) => (
              <div key={item.id} className="parking-item">
                <img
                  src={item.image}
                  alt={item.building}
                  className="parking-image"
                />
                <div className="parking-info">
                  <h5>
                    {item.building} {item.floor}
                  </h5>
                  <p>
                    สถานะลานจอด:{" "}
                    {calculatedStatus[selectedDate] &&
                    calculatedStatus[selectedDate][selectedTime] &&
                    calculatedStatus[selectedDate][selectedTime][
                      `${item.building}-${item.floor}`
                    ]
                      ? calculatedStatus[selectedDate][selectedTime][
                          `${item.building}-${item.floor}`
                        ].slots
                      : item.slots}
                  </p>
                  <p>
                    โอกาสที่จะว่าง:{" "}
                    {calculatedStatus[selectedDate] &&
                    calculatedStatus[selectedDate][selectedTime] &&
                    calculatedStatus[selectedDate][selectedTime][
                      `${item.building}-${item.floor}`
                    ]
                      ? `${
                          calculatedStatus[selectedDate][selectedTime][
                            `${item.building}-${item.floor}`
                          ].percent
                        }%`
                      : "--%"}
                  </p>
                  <p>เวลา: {item.time} น.</p>
                </div>
                <div className="boxstatus2">
                  <button
                    className={`boxstatus ${
                      calculatedStatus[selectedDate] &&
                      calculatedStatus[selectedDate][selectedTime] &&
                      calculatedStatus[selectedDate][selectedTime][
                        `${item.building}-${item.floor}`
                      ]?.percent > 50
                        ? "status-available"
                        : "status-occupied"
                    }`}
                    disabled
                  >
                    {calculatedStatus[selectedDate] &&
                    calculatedStatus[selectedDate][selectedTime] &&
                    calculatedStatus[selectedDate][selectedTime][
                      `${item.building}-${item.floor}`
                    ]?.percent > 50
                      ? "ว่าง"
                      : "ไม่ว่าง"}
                  </button>
                  {/* <button
                    className="btn-decrement"
                    onClick={() => decrementSlots(item.id)} // กดเพื่อลดจำนวน
                    disabled={item.slots.split("/")[0] === "0"} // ปิดการลดถ้าจอด 0
                  ></button>
                  <button
                    className={`boxstatus ${
                      item.status === "ว่าง"
                        ? "status-available"
                        : "status-occupied"
                    }`}
                    onClick={() => updateParkingStatus(item.id)} // อัปเดตจำนวนช่องจอด
                    disabled={item.status === "ไม่ว่าง"} // ปิดปุ่มถ้าจอดเต็ม
                  >
                    {item.status}
                  </button> */}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Navber */}
      <div className="boxnav1">
        <div className="boxnav">
          <div className="bottom-navbar">
            <Nav className="justify-content-around">
              <Nav.Item>
                <Link
                  to="/home"
                  className={`nav-item home-link ${
                    location.pathname === "/home/ScanQRCode" ? "active" : ""
                  }`}
                >
                  <IoHome className="icon" size={31} />
                  <span> หน้าแรก</span>
                </Link>
              </Nav.Item>
              <Nav.Item>
                <Link
                  to="/findparking"
                  className={`nav-item findparking-link ${
                    location.pathname === "/findparking" ? "active" : ""
                  }`}
                >
                  <FaSearch className="icon" size={31} />
                  <span> ค้นหาลานจอด</span>
                </Link>
              </Nav.Item>
              <Nav.Item>
                <Link
                  to="/record"
                  className={`nav-item record-link ${
                    location.pathname === "/record" ? "active" : ""
                  }`}
                >
                  <FontAwesomeIcon
                    icon={faBuildingCircleCheck}
                    className="icon"
                    style={{ fontSize: "31px" }}
                  />
                  <span> ประวัติการจอด</span>
                </Link>
              </Nav.Item>
              <Nav.Item>
                <Link
                  to="/profile"
                  className={`nav-item profile-link ${
                    location.pathname === "/profile" ? "active" : ""
                  }`}
                >
                  <FontAwesomeIcon
                    icon={faAddressCard}
                    className="icon"
                    style={{ fontSize: "31px" }}
                  />
                  <span> ข้อมูลส่วนตัว</span>
                </Link>
              </Nav.Item>
            </Nav>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Findparking;
