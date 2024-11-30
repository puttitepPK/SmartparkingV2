//true.jsx
import React, { useState, useEffect } from "react";
import html2canvas from "html2canvas"; // นำเข้า html2canvas สำหรับการจับภาพ
import { Nav, Button } from "react-bootstrap";
import { FaSearch, FaHistory, FaUser, FaDownload } from "react-icons/fa"; // นำเข้าไอคอนที่ต้องการ
import { useLocation, useNavigate, Link } from "react-router-dom";
import { IoHome } from "react-icons/io5";
import { faBuildingCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAddressCard } from "@fortawesome/free-solid-svg-icons";
import logo from "/public/Metthier Master Logo.png"; //ใส่โลโก้ซ้อนลิ้ง
import true1 from "/public/true.png"; //ใส่โลโก้ซ้อนลิ้ง
import TrueMoneyQRCode from "/public/TrueMoneyQRCode.png"; //ใส่โลโก้ซ้อนลิ้ง

import Undo from "/Undo.png";
import "./True.css";

function True({}) {
  const location = useLocation(); // ใช้ location เพื่อตรวจสอบเส้นทางปัจจุบัน
  const navigate = useNavigate(); // สร้าง navigate สำหรับเปลี่ยนหน้า 
  const { total } = location.state || {}; // รับค่าผลรวมที่ส่งมา

  // สถานะเวลาถอยหลัง
  const [countdown, setCountdown] = useState(15); // ตั้งค่าเริ่มต้นเป็น 10 วินาที

  // ฟังก์ชัน handleProfileClick เพื่อนำกลับไปหน้า Profile
  const handleProfileClick = () => {
    if (location.pathname === "/profile/payment/true") {
      navigate("/profile"); // ถ้าอยู่ที่ Payment จะพาไปหน้า Profile
    } else {
      navigate("/profile/payment/true"); // ถ้าไม่ได้อยู่ที่ Payment ให้ไปหน้า Payment
    }
  };

  // ฟังก์ชันสำหรับจับภาพและบันทึกเป็นไฟล์รูปภาพ
  const handleSaveImage = () => {
    html2canvas(document.querySelector(".savebilprompt")).then((canvas) => {
      const link = document.createElement("a");
      link.href = canvas.toDataURL("image/png");
      link.download = "promptpay-receipt.png";
      link.click();
    });
  };

  // เริ่มนับเวลาถอยหลัง
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000); // ลด 1 และ ลดเวลาทุก 1 วินาที
      return () => clearTimeout(timer); // เคลียร์ timer เมื่อ component ถูกทำลาย
    } else {
      navigate("/profile/payment/true/unsuccessful"); // เปลี่ยนหน้าเมื่อเวลาหมด
    }
  }, [countdown, navigate]);

  return (
    <div style={{ minHeight: "100%" }}>
      <div>
        <div className="box3">
          <img src={logo} alt="My Logo1" className="Logo3-image" />
        </div>
      </div>

      <div className="main-content">
        {/*ใบเสร็จ */}
        <div className="receipt-container">
          <div className="payment-methods">
            <h2>วิธีการชำระเงิน</h2>
            <button className="payment-btn truemoney">
              <img src={true1} alt="Logo1" className="btn-logo" /> TrueMoney
            </button>

            <div className="savebilprompt">
              <div className="qrprompt">
                <img
                  src={TrueMoneyQRCode}
                  alt="Logo1"
                  className="logotruemoney"
                />
              </div>
              <div className="totaltruemoney">
                <p>ลานจอดรถ</p>
                <p>012-XXX-567X</p>
                <div className="total2-truemoney">
                  <p>
                    จำนวนเงิน : <span>฿ { total }</span>
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* ปุ่มบันทึกภาพ */}
          <button onClick={handleSaveImage} className="save-image-btn">
            <FaDownload size={28} /> <div>บันทึกรูป</div>
          </button>

          {/* แสดงเวลาถอยหลัง */}
          <div className="countdown-timer">
            <p>
              กรุณาดำเนินการภายใน: <span>{countdown} วินาที</span>
            </p>
          </div>

          <Link
            to="/profile/payment/true/finished"
            className="link-no-underline"
          >
            <button className="promptpay-btn operation8"></button>
          </Link>
        </div>

        <div className="form-buttonsP">
          <Button className="btn2" onClick={() => navigate(-1)}>
            <img src={Undo} alt="Back Icon" className="icon33" />
            ย้อนกลับ
          </Button>
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
                      location.pathname === "/profile/payment/true" ? "active" : ""
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

export default True;