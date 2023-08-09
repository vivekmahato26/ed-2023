import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Outlet } from "react-router-dom";
import { getAllCourses } from "../redux/slices/courseSlice";
import { Col, Input, Row, Button } from "reactstrap";

export default function EditCourse() {
  const [selectedCourse, setSelectedCourse] = useState(null);
  const courses = useSelector((state) => state.Course.value.courses);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllCourses());
  }, []);
  return (
    <div>
      <Row>
        <Col>
          <Input
            type="select"
            onChange={(e) => setSelectedCourse(e.target.value)}
          >
            {courses.map((e, index) => {
              return (
                <option value={e._id} key={index}>
                  {e.title}
                </option>
              );
            })}
          </Input>
        </Col>
      </Row>
      <Row>
        <Col>
          <Link
            to="/editCourse/edit/topics"
            style={{ textDecoration: "none", color: "#fff" }}
          >
            <Button block color="primary">
              Add Topics
            </Button>
          </Link>
        </Col>
        <Col>
          <Link
            to="/editCourse/edit/update"
            style={{ textDecoration: "none", color: "#fff" }}
          >
            <Button block color="primary">
              Update Course
            </Button>
          </Link>
        </Col>
      </Row>
      <Outlet context={selectedCourse} />
    </div>
  );
}
