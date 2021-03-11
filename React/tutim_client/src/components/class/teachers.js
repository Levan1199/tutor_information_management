import React from 'react';
import { Card, CardImg, CardImgOverlay, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import {Link} from 'react-router-dom';
import {Loading} from '../LoadingComponent';
// import {baseUrl} from '../shared/baseUrl';

    function RenderMenuItem({teacher}){
        return(
        <Card >
            {/* <Link to={`/menu/${teacher._id}`} > */}
                <CardImg width="20%" src = {'/assets/images/download.png'} alt={teacher.name}  top-left/>
                <Card body className="ml-5">
                    <CardTitle> {teacher.name} </CardTitle>
                    <CardText> {teacher.email}</CardText>
                    <CardText> {teacher.telnum}</CardText>
                    <CardText> {teacher.address}</CardText>

                </Card>
            {/* </Link> */}
        </Card>
        )
    }

    const Teachers = (props) =>{
        const teachers = props.teachers.teachers.map((teacher)=>{
            return (
                <div key={teacher.id} className="col-12 col-md-5 m-1">
                  <RenderMenuItem teacher={teacher}/>
                </div>
            );
        });
        // const menu = (({props})=>{
        //     return (
        //         <div key={props.teachers.id} className="col-12 col-md-5 m-1">
        //             <p>
        //                 {props.teachers.name}
        //             </p>
        //             <p>
        //                 {props.teachers.email}
        //             </p>
        //           {/* <RenderMenuItem dish={dish} /> */}
        //         </div>
        //     );
        // });

        // if (props.teachers.isLoading){
        //     return (
        //         <div className="container">
        //             <div className="row">
        //                 <Loading />
        //             </div>
        //         </div>
        //     );
        // }
        // else if (props.teachers.errMess){
        //     return (
        //         <div className="container">
        //             <div className="row">
        //                 <h4>{props.teachers.errMess}</h4>
        //             </div>
        //         </div>
        //     );
        // }
        // else
            return (
                <div className="container">
                    <div className="row">
                        <Breadcrumb>
                            <BreadcrumbItem><Link to="/home">Home</Link></BreadcrumbItem>
                            <BreadcrumbItem active>Menu</BreadcrumbItem>
                        </Breadcrumb>
                        <div className="col-12">
                            <h3>Menu</h3>
                            <hr/>
                        </div>
                    </div>
                    <div className="row">
                            {teachers}
                    </div>
                </div>
            );
    }
export default Teachers;
