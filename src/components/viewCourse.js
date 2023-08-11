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
import YouTube from "react-youtube";

export default function ViewDetails() {
  const pathData = useMatches();
  const dispatch = useDispatch();
  const courseData = useSelector((state) => state.Course.value.courseDetails);
  useEffect(() => {
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
  const opts = {
    height: "390",
    width: "640",
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 0,
    },
  };
  const onReady = (event) => {
    // access to player in all event handlers via event.target
    event.target.pauseVideo();
  };
  return (
    <div>
      <p>{courseData.title}</p>
      <p>{courseData.desc}</p>
      <p>{courseData.duration}</p>
      <p>$ {courseData.price}</p>
      <Accordion open={open} toggle={toggle}>
        {courseData.curriculum &&
          courseData.curriculum.map((e, i) => {
            const videoId = e.video.split("v=")[1].split("&")[0];
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
                    <Col md={{ offset: 3, size: 6 }}>
                      <YouTube
                        videoId={videoId}
                        opts={opts}
                        onReady={onReady}
                      />
                    </Col>
                  </Row>
                </AccordionBody>
              </AccordionItem>
            );
          })}
      </Accordion>
    </div>
  );
}
