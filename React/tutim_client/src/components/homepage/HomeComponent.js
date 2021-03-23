import React from 'react';
import {Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle, UncontrolledCarousel, Jumbotron} from 'reactstrap';
// import { Loading } from './LoadingComponent';
// import {baseUrl} from '../shared/baseUrl';
import {FadeTransform} from 'react-animation-components';

// import local data
import './homepage.css';
import {TEXT} from '../../shared/basicText';
const picture = {
    chemical:'/assets/images/chemical.png',
    math:'/assets/images/math.png',
    physic:'/assets/images/physic.png'
}

const items = [
    {
      src: '/assets/images/teacher1.png',
      altText: 'Slide 1',
      caption: 'Slide 1',
      header: 'Slide 1 Header',
      key: '1'
    },
    {
      src: '/assets/images/teacher2.png',
      altText: 'Slide 2',
      caption: 'Slide 2',
      header: 'Slide 2 Header',
      key: '2'
    },
    {
      src: '/assets/images/teacher3.png',
      altText: 'Slide 3',
      caption: 'Slide 3',
      header: 'Slide 3 Header',
      key: '3'
    }
];

function RenderCard(props){
        return(
            <Card>
                <CardImg  src={props.picture} alt={props.text}/>
                <CardBody>
                    <CardTitle>
                        {props.text}
                    </CardTitle>
                    {/* {TEXT[0].designation ? <CardSubtitle>{TEXT[0].designation}</CardSubtitle>:null} */}
                    {/* <CardText>{TEXT[0].description}</CardText> */}
                </CardBody>
            </Card>
        );
}

function Home(props){
    return(
        <>
            <Jumbotron>
                <div className="container">
                    <div className="row row-header justify-content-center grey">
                        <div className="col-12 col-sm-6 text-center">
                            <h1>Gia sư Việt</h1>
                        </div>
                    </div>
                </div>
            </Jumbotron>
            <hr/>
            <div className="container">
                <div className="row justify-content-center">
                    <h4 className="font-weight-bold">
                        Khóa học nổi bật
                    </h4>
                </div>
                <div className="row align-items-start">
                    <div className="col-12 col-md m-1">
                        <RenderCard picture={picture.chemical} text={"Hóa"}/>
                    </div>
                    <div className="col-12 col-md m-1">
                        <RenderCard picture={picture.math} text={"Toán"}/>
                    </div>
                    <div className="col-12 col-md m-1">
                        <RenderCard picture={picture.physic} text={"Lý"}/>
                    </div>            
                </div>
            </div>
            <hr/>
            <div className="container">
                <div className="row justify-content-center">
                    <h4 className="font-weight-bold">
                        Gia sư nổi bật
                    </h4>
                </div>
                <UncontrolledCarousel items = {items}/>
            </div>
           
        </>
    )
}

export default Home;

