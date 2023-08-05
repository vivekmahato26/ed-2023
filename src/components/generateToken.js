import {useState} from 'react'
import { Col, Row, Form, FormGroup, Input, Label, Button } from "reactstrap";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { generateToken } from '../redux/slices/userSlice';

export default function GenerateToken() {
  const [userDetails, setUserDetails] = useState({});
  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    dispatch(generateToken( userDetails));
  };
  return (
    <Row>
    <Col
      md={{
        offset: 3,
        size: 6,
      }}
    >
      <Form>
        <FormGroup>
          <Label for="email">Email</Label>
          <Input
            id="email"
            name="email"
            placeholder="abc@xyz.com"
            type="email"
            onChange={(e) =>
              setUserDetails({ ...userDetails, email: e.target.value })
            }
          />
        </FormGroup>
        <Button
          outline={true}
          block={true}
          color="primary"
          onClick={(e) => handleSubmit(e)}
        >
          Reset Password
        </Button>
      </Form>
      <Row>
        <Col className="text-end">
          <Link to={"/register"}>Dont have an account?</Link>
        </Col>
      </Row>
    </Col>
  </Row>
  )
}
