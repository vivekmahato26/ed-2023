import React, { useEffect } from "react";
import { Link, useNavigate, Outlet } from "react-router-dom";
import { verifyToken } from "../utils/util";
import { Button, Col, Row } from "reactstrap";

export default function AdminDash() {
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
    const email = localStorage.getItem("email");
    const access = localStorage.getItem("access");
    if (!verifyToken(token, email, userId)) navigate("/login");
  }, []);
  return (
    <Row style={{margin:"1rem"}}>
      <Col md={2}>
        <Row>
            <Link to={"/editCourse/add"} style={{textDecoration:"none"}}>
              <Button color="primary" block >
                Add Course
              </Button>
            </Link>
        </Row>
        <Row>
            <Link to={"/editCourse/edit"} style={{textDecoration:"none"}}>
              <Button color="danger" block >
                Edit Course
              </Button>
            </Link>
        </Row>
      </Col>
      <Col md={10}>
        <Outlet />
      </Col>
    </Row>
  );
}
