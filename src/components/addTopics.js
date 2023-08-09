import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useOutletContext } from "react-router-dom";
import { Button, Form, FormGroup, Input, Label, Row } from "reactstrap";
import { addTopic } from "../redux/slices/topicSlice";

export default function AddTopics() {
  const [topicData, setTopicData] = useState({});
  const dispatch = useDispatch();
  const courseId = useOutletContext();
  const handleClick = (e) => {
    e.preventDefault();
    dispatch(addTopic({ ...topicData, courseId }));
  };
  return (
    <Row>
      <Form>
        <FormGroup>
          <Label>Title</Label>
          <Input
            type="text"
            onChange={(e) =>
              setTopicData({ ...topicData, title: e.target.value })
            }
          />
        </FormGroup>
        <FormGroup>
          <Label>Desc</Label>
          <Input
            type="text"
            onChange={(e) =>
              setTopicData({ ...topicData, desc: e.target.value })
            }
          />
        </FormGroup>
        <FormGroup>
          <Label>Video</Label>
          <Input
            type="text"
            onChange={(e) =>
              setTopicData({ ...topicData, video: e.target.value })
            }
          />
        </FormGroup>
        <FormGroup>
          <Label>Duration</Label>
          <Input
            type="text"
            onChange={(e) =>
              setTopicData({ ...topicData, duration: e.target.value })
            }
          />
        </FormGroup>
        <Button color="primary" block onClick={(e) => handleClick(e)}>
          Add Topic
        </Button>
      </Form>
    </Row>
  );
}
