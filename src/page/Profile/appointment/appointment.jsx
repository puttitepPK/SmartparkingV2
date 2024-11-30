import React, { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { Button, Nav } from "react-bootstrap";
import { FaHome, FaSearch, FaHistory, FaUser } from "react-icons/fa";
import { IoHome } from "react-icons/io5";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBuildingCircleCheck,
  faAddressCard,
} from "@fortawesome/free-solid-svg-icons";
import "./Appointment.css";

import logo from "/public/Metthier Master Logo.png"; //ใส่โลโก้ซ้อนลิ้ง
import Undo from "/Undo.png";
import Send from "/send.png";

function Appointment({}) {
  const navigate = useNavigate();
  const location = useLocation();
  const [showMessage, setShowMessage] = useState(false);

  const handleBack = () => {
    navigate(-1);
  };

  const handleSubmit = () => {
    // Show success message for 2 seconds
    setShowMessage(true);
    setTimeout(() => navigate("/profile"), 2000); // เปลี่ยนหน้าไปยัง /login หลังจาก 5 วินาที
  };

  const handleProfileClick = () => {
    if (location.pathname === "/profile/appointment") {
      navigate("/profile"); // ถ้าอยู่ที่ Payment จะพาไปหน้า Profile
    } else {
      navigate("/profile/appointment"); // ถ้าไม่ได้อยู่ที่ Payment ให้ไปหน้า Payment
    }
  };

  return (
    <div style={{ minHeight: "844px" }}>
      <div className="box2">
        <img src={logo} alt="My Logo" className="Logo2-image" />
      </div>

      <div className="main-content2">
        <div className="appointment-form">
          <div className="headfrom1">นัดหมายการจอด</div>
          <form>
            <div className="form-row">
              <div className="form-group">
                <input
                  type="date"
                  className="form-control"
                  placeholder="วันที่"
                />
              </div>
              <div className="form-group">
                <input
                  type="time"
                  className="form-control"
                  placeholder="เวลา"
                />
              </div>
            </div>

            <div className="form-group">
              <input
                type="text"
                className="form-control"
                placeholder="ชื่อผู้ทำการนัด"
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                placeholder="ชื่อผู้ถูกเรียกนัด"
              />
            </div>
            <div className="form-group">
              <input
                type="tel"
                className="form-control"
                placeholder="เบอร์โทรติดต่อผู้ทำการนัด"
              />
            </div>
            <div className="form-group">
              <input
                type="tel"
                className="form-control"
                placeholder="เบอร์โทรติดต่อผู้ถูกนัด"
              />
            </div>
            <div className="form-buttons2">
              <Button className="btn2" onClick={handleBack}>
                <img src={Undo} alt="Back Icon" className="icon" />
                ย้อนกลับ
              </Button>
              <Button className="btn3" onClick={handleSubmit}>
                <img src={Send} alt="Send Icon" className="icon" />
                ส่ง
              </Button>
            </div>
          </form>
        </div>

        {showMessage && <div className="success-message">ได้รับการอนุมัติ</div>}

        {/* Navbar */}
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
                      location.pathname === "/profile/appointment" ? "active" : ""
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

export default Appointment;
