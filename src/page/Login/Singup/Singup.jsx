//signup.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { addUser, getAllUsers } from "../../../data/users";

import { Modal, Button } from "react-bootstrap";
import "./Signup.css";

import cancel from "/public/Cancel.png"; //ใส่โลโก้ซ้อนลิ้ง Correct
import Correct from "/public/Correct.png";

function Signup() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    userName: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
  });

  const [alertMessage, setAlertMessage] = useState(""); // สำหรับข้อความแจ้งเตือน
  const [showModal, setShowModal] = useState(false); // สำหรับการแสดง Modal
  const [isSuccess, setIsSuccess] = useState(false); // สำหรับสถานะของข้อความแจ้งเตือน

  // ดึงข้อมูลผู้ใช้ที่สมัครแล้วเมื่อ component โหลด
  // useEffect(() => {
  //   const users = getAllUsers();
  //   console.log("รายชื่อผู้ใช้ที่สมัครแล้ว:", users);
  // }, []);

  // ฟังก์ชันสำหรับจัดการการเปลี่ยนแปลงของอินพุต
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // ฟังก์ชันสำหรับส่งฟอร์ม
  const handleSubmit = (e) => {
    e.preventDefault();
    // ตรวจสอบว่าทุกฟิลด์มีข้อมูลครบถ้วน
    for (let key in formData) {
      if (formData[key].trim() === "") {
        setAlertMessage("กรุณากรอกข้อมูลให้ครบ");
        setIsSuccess(false); // แสดงไอคอน X mark
        setShowModal(true); // แสดง Modal เมื่อข้อมูลไม่ครบ
        return;
      }
    }
    if (formData.password !== formData.confirmPassword) {
      setAlertMessage("รหัสผ่านไม่ตรงกัน");
      setIsSuccess(false); // แสดงไอคอน X mark
      setShowModal(true); // แสดง Modal เมื่อรหัสผ่านไม่ตรงกัน
      return;
    }

    // ส่งข้อมูลผู้ใช้ใหม่ไปที่ users.jsx
    const success = addUser(
      formData.fullName,
      formData.userName,
      formData.phoneNumber,
      formData.password
    );

    if (success) {
      setAlertMessage("การลงทะเบียนเสร็จสิ้น! ยินดีต้อนรับ");
      setIsSuccess(true); // แสดงไอคอน Checkmark
      setShowModal(true);
      setTimeout(() => navigate("/login"), 5000); // เปลี่ยนหน้าไปยัง /login หลังจาก 5 วินาที
      //navigate("/login");
    } else {
      setAlertMessage("ชื่อผู้ใช้หรือเบอร์โทรศัพท์นี้มีอยู่ในระบบแล้ว");
      setIsSuccess(false); // แสดงไอคอน X mark
      setShowModal(true); // แสดง Modal เมื่อชื่อผู้ใช้ซ้ำ
    }
  };
  const closeModal = () => {
    setShowModal(false);
    setAlertMessage("");
  };

  return (
    <div style={{ minHeight: "844px" }}>
      <div className="box1">
        <img
          src="./Metthier Master Logo.png"
          alt="My Logo"
          className="Logo-image"
        />
      </div>
      <div className="title">
        <p>ลงทะเบียนเข้าใช้งาน</p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="user1">
          <label></label>
          <input
            className="form-control"
            aria-label="default input example"
            type="text"
            name="fullName"
            placeholder="ชือ-นามสกุล"
            value={formData.fullName}
            onChange={handleChange}
          />
        </div>
        <div className="user1">
          <label></label>
          <input
            className="form-control"
            aria-label="default input example"
            type="text"
            name="userName"
            placeholder="ชือบัญชีผู้ใช้"
            value={formData.userName}
            onChange={handleChange}
          />
        </div>
        <div className="user1">
          <label></label>
          <input
            className="form-control"
            aria-label="default input example"
            type="text"
            placeholder="เบอร์โทรศัพท์"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={(e) => {
              const value = e.target.value;
              const filteredValue = value.replace(/[^0-9]/g, "");
              if (filteredValue.length <= 10) {
                // จำกัดความยาวไม่เกิน 10 ตัว
                handleChange({
                  target: { name: "phoneNumber", value: filteredValue },
                });
              }
            }}
          />
        </div>
        <div className="pass1">
          <label></label>
          <input
            className="form-control"
            aria-label="default input example"
            type="password"
            placeholder="รหัสผ่าน"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>
        <div className="pass1">
          <label></label>
          <input
            className="form-control"
            aria-label="default input example"
            type="password"
            placeholder="ยืนยันรหัสผ่าน"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="btn custom11-btn">
          ลงทะเบียน
        </button>
      </form>

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
            style={{ width: "30px", marginRight: "10px", marginTop: "1px" }}
          />
          {alertMessage}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="btn custom3-btn" onClick={closeModal}>
            ตกลง
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Signup;
