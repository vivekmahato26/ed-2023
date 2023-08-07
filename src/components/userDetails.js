import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { verifyToken } from "../utils/util";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "../redux/slices/userSlice";
import {
  Row,
  Button,
  Spinner,
  Col,
  Accordion,
  AccordionBody,
  AccordionHeader,
  AccordionItem,
  Card,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Form,
  FormGroup,
  Label,
  Input
} from "reactstrap";
import { addAddress, fetchAddress } from "../redux/slices/addressSlice";
import { IoAddCircleOutline } from "react-icons/io5";

export default function UserDetails() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userDetails = useSelector((state) => state.User.value.userDetails);
  const address = useSelector((state) => state.Address.value.addresses);
  const [open, setOpen] = useState("1");
  const toggle = (id) => {
    if (open === id) {
      setOpen();
    } else {
      setOpen(id);
    }
  };

  const [addressInp, setAddressInp] = useState({});
  const [modal, setModal] = useState(false);

  const toggleModal = () => setModal(!modal);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
    const email = localStorage.getItem("email");
    if (!verifyToken(token, email, userId)) navigate("/login");
    dispatch(fetchUser());
    dispatch(fetchAddress());
  }, []);
  return (
    <div>
      <Row style={{ marginTop: "1.5rem" }}>
        {userDetails._id ? (
          <Col
            md={{
              offset: 3,
              size: 6,
            }}
          >
            <Row style={{ marginBottom: "1.5rem" }}>
              <Col>{userDetails.name}</Col>
              <Col>{userDetails.email}</Col>
              <Col>{userDetails.phone}</Col>
              <Row>
                <Col md={4}>{userDetails.dob}</Col>
                <Col md={4}>{userDetails.age}</Col>
                <Col md={4}>{userDetails.gender}</Col>
              </Row>
            </Row>
            <Accordion open={open} toggle={toggle}>
              <AccordionItem>
                <AccordionHeader targetId="1">Address</AccordionHeader>
                <AccordionBody accordionId="1">
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(2,1fr)",
                      gap: "1rem",
                    }}
                  >
                    <Card className=" d-flex text-center align-items-center" onClick={toggleModal}>
                      <IoAddCircleOutline
                        style={{ fontSize: "5rem", padding: "1rem" }}
                      />
                    </Card>
                    {address.map((e) => {
                      return (
                        <Card className=" d-flex text-center align-items-center">
                            <Col>{e.door}</Col>
                            <Col>{e.street}</Col>
                            <Col>{e.landmark}</Col>
                            <Col>{e.locality}</Col>
                            <Col>{e.city}</Col>
                            <Col>{e.state}</Col>
                            <Col>{e.pin}</Col>
                            <Col>{e.country}</Col>
                        </Card>
                      );
                    })}
                  </div>
                </AccordionBody>
              </AccordionItem>
            </Accordion>
          </Col>
        ) : (
          <Button color="primary" disabled>
            <Spinner size="sm">Loading...</Spinner>
            <span> Loading</span>
          </Button>
        )}
      </Row>
      <Modal isOpen={modal} toggle={toggle} >
        <ModalHeader toggle={toggleModal}>Add Address</ModalHeader>
        <ModalBody>
          <Row>
            <Col md={{
              offset:1,
              size: 10
            }}>
              <Form>
                <FormGroup>
                  <Label htmlFor="door">Door/Flat No.</Label>
                  <Input
                  id="door"
                  placeholder="Door/Flat No."
                  type="text"
                  value={addressInp.door}
                  onChange={(e)=> setAddressInp({...addressInp, door: e.target.value})}
                  />
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="street">Street</Label>
                  <Input
                  id="street"
                  placeholder="Street"
                  type="text"
                  value={addressInp.street}
                  onChange={(e)=> setAddressInp({...addressInp, street: e.target.value})}
                  />
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="locality">Locality</Label>
                  <Input
                  id="locality"
                  placeholder="Locality"
                  type="text"
                  value={addressInp.locality}
                  onChange={(e)=> setAddressInp({...addressInp, locality: e.target.value})}
                  />
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="landmark">Landmark</Label>
                  <Input
                  id="landmark"
                  placeholder="Landmark"
                  type="text"
                  value={addressInp.landmark}
                  onChange={(e)=> setAddressInp({...addressInp, landmark: e.target.value})}
                  />
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="pin">Pin Code</Label>
                  <Input
                  id="pin"
                  placeholder="Pin Code"
                  type="text"
                  value={addressInp.pin}
                  onChange={(e)=> setAddressInp({...addressInp, pin: e.target.value})}
                  />
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="city">City</Label>
                  <Input
                  id="city"
                  placeholder="City"
                  type="text"
                  value={addressInp.city}
                  onChange={(e)=> setAddressInp({...addressInp, city: e.target.value})}
                  />
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="state">State</Label>
                  <Input
                  id="state"
                  placeholder="State"
                  type="text"
                  value={addressInp.state}
                  onChange={(e)=> setAddressInp({...addressInp, state: e.target.value})}
                  />
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="country">Country</Label>
                  <Input
                  id="country"
                  placeholder="Country"
                  type="text"
                  value={addressInp.country}
                  onChange={(e)=> setAddressInp({...addressInp, country: e.target.value})}
                  />
                </FormGroup>
              </Form>
            </Col>
          </Row>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={() => {
            dispatch(addAddress({addressInp,dispatch}));
            toggleModal();
          }}>
            Save
          </Button>
          <Button color="secondary" onClick={toggleModal}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}
