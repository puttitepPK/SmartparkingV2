//payment.jsx
import React, { useState, useEffect } from "react";
import { Nav, Button } from "react-bootstrap";
import { FaSearch, FaHistory, FaUser } from "react-icons/fa"; // นำเข้าไอคอนที่ต้องการ
import { useLocation, useNavigate, Link } from "react-router-dom";
import { IoHome } from "react-icons/io5";
import { faBuildingCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAddressCard } from "@fortawesome/free-solid-svg-icons";

import logo from "/public/Metthier Master Logo.png"; //ใส่โลโก้ซ้อนลิ้ง
import promptpay from "/public/prompt-pay-logo.png"; //ใส่โลโก้ซ้อนลิ้ง
import true1 from "/public/true.png"; //ใส่โลโก้ซ้อนลิ้ง
import cash from "/public/Cash-PNG-Photo.png"; //ใส่โลโก้ซ้อนลิ้ง

import Undo from "/Undo.png";
import "./Payment.css";

function Payment({}) {
  const location = useLocation(); // ใช้ location เพื่อตรวจสอบเส้นทางปัจจุบัน
  const navigate = useNavigate(); // สร้าง navigate สำหรับเปลี่ยนหน้า

  const [serviceFee, setServiceFee] = useState(0);
  const [penaltyFee, setPenaltyFee] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [total, setTotal] = useState(() => {
    // ตรวจสอบว่าเคยมี total เก็บใน sessionStorage หรือยัง
    const savedTotal = sessionStorage.getItem("total");
    return savedTotal ? parseInt(savedTotal, 10) : 0;
  });

  useEffect(() => {
    const savedData = sessionStorage.getItem("paymentData");

    if (savedData) {
      // หากมีข้อมูลใน sessionStorage ให้โหลดค่ามาใช้งาน
      const {
        penaltyFee,
        serviceFee,
        discount,
        total: savedTotal,
      } = JSON.parse(savedData);
      setPenaltyFee(penaltyFee);
      setServiceFee(serviceFee);
      setDiscount(discount);
      setTotal(savedTotal);
    } else {
      // หากไม่มีข้อมูลใน sessionStorage ให้สุ่มค่าใหม่
      const minPenalty = 10;
      const maxPenalty = 20;
      const minServiceFee = 40;
      const maxServiceFee = 60;
      const maxTotal = 80;

      const randomPenaltyFee =
        minPenalty + Math.floor(Math.random() * (maxPenalty - minPenalty + 1));
      const randomServiceFee =
        minServiceFee +
        Math.floor(Math.random() * (maxServiceFee - minServiceFee + 1));
      const randomDiscount = Math.max(
        0,
        Math.min(
          maxTotal - (randomPenaltyFee + randomServiceFee),
          Math.floor(Math.random() * 81)
        )
      );

      const calculatedTotal =
        randomPenaltyFee + randomServiceFee - randomDiscount;

      // อัปเดต state
      setPenaltyFee(randomPenaltyFee);
      setServiceFee(randomServiceFee);
      setDiscount(randomDiscount);
      setTotal(calculatedTotal);

      // บันทึกข้อมูลใหม่ใน sessionStorage
      const paymentData = {
        penaltyFee: randomPenaltyFee,
        serviceFee: randomServiceFee,
        discount: randomDiscount,
        total: calculatedTotal,
      };
      sessionStorage.setItem("paymentData", JSON.stringify(paymentData));
    }
  }, []);

  
  //สำรองของเก่าเป็นการสุ่มทุกๆรอบ

  // const [serviceFee, setServiceFee] = useState(0); // ค่าจอด
  // const [penaltyFee, setPenaltyFee] = useState(0); // ค่าปรับ
  // const [discount, setDiscount] = useState(0); // ส่วนลด
  // const [total, setTotal] = useState(0); // ยอดรวม

  // useEffect(() => {
  //   const minPenalty = 10; // ค่าปรับขั้นต่ำ
  //   const maxPenalty = 20; // ค่าปรับสูงสุด
  //   const minServiceFee = 40; // ค่าจอดขั้นต่ำ
  //   const maxServiceFee = 60; // ค่าจอดสูงสุด
  //   const maxTotal = 80; // ยอดรวมสูงสุด
  //   let randomDiscount = 0;

  //   // สุ่มค่าปรับและค่าจอด
  //   const randomPenaltyFee = minPenalty + Math.floor(Math.random() * (maxPenalty - minPenalty + 1));
  //   const randomServiceFee = minServiceFee + Math.floor(Math.random() * (maxServiceFee - minServiceFee + 1));

  //   // คำนวณส่วนลดโดยต้องให้ยอดรวมไม่เกิน 80
  //   const randomMaxDiscount = maxTotal - (randomPenaltyFee + randomServiceFee);
  //   randomDiscount = Math.max(0, Math.min(randomMaxDiscount, Math.floor(Math.random() * 81)));

  //   // ตั้งค่าที่ได้
  //   setPenaltyFee(randomPenaltyFee);
  //   setServiceFee(randomServiceFee);
  //   setDiscount(randomDiscount);
  //   setTotal(randomPenaltyFee + randomServiceFee - randomDiscount);
  // }, []);



  // ฟังก์ชัน handleProfileClick เพื่อนำกลับไปหน้า Profile
  const handleProfileClick = () => {
    if (location.pathname === "/profile/payment") {
      navigate("/profile"); // ถ้าอยู่ที่ Payment จะพาไปหน้า Profile
    } else {
      navigate("/profile/payment"); // ถ้าไม่ได้อยู่ที่ Payment ให้ไปหน้า Payment
    }
  };

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
          <div className="receipt-header">
            <p>อาคารที่เข้าจอด : อาคาร A ลาน 1</p>
          </div>

          <div className="receipt-details">
            <p className="headpay">ใบเสร็จชำระเงิน</p>
            <p>
              ค่าบริการ : <span>{serviceFee} บาท</span>
            </p>
            <p>
              ค่าปรับ : <span>{penaltyFee} บาท</span>
            </p>
            <p>
              ค่าส่วนลด : <span>{discount} บาท</span>
            </p>

            <div className="boxtotal">
              <p className="total">
                ยอดชำระทั้งหมด : <span>{total} บาท</span>
              </p>
            </div>

            <p>
              สถานที่จอดรถ : <span>อาคาร A ลาน 1 </span>
            </p>
            <p>
              เลขที่บัตร : <span>79456</span>
            </p>
            <p>
              วันที่/เวลาเข้า : <span>26/11/2024</span>
            </p>
            <p>
              วันที่/เวลาปัจจุบัน : <span>26/11/2024</span>
            </p>
            <p>
              จำนวนชั่วโมง : <span>ตลอดวัน</span>
            </p>
          </div>

          <div className="payment-methods">
            <h2>วิธีการชำระเงิน</h2>
            <Link
              to="/profile/payment/promptpay"
              state={{ total }}
              className="link-no-underline"
            >
              <button className="payment-btn promptpay">
                <img src={promptpay} alt="Logo1" className="btn-logo" />{" "}
                PromptPay
              </button>
            </Link>
            <Link
              to="/profile/payment/true"
              state={{ total }}
              className="link-no-underline"
            >
              <button className="payment-btn truemoney">
                <img src={true1} alt="Logo1" className="btn-logo" /> TrueMoney
              </button>
            </Link>
          </div>
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
                      location.pathname === "/profile/payment" ? "active" : ""
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

export default Payment;
