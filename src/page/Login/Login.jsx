//Login.jsx
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { authenticateUser } from "../../data/users";

import "./Login.css";
import { Modal, Button } from "react-bootstrap";

import cancel from "/public/Cancel.png"; //ใส่โลโก้ซ้อนลิ้ง

function Login({ onLogin }) {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");            // เพิ่มสถานะ error สำหรับเก็บข้อความข้อผิดพลาด
  const [showModal, setShowModal] = useState(false); // สถานะสำหรับการแสดง Modal
  const [isSuccess, setIsSuccess] = useState(false); // สำหรับสถานะของข้อความแจ้งเตือน

  //ของเก่า
  // const handleLogin = () => {
  //   const user = authenticateUser(username, password);
  //   if (user) {
  //     onLogin();   // เรียกใช้ onLogin เพื่ออัปเดตสถานะการเข้าสู่ระบบใน App.js
  //     localStorage.setItem("loggedIn", "true"); // บันทึกสถานะการล็อกอิน
  //     navigate(user.role === "Member" ? "/home" : "/home");
  //   } else {
  //     setError("รหัสผ่านไม่ถูกต้อง โปรดตรวจสอบความถูกต้อง");
  //     setIsSuccess(false); // แสดงไอคอน X mark
  //     setShowModal(true); // แสดง Modal เมื่อมีข้อผิดพลาด
  //   }
  // };

  const handleLogin = () => {
    if (!username || !password) {
      setError("กรุณากรอกข้อมูลชื่อหรือเบอร์โทรศัทพ์ และรหัสผ่านให้ครบถ้วน");
      setIsSuccess(false); // แสดงไอคอน X mark
      setShowModal(true); // แสดง Modal เมื่อมีข้อผิดพลาด
      return; // ยุติการทำงานหากข้อมูลไม่ครบ
    }

    // const user = authenticateUser(username, password);
    // if (user) {
    //   onLogin(user.username, user.role); // เรียกใช้ onLogin เพื่ออัปเดตสถานะการเข้าสู่ระบบใน App.js
    //   localStorage.setItem("loggedIn", "true"); // บันทึกสถานะการล็อกอิน
    //   navigate(user.role === "Member" ? "/home" : "/home");
    // } else {
    //   setError("รหัสผ่านไม่ถูกต้อง โปรดตรวจสอบความถูกต้อง");
    //   setIsSuccess(false); // แสดงไอคอน X mark
    //   setShowModal(true); // แสดง Modal เมื่อมีข้อผิดพลาด
    // }
    const user = authenticateUser(username, password);
    if (user) {
      localStorage.setItem("loggedIn", "true"); // บันทึกสถานะการล็อกอิน
      localStorage.setItem("userRole", user.role); // เก็บ role
      localStorage.setItem("userName", user.username); // เก็บชื่อ
      localStorage.setItem("userPhone", user.phoneNumber); // เก็บเบอร์โทร

      onLogin(user.username, user.role); // ส่งข้อมูลการล็อกอิน
      navigate(user.role === "Member" ? "/home" : "/home");
    } else {
      setError("รหัสผ่านไม่ถูกต้อง โปรดตรวจสอบความถูกต้อง");
      setIsSuccess(false);
      setShowModal(true);
    }
  };

  const handleSignup = () => {
    navigate("/signup"); // นำไปยังหน้าสมัครสมาชิก
  };

  const handleForgotPassword = () => {
    navigate("/forgot-password"); // นำไปยังหน้าลืมรหัสผ่าน
  };
  const closeModal = () => {
    setShowModal(false);
    setError("");
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
        <p>ลงชื่อเข้าสู่ระบบ</p>
      </div>
      <div className="userlogin">
        <label></label>
        <input
          className="form-control"
          aria-label="default input example"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="บัญชีผู้ใช้/เบอร์โทรศัพท์"
        />
      </div>
      <div className="passlogin">
        <label></label>
        <input
          className="form-control"
          aria-label="default input example"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="รหัสผ่าน"
        />
      </div>
      <div className="forgot">
        <button
          className="btn btn-light custom1-btn  btn-sm"
          onClick={handleForgotPassword}
        >
          ลืมรหัสผ่าน?
        </button>
        <button
          className="btn btn-light custom1-btn btn-sm"
          onClick={handleSignup}
        >
          ลงทะเบียน
        </button>
      </div>
      <button className="btn custom-btn" onClick={handleLogin}>
        เข้าสู่ระบบ
      </button>
      <Link to="https://access.line.me/oauth2/v2.1/login?returnUri=%2Foauth2%2Fv2.1%2Fauthorize%2Fconsent%3Fscope%3Dopenid%2Bprofile%2Bfriends%2Bgroups%2Btimeline.post%2Bmessage.write%26response_type%3Dcode%26redirect_uri%3Dhttps%253A%252F%252Fsocial-plugins.line.me%252Fwidget%252FloginCallback%253FreturnUrl%253Dhttps%25253A%25252F%25252Fsocial-plugins.line.me%25252Fwidget%25252Fclose%26state%3D9fec98665820574ebc349f47d089a6%26client_id%3D1446101138&loginChannelId=1446101138&fbclid=IwY2xjawGpKnFleHRuA2FlbQIxMAABHcPq1RU8nWQq28aBUZm1glnXQy06bIyLAUqmL4N6LfuTdeGde6nI7BjDaw_aem_H8ppgZcsQ2iyboos1SN31g#/">
        <button className="btn custom2-btn">
          <i
            className="bi bi-line"
            style={{ marginRight: "8px", fontSize: "19px" }}
          ></i>{" "}
          Login With LINE account
        </button>
      </Link>


      {/* Bootstrap Modal สำหรับแสดงข้อความแจ้งเตือน */}
      <Modal
        show={showModal}
        onHide={closeModal}
        centered
        className="custom-modal"
      >
        <Modal.Header closeButton>
          <Modal.Title className="custom-title">เกิดข้อผิดพลาด !</Modal.Title>
        </Modal.Header>
        <Modal.Body className="custom-body2">
          {/* แสดงไอคอน Checkmark หรือ X mark ตามสถานะ */}
          <img
            src={cancel}
            alt="Error"
            style={{ width: "30px", marginRight: "10px", marginTop: "-3px" }}
          />
          {error}
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

export default Login;
