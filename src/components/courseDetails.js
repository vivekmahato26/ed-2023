import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useMatches } from "react-router-dom";
import { courseDetails } from "../redux/slices/courseSlice";
import {
  Accordion,
  AccordionBody,
  AccordionHeader,
  AccordionItem,
  Button,
  Col,
  Row,
} from "reactstrap";
import axios from "axios";
import { baseUrl } from "../utils/api";

export default function CourseDetails() {
  const pathData = useMatches();
  const dispatch = useDispatch();
  const courseData = useSelector((state) => state.Course.value.courseDetails);
  useEffect(() => {
    console.log(pathData);
    dispatch(courseDetails(pathData[0].params.courseId));
  }, []);
  const [open, setOpen] = useState("0");
  const toggle = (id) => {
    if (open === id) {
      setOpen();
    } else {
      setOpen(id);
    }
  };
  const handlePayment = async() => {
    try {
        const {data} = await axios.post(baseUrl+"/payment/checkout",courseData,{
          headers: {
            Authorization: "Bearer "+ localStorage.getItem("token")
          }
        });
        localStorage.setItem("cs_id", data.id);
        window.location.assign(data.url);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div>
      <p>{courseData.title}</p>
      <p>{courseData.desc}</p>
      <p>{courseData.duration}</p>
      <p>$ {courseData.price}</p>
      <Accordion open={open} toggle={toggle}>
        {courseData.curriculum &&
          courseData.curriculum.map((e, i) => {
            return (
              <AccordionItem>
                <AccordionHeader targetId={i}>
                  <Row>
                    <Col>{e.title}</Col>
                  </Row>
                </AccordionHeader>
                <AccordionBody accordionId={i}>
                  <Row>
                    <Col>{e.desc}</Col>
                  </Row>
                    <Col>{e.duration}</Col>
                  <Row>
                  </Row>
                </AccordionBody>
              </AccordionItem>
            );
          })}
      </Accordion>
      <Button block color="danger" onClick={handlePayment}>Subscribe</Button>
    </div>
  );
}
