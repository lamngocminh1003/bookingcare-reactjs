import React, { Component } from 'react';
import { connect } from "react-redux";
import './DoctorExtraInfo.scss';
import Select from 'react-select';
import { FormattedMessage } from 'react-intl';
import {LANGUAGES} from "../../../utils";
import  NumericFormat  from 'react-number-format';
import {getExtraInfoDoctorById} from "../../../services/userService"
class DoctorExtraInfo extends Component {
    constructor(props){
        super(props);
        this.state = {
            isShowDetailInfo: false,
            extraInfo:{}
        }
    }
    async componentDidMount(){
        
    }
    
    async componentDidUpdate(prevProps, prevState,  snapshot){
        if(this.props.language !== prevProps.language){

        }
        if(this.props.doctorIdFromParent!==prevProps.doctorIdFromParent){
            let res= await getExtraInfoDoctorById(this.props.doctorIdFromParent);
            if(res && res.errCode === 2){
                this.setState({
                    extraInfo:res.data
                })
            }
        }
    }
    showHideDetailInfo = (status)=>{
        this.setState({
            isShowDetailInfo:status
        })
    }
    render() {
        let {isShowDetailInfo,extraInfo} = this.state;
        let language = this.props.language
        return (
            <div className='doctor-extra-info-container'>
                <div className='content-up'>
                    <div className='text-address'>
                    <FormattedMessage id='patient.extra-info-doctor.addressClinic'/>
                    </div >
                    <div className='name-clinic'>
                        {extraInfo && extraInfo.nameClinic ?extraInfo.nameClinic :''}
                    </div>
                    <div className='detail-address'>
                        {extraInfo && extraInfo.addressClinic ?extraInfo.addressClinic :''}
                    </div>
                </div>
                <div className='content-down'>
                    {isShowDetailInfo === false && 
                    <div className='short-info'>
                        <FormattedMessage id='patient.extra-info-doctor.price'/>
                        {extraInfo && extraInfo.priceTypeData && language===LANGUAGES.VI &&
                        <NumericFormat
                        value={extraInfo.priceTypeData.valueVi}
                        thousandSeparator={true}
                        displayType="text"
                        suffix="VNĐ"
                        className='currency'
                        />
                        }
                        {extraInfo && extraInfo.priceTypeData && language===LANGUAGES.EN &&
                        <NumericFormat
                        value={extraInfo.priceTypeData.valueEn}
                        thousandSeparator={true}
                        displayType="text"
                        suffix="USD"
                        className='currency'
                        />
                        }. 
                        <span
                        onClick={()=>this.showHideDetailInfo(true)}>
                            <FormattedMessage id='patient.extra-info-doctor.view-details'/>
                        </span>
                    </div>
                    }
                    {isShowDetailInfo === true && 
                    <React.Fragment>
                        <div className='title-price'><FormattedMessage id='patient.extra-info-doctor.price'/> .</div>
                        <div className='detail-info'>
                            <div className='price'>
                                <span className='left'><FormattedMessage id='patient.extra-info-doctor.price'/></span>
                                <span className='right'>
                                    {extraInfo && extraInfo.priceTypeData && language===LANGUAGES.VI &&
                                    <NumericFormat
                                    value={extraInfo.priceTypeData.valueVi}
                                    thousandSeparator={true}
                                    displayType="text"
                                    suffix="VNĐ"
                                    className='currency'
                                    />
                                    }
                                    {extraInfo && extraInfo.priceTypeData && language===LANGUAGES.EN &&
                                    <NumericFormat
                                    value={extraInfo.priceTypeData.valueEn}
                                    thousandSeparator={true}
                                    displayType="text"
                                    suffix="USD"
                                    className='currency'
                                    />
                                    }</span>
                            </div>
                            <div className='note'>
                            {extraInfo && extraInfo.note ?extraInfo.note :''}
                            </div>
                        </div>
                        <div className='payment'><FormattedMessage id='patient.extra-info-doctor.payment-method'/> 
                        <span>
                        {extraInfo && extraInfo.paymentTypeData && language ===LANGUAGES.VI  ? extraInfo.paymentTypeData.valueVi : ''}
                        {extraInfo && extraInfo.paymentTypeData && language ===LANGUAGES.EN ? extraInfo.paymentTypeData.valueEn : ''}
                        </span>
                        </div>
                        <div className='hide-price'>
                            <span onClick={()=>this.showHideDetailInfo(false)}>
                            <FormattedMessage id='patient.extra-info-doctor.hide-price'/>
                            </span>
                        </div>
                    </React.Fragment>
                    }
                    
                </div>
            </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(DoctorExtraInfo);
