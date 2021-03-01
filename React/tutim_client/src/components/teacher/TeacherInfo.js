import React from 'react';
import { Link } from 'react-router-dom';
import {Breadcrumb, BreadcrumbItem} from 'reactstrap';
import {Card, CardImg, CardText, CardBody, CardTitle, 
    Media,CardSubtitle, UncontrolledCarousel, Jumbotron} from 'reactstrap';
// import { Loading } from './LoadingComponent';
// import {baseUrl} from '../shared/baseUrl';
import {FadeTransform} from 'react-animation-components';

// import local data
import './teacherInfo.css';
import {DISHES} from '../../shared/dishes';
import {LEADERS} from '../../shared/leaders';
import {PROMOTIONS} from '../../shared/promotions';

// export const Timee = new Date().toISOString();

function RenderCard(){
    return(
        <Card>
            <CardTitle>
                {DISHES[0].name}
            </CardTitle>
            <CardImg src={'/assets/images/download.png'} alt={DISHES[0].name}/>
        </Card>
    );
}

function RenderRatingSection(){

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
                <h6> <i className="fa fa-star fa-lg"></i> 5/10 - Time</h6>
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
            <div className="row">
                <Breadcrumb>
                    <BreadcrumbItem><Link to="/homepage">Trang chủ</Link></BreadcrumbItem>
                    <BreadcrumbItem active>Gia sư</BreadcrumbItem>
                </Breadcrumb>
                <div className="col-12">
                    <h2>Gia sư</h2>
                    <hr/>
                </div>
            </div>
            <div className="row">
                <div className="col-sm">
                    <img src="assets/images/download.png" alt="Teacher's photo" width="70%" height="45%"/>
                </div>
                <div className="col-12 col-sm-6">
                <h2>Our History</h2>
                    <p>Started in 2010, Ristorante con Fusion quickly established itself as a
                         culinary icon par excellence in Hong Kong. With its unique brand of world
                         
                          fusion cuisine that can be found nowhere else, it enjoys patronage from the A-list clientele in Hong Kong.  Featuring four of the best three-star Michelin chefs in the world, you never know what will arrive on your plate the next time you visit us.</p>
                    <p>The restaurant traces its humble beginnings to <em>The Frying Pan</em>,
                    a successful chain started by our CEO, Mr. Peter Pan, that featured for the 
                    first time the world's best cuisines in a pan.</p>
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