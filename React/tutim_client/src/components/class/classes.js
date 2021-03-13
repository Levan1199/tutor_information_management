import React from 'react';
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';
import {Link} from 'react-router-dom';
import {Loading} from '../LoadingComponent';
// import {baseUrl} from '../shared/baseUrl';
import {Card, CardHeader, Avatar, CardContent, Button} from '@material-ui/core';


    function RenderClassCard({classes}){
        let subject = classes.subject.join(' ');
        let grade = classes.grade.join(' ');
        // let district = classes.district.join(' ');
        return(
       
        <Card className="border">
            <CardHeader avatar={<Avatar alt="avatar" src="/assets/images/download.png" />}
                        title={<Link to={`/home`}>{classes.name}</Link>}
                        subheader={'Email: '+ classes.email}
                        titleTypographyProps={{variant:'h6' }}
                        action={
                            <Link to={`/home`} className="align-self-center">
                                <Button color="primary">Đăng ký</Button>
                            </Link>
                        }
            />
            <CardContent>
                <strong>Lớp: </strong>{grade}
                <br/>
                <strong>Môn học: </strong>{subject}
                <br/>
                {/* <strong>Khu vực quận: </strong>{district}
                <br/> */}
                <strong>Học phí: </strong>{classes.fee}
                <br/>
                <strong>Thông tin khác: </strong>{classes.description}
            </CardContent> 
        </Card>
        );
    }

    const Classes = (props) =>{
        const classes = props.classes.classes.map((classes)=>{
            return (
                <div key={classes.id} className="col-12 col-md-5 m-1">
                  <RenderClassCard classes={classes}/>
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
                            <BreadcrumbItem><Link to="/home">Trang chủ</Link></BreadcrumbItem>
                            <BreadcrumbItem active>Gia sư hiện có</BreadcrumbItem>
                        </Breadcrumb>
                        <div className="col-12">
                            <h3>Gia sư hiện có</h3>
                            <hr/>
                        </div>
                    </div>
                    <div className="row">
                            {classes}
                    </div>
                </div>
            );
    }
export default Classes;
