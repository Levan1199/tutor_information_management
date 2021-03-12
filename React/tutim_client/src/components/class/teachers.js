import React from 'react';
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';
import {Link} from 'react-router-dom';
import {Loading} from '../LoadingComponent';
// import {baseUrl} from '../shared/baseUrl';
import {Card, CardHeader, Avatar, CardContent, Button} from '@material-ui/core';


    function RenderTeacherCard({teacher}){
        let subject = teacher.subject.join(' ');
        let grade = teacher.grade.join(' ');
        let district = teacher.district.join(' ');
        return(
       
        <Card className="border">
            <CardHeader avatar={<Avatar alt="avatar" src="/assets/images/download.png" />}
                        title={<Link to={`/home`}>{teacher.name}</Link>}
                        subheader={'Email: '+ teacher.email}
                        titleTypographyProps={{variant:'h6' }}
                        action={
                            <Link to={`/home`} className="align-self-center">
                                <Button color="primary">Đăng ký</Button>
                            </Link>
                        }
            />
            <CardContent>
                <strong>Các lớp: </strong>{grade}
                <br/>
                <strong>Môn học: </strong>{subject}
                <br/>
                <strong>Khu vực quận: </strong>{district}
                <br/>
                <strong>Học phí: </strong>{teacher.fee}
                <br/>
                <strong>Thông tin khác: </strong>{teacher.description}
            </CardContent> 
        </Card>
        );
    }

    const Teachers = (props) =>{
        const teachers = props.teachers.teachers.map((teacher)=>{
            return (
                <div key={teacher.id} className="col-12 col-md-5 m-1">
                  <RenderTeacherCard teacher={teacher}/>
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
