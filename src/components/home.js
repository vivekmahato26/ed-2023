import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { getAllCourses } from "../redux/slices/courseSlice";
import { verifyToken } from "../utils/util";
import { Card, Col, Row } from "reactstrap";

export default function Home() {
  const navigate = useNavigate();
  const courses = useSelector((state) => state.Course.value.courses);
  const dispatch = useDispatch();
  useEffect(() => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
    const email = localStorage.getItem("email");
    if (verifyToken(token, userId, email)) navigate("/login");
    dispatch(getAllCourses());
  }, []);
  return (
    <div style={{ margin: "1rem" }}>
      <p>My Courses</p>
      <p>All Courses</p>
      <Row>
        {courses.map((e) => {
          return (
            <Col>
              <Link to={"/" + e._id} style={{ textDecoration: "none" }}>
                <Card style={{ padding: "10px" }}>
                  <Row>
                    <Col>{e.title}</Col>
                  </Row>
                  <Row>
                    <Col>{e.desc}</Col>
                  </Row>
                  <Row>
                    <Col>{e.duration}</Col>
                    <Col className="text-end">$ {e.price}</Col>
                  </Row>
                </Card>
              </Link>
            </Col>
          );
        })}
      </Row>
    </div>
  );
}
