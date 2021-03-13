import React, {Component} from 'react';
import {Navbar, NavbarBrand, Nav, NavbarToggler, Collapse, NavItem,
    Jumbotron, Button, Modal, ModalHeader, ModalBody, DropdownMenu, DropdownItem, Dropdown, DropdownToggle, UncontrolledDropdown,
    Form, FormGroup, Input, Label} from 'reactstrap';
import {NavLink} from 'react-router-dom';
class Header extends Component{
    constructor(props){
        super(props);
        this.state = {
            isNavOpen: false,
            isModalOpen: false,
            isDropdownOpen: false
        };
        this.toggleDropdown = this.toggleDropdown.bind(this);
        this.toggleNav = this.toggleNav.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
    }

    toggleNav(){
        this.setState({
            isNavOpen: !this.state.isNavOpen
        });
    }

    toggleModal(){
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }
    
    toggleDropdown(){
        this.setState({
            isDropdownOpen: !this.state.isDropdownOpen
        });
    }

    handleLogin(event){
        this.toggleModal();
        this.props.loginUser({username: this.username.value, password: this.password.value});
        event.preventDefault();
    }

    handleLogout(){
        this.props.loginUser();
    }

    render(){
        return( 
            <>
                <Navbar light expand="md">
                    <div className="container">
                        <NavbarToggler onClick={this.toggleNav}/>
                        <NavbarBrand className="mr-auto" href="/">
                            {/* <img src="assets/images/logo.png" height="30" width="41" alt="Ristorante Con Fusion" /> */}
                            <img src="assets/images/logo.png" height="30" width="41"
                                alt="Ristorante Con Fusion" />
                        </NavbarBrand>
                        <Collapse isOpen={this.state.isNavOpen} navbar>
                            <Nav navbar>
                                <NavItem>
                                    <NavLink className="nav-link" to="/home">
                                        <span className="fa fa-home fa-lg"></span> Trang chủ
                                    </NavLink>
                                </NavItem>
                                <UncontrolledDropdown setActiveFromChild>
                                    <DropdownToggle className="nav-link" color="">
                                        <span className="fa fa-address-book fa-lg"></span> Phụ huynh
                                    </DropdownToggle>
                                    <DropdownMenu>
                                        <DropdownItem  href="/teacherList" >Gia sư hiện có</DropdownItem>
                                        <DropdownItem  href="/findTeacher" >Đăng ký tìm gia sư</DropdownItem>
                                    </DropdownMenu>                                    
                                </UncontrolledDropdown>

                                <UncontrolledDropdown setActiveFromChild>
                                    <DropdownToggle className="nav-link" color="">
                                        <span class="fa fa-users fa-lg"></span> Gia sư
                                    </DropdownToggle>
                                    <DropdownMenu>
                                        <DropdownItem  href="/teacherList" >Lớp học hiện có</DropdownItem>
                                        <DropdownItem  href="/findClass" >Đăng ký tìm lớp học</DropdownItem>
                                    </DropdownMenu>                                    
                                </UncontrolledDropdown>
                            </Nav>
                            <Nav className="ml-auto" navbar>
                                <NavItem>
                                    { !this.props.auth.isAuthenticated ?
                                        <Button onClick={this.toggleModal}>
                                            <span className="fa fa-sign-in fa-lg"></span> Đăng nhập
                                            {this.props.auth.isFetching ?
                                                <span className="fa fa-spinner fa-pulse fa-fw"></span>
                                                : null
                                            }
                                        </Button>
                                        :
                                        <div>
                                        <div className="navbar-text mr-3">{this.props.auth.user.username}</div>
                                        <Button onClick={this.handleLogout}>
                                            <span className="fa fa-sign-out fa-lg"></span> Đăng xuất
                                            {this.props.auth.isFetching ?
                                                <span className="fa fa-spinner fa-pulse fa-fw"></span>
                                                : null
                                            }
                                        </Button>
                                        </div>
                                    }

                                </NavItem>
                            </Nav>
                            
                        </Collapse>
                    </div>
                </Navbar>
        
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Đăng nhập</ModalHeader>
                    <ModalBody>
                        <Form onSubmit={this.handleLogin}>
                            <FormGroup>
                                <Label htmlFor="username">Tên tài khoản</Label>
                                <Input type="text" id="username" name="username"
                                innerRef={(input)=>this.username=input}/>
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor="password">Mật khẩu</Label>
                                <Input type="password" id="password" name="password"
                                innerRef={(input)=>this.password=input}/>
                            </FormGroup>
                            <FormGroup check>
                                <Label check>
                                    <Input type="checkbox" name="remember"
                                    innerRef={(input)=>this.remember=input}/>
                                    Nhớ tài khoản
                                </Label>
                            </FormGroup>
                            <Button type="submit" value="submit" className="bg-primary">Đăng nhập</Button>
                        </Form>
                    </ModalBody>
                </Modal>
            </>
        )
    }
}

export default Header;