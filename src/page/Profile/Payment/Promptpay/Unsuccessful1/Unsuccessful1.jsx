//Home.jsx
import React, { useState, useEffect } from "react";
import { Nav } from "react-bootstrap";
import { FaSearch, FaHistory, FaUser, FaDownload } from "react-icons/fa"; // นำเข้าไอคอนที่ต้องการ
import { useLocation, useNavigate, Link } from "react-router-dom";
import { IoHome } from "react-icons/io5";

import { faBuildingCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAddressCard } from "@fortawesome/free-solid-svg-icons";
import logo from "/public/Metthier Master Logo.png"; //ใส่โลโก้ซ้อนลิ้ง
import cancel from "/Cancel.png"; //ใส่โลโก้ซ้อนลิ้ง

import "./Unsuccessful1.css";

function Unsuccessful1({}) {
  const location = useLocation(); // ใช้ location เพื่อตรวจสอบเส้นทางปัจจุบัน
  const navigate = useNavigate(); // สร้าง navigate สำหรับเปลี่ยนหน้า

  // สถานะเวลาถอยหลัง
  const [countdown, setCountdown] = useState(10); // ตั้งค่าเริ่มต้นเป็น 10 วินาที

  // ฟังก์ชัน handleProfileClick เพื่อนำกลับไปหน้า Profile
  const handleProfileClick = () => {
    if (
      location.pathname.includes("/payment") &&
      location.pathname.includes("/unsuccessful")
    ) {
      navigate("/profile"); // ถ้า path ใดๆ มี /unsuccessful ที่ตรงกับทั้ง 3 หน้า ให้ไปหน้า Profile
    } else {
      navigate("/profile/payment/promptpay/unsuccessful"); // ถ้าไม่มีคำว่า /unsuccessful ให้ไปยัง path เริ่มต้น
    }
  };

  // เริ่มนับเวลาถอยหลัง
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000); // ลด 1 และ ลดเวลาทุก 1 วินาที
      return () => clearTimeout(timer); // เคลียร์ timer เมื่อ component ถูกทำลาย
    } else {
      navigate("/profile/payment"); // เปลี่ยนหน้าเมื่อเวลาหมด
    }
  }, [countdown, navigate]);

  return (
    <div style={{ minHeight: "100%" }}>
      <div>
        <div className="box3">
          <img src={logo} alt="My Logo1" className="Logo3-image" />
        </div>
      </div>

      <div className="main-content2">
        <div className="receipt-container">
          <div className="payment-methods">
            <h2>การชำระเงิน</h2>
            <div className="savebilprompt">
              <img src={cancel} alt="Logo1" className="logocancel" />
            </div>
            <div className="fail">
              <h4>การชำระเงินล้มเหลว</h4>
              <p>
                โปรดกรุณาติดต่อเจ้าหน้าที่หรือ <br />
                ทำการชำระเงินใหม่อีกครั้ง
              </p>
            </div>
          </div>
          <Link to="/profile/payment" className="link-no-underline">
            <button className="promptpay-btn operation">ลองอีกครั้ง</button>
          </Link>
        </div>

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
                      location.pathname.includes("/profile/payment") &&
                      location.pathname.includes("/unsuccessful")
                        ? "active"
                        : ""
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
    </div>
  );
}

export default Unsuccessful1;
