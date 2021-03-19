// import React, {Component} from 'react';
// import {Link} from 'react-router-dom';
// import {Loading} from '../LoadingComponent';
// // import {baseUrl} from '../shared/baseUrl';
// import {BreadcrumbItem, Breadcrumb, Button, Label, Col, Row} from 'reactstrap';
// import {Multiselect} from 'multiselect-react-dropdown';
// import { Formik, Form, Field, ErrorMessage, FastField } from "formik";
// import {Card, CardHeader,  CardContent} from '@material-ui/core';

// const initialValues = {
//     district: [''],
//     grade:[''],
//     subject:[''],
// }

// const options = {
//     district:[
//         {name: 'Quận 1', id: 1},
//         {name: 'Quận 2', id: 2},
//         {name: 'Quận 3', id: 3},
//         {name: 'Quận 4', id: 4},
//         {name: 'Quận 5', id: 5},
//         {name: 'Quận 6', id: 6},
//         {name: 'Quận 7', id: 7},
//         {name: 'Quận 8', id: 8},
//         {name: 'Quận 9', id: 9},
//         {name: 'Quận 10', id: 10},
//         {name: 'Quận 11', id: 11},
//         {name: 'Quận 12', id: 12},
//         {name: 'Quận Thủ Đức', id: 13},
//         {name: 'Quận Bình Thạnh', id: 14},
//         {name: 'Quận Tân Bình', id: 15},
//         {name: 'Quận Phú Nhuận', id: 16},
//         {name: 'Quận Tân Phú', id: 17},
//         {name: 'Quận Bình Tân', id: 18},
//         {name: 'Quận Gò Vấp', id: 19}
//     ],
//     grade:[
//         {name: 'Lớp 1', id: 1},
//         {name: 'Lớp 2', id: 2},
//         {name: 'Lớp 3', id: 3},
//         {name: 'Lớp 4', id: 4},
//         {name: 'Lớp 5', id: 5},
        
//     ],
//     subject:[
//         {name: 'Toán', id: 1},
//         {name: 'Lý', id: 2},
//         {name: 'Hóa', id: 3},
//     ]

// }

// const handleSubmit = (values) => {
//     console.log('Current State is: ' +JSON.stringify(initialValues));
//     // console.log('Current State is: ' +JSON.stringify(values));
//     // console.log(this.props.studentRegs.studentRegs);
// }

// const multiSelectDropdown = ({field, form, meta, ...props}) => {
//     const option = options[field.name];
//     return (
//         <Multiselect
//             options={option}
//             displayValue="name" 
//             showCheckbox
//             onSelect={(value)=>{
//                form.setFieldValue(field.name,value);
//             }}
//         />
//     );
// }

// const FilterStudentRegs = ({studentRegs}) => {
//     return(
//         <Formik className="row"
//             initialValues={initialValues}
//             onSubmit={handleSubmit}
//         >
//             <Form className="col-12 col-md-9">                          
//                 <Row className="form-group justify-content-center">
//                     <Label htmlFor="district" md={1}>Quận:</Label>
//                     <Col md={2}>
//                         <FastField
//                             id="district"
//                             name="district"
//                             component={multiSelectDropdown}
//                         />                                        
//                     </Col>
//                     <Label htmlFor="grade" md={1}>Lớp:</Label>
//                     <Col md={2}>
//                         <FastField id="grade" name="grade" 
//                         className="form-control"    
//                         component={multiSelectDropdown}                                    
//                         />
//                     <ErrorMessage name="grade"/>
//                     </Col>
//                     <Label htmlFor="subject" md={2}>Môn học:</Label>
//                     <Col md={2}>
//                         <FastField id="subject" name="subject" 
//                         className="form-control"    
//                         component={multiSelectDropdown}                                    
//                         />
//                     <ErrorMessage name="subject"/>
//                     </Col>
//                     <Col md={2}>
//                     <Button type="submit" color="primary">
//                         Xác nhận
//                     </Button>
//                     </Col>
//                 </Row>
//             </Form>
//         </Formik>
//     );
// }

   
//     function RenderStudentCard({student}){
//         let subject = student.subject.join(' ');
//         let grade = student.grade.join(' ');
//         return(
//         <Card className="border">
//             <CardHeader 
//                 title={"Lớp dạy: " + grade}
//                 subheader={"Môn học: " + subject}
//                 titleTypographyProps={{variant:'h5' }}
//                 action={
//                     <Link to={`/findClass`} className="align-self-center">
//                         <Button color="primary">Đăng ký</Button>
//                     </Link>
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
//                 <strong>Thông tin khác: </strong>{student.description}
//             </CardContent> 
//         </Card>
//         );
//     }

//     function StudentRegs({regs}){
//         const rendering = regs.map((student)=>{
//             return(
//                 <div key={student.id} className="col-12 col-md-5 m-1">
//                     <RenderStudentCard student={student}/>
//                 </div>
//             );
//         });
//         return (
//             <>
//                 {rendering}
//             </>
//         );
//     }

//     const StudentFilter = (props) =>{
//         return (
//             <div className="container">
//                 <div className="row">
//                     <Breadcrumb>
//                         <BreadcrumbItem><Link to="/home">Trang chủ</Link></BreadcrumbItem>
//                         <BreadcrumbItem active>Lớp học hiện có</BreadcrumbItem>
//                     </Breadcrumb>
//                     <div className="col-12">
//                         <h3>Lớp học hiện có</h3>
//                         <hr/>
//                     </div>
//                 </div>
//                 <div className="row">
//                     <FilterStudentRegs studentRegs={props.studentRegs}/>
//                 </div>
//                 <div className="row">
//                     <StudentRegs regs = {props.studentRegs}/>
//                 </div>
//             </div>
//         );
//     }
// export default StudentFilter;


