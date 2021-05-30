import React, {Component} from 'react';
import {BreadcrumbItem, Breadcrumb, Button, Label, Col, Row} from 'reactstrap';
import { Link } from 'react-router-dom';
// import {Control, Errors, Form} from 'react-redux-form';
import {Multiselect} from 'multiselect-react-dropdown';

import { Formik, Form, Field, ErrorMessage, FastField } from "formik";
import * as Yup from "yup";

// const required = (val) => val && val.length;
// const maxLength = (len) => (val) => !(val) || (val.length <= len);
// const minLength = (len) => (val) => (val) && (val.length >= len);
// const isNumber = (val) => !isNaN(Number(val));
// const validEmail = (val) => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(val)

class findTeacher extends Component {
    constructor(props){
        super(props);      
        
        this.handleSubmit = this.handleSubmit.bind(this);
        this.multiSelectDropdown = this.multiSelectDropdown.bind(this);
        this.state = {
            initialValues: {
                name: '',
                district: [''],
                address: '',
                telnum:'',
                grade: [''],
                subject: [''],
                students: '',
                periodAWeek:'',
                time:'',
                description: ''
            },
            validationSchema: Yup.object({
                name: Yup.string()
                    .required('Bạn cần điền mục này')
                    .min(4,'Cần nhiều hơn 4 chữ cái')
                    .max(36,'Ít hơn 36 chữ cái'),
                // telnum: Yup.number()
                //     .min(10,'Số điện thoại cần có 10 hoặc 11 số')
                //     .max(11, 'Số điện thoại cần có 10 hoặc 11 số')
                //     .required('Bạn cần điền mục này')
            }),
            options:{
                district:[
                    {name: 'Quận 1', id: 1},
                    {name: 'Quận 2', id: 2},
                    {name: 'Quận 3', id: 3},
                    {name: 'Quận 4', id: 4},
                    {name: 'Quận 5', id: 5},
                    {name: 'Quận 6', id: 6},
                    {name: 'Quận 7', id: 7},
                    {name: 'Quận 8', id: 8},
                    {name: 'Quận 9', id: 9},
                    {name: 'Quận 10', id: 10},
                    {name: 'Quận 11', id: 11},
                    {name: 'Quận 12', id: 12},
                    {name: 'Quận Thủ Đức', id: 13},
                    {name: 'Quận Bình Thạnh', id: 14},
                    {name: 'Quận Tân Bình', id: 15},
                    {name: 'Quận Phú Nhuận', id: 16},
                    {name: 'Quận Tân Phú', id: 17},
                    {name: 'Quận Bình Tân', id: 18},
                    {name: 'Quận Gò Vấp', id: 19}
                ],
                grade:[
                    {name: 'Lớp 1', id: 1},
                    {name: 'Lớp 2', id: 2},
                    {name: 'Lớp 3', id: 3},
                    {name: 'Lớp 4', id: 4},
                    {name: 'Lớp 5', id: 5},
                    
                ],
                subject:[
                    {name: 'Toán', id: 1},
                    {name: 'Lý', id: 2},
                    {name: 'Hóa', id: 3},
                ]

            }
        }
    }      
        
  
    handleSubmit(values){
        console.log('Current State is: ' +JSON.stringify(values));
    }

    multiSelectDropdown({field, form, meta, ...props}){
        const optionName = field.name;
        const options = this.state.options[optionName];
        return (
            <Multiselect
                options={options}
                displayValue="name" 
                showCheckbox
                onSelect={(value)=>{
                   form.setFieldValue(optionName,value);
                }}
            />
        );
    }
    
    render(){
        return(
            <div className="container">
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to="/home">Trang chủ</Link></BreadcrumbItem>
                        <BreadcrumbItem active>Đăng ký tìm gia sư</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>Đăng ký tìm gia sư</h3>
                        <hr/>
                    </div>
                </div>
    
                <div className="row row-content">
                    <div className="col-12">
                        <Formik className="col-12 col-md-9"
                            initialValues={this.state.initialValues}
                            onSubmit={this.handleSubmit}
                            validationSchema={this.state.validationSchema}
                        >
                            <Form >
                                <Row className="form-group">
                                    <Label htmlFor="name" md={2}>Họ và tên</Label>
                                    <Col md={10}>
                                        <Field type="text"  id="name" name="name" 
                                        placeholder="Họ và tên" 
                                        className="form-control"                                        
                                        />
                                    <ErrorMessage name="name"/>
                                    </Col>
                                </Row>

                                <Row className="form-group">
                                    <Label htmlFor="district" md={2}>Quận</Label>
                                    <Col md={10}>
                                        <FastField
                                            id="district"
                                            name="district"
                                            component={this.multiSelectDropdown}
                                        />                                        
                                    </Col>
                                </Row>

                                <Row className="form-group">
                                    <Label htmlFor="address" md={2}>Địa chỉ</Label>
                                    <Col md={10}>
                                        <Field type="textarea"  id="address" name="address" 
                                        placeholder="Địa chỉ" 
                                        className="form-control"                                        
                                        />
                                    <ErrorMessage name="address"/>
                                    </Col>
                                </Row>

                                <Row className="form-group">
                                    <Label htmlFor="telnum" md={2}>Số điện thoại</Label>
                                    <Col md={10}>
                                        <Field type="text"  id="telnum" name="telnum" 
                                        placeholder="Số điện thoại" 
                                        className="form-control"                                        
                                        />
                                    <ErrorMessage name="telnum"/>
                                    </Col>
                                </Row>

                                <Row className="form-group">
                                    <Label htmlFor="grade" md={2}>Lớp</Label>
                                    <Col md={10}>
                                        <FastField id="grade" name="grade" 
                                        className="form-control"    
                                        component={this.multiSelectDropdown}                                    
                                        />
                                    <ErrorMessage name="grade"/>
                                    </Col>
                                </Row>

                                <Row className="form-group">
                                    <Label htmlFor="subject" md={2}>Môn học</Label>
                                    <Col md={10}>
                                        <FastField id="subject" name="subject" 
                                        className="form-control"    
                                        component={this.multiSelectDropdown}                                    
                                        />
                                    <ErrorMessage name="subject"/>
                                    </Col>
                                </Row>

                                <Row className="form-group">
                                    <Label htmlFor="students" md={2}>Số lượng học sinh</Label>
                                    <Col md={10}>
                                        <Field type="text"  id="students" name="students" 
                                        placeholder="Số lượng học sinh" 
                                        className="form-control"                                        
                                        />
                                    <ErrorMessage name="students"/>
                                    </Col>
                                </Row>

                                <Row className="form-group">
                                    <Label htmlFor="periodAWeek" md={2}>Số buổi trong tuần</Label>
                                    <Col md={10}>
                                        <Field type="text"  id="periodAWeek" name="periodAWeek" 
                                        placeholder="Số buổi trong tuần" 
                                        className="form-control"                                        
                                        />
                                    <ErrorMessage name="periodAWeek"/>
                                    </Col>
                                </Row>
                                
                                <Row className="form-group">
                                    <Label htmlFor="time" md={2}>Thời gian</Label>
                                    <Col md={10}>
                                        <Field type="text"  id="time" name="time" 
                                        placeholder="VD: T3-T5-T7, 18h-20h" 
                                        className="form-control"                                        
                                        />
                                    <ErrorMessage name="time"/>
                                    </Col>
                                </Row>

                                <Row className="form-group">
                                    <Label htmlFor="description" md={2}>Yêu cầu khác</Label>
                                    <Col md={10}>
                                        <Field type="textarea"  id="description" name="description" 
                                        placeholder="Yêu cầu khác" 
                                        className="form-control"                                        
                                        />
                                    <ErrorMessage name="description"/>
                                    </Col>
                                </Row>

                                <Row className="form-group">
                                    <Col md={{size: 10, offset: 2}}>
                                        <Button type="submit" color="primary">
                                            Xác nhận
                                        </Button>
                                    </Col>
                                </Row>
                            </Form>
                        </Formik>
      
                    </div>
                </div>
            </div>
        );
    }
    
}

export default findTeacher;