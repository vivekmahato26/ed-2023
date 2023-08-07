import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { Row, Col, FormGroup,FormFeedback, Form, Label, Input, Button } from "reactstrap";
import { changePassword } from "../redux/slices/userSlice";

export default function ResetPass() {
  const [password, setPassword] = useState({});
  const [err, setErr] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const linkData = useSelector(state => state.User.value.verifyToken);
  // const passData = useSelector(state => state.User.value.changePass);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (password.password !== password.confirmPassword) {
      return setErr(true);
    } else {
      setErr(false);
      dispatch(changePassword({
        password: password.password,
        userId: linkData.userId,
        tokenId: linkData.tokenId
      }))
        navigate("/login");
    }
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
          <FormGroup  className="position-relative">
            <Label for="password">Password</Label>
            <Input
              id="password"
              name="password"
              placeholder="*******"
              type="password"
              value={password.password}
              invalid={err}
              onChange={(e) =>
                setPassword({ ...password, password: e.target.value })
              }
            />
            <FormFeedback tooltip>
              Password didn't match
            </FormFeedback>
          </FormGroup>
          <FormGroup  className="position-relative">
            <Label for="confirmPassword">Confirm Password</Label>
            <Input
              id="confirmPassword"
              name="confirmPassword"
              placeholder="*******"
              type="password"
              invalid={err}
              value={password.confirmPassword}
              onChange={(e) =>
                setPassword({ ...password, confirmPassword: e.target.value })
              }
            />
            <FormFeedback tooltip>
              Password didn't match
            </FormFeedback>
          </FormGroup>
          <Button
            outline={true}
            block={true}
            color="primary"
            onClick={(e) => handleSubmit(e)}
          >
            Change Password
          </Button>
        </Form>
      </Col>
    </Row>
  );
}
