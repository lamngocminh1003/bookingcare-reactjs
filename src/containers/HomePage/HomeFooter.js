import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
class HomeFooter extends Component {
    render() {
        return (
            <div className='home-footer'>
                <p>&copy; 2023 Báo cáo môn học mã nguồn mở và Quản lý dự án phần mềm nhóm 2 </p>
                <p>Mọi chi tiết xin liên hệ với Facebook: Ngọc Minh <a target="_blank" href='https://www.facebook.com/'> &#8594;Tại đây &#8592;</a> </p>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeFooter);
