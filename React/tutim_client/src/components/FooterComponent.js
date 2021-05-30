import React from 'react';
import {Link} from 'react-router-dom';

function Footer(props){
    return (
    <div className="footer">
        <div className="container">
            <div className="row justify-content-center">             
                <div className="col-4 offset-1 col-sm-2">
                    <h5 class="black">Đường dẫn</h5>
                    <ul className="list-unstyled">
                        <li><Link to="/homepage">Trang chủ</Link></li>
                        <li><Link to="/aboutus">Khóa học</Link></li>
                        <li><Link to="/teacher">Gia sư</Link></li>
                    </ul>
                </div>
                <div className="col-7 col-sm-5">
                    <h5 class="black">Địa chỉ</h5>
                    <address>
		              121, Clear Water Bay Road<br />
		              Clear Water Bay, Kowloon<br />
		              HONG KONG<br />
		              <i className="fa fa-phone fa-lg"></i>: +852 1234 5678<br />
		              <i className="fa fa-fax fa-lg"></i>: +852 8765 4321<br />
		              <i className="fa fa-envelope fa-lg"></i>: <a href="mailto:levanhung@food.net">
                         levanhung@food.net</a>
                    </address>
                </div>
            </div>
            <div className="row justify-content-center">             
                <div className="col-auto">
                    <p>© Copyright 2021 LVH</p>
                </div>
            </div>
        </div>
    </div>
    );
}


export default Footer;