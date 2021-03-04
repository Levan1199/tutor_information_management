import React, {Component} from 'react';
import {BreadcrumbItem, Breadcrumb, Button, Label, Col, Row} from 'reactstrap';
import { Link } from 'react-router-dom';
import {Control, Errors, Form} from 'react-redux-form';
import {Multiselect} from 'multiselect-react-dropdown';

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => (val) && (val.length >= len);
const isNumber = (val) => !isNaN(Number(val));
const validEmail = (val) => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(val)

class findTeacher extends Component {
    constructor(props){
        super(props);      
        
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            options: [{name: 'Srigar', id: 1},{name: 'Sam', id: 2}]
        };
    }
  
    handleSubmit(values){
        // this.props.postFeedback(values.firstname, values.lastname, values.telnum, values.email, values.agree, values.contactType, values.message);
        // console.log(JSON.stringify(this.state));
        // alert((values.name, values.lastname, values.telnum, values.email));
        // this.props.resetFeedbackForm();

        // console.log('Current State is: ' + JSON.stringify(values));
        // alert('Current State is: ' + JSON.stringify(values));
        alert('aa');
    }
    

    
    render(){
        return(
            <div className="container">
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to="/home">Home</Link></BreadcrumbItem>
                        <BreadcrumbItem active>Contact Us</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>Contact Us</h3>
                        <hr/>
                    </div>
                </div>
    
                <div className="row row-content">
                    <div className="col-12">
                    <h3>Location Information</h3>
                    </div>
                    <div className="col-12 col-sm-4 offset-sm-1">
                            <h5>Our Address</h5>
                            <address>
                            121, Clear Water Bay Road<br />
                            Clear Water Bay, Kowloon<br />
                            HONG KONG<br />
                            <i className="fa fa-phone"></i>: +852 1234 5678<br />
                            <i className="fa fa-fax"></i>: +852 8765 4321<br />
                            <i className="fa fa-envelope"></i>: <a href="mailto:confusion@food.net">confusion@food.net</a>
                            </address>
                    </div>
                    <div className="col-12 col-sm-6 offset-sm-1">
                        <h5>Map of our Location</h5>
                    </div>
                    <div className="col-12 col-sm-11 offset-sm-1">
                        <div className="btn-group" role="group">
                            <a role="button" className="btn btn-primary" href="tel:+85212345678"><i className="fa fa-phone"></i> Call</a>
                            <a role="button" className="btn btn-info"><i className="fa fa-skype"></i> Skype</a>
                            <a role="button" className="btn btn-success" href="mailto:confusion@food.net"><i className="fa fa-envelope-o"></i> Email</a>
                        </div>
                    </div>
                </div>
                <div className="row row-content">
                    <div className="col-12">
                        <h3>
                            Send us Your feedback
                        </h3>
                        <div className="col-12 col-md-9">
                            <Form model="feedback" onSubmit={(values)=>this.handleSubmit(values)}>
                                <Row className="form-group">
                                    <Label htmlFor="name" md={2}>Họ và tên</Label>
                                    <Col md={10}>
                                        <Control.text model=".name" id="name" name="name" 
                                        placeholder="Họ và tên" 
                                        className="form-control" 
                                        validators={{
                                            required, minLength:minLength(4), maxLength:maxLength(36)
                                        }}
                                        />
                                    <Errors
                                        className="text-danger"
                                        model=".name"
                                        show="touched"
                                        messages={{
                                            required:'Bạn cần điền mục này',
                                            minLength:'Cần nhiều hơn 4 chữ cái',
                                            maxLength:'Ít hơn 36 chữ cái'
                                        }}
                                    />
                                    </Col>
                                </Row>
                                <Row className="form-group">
                                    <Label htmlFor="lastname" md={2}>Last Name</Label>
                                    <Multiselect
                                        options={this.state.options} // Options to display in the dropdown
                                        selectedValues={this.state.selectedValue} // Preselected value to persist in dropdown
                                        onSelect={this.onSelect} // Function will trigger on select event
                                        onRemove={this.onRemove} // Function will trigger on remove event
                                        displayValue="name" // Property name to display in the dropdown options
                                        />
                                </Row>

                                {/* <Row className="form-group">
                                    <Label htmlFor="lastname" md={2}>Last Name</Label>
                                    <Col md={10}>
                                        <Control.select model=".district" name="district" className="form-control" defaultValue="1">
                                            <option value="1">Quận 1</option>
                                            <option value="2">Quận 2</option>
                                            <option value="3">Quận 3</option>
                                            <option value="4">Quận 4</option>
                                            <option value="5">Quận 5</option>
                                            <option value="6">Quận 6</option>
                                            <option value="7">Quận 7</option>
                                            <option value="8">Quận 8</option>
                                            <option value="9">Quận 9</option>
                                            <option value="10">Quận 10</option>
                                            <option value="11">Quận 11</option>
                                            <option value="12">Quận 12</option>
                                            <option value="13">Quận Thủ Đức</option>
                                            <option value="14">Quận Bình Thạnh</option>
                                            <option value="15">Quận Gò Vấp</option>
                                            <option value="16">Quận Phú Nhuận</option>
                                            <option value="17">Quận Tân Phú</option>
                                            <option value="18">Quận Bình Tân</option>
                                            <option value="19">Quận Tân Bình</option>
                                        </Control.select>
                                    </Col>                        
                                </Row> */}

                                <Row className="form-group">
                                    <Label htmlFor="name" md={2}>Địa chỉ</Label>
                                    <Col md={10}>
                                        <Control.text model=".address" id="address" name="address" 
                                        placeholder="Địa chỉ" 
                                        className="form-control" 
                                        validators={{
                                            required, minLength:minLength(4), maxLength:maxLength(36)
                                        }}
                                        />
                                    <Errors
                                        className="text-danger"
                                        model=".name"
                                        show="touched"
                                        messages={{
                                            required:'Bạn cần điền mục này',
                                            minLength:'Cần nhiều hơn 4 chữ cái',
                                            maxLength:'Ít hơn 36 chữ cái'
                                        }}
                                    />
                                    </Col>
                                </Row>

                                

                                <Row className="form-group">
                                <Label htmlFor="telnum" md={2}>Số điện thoại</Label>
                                    <Col md={10}>
                                        <Control.text model=".telnum" id="telnum" name="telnum"
                                            className="form-control"
                                            placeholder="Tel. number"
                                            validators={{
                                                required, minLength:minLength(3), maxLength:maxLength(15),
                                                isNumber
                                            }}
                                        />
                                        <Errors
                                        className="text-danger"
                                        model=".telnum"
                                        show="touched"
                                        messages={{
                                            required:'Required',
                                            minLength:'Must be greater than 2 characters',
                                            maxLength:'Must be 15 numbers or less',
                                            isNumber:'Must be a number'
                                        }}
                                        />
                                    </Col>
                                </Row>
                                
                                <Row className="form-group">
                                    <Label htmlFor="email" md={2}>Email</Label>
                                    <Col md={10}>
                                        <Control.text model=".email" id="email" name="email"
                                            placeholder="Email"
                                            className="form-control"
                                            validators={{
                                                required, validEmail
                                            }}
                                        />
                                        <Errors
                                        className="text-danger"
                                        model=".email"
                                        show="touched"
                                        messages={{
                                            required:'Required',
                                            validEmail:'Invalid Email Address'
                                        }}
                                        />

                                    </Col>
                                </Row>

                                <Row className="form-group">
                                    <Label htmlFor="grade" md={2}>Lớp</Label>
                                    <Col md={10}>
                                        {/* <Control.checkbox model=".grade" id="grade" name="grade"
                                            className="form-control"
                                            placeholder="Lớp">
                                        <option value="16" label="aa">Quận Phú Nhuận</option>
                                        </Control.checkbox> */}
                                        <div className="field">
                                        <label>
                                            <Control.checkbox model=".grade" value={true} />
                                            I am employed
                                        </label>
                                            </div>                                
                                        
                                    </Col>
                                </Row>

                                <Row className="form-group">
                                    <Label htmlFor="students" md={2}>Số lượng học sinh</Label>
                                    <Col md={10}>
                                        <Control.text model=".students" id="students" name="students"
                                            className="form-control"
                                            placeholder="Số lượng học sinh"
                                            validators={{
                                                required, minLength:minLength(3), maxLength:maxLength(15),
                                                isNumber
                                            }}
                                        />
                                        <Errors
                                        className="text-danger"
                                        model=".students"
                                        show="touched"
                                        messages={{
                                            required:'Required',
                                            isNumber:'Must be a number'
                                        }}
                                        />
                                    </Col>
                                </Row>

                                {/* <Row className="form-group">
                                    <Col md={{size: 6, offset: 2}}>
                                        <div className="form-check">
                                            <Label check>
                                                <Control.checkbox model=".agree"
                                                    name="agree"
                                                    className="form-check-input"
                                                /> {' '}
                                                <strong>May we contact you?</strong>
                                            </Label>
                                        </div>
                                    </Col>
                                    <Col md={{size: 3, offset: 1}}>
                                        <Control.select model=".contactType" name="contactType"
                                                className="form-control">
                                            <option>Tel.</option>
                                            <option>Email</option>
                                        </Control.select>
                                    </Col>
                                </Row>

                                <Row className="form-group">
                                    <Label htmlFor="message" md={2}>Your Feedback</Label>
                                    <Col md={10}>
                                        <Control.textarea model=".message" type="textarea" id="message" name="message"
                                            rows="12"
                                            className="form-control"/>
                                    </Col>
                                </Row> */}

                                <Row className="form-group">
                                    <Col md={{size: 10, offset: 2}}>
                                        <Button type="submit" color="primary">
                                            Send Feedback
                                        </Button>
                                    </Col>
                                </Row>
                            </Form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    
}

export default findTeacher;