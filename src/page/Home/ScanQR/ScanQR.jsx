import React, { useEffect, useState } from "react";
import { Navbar, Nav } from "react-bootstrap";

import QrScanner from "react-qr-scanner";
import { faAddressCard } from "@fortawesome/free-solid-svg-icons";
import { House, Search, CardChecklist, Person } from "react-bootstrap-icons"; // ใช้ไอคอนจาก Bootstrap Icons
import { FaSearch, FaHistory, FaUser } from "react-icons/fa"; // นำเข้าไอคอนที่ต้องการ
import { faBuildingCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IoHome } from "react-icons/io5";

import { useLocation, Link } from "react-router-dom";
import logo from "/public/Metthier Master Logo.png"; //ใส่โลโก้ซ้อนลิ้ง
import "./ScanQR.css";

function ScanQR({}) {
  const location = useLocation(); // ใช้ location เพื่อตรวจสอบเส้นทางปัจจุบัน

  const [scanResult, setScanResult] = useState(null);

  const handleScan = (data) => {
    if (data) {
      const scannedURL = data.text; // ดึงข้อมูล URL จาก QR Code
      setScanResult(data.text); // บันทึกข้อมูล QR Code
      window.location.href = scannedURL; // เปลี่ยนหน้าไปยัง URL ที่สแกนได้
    }
  };

  const handleError = (error) => {
    console.error("Error scanning QR Code:", error);
  };

  const handleProfileClick = () => {
    if (location.pathname === "/home/ScanQRCode") {
      navigate("/home"); // ถ้าอยู่ที่ Payment จะพาไปหน้า Profile
    } else {
      navigate("/home/ScanQRCode"); // ถ้าไม่ได้อยู่ที่ Payment ให้ไปหน้า Payment
    }
  };

  return (
    <div
      style={{ minHeight: "900px", display: "flex", flexDirection: "column" }}
    >
      <div>
        <div className="box3">
          <img src={logo} alt="My Logo1" className="Logo3-image" />
        </div>
      </div>

      <div className="main-content">
        <div className="titleQR">
          <h2>Scan QR Code</h2>
        </div>

        {/* boxscan */}
        <div className="boxscan">
          <QrScanner
            delay={300}
            className="previewStyle"
            onError={handleError}
            onScan={handleScan}
            constraints={{
              video: {
                facingMode: "environment", // ใช้กล้องหลัง
                width: { ideal: 1280 }, // ความกว้างที่ต้องการ
                height: { ideal: 1280 }, // ความสูงที่ต้องการ
              },
            }}
          />
        </div>
        <div className="scan-result">
          {scanResult ? <p>ผลลัพธ์: {scanResult}</p> : <p>กรุณาสแกน QR Code</p>}
        </div>

        {/* ปุ่มรีเซ็ทผลสแกน */}
        {/* <button
        className="back-btn"
        onClick={() => setScanResult(null)} // รีเซ็ตผลลัพธ์
      >
        ล้างข้อมูล
      </button> */}

        <div>
          <Link to="/home" className="link-no-underline">
            <button className="back-btn backtohome1">กลับสู่หน้าหลัก</button>
          </Link>
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

export default ScanQR;




