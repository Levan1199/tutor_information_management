import React from 'react';
import {Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle} from 'reactstrap';
import { Loading } from './LoadingComponent';
import {baseUrl} from '../shared/baseUrl';
import {FadeTransform} from 'react-animation-components';

// import local data
import {DISHES} from '../shared/dishes';
import {LEADERS} from '../shared/leaders';
import {PROMOTIONS} from '../shared/promotions';



// function RenderCard({item, isLoading, errMess}){
//     if (isLoading){
//         return (
//             <Loading/>
//         );
//     }
//     else if (errMess){
//         return (
//             <h4>{errMess}</h4>
//         );
//     }
//     else
//         return(
//             <Card>
//                 <CardImg src={baseUrl + item.image} alt={item.name}/>
//                 <CardBody>
//                     <CardTitle>
//                         {item.name}
//                     </CardTitle>
//                     {item.designation ? <CardSubtitle>{item.designation}</CardSubtitle>:null}
//                     <CardText>{item.description}</CardText>
//                 </CardBody>
//             </Card>
//         );
// }
function RenderCard({item, isLoading, errMess}){
        return(
            <Card style={{ backgroundColor: '#46696d', borderColor: 'red', color:"white" }}>
                <CardImg src={'/assets/images/download.png'} alt={DISHES[0].name}/>
                <CardBody>
                    <CardTitle style={{fontWeight:'bold'}}>
                        {DISHES[0].name}
                    </CardTitle>
                    {DISHES[0].designation ? <CardSubtitle>{DISHES[0].designation}</CardSubtitle>:null}
                    <CardText>{DISHES[0].description}</CardText>
                </CardBody>
            </Card>
        );
}

function RenderCarousel(){
    return (
        DISHES[0].description
    )
}


function Home(props){
    return(
        <FadeTransform in 
            transformProps={{
                exitTransform: 'scale(0.5) translateY(-50%)'
            }}>
        <div className="container">
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
                {/* <div className="col-12 col-md m-1">
                    <RenderCard item={props.dish}
                    isLoading={props.dishesLoading}
                    errMess={props.dishesErrMess}/>
                </div>            
                <div className="col-12 col-md m-1">
                    <RenderCard item={props.promotion}
                    isLoading={props.promosLoading}
                    errMess={props.promosErrMess}/>

                </div>            
                <div className="col-12 col-md m-1">
                    <RenderCard item={props.leaders}
                    isLoading={props.leadersLoading}
                    errMess={props.leadersErrMess}
                    />
                </div>             */}
            </div>
        </div>
        </FadeTransform>
    )
}

export default Home;

