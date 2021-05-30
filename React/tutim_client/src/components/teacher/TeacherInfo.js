import React, { Component } from 'react';
import {Card, CardImg, CardTitle, 
    Media, Label, Modal, ModalHeader, ModalBody, Button, Row, Col} from 'reactstrap';
import {LocalForm, Control} from 'react-redux-form';
import { Loading } from '../LoadingComponent';
import {TEXT} from '../../shared/basicText';
// import local data
import './teacherInfo.css';


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

function RenderWorkSpace({profile}){
    const grade = profile.grade.join(', ');
    const subject = profile.subject.join(', ');
    const district = profile.district.join(', ');


    return(
        <div className="row row-content">
            <div className="col-md-12 col-lg-5">
                <h5>
                    <strong>Các lớp: </strong> {grade}
                </h5>
                <h5>
                    <strong>Môn học: </strong> {subject}
                </h5>
                <h5>
                    <strong>Khu vực: </strong> {district}
                </h5>
                <h5>
                    <strong>Học phí: </strong> {profile.fee}
                </h5>                
            </div>

            <div className="col-md-12 col-lg-5">
                <h5>
                    <strong>Thời gian: </strong> {profile.time}
                </h5>                
            </div>

            <div className="col justify-self-end">
                    <CommentForm/>
            </div>
        </div>
    );   
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


function TeacherInfo(props){
    // console.log(prop);
    if (props.isLoading) {
        return(
            <div className="container">
                <div className="row">
                    <Loading />
                </div>
            </div>
        );
    }
    else if (props.errMess) {
        return(
            <div className="container">
                <div className="row">
                    <h4>{props.errMess}</h4>
                </div>
            </div>
        );
    }
    else if (props.profile != null){
        console.log(props.profile);
        return (
            <div className="container">
                <div className="row row-content">
                    <div className="col-md-12 col-lg-3">
                        <img class="ava" src="assets/images/download.png" alt="Teacher's photo" />
                    </div>
                    <div className="col-md-12 col-lg-7">
                        <h2>{props.profile.name}</h2>
                        <h4>{props.profile.email}</h4>
                        <hr/>
                        <h6>
                            <strong>Mô tả: </strong> {props.profile.description}
                        </h6>                 
                    </div>
                    <div className="col-md-12 col-lg-2">
                        <CommentForm/>
                    </div>
                </div>

                <RenderWorkSpace profile={props.profile}/>

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
}

export default TeacherInfo;