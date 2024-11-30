//resetpass.jsx
import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { updatePasswordByPhoneNumber } from '../../../data/users';

import { Modal, Button } from "react-bootstrap";
import logo from "/public/Metthier Master Logo.png"; //ใส่โลโก้ซ้อนลิ้ง
import "./Resetpass.css";

import cancel from "/public/Cancel.png"; //ใส่โลโก้ซ้อนลิ้ง Correct
import Correct from "/public/Correct.png";

function Resetpass() {

  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const phoneNumber = localStorage.getItem("verifiedPhoneNumber"); // ดึงหมายเลขโทรที่ยืนยันแล้ว
 
  const [alertMessage, setAlertMessage] = useState(""); // สำหรับข้อความแจ้งเตือน
  const [showModal, setShowModal] = useState(false); // สำหรับการแสดง Modal
  const [isSuccess, setIsSuccess] = useState(false); // สำหรับสถานะของข้อความแจ้งเตือน

  const handleResetPassword = () => {
    if (!newPassword || !confirmPassword) {
      //alert("กรุณากรอกข้อมูลให้ครบ");
      setAlertMessage("กรุณากรอกข้อมูลให้ครบ");
      setIsSuccess(false); // แสดงไอคอน X mark
      setShowModal(true); // แสดง Modal เมื่อข้อมูลไม่ครบ
      return;
    }
    if (newPassword !== confirmPassword) {
      //alert("รหัสผ่านไม่ตรงกัน");
      setAlertMessage("รหัสผ่านไม่ตรงกัน");
      setIsSuccess(false); // แสดงไอคอน X mark
      setShowModal(true); // แสดง Modal เมื่อข้อมูลไม่ครบ
      return;
    }
    if (phoneNumber) {
      const success = updatePasswordByPhoneNumber(phoneNumber, newPassword);
      if (success) {
        //alert("รีเซ็ตรหัสผ่านสำเร็จ!");
        setAlertMessage("รีเซ็ตรหัสผ่านสำเร็จ!");
        setIsSuccess(true); // แสดงไอคอน ถูก
        setShowModal(true); // แสดง Modal เมื่อข้อมูลไม่ครบ
        setTimeout(() => {
          localStorage.removeItem("verifiedPhoneNumber"); // ลบข้อมูลเบอร์โทรที่ยืนยันแล้ว
          navigate("/login");
        }, 3000); // 3000ms = 3 วินาที

        // localStorage.removeItem("verifiedPhoneNumber"); // ลบข้อมูลเบอร์โทรออกหลังรีเซ็ต
        // navigate("/login");
      } else {
        //alert("เกิดข้อผิดพลาดในการรีเซ็ตรหัสผ่าน");
        setAlertMessage("เกิดข้อผิดพลาดในการรีเซ็ตรหัสผ่าน \n ไม่พบหมายเลขโทรศัพท์ในระบบที่ยืนยัน");
        setIsSuccess(false); // แสดงไอคอน X mark
        setShowModal(true); // แสดง Modal เมื่อข้อมูลไม่ครบ
      }
    } else {
      //alert("ไม่พบหมายเลขโทรศัพท์ที่ยืนยัน");
      setAlertMessage("ไม่พบหมายเลขโทรศัพท์ที่ยืนยัน");
      setIsSuccess(false); // แสดงไอคอน X mark
      setShowModal(true); // แสดง Modal เมื่อข้อมูลไม่ครบ
    }
  };

  // const handleReset = () => {
  //   navigate("/login"); // นำไปยังหน้าสมัครสมาชิก
  // };
  const closeModal = () => {
    setShowModal(false);
    setAlertMessage("");
  };

  return (
    <div style={{ minHeight: '844px' }}>
      <div className="box1">
      <img src={logo} alt="My Logo1" className="Logo-image" />
      </div>
      <div className="title">
        <p>กู้คืนรหัสผ่าน</p>
      </div>
      <div className="user1">
        <label></label>
        <input
          className="form-control"
          aria-label="default input example"
          type="password"
          placeholder="รหัสผ่านใหม่"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
      </div>

      <div className="pass1">
        <label></label>
        <input
          className="form-control"
          aria-label="default input example"
          type="password"
          placeholder="ยืนยันรหัสผ่าน"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </div>
      <button className="btn custom11-btn" onClick={handleResetPassword}>
        รีเช็ทรหัสผ่านใหม่
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
            src={isSuccess ? Correct :  cancel}
            alt={isSuccess ? "Success" : "Error"}
            style={{ width: "30px", marginRight: "15px", marginTop: "1px", whiteSpace: "pre-line"}}
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

export default Resetpass;
