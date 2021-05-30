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


// import React, {Component} from 'react';
// import {Link} from 'react-router-dom';
// import {Loading} from '../LoadingComponent';
// // import {baseUrl} from '../shared/baseUrl';
// import {BreadcrumbItem, Breadcrumb, Button, Label, Col, Row} from 'reactstrap';
// import {Multiselect} from 'multiselect-react-dropdown';
// import { Formik, Form, Field, ErrorMessage, FastField } from "formik";
// import {Card, CardHeader,  CardContent} from '@material-ui/core';

// const initialValues = {
//     district:[],
//     grade:[],
//     subject:[]
// };

// const distOption = [  
//     {name: 'Quận 1'},
//     {name: 'Quận 2'},
//     {name: 'Quận 3'},
//     {name: 'Quận 4'},
//     {name: 'Quận 5'},
//     {name: 'Quận 6'},
//     {name: 'Quận 7'},
//     {name: 'Quận 8'},
//     {name: 'Quận 9'},
//     {name: 'Quận 10'},
//     {name: 'Quận 11'},
//     {name: 'Quận 12'},
//     {name: 'Quận Thủ Đức'},
//     {name: 'Quận Bình Thạnh'},
//     {name: 'Quận Tân Bình'},
//     {name: 'Quận Phú Nhuận'},
//     {name: 'Quận Tân Phú'},
//     {name: 'Quận Bình Tân'},
//     {name: 'Quận Gò Vấp'}
// ];

// const gradOption = [
//     {name: 'Lớp 1'},
//     {name: 'Lớp 2'},
//     {name: 'Lớp 3'},
//     {name: 'Lớp 4'},
//     {name: 'Lớp 5'},
    
// ];
// const subjOption = [
//     {name: 'Toán'},
//     {name: 'Lý'},
//     {name: 'Hóa'},
// ];

// const multiSelectDropdown = ({field, form, meta, option, ...props})=>{
//     const optionName = field.name;
//     return (
//         <Multiselect
//             options={option}
//             displayValue="name" 
//             showCheckbox
//             onSelect={(value)=>{
//                 form.setFieldValue(optionName,value);
//             }}
//         />
//     );
// }

// const filterProps = (filterVals,student) => {
//     const dist = filterVals.district.every((e=>{
//         return student.district.includes(e);
//     }));

//     const grade = filterVals.grade.every((e=>{
//         return student.grade.includes(e);
//     }));

//     const subject = filterVals.subject.every((e=>{
//         return student.subject.includes(e);
//     }));

//     const result = dist && grade && subject;
//     return result;

// }

// const handleSubmit = (values,actions, setFilterVals) => {
//     var filterName = {};
//         filterName.district = values.district.map(district=>district.name);
//         filterName.grade = values.grade.map(grade=>grade.name);
//         filterName.subject = values.subject.map(subject=>subject.name);
//     setFilterVals(filterName);
// }


// const RenderRegs = ({regs, auth, profile, register}) => {
//     return regs.map((student)=>{      
//         return (                
//             <div key={student.id} className="col-12 col-md-5 m-1">
//                 <RenderStudentCard student={student} auth={auth}
//                 profile={profile} register={register}/>
//             </div>
//         );
//     });

// }



