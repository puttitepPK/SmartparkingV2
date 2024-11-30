//forgot.jsx
import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

import { Modal, Button } from "react-bootstrap";
import "./Forgot.css";

import cancel from "/public/Cancel.png"; //ใส่โลโก้ซ้อนลิ้ง Correct
import Correct from "/public/Correct.png";

function Forgot() {
  const navigate = useNavigate();

  const [alertMessage, setAlertMessage] = useState(""); // สำหรับข้อความแจ้งเตือน
  const [showModal, setShowModal] = useState(false); // สำหรับการแสดง Modal
  const [isSuccess, setIsSuccess] = useState(false); // สำหรับสถานะของข้อความแจ้งเตือน

  //OTP
  const sendOtp = (phoneNumber) => {
    // สร้างรหัส OTP (เลข 6 หลักแบบสุ่ม)
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    
    // เก็บ OTP ใน localStorage (สำหรับการจำลอง)
    localStorage.setItem("otp", otp);
    localStorage.setItem("otpPhoneNumber", phoneNumber);
  
   // alert(`OTP ของคุณคือ: ${otp} (สำหรับการจำลอง)`); // แจ้ง OTP (ในระบบจริงจะส่งผ่าน SMS)
    setAlertMessage(`OTP ของคุณคือ: ${otp}`);
    setIsSuccess(true); // แสดงไอคอน X mark
    setShowModal(true); // แสดง Modal เมื่อข้อมูลไม่ครบ
  };

  // const verifyOtp = (phoneNumber, otpInput) => {
  //   const storedOtp = localStorage.getItem("otp");
  //   const storedPhoneNumber = localStorage.getItem("otpPhoneNumber");
  
  //   if (storedOtp && storedPhoneNumber === phoneNumber && storedOtp === otpInput) {
  //     setAlertMessage("ยืนยัน OTP สำเร็จ!");
  //     setIsSuccess(true);
  //     setShowModal(true);
  //     return true; // ใช้เพื่อตรวจสอบ OTP ว่าถูกต้อง
  //   } else {
  //     setAlertMessage("OTP ไม่ถูกต้อง หรือเบอร์โทรศัพท์ไม่ตรงกัน");
  //     setIsSuccess(false);
  //     setShowModal(true);
  //     return false; // ใช้เพื่อตรวจสอบ OTP ผิด
  //   }
  // };

  const verifyOtp = (phoneNumber, otpInput) => {
    const storedOtp = localStorage.getItem("otp");
    const storedPhoneNumber = localStorage.getItem("otpPhoneNumber");
  
    if (storedOtp && storedPhoneNumber === phoneNumber && storedOtp === otpInput) {
      localStorage.setItem("verifiedPhoneNumber", phoneNumber); // เก็บเบอร์โทรที่ยืนยันแล้ว
      setAlertMessage("ยืนยัน OTP สำเร็จ!");
      setIsSuccess(true);
      setShowModal(true);
      return true;
    } else {
      setAlertMessage("OTP ไม่ถูกต้อง หรือเบอร์โทรศัพท์ไม่ตรงกัน");
      setIsSuccess(false);
      setShowModal(true);
      return false;
    }
  };
  

  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);

  const handleSendOtp = () => {
    if (!phoneNumber) {
      //alert("กรุณากรอกเบอร์โทรศัพท์");
      setAlertMessage("กรุณากรอกเบอร์โทรศัพท์");
      setIsSuccess(false); // แสดงไอคอน X mark
      setShowModal(true); // แสดง Modal เมื่อข้อมูลไม่ครบ
      return;
    }
    if (phoneNumber.length < 6) { // ตรวจสอบว่าเบอร์โทรมีอย่างน้อย 6 หลัก
      setAlertMessage("กรอกเบอร์โทรศัพท์ให้ถูกต้อง");
      setIsSuccess(false);
      setShowModal(true);
      return;
    }
    sendOtp(phoneNumber); // เรียกฟังก์ชันจำลองการส่ง OTP
    setOtpSent(true); 
  };

const handleVerifyOtp = () => {
  if (!otp) {
    setAlertMessage("กรุณากรอกรหัส OTP");
    setIsSuccess(false);
    setShowModal(true);
    return;
  }

  if (verifyOtp(phoneNumber, otp)) {
    setShowModal(true);
    setTimeout(() => {
      setShowModal(false); // ปิด Modal ก่อน
      navigate("/forgot-password/resetpass");
    }, 3000); // รอ Modal แสดงข้อความเสร็จ
  }
};

  const closeModal = () => {
    setShowModal(false);
    setAlertMessage("");
  };



  return (
    <div style={{ minHeight: '844px' }}>
      <div className="box1">
        <img
          src="./Metthier Master Logo.png"
          alt="My Logo"
          className="Logo-image"
        />
      </div>
      <div className="title">
        <p>กู้คืนรหัสผ่าน</p>
      </div>
      <div className="user1">
        <label></label>
        <input
          className="form-control"
          aria-label="default input example"
          value={phoneNumber}
          placeholder="เบอร์โทรศัพท์"
          type="text"
          inputMode="numeric"
          onChange={(e) => setPhoneNumber(e.target.value.replace(/[^0-9]/g, ''))} 
        />
      </div>
      <div className="otp">
        <button
          className="btn custom33-btn"
          onClick={handleSendOtp}
        >
          ส่ง OTP
        </button>
      </div>
      {/* //{otpSent && ( */}
      <div className="pass1">
        <label></label>
        <input
          className="form-control"
          aria-label="default input example"
          type="text"
          inputMode="numeric"
          placeholder="OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value.replace(/[^0-9]/g, ''))}
        />
      </div>
      {/* )} */}
      <button
          className="btn custom11-btn"
          onClick={handleVerifyOtp}
        >
          ต่อไป
        </button>

              {/* Bootstrap Modal สำหรับแสดงข้อความแจ้งเตือน */}
      <Modal
        show={showModal}
        onHide={closeModal}
        centered
        className="custom-modal"
      >
        <Modal.Header closeButton>
          <Modal.Title className="custom-title">การแจ้งเตือน</Modal.Title>
        </Modal.Header>
        <Modal.Body className="custom-body2">
            {/* แสดงไอคอน Checkmark หรือ X mark ตามสถานะ */}
            <img
            src={isSuccess ? Correct : cancel}
            alt={isSuccess ? "Success" : "Error"}
            style={{ width: "30px", marginRight: "10px" , marginTop: "-1px"}}
          />
          {alertMessage}</Modal.Body>
        <Modal.Footer>
          <Button variant="btn custom3-btn" onClick={closeModal}>
            ตกลง
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Forgot;
