import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import {LANGUAGES} from "../../utils";
import {postVerifyBookingAppointment} from "../../services/userService";
import HomeHeader from '../HomePage/HomeHeader';
import HomeFooter from '../HomePage/HomeFooter';
import './VerifyEmail.scss';
class VerifyEmail extends Component {
    constructor(props){
        super(props);
        this.state = {
            statusVerify: false,
            errCode: 0
        }
    }
    async componentDidMount(){
        if(this.props.location&&this.props.location.search){
            let urlParams = new URLSearchParams(this.props.location.search);
            let token = urlParams.get('token');
            let doctorId = urlParams.get('doctorId');
            let res = await postVerifyBookingAppointment({
                token: token,
                doctorId: doctorId,
            })
            if(res && res.errCode ===0){
                this.setState({
                    statusVerify:true,
                    errCode:res.errCode
                })
            }else{
                this.setState({
                    statusVerify:true,
                    errCode: res && res.errCode ? res.errCode :-1
                })
            }
        }
    }
    
    async componentDidUpdate(prevProps, prevState,  snapshot){
        if(this.props.language !== prevProps.language){

        }
    }
    render() {
        let{statusVerify,errCode} = this.state
        return (
            <>
                <HomeHeader/>
                {
                statusVerify===false?
                    <div>Loadind data....</div>
                :
                <div>
                    {+errCode===0?
                    <body className='body'>
                    <div className="mainbox">
                    <i class="fas fa-calendar-check"></i>                    <div className="msg title">
                            <p>Booking care xác nhận lịch hẹn của bạn đã thành công!</p>
                        </div>
                    </div>
                    </body>
                    :
                    <body className='body'>
                        <div className="mainbox">
                        <i class="fas fa-frown"></i>                        <div className="msg title">
                                <p>Booking care rất tiếc vì hiện tại lịch hẹn này tồn tại hoặc đã được xác nhận!</p>
                            </div>
                        </div>
                    </body>
                }
                </div>
                }
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(VerifyEmail);
