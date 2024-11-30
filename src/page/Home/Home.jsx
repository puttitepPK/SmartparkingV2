//Home.jsx
import React, { useEffect, useState } from "react";
import { Navbar, Nav } from "react-bootstrap";

import { faAddressCard } from "@fortawesome/free-solid-svg-icons";
import { House, Search, CardChecklist, Person } from "react-bootstrap-icons"; // ใช้ไอคอนจาก Bootstrap Icons
import { FaSearch, FaHistory, FaUser } from "react-icons/fa"; // นำเข้าไอคอนที่ต้องการ
import { faBuildingCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IoHome } from "react-icons/io5";

import { useLocation, Link } from "react-router-dom";
import "./Home.css";
import GraphComponent from "./Graph/graph";

function Home({}) {
  const location = useLocation(); // ใช้ location เพื่อตรวจสอบเส้นทางปัจจุบัน

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  useEffect(() => {
    const storedRole = localStorage.getItem("userRole");
    const storedName = localStorage.getItem("userName");
    const storedPhone = localStorage.getItem("userPhone"); // ดึงเบอร์โทร

    if (storedRole) {
      setRole(storedRole);
      setName(storedName || ""); // ป้องกัน undefined
      setPhone(storedPhone || ""); // ป้องกัน undefined
    }

    // บันทึกข้อมูลลง localStorage ในรูปแบบ JSON
    if (storedName && storedPhone && storedRole) {
    const currentUser = {
      name: storedName || "",
      phone: storedPhone || "",
      status: storedRole,
      carRegistration: "9 รถ 9999 กรุงเทพฯ", // ใส่ข้อมูลจริงตามต้องการ
    };
    localStorage.setItem("currentUser", JSON.stringify(currentUser));
  }
  }, []);


  const [role, setRole] = useState("");
  useEffect(() => {
    const storedRole = localStorage.getItem("userRole");
    if (storedRole) {
      setRole(storedRole); // เก็บ role ของผู้ใช้งาน
    }
  }, []);

  return (
    <div style={{ minHeight: "900px" }}>
      <div>
        <div className="box2">
          <img
            src="./Metthier Master Logo.png"
            alt="My Logo"
            className="Logo2-image"
          />
        </div>
      </div>

      <div className="main-content">
        {/* Profile Member*/}
        {role === "Member" && (
          <div className="userprofilehome">
            <div className="datahomeprofile">
              <p>{name}</p>
              <p>
                Status : <span>Member</span>
              </p>
              <p>
                Phone : <span>{phone}</span>
              </p>
              <div className="photohomeprofile">
                <img src="./Profile1.png" alt="My Logo" className="profile1" />
              </div>
            </div>
          </div>
        )}
        {/* Profile Member*/}
        {role === "Visitor" && (
          <div className="userprofilehome">
            <div className="datahomeprofile">
              <p>{name}</p>
              <p>
                Status : <span>Visitor</span>
              </p>
              <p>
                Phone : <span>{phone}</span>
              </p>
              <div className="photohomeprofile">
                <img src="./Profile1.png" alt="My Logo" className="profile1" />
              </div>
            </div>
          </div>
        )}

        {/* แสดงสถานะ  Member*/}
        {role === "Member" && (
          <div className="buildingLot">
            <div className="lot1">
              <div className="parkingphoto1">
                <img src="./Parking1.png" alt="My Logo" className="parking1" />
              </div>
              <p className="titlelot">อาคารลานจอด</p>
              <p>อาคาร A ลาน 1</p>
              <p>
                เวลา : <span>13:00 - ตอนนี้</span>
              </p>
              <p>
                สถานะ : <span> กำลังจอดอยู่</span>
              </p>
            </div>
          </div>
        )}
        {/* แสดงสถานะ  Visitor ใช้วิธีแบ่งโรล คล้ายๆ profile มั่ง*/}
        {role === "Visitor" && (
          <div className="buildingLot2">
            <div className="lot2">
              <div className="parkingphoto2">
                <img src="./Parking1.png" alt="My Logo" className="parking1" />
              </div>
              <p className="titlelot2">การนัดหมาย</p>
              <p>ชื่อผู้ทำการนัด : 1 </p>
              <p>เบอร์โทร : 123456</p>
              <p>วันที่ 27/11/67</p>
              <p>เวลา 09:00</p>
            </div>
          </div>
        )}

        {/* QR Code */}
  
        <div className="QRCodescan">
          <Link to="/home/ScanQRCode" className="link-no-underline">
            <p className="bottomscan">กดเพื่อสแกน</p>
            <div className="BoxQRCode">
              <img src="./scanQRcode.png" alt="My Logo" className="QRCode" />
            </div>
          </Link>
        </div>
   

        {/* graph */}
        <div className="boxgraph">
          <div className="graphbox1">
            <GraphComponent />
          </div>
        </div>
      </div>

      {/* Navber */}
      <div className="boxnav1">
        <div className="boxnav">
          <div className="bottom-navbar">
            <Nav className="justify-content-around">
              <Nav.Item>
                <Link
                  to="/home"
                  className={`nav-item home-link ${
                    location.pathname === "/home" ? "active" : ""
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
  );
}

export default Home;
