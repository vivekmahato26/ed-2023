import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { getAllCourses } from "../redux/slices/courseSlice";
import { verifyToken } from "../utils/util";
import { Card, Col, Row } from "reactstrap";
import { fetchSubscriptions } from "../redux/slices/subscriptionSlice";
import { fetchUser } from "../redux/slices/userSlice";

export default function Home() {
  const navigate = useNavigate();
  const courses = useSelector((state) => state.Course.value.courses);
  const subscriptions = useSelector(
    (state) => state.Subscription.value.subscriptions
  );
  const userDetails = useSelector((state) => state.User.value.userDetails);
  const dispatch = useDispatch();
  useEffect(() => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
    const email = localStorage.getItem("email");
    if (verifyToken(token, userId, email)) navigate("/login");
    dispatch(getAllCourses());
    dispatch(fetchUser());
  }, []);
  useEffect(() => {
    dispatch(fetchSubscriptions(userDetails.subscriptions));
  }, [userDetails]);
  return (
    <div style={{ margin: "1rem" }}>
      <p>My Courses</p>
      <Row>
        {subscriptions.map((e) => {
          const courseData = e.courseId
          return (
            <Col>
              <Link to={"/view/" + courseData._id} style={{ textDecoration: "none" }}>
                <Card style={{ padding: "10px" }}>
                  <Row>
                    <Col>{courseData.title}</Col>
                  </Row>
                  <Row>
                    <Col>{courseData.desc}</Col>
                  </Row>
                  <Row>
                    <Col>{courseData.duration}</Col>
                    <Col className="text-end">$ {courseData.price}</Col>
                  </Row>
                </Card>
              </Link>
            </Col>
          );
        })}
      </Row>
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
