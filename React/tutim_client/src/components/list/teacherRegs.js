import React from 'react';
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';
import {Link} from 'react-router-dom';
import {Loading} from '../LoadingComponent';
import {avatarUrl} from '../../shared/baseUrl';
import {Card, CardHeader, Avatar, CardContent, Button} from '@material-ui/core';

    const handleRegister = (register, teacherId, auth, isStudent) =>{
        if (!auth){
            alert("You need to login to register");
        }
        else if(!isStudent){
            alert("Only student can register");
        }
        else {
            register(teacherId);
            alert('register successfully');
        }
    }


    function RenderTeacherCard({teacher, register, auth, profile}){
        console.log('tea ',teacher.studentReg, profile);
        let subject = teacher.subject.join(', ');
        let grade = teacher.grade.join(', ');
        let district = teacher.district.join(', ');
        return(
       
        <Card className="border">
            <CardHeader avatar={<Avatar alt="avatar" src={avatarUrl+teacher.imgPath} />}
                        title={<Link to={`/home`}>{teacher.name}</Link>}
                        subheader={'Email: '+ teacher.email}
                        titleTypographyProps={{variant:'h6' }}
                        action= {(teacher.studentReg.includes(profile.studentProfile._id))?
                            <Button color="secondary" variant="contained">Đã Đăng ký</Button>
                            :<Button color="secondary" variant="contained" onClick={()=>
                                        handleRegister(register,teacher._id,auth, profile.isStudent)
                                     }>Đăng ký</Button>
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
            if(teacher.available){
            return (
                <div key={teacher.id} className="col-12 col-md-5 m-1">
                  <RenderTeacherCard teacher={teacher} register={props.register} auth={props.auth} profile={props.profile}/>
                </div>
            );
            }
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
