import React, { useState } from 'react'
import { Form, FormGroup, Input, Label } from 'reactstrap'

export default function AddCourse() {
    const [courseData,setCourseData] = useState({});
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
            </FormGroup>
        </Form>
    </div>
  )
}
