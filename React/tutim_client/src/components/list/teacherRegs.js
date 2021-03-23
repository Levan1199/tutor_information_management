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
                            <Link to={`/findTeacher`} className="align-self-center">
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

    const TeacherRegs = (props) =>{
        const teacherRegs = props.teacherRegs.map((teacher)=>{
            return (
                <div key={teacher.id} className="col-12 col-md-5 m-1">
                  <RenderTeacherCard teacher={teacher}/>
                </div>
            );
        });
      
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
                            {teacherRegs}
                    </div>
                </div>
            );
    }
export default TeacherRegs;
