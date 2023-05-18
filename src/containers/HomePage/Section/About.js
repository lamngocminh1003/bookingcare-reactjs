import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
class About extends Component {
    render() {
        return (
            <div className=' section-share section-about'>
                <div className='section-about-header'>
                    <FormattedMessage id="about.about-BookingCare" />
                </div>
                <div className='section-about-content'>
                    <div className='content-left'>
                        <iframe width="100%" height="400px" 
                            src="https://www.youtube.com/embed/FyDQljKtWnI" 
                            title="CÀ PHÊ KHỞI NGHIỆP VTV1 - BOOKINGCARE - HỆ THỐNG ĐẶT LỊCH KHÁM TRỰC TUYẾN" 
                            frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                            allowFullScreen>
                        </iframe>
                    </div>
                    <div className='content-right'>
                        <p><FormattedMessage id="about.des1" /></p>
                        <p><FormattedMessage id="about.des2" /></p>
                    </div>
                </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(About);