import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {Loading} from '../LoadingComponent';
// import {baseUrl} from '../shared/baseUrl';
import {BreadcrumbItem, Breadcrumb, Button, Label, Col, Row} from 'reactstrap';
import {Multiselect} from 'multiselect-react-dropdown';
import { Formik, Form, Field, ErrorMessage, FastField } from "formik";
import {Card, CardHeader,  CardContent} from '@material-ui/core';
import { func } from 'prop-types';



class FilterRegs extends Component {
constructor(props){
    super(props);      
    
    this.handleSubmit = this.handleSubmit.bind(this);
    this.multiSelectDropdown = this.multiSelectDropdown.bind(this);
    this.state = {
        initialValues: {
            district: [''],
            grade:[''],
            subject:[''],
        },        
        filter:{
            district:[''],
            grade:[''],
            subject:['']
        },
        options:{
            district:[
                {name: 'Quận 1', id: 1},
                {name: 'Quận 2', id: 2},
                {name: 'Quận 3', id: 3},
                {name: 'Quận 4', id: 4},
                {name: 'Quận 5', id: 5},
                {name: 'Quận 6', id: 6},
                {name: 'Quận 7', id: 7},
                {name: 'Quận 8', id: 8},
                {name: 'Quận 9', id: 9},
                {name: 'Quận 10', id: 10},
                {name: 'Quận 11', id: 11},
                {name: 'Quận 12', id: 12},
                {name: 'Quận Thủ Đức', id: 13},
                {name: 'Quận Bình Thạnh', id: 14},
                {name: 'Quận Tân Bình', id: 15},
                {name: 'Quận Phú Nhuận', id: 16},
                {name: 'Quận Tân Phú', id: 17},
                {name: 'Quận Bình Tân', id: 18},
                {name: 'Quận Gò Vấp', id: 19}
            ],
            grade:[
                {name: 'Lớp 1', id: 1},
                {name: 'Lớp 2', id: 2},
                {name: 'Lớp 3', id: 3},
                {name: 'Lớp 4', id: 4},
                {name: 'Lớp 5', id: 5},
                
            ],
            subject:[
                {name: 'Toán', id: 1},
                {name: 'Lý', id: 2},
                {name: 'Hóa', id: 3},
            ]
        },
        cards:[{}]
    }
}      

componentDidMount(){
    console.log('z',this.props.studentRegs);
    this.setState({cards:this.props.studentRegs});
    console.log('aa',this.state.cards);
}

handleSubmit(values){
    var filterName = {};
        filterName.district = values.district.map(district=>district.name);
        filterName.grade = values.grade.map(grade=>grade.name);
        filterName.subject = values.subject.map(subject=>subject.name);
    console.log('data', filterName);
    this.setState({filter:filterName});
}

multiSelectDropdown({field, form, meta, ...props}){
    const optionName = field.name;
    const options = this.state.options[optionName];
    return (
        <Multiselect
            options={options}
            displayValue="name" 
            showCheckbox
            onSelect={(value)=>{
                form.setFieldValue(optionName,value);
            }}
        />
    );
}

render(){
    const Rendering = this.props.RenderRegs;
    const Filtered = this.props.studentRegs.filter((student)=>{
        return student.district.some(dist => this.state.filter.district.includes(dist));
    });
    return(
        <>
        <div className="row">
            <Formik className="row"
                initialValues={this.state.initialValues}
                onSubmit={this.handleSubmit}
            >
                <Form className="col-12 col-md-9">                          
                    <Row className="form-group justify-content-center">
                        <Label htmlFor="district" md={1}>Quận:</Label>
                        <Col md={2}>
                            <FastField
                                id="district"
                                name="district"
                                component={this.multiSelectDropdown}
                            />                                        
                        </Col>
                        <Label htmlFor="grade" md={1}>Lớp:</Label>
                        <Col md={2}>
                            <FastField id="grade" name="grade" 
                            className="form-control"    
                            component={this.multiSelectDropdown}                                    
                            />
                        <ErrorMessage name="grade"/>
                        </Col>
                        <Label htmlFor="subject" md={2}>Môn học:</Label>
                        <Col md={2}>
                            <FastField id="subject" name="subject" 
                            className="form-control"    
                            component={this.multiSelectDropdown}                                    
                            />
                        <ErrorMessage name="subject"/>
                        </Col>
                        <Col md={2}>
                        <Button type="submit" color="primary">
                            Xác nhận
                        </Button>
                        </Col>
                    </Row>
                </Form>
            </Formik>
        </div>
        <div className="row">
            <Rendering regs={Filtered}/>
        </div>
        </>
    );
}
}



function RenderStudentCard({student}){
    console.log("sth");
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


function RenderRegs({regs}) {
    console.log("insidee");
    const Regs = regs.map((student)=>{
        return (                
            <div key={student.id} className="col-12 col-md-5 m-1">
                <RenderStudentCard student={student}/>
            </div>
        );
    });

    return (
        <>
            {Regs}
        </>
    );
}

const StudentFilter = (props) =>{       
    if (props.isLoading) {
        console.log("Loadingggg");
        return(
            <div className="container">
                <div className="row">
                    <Loading />
                </div>
            </div>
        );
    }
    else if (props.studentRegs != null){
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
                    <FilterRegs studentRegs={props.studentRegs}
                                RenderRegs = {RenderRegs}
                    />
                </div>
        );
    }
}

export default StudentFilter;