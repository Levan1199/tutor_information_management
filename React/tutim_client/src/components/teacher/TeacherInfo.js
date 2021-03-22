import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {Breadcrumb, BreadcrumbItem} from 'reactstrap';
import {Card, CardImg, CardText, CardBody, CardTitle, 
    Media,CardSubtitle, UncontrolledCarousel, Jumbotron,
    Label, Modal, ModalHeader, ModalBody, Button, Row, Col} from 'reactstrap';
import {LocalForm, Control} from 'react-redux-form';
// import { Loading } from './LoadingComponent';
// import {baseUrl} from '../shared/baseUrl';
import {FadeTransform} from 'react-animation-components';
import {TEXT} from '../../shared/basicText';
// import local data
import './teacherInfo.css';

import { Avatar } from '@material-ui/core';

// export const Timee = new Date().toISOString();

function RenderCard(){
    return(
        <Card>
            <CardTitle>
                {TEXT[0].name}
            </CardTitle>
            <CardImg src={'/assets/images/download.png'} alt={TEXT[0].name}/>
        </Card>
    );
}

class CommentForm extends Component {

    constructor(props) {
        super(props);

        this.toggleModal = this.toggleModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        
        this.state = {
          isNavOpen: false,
          isModalOpen: false
        };
    }

    toggleModal() {
        this.setState({
          isModalOpen: !this.state.isModalOpen
        });
    }

    handleSubmit(values) {
        this.toggleModal();
        this.props.postComment(this.props.dishId, values.rating, values.comment);
    }

    render() {
        return(
        <div>
            <Button outline onClick={this.toggleModal}><span className="fa fa-pencil fa-lg"></span></Button>
            <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
            <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
            <ModalBody>
                <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                    <Row className="form-group">
                        <Col>
                        <Label htmlFor="rating">Rating</Label>
                        <Control.select model=".rating" id="rating" className="form-control" defaultValue={'1'}>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                        </Control.select>
                        </Col>
                    </Row>
                    <Row className="form-group">
                        <Col>
                        <Label htmlFor="comment">Comment</Label>
                        <Control.textarea model=".comment" id="comment"
                                    rows="6" className="form-control" />
                        </Col>
                    </Row>
                    <Button type="submit" className="bg-primary">
                        Submit
                    </Button>
                </LocalForm>
            </ModalBody>
           </Modal>
        </div>
        );
    }

}

function RenderUserComment(){
    return (
        <>
        <Media>
            <Media top left href="https://www.google.com/">
                <Media object src={'/assets/images/download.png'} alt="Generic placeholder image" />
            </Media>
            <Media body>
                <h5>Name</h5>
                <h6> <i className="fa fa-star fa-lg"></i> 5/10 <small><i>Posted on January 10, 2019</i></small></h6>
                Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin commodo. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate fringilla. Donec lacinia congue felis in faucibus.
            </Media>
        </Media>
        <hr/>    
        </>
    );
}


function TeacherInfo(){
    return (
        <div className="container">
            {/* <div className="row">
                <Breadcrumb>
                    <BreadcrumbItem><Link to="/home">Trang chủ</Link></BreadcrumbItem>
                    <BreadcrumbItem active>Gia sư</BreadcrumbItem>
                </Breadcrumb>
                <div className="col-12">
                    <h2>Trang cá nhân</h2>
                    <hr/>
                </div>
            </div> */}
            <div className="row row-content">
                <div className="col-md-12 col-lg-3">
                    <img class="ava" src="assets/images/download.png" alt="Teacher's photo" />
                </div>
                <div className="col-md-12 col-lg-7">
                <h2>Nguyễn Văn A</h2>
                <h4>Tốt nghiệp Đại học Sư phạm</h4>
                    {/* <strong>Các lớp: </strong> Lớp 7 8
                    <br/>
                    <strong>Môn học: </strong> Toán Lý Hóa
                    <br/>
                    <strong>Khu vực quận: </strong> Quận 10, Quận Phú Nhuận
                    <br/>
                    <strong>Học phí: </strong> 2500000
                    <br/> */}
                <hr/>
                <h6>
                    <strong>Mô tả: </strong> Tốt nghiệp Đại Học Bách Khoa, Ielts 6.5
                </h6>
                 
                </div>
                <div className="col-md-12 col-lg-2">
                       <CommentForm/>
                </div>
            </div>


            <hr/>
            <div className="row justify-content-center">
                <h4 className="font-weight-bold">
                    Chứng chỉ
                </h4>
            </div>
            <div className="row align-items-start">
                <div className="col-12 col-md m-1">
                    <RenderCard/>
                </div>
                <div className="col-12 col-md m-1">
                    <RenderCard/>
                </div>
                <div className="col-12 col-md m-1">
                    <RenderCard/>
                </div>            
            </div>
            <hr/>
            <div className="col-12">
                <h3>Đánh giá</h3>
            </div>
            <RenderUserComment/>
            <RenderUserComment/>
        </div>
    );
}

export default TeacherInfo;