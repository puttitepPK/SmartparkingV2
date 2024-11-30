import React, { useEffect, useState } from "react";


import { useLocation, useNavigate, Link } from "react-router-dom";
import { Navbar, Nav, Button } from "react-bootstrap";
import { IoHome } from "react-icons/io5";
import { FaSearch, FaUser } from "react-icons/fa";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAddressCard } from "@fortawesome/free-solid-svg-icons";
import { faBuildingCircleCheck } from "@fortawesome/free-solid-svg-icons";
import "./EditMember.css";

import logo from "/public/Metthier Master Logo.png"; //ใส่โลโก้ซ้อนลิ้ง
import Profile1 from "/Profile1.png";

function EditMember({}) {
  const location = useLocation(); // Get current location
  const navigate = useNavigate(); // Navigate hook to change pages
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    phone: "",
    carRegistration: "",
  });

  const [isEditing, setIsEditing] = useState(false); // เพิ่ม state สำหรับโหมดแก้ไข

  useEffect(() => {
    const storedUser = localStorage.getItem("currentUser");
    if (storedUser) {
      setUserData(JSON.parse(storedUser)); // ดึงข้อมูลจาก localStorage และตั้งค่าที่ state
    }
  }, []);
  

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value || "", // ใช้ "" หาก value เป็น undefined
    }));
  };

const handleSubmit = (e) => {
  e.preventDefault();
  localStorage.setItem("currentUser", JSON.stringify(userData)); // บันทึกข้อมูลที่แก้ไขใน localStorage
  setIsEditing(false); // ออกจากโหมดแก้ไข
  navigate("/profile"); // นำผู้ใช้กลับไปที่หน้าโปรไฟล์
};

  const toggleEdit = () => {
    setIsEditing(!isEditing); // สลับโหมดแก้ไข
  };

  const handleBack = () => {
    navigate(-1); // This will take the user to the previous page
  };

  const handleProfileClick = () => {
    if (location.pathname === "/profile/edit-member") {
      navigate("/profile"); // ถ้าอยู่ที่ Payment จะพาไปหน้า Profile
    } else {
      navigate("/profile/edit-member"); // ถ้าไม่ได้อยู่ที่ Payment ให้ไปหน้า Payment
    }
  };

  return (
    <div style={{ minHeight: "844px" }}>
      <div className="box2">
        <img
          src={logo} // Removed 'public' as it's automatically handled by React
          alt="My Logo"
          className="Logo2-image"
        />
      </div>

      <div className="main-content2">
        <div className="profile-form-container">
          <div className="purple-box">
            <div className="white-box">
              <div className="purple-box-inner">
                <div className="profile-header">
                  <img
                    src={Profile1} // Corrected the path for profile image
                    alt="Profile"
                    className="profile-image"
                  />
                </div>
                <h3 style={{ color: "#FFFFFF" }}>{userData.name || "iice"}</h3>

                <div className="profile-form">
                  <form onSubmit={handleSubmit}>
                    <div className="form-group">
                      <label htmlFor="name">ชื่อที่แสดง</label>
                      <div className="input-group">
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={userData.name || ""}
                          onChange={handleInputChange}
                          disabled={!isEditing}
                          className="form-control"
                          placeholder="กรุณากรอกชื่อ"
                        />
                      </div>
                    </div>

                    <div className="form-group">
                      <label htmlFor="email"></label>
                      <div className="input-group">
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={userData.email || ""}
                          onChange={handleInputChange}
                          disabled={!isEditing}
                          className="form-control"
                          placeholder="กรุณากรอกอีเมล์"
                        />
                      </div>
                    </div>

                    <div className="form-group">
                      <label htmlFor="phone"></label>
                      <div className="input-group">
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={userData.phone || ""}
                          onChange={handleInputChange}
                          disabled={!isEditing}
                          className="form-control"
                          placeholder="กรุณากรอกเบอร์โทร"
                        />
                      </div>
                    </div>

                    <div className="form-group">
                      <label htmlFor="carRegistration"></label>
                      <div className="input-group">
                        <input
                          type="text"
                          id="carRegistration"
                          name="carRegistration"
                          value={userData.carRegistration || ""}
                          onChange={handleInputChange}
                          disabled={!isEditing}
                          className="form-control"
                          placeholder="กรุณากรอกเลขทะเบียนรถ"
                        />
                      </div>
                    </div>

                    <div className="form-buttons">
                      {/* Show back button when not in edit mode */}
                      {!isEditing && (
                        <button
                          type="button"
                          className="ButtonBack"
                          onClick={handleBack}
                        >
                          <i className="fa fa-arrow-left icon"></i> ย้อนกลับ
                        </button>
                      )}

                      <button
                        type="button"
                        className="button-edit"
                        onClick={toggleEdit}
                      >
                        <i
                          className={
                            isEditing ? "fa fa-times icon" : "fa fa-pencil icon"
                          }
                        ></i>
                        {isEditing ? "ยกเลิก" : "แก้ไขข้อมูล"}
                      </button>

                      {isEditing && (
                        <button type="submit" className="button-save">
                          <i className="fa fa-save icon"></i> บันทึก
                        </button>
                      )}
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>

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
                      location.pathname === "/profile/edit-member"
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

export default EditMember;
