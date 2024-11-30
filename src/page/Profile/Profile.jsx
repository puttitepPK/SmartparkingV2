//Profile.jsx
import React, { useEffect, useState } from "react";

import { Navbar, Nav, Button } from "react-bootstrap";
import { FaSearch, FaHistory, FaUser } from "react-icons/fa";
import { IoHome } from "react-icons/io5";
import { faBuildingCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAddressCard } from "@fortawesome/free-solid-svg-icons";
import { useLocation, useNavigate, Link } from "react-router-dom";
import "./Profile.css";

function Profile({ onLogout }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [role, setRole] = useState("");
  const [userData, setUserData] = useState({
    name: "",
    phone: "",
    status: "",
    carRegistration: "",
  });
  
  // const [userData, setUserData] = useState({
  //   name: "tester", // ค่าเริ่มต้น
  //   phone: "065-15X-XXXX", // ค่าเริ่มต้น
  //   status: "Member", // ค่าเริ่มต้น (ล็อคไว้)
  //   carRegistration: "999xll", // เพิ่มค่าเริ่มต้นสำหรับทะเบียนรถ
  // });

  useEffect(() => {
    const storedUser = localStorage.getItem("currentUser");
    if (storedUser) {
      setUserData(JSON.parse(storedUser));
    }
    // ตรวจสอบหากมีข้อมูลที่ส่งมาจาก EditMember
    // if (location.state) {
    //   setUserData((prevData) => ({
    //     ...prevData, // ใช้ข้อมูลเดิม
    //     ...location.state, // อัปเดตเฉพาะข้อมูลที่ส่งเข้ามาใหม่
    //     status: prevData.status, // ล็อคค่า status ไม่ให้อัปเดต
    //   }));
    // }

    const storedRole = localStorage.getItem("userRole");
    if (storedRole) {
      setRole(storedRole); // เก็บ role ของผู้ใช้งาน
    }
  }, [location.state]);


  const handleEditMemberClick = () => {
    navigate("/profile/edit-member"); // เปลี่ยนไปหน้า EditMember
  };

  const handleAppointmentClick = () => {
    navigate("/profile/appointment"); // เปลี่ยนเป็นเส้นทาง URL
  };

  const handleReportClick = () => {
    navigate("/profile/report"); // เปลี่ยนเป็นเส้นทางไปยังหน้า report
  };
  const handlepaymentClick = () => {
    navigate("/profile/payment"); // เปลี่ยนเป็นเส้นทางไปยังหน้า report
  };

  return (
    <div style={{ minHeight: "844px" }}>
      <div className="box2">
        <img
          src="./Metthier Master Logo.png"
          alt="My Logo"
          className="Logo2-image"
        />
      </div>

      <div className="main-content2">
        <div className="userprofilehome2">
          <div className="datahomeprofile2">
            <p className="profileinfoname2" style={{ fontWeight: "bold" }}>
            {userData.name || "No Name"}
            </p>

            <p> 
              Status : <span>{userData.status || "Unknown"}</span>
            </p>
            <p>
              Phone : <span>{userData.phone || "No Phone"}</span>
            </p>
            <p> 
              ทะเบียนรถ : <span>{userData.carRegistration || "No Car"}</span>
            </p>
            <div className="photohomeprofile2">
              <img src="./Profile1.png" alt="My Logo" className="profile2" />
            </div>
          </div>
        </div>

        {/* Button content */}
        <div className="button-container-center">
          <div className="content-buttons">
            <Button
              variant="light"
              className="content-edit"
              style={{
                fontWeight: "bold",
                display: "flex", /* ใช้ flexbox */
                justifyContent: "center", /* จัดกลางในแนวนอน */
                alignItems: "center", /* จัดกลางในแนวตั้ง */
                textAlign: "center", /* จัดข้อความให้อยู่กลาง */
              }}
              onClick={handleEditMemberClick}
            >
              แก้ไขข้อมูลส่วนตัว
            </Button>

            {role === "Visitor" && (
            <Button
              variant="light"
              className="content-Payment"
              style={{
                fontWeight: "bold",
                display: "flex", /* ใช้ flexbox */
                justifyContent: "center", /* จัดกลางในแนวนอน */
                alignItems: "center", /* จัดกลางในแนวตั้ง */
                textAlign: "center", /* จัดข้อความให้อยู่กลาง */
              }}
              onClick={handlepaymentClick}
            >
              ชำระเงิน
            </Button>
            )}
            {role === "Member" && (
            <Button
              variant="light"
              className="content-Appointment"
              style={{
                fontWeight: "bold",
                display: "flex", /* ใช้ flexbox */
                justifyContent: "center", /* จัดกลางในแนวนอน */
                alignItems: "center", /* จัดกลางในแนวตั้ง */
                textAlign: "center", /* จัดข้อความให้อยู่กลาง */
              }}
              onClick={handleAppointmentClick}
            >
              นัดหมายการจอด
            </Button>
            )}
            <Button
              variant="light"
              className="content-Report"
              style={{
                fontWeight: "bold",
                display: "flex", /* ใช้ flexbox */
                justifyContent: "center", /* จัดกลางในแนวนอน */
                alignItems: "center", /* จัดกลางในแนวตั้ง */
                textAlign: "center", /* จัดข้อความให้อยู่กลาง */
              }}
              onClick={handleReportClick}
            >
              แจ้งปัญหา
            </Button>
          </div>
        </div>

        <Button
          variant="light"
          className="content-Logout1"
          onClick={onLogout}
        >
          ออกจากระบบ
        </Button>

        {/* Bottom navbar */}
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
    </div>
  );
}

export default Profile;
