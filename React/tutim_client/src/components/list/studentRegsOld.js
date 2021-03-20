import React from 'react';
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';
import {Link} from 'react-router-dom';
import {Loading} from '../LoadingComponent';
// import {baseUrl} from '../shared/baseUrl';
import {Card, CardHeader, Avatar, CardContent, Button} from '@material-ui/core';

    function RenderStudentCard({student}){
        let subject = student.subject.join(' ');
        let grade = student.grade.join(' ');
        return(
        <Card className="border">
            <CardHeader 
                        title={"Lớp dạy: " + grade}
                        subheader={"Môn học: " + subject}
                        titleTypographyProps={{variant:'h5' }}
                        action={
                            <Link to={`/findClass`} className="align-self-center">
                                <Button color="primary">Đăng ký</Button>
                            </Link>
                        }
            />
            <CardContent>
                <strong>Số buổi trong tuần: </strong>{student.periodAWeek}
                <br/>
                <strong>Thời gian: </strong>{student.time}
                <br/>
                <strong>Địa chỉ: </strong>{student.address}
                <br/>
                <strong>Học phí: </strong>{student.fee}
                <br/>
                <strong>Thông tin khác: </strong>{student.description}
            </CardContent> 
        </Card>
        );
    }

    const StudentRegs = (props) =>{
        const studentRegs = props.studentRegs.studentRegs.map((student)=>{
            console.log(student);
            
            return (                
                <div key={student.id} className="col-12 col-md-5 m-1">
                  <RenderStudentCard student={student}/>
                </div>
            );
        });
     
        return (
            <div className="container">
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to="/home">Trang chủ</Link></BreadcrumbItem>
                        <BreadcrumbItem active>Lớp học hiện có</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>Lớp học hiện có</h3>
                        <hr/>
                    </div>
                </div>
                <div className="row">
                        {studentRegs}
                </div>
            </div>
        );
    }
export default StudentRegs;