// const RenderFilter = (props) => {
//     const [filterVals, setFilterVals] = React.useState({ district:[],
//         grade:[],
//         subject:[]})
//     let Filtered = props.studentRegs.filter((student)=>{
//         console.log('stu ',student);
//         return filterProps(filterVals, student);
//     });
//     return(
//         <>
//         <div className="row">
//             <Formik 
//                 className="row"
//                 initialValues={initialValues}
//                 onSubmit={(values, action)=>handleSubmit(values, action, setFilterVals)}
//             >
//                 <Form className="col-12 col-md-9">                          
//                     <Row className="form-group justify-content-center">
//                         <Label htmlFor="district" md={1}>Quận:</Label>
//                         <Col md={2}>
//                             <FastField
//                                 id="district"
//                                 name="district"
//                                 component={multiSelectDropdown}
//                                 option={distOption}
//                             />                                        
//                         </Col>
//                         <Label htmlFor="grade" md={1}>Lớp:</Label>
//                         <Col md={2}>
//                             <FastField id="grade" name="grade" 
//                             className="form-control"    
//                             component={multiSelectDropdown}      
//                             option={gradOption}                              
//                             />
//                         <ErrorMessage name="grade"/>
//                         </Col>
//                         <Label htmlFor="subject" md={2}>Môn học:</Label>
//                         <Col md={2}>
//                             <FastField id="subject" name="subject" 
//                             className="form-control"    
//                             component={multiSelectDropdown}                                    
//                             option={subjOption}
//                             />
//                         <ErrorMessage name="subject"/>
//                         </Col>
//                         <Col md={2}>
//                         <Button type="submit" color="primary">
//                             Xác nhận
//                         </Button>
//                         </Col>
//                     </Row>
//                 </Form>
//             </Formik>
//         </div>
//         <div className="row">
//             <RenderRegs regs={Filtered} auth={props.auth}
//                                 profile={props.profile}
//                                 register={props.register}/>
//         </div>
//         </>
//     );
// }


// const handleRegister = (register, studentId, auth, isTeacher) =>{
//     if (!auth){
//         alert("You need to login to register");
//     }
//     else if(!isTeacher){
//         alert("Only teacher can register");
//     }
//     else {
//         register(studentId);
//         alert('register successfully');
//     }
// }

// function RenderStudentCard({student, auth, profile,register}){
//     let subject = student.subject.join(', ');
//     let grade = student.grade.join(', ');
//     let dist = student.district.join(',');
//     return(
//         <Card className="border">
//             <CardHeader 
//                 title={"Lớp: " + grade}
//                 subheader={"Môn học: " + subject}
//                 titleTypographyProps={{variant:'h5' }}
//                 action={
//                     (
//                     student.teacherReg.includes((profile.teacherProfile)?profile.teacherProfile._id:null))?
//                     <Button color="secondary" variant="contained">Đã Đăng ký</Button>
//                     :<Button color="secondary" variant="contained" onClick={()=>
//                         handleRegister(register,student._id,auth, profile.isTeacher)
//                     }>Đăng ký</Button>
//                 }
//             />
//             <CardContent>
//                 <strong>Số buổi trong tuần: </strong>{student.periodAWeek}
//                 <br/>
//                 <strong>Thời gian: </strong>{student.time}
//                 <br/>
//                 <strong>Địa chỉ: </strong>{student.address}
//                 <br/>
//                 <strong>Học phí: </strong>{student.fee}
//                 <br/>
//                 <strong>Quận: </strong>{dist}
//                 <br/>
//                 <strong>Yêu cầu khác: </strong>{student.description}
                
//             </CardContent> 
//         </Card>
//     );
// }




// const NewStudentRegs = (props) =>{      
//     if (props.isLoading) {
//         return(
//             <div className="container">
//                 <div className="row">
//                     <Loading />
//                 </div>
//             </div>
//         );
//     }
//     else if (props.studentRegs != null){
//         return (
//             <div className="container">
//                 <div className="row">
//                     <Breadcrumb>
//                         <BreadcrumbItem><Link to="/home">Trang chủ</Link></BreadcrumbItem>
//                         <BreadcrumbItem active>Student</BreadcrumbItem>
//                     </Breadcrumb>
//                     <div className="col-12">
//                         <h3>Các lớp học cần tìm gia sư</h3>
//                         <hr/>
//                     </div>
//                 </div>
//                     <RenderFilter
//                         studentRegs={props.studentRegs}
//                         RenderRegs = {RenderRegs}
//                         register={props.register}
//                         auth={props.auth}
//                         profile={props.profile}
//                     />
//                 </div>
//         );
//     }
// }

// export default NewStudentRegs;