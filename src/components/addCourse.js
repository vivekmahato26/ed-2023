import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { Button, Form, FormGroup, Input, Label } from 'reactstrap'
import { addCourse } from '../redux/slices/courseSlice';

export default function AddCourse() {
    const [courseData,setCourseData] = useState({});
    const dispatch = useDispatch();
    const handleClick = (e) => {
      e.preventDefault();
      dispatch(addCourse({...courseData,curriculum: [], students: []}));
    }
  return (
    <div>
        <Form>
        <h6>Add Course</h6>
            <FormGroup>
                <Label>Course Title</Label>
                <Input
                type='text'
                placeholder='Intro to react js'
                name='title'
                id='title'
                value={courseData.title}
                onChange={(e) => setCourseData({...courseData,title: e.target.value})}
                />
                <Label>Course Description</Label>
                <Input
                type='text'
                placeholder='Intro to react js'
                name='desc'
                id='desc'
                value={courseData.desc}
                onChange={(e) => setCourseData({...courseData,desc: e.target.value})}
                />
                <Label>Price</Label>
                <Input
                type='text'
                placeholder='1000'
                name='price'
                id='price'
                value={courseData.price}
                onChange={(e) => setCourseData({...courseData,price: e.target.value})}
                />
                <Label>Duration</Label>
                <Input
                type='text'
                placeholder='1 month'
                name='duration'
                id='duration'
                value={courseData.duration}
                onChange={(e) => setCourseData({...courseData,duration: e.target.value})}
                />
                
            </FormGroup>
            <Button onClick={e => handleClick(e)}>Add Course</Button>
        </Form>
    </div>
  )
}
