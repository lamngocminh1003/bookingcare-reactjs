import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import localization from "moment/locale/vi";
import {LANGUAGES} from "../../../utils";
import _ from 'lodash';
import'./ProfileDoctor.scss';
import  NumericFormat  from 'react-number-format';
import {getProfileDoctorById} from '../../../services/userService'
import moment from 'moment/moment';
import { Link } from 'react-router-dom';
class ProfileDoctor extends Component {
    constructor(props){
        super(props);
        this.state = {
            dataProfile: {}
        }
    }
    async componentDidMount(){
        let data = await this.getInfoDoctor(this.props.doctorId)
        this.setState({dataProfile: data})
    }
    getInfoDoctor= async(id) => {
        let result ={}
        if(id){
            let res = await getProfileDoctorById(id);
            if (res && res.errCode === 2 ) {
                result = res.data
        }
    }
    return result;
}
    async componentDidUpdate(prevProps, prevState,  snapshot){
        if(this.props.language !== prevProps.language){

        }
        if(this.props.doctorId !== prevProps.doctorId){
            let data = await this.getInfoDoctor(this.props.doctorId);
            this.setState({
                dataProfile: data,
            });
        }

    }
    capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    renderTimeBooking = (dataTime)=>{
        let {language} = this.props
        if(dataTime && !_.isEmpty(dataTime)){
            let time = language === LANGUAGES.VI ? dataTime.timeTypeData.valueVi : dataTime.timeTypeData.valueEn;
            let object = {}
            let labelVi2 = moment.unix(+dataTime.date /1000).format('dddd - DD/MM/YYYY')
            object.label = this.capitalizeFirstLetter(labelVi2)
            let labelVi = moment.unix(+dataTime.date /1000).locale('en').format('ddd - MM/DD/YYYY')
            let date = language === LANGUAGES.VI ? 
            object.label :labelVi
            return(
                <>
                    <div>
                       {time} - {date}
                    </div>
                    <div>
                    <FormattedMessage id='patient.profile-doctor.free-booking'/>
                    </div>
                </>
            )
        }
        return <></>
    }
    render() {
        let {dataProfile} = this.state
        let {language,isShowDesDoctor,dataTime,isShowLinkDetail,
        isShowPrice,doctorId} =this.props
        let nameEn='';
        let nameVi='';
        if(dataProfile && dataProfile.positionData){
            nameVi =`${dataProfile.positionData.valueVi}, ${dataProfile.lastName} ${dataProfile.firstName} `;
            nameEn =`${dataProfile.positionData.valueEn}, ${dataProfile.firstName} ${dataProfile.lastName}`;
       }
       console.log('checking props',dataTime);
        return (
            <div className='profile-doctor-container'>
                <div className='intro-doctor'>
                    <div 
                    className='content-left' 
                    style={{backgroundImage: `url(${dataProfile && dataProfile.image ? dataProfile.image:''})`,}}>
                    </div>
                    <div className='content-right'>
                        <div className='up'>
                            {language === LANGUAGES.VI ? nameVi : nameEn}
                        </div>
                        <div className='down'>
                            {isShowDesDoctor === true ?
                            <>
                                { dataProfile && dataProfile.Markdown && dataProfile.Markdown.description && 
                                <span>
                                    {dataProfile.Markdown.description}
                                </span>}
                                
                            </>
                            :<>
                            {this.renderTimeBooking(dataTime)}
                            </>
                        }
                        </div>
                    </div>
                </div>
                {isShowLinkDetail === true &&
                <div className='view-detail-doctor'>
                    <Link to={`/detail-doctor/${doctorId}`}>
                        <FormattedMessage id='homepage.more-info'/>
                    </Link>
                </div>}

                {isShowPrice === true &&
                <div className='price'>
                    <span className='far'><i className="far fa-dot-circle fav_language"></i></span>
                    <span className='price-blue'>
                        <span className='price-text'>
                            <FormattedMessage id='patient.profile-doctor.price'/>
                        </span>
                        <span>
                                {dataProfile && dataProfile.Doctor_Info && language === LANGUAGES.VI
                                ?
                                    <NumericFormat
                                    value={dataProfile.Doctor_Info.priceTypeData.valueVi}
                                    thousandSeparator={true}
                                    displayType="text"
                                    suffix="VNĐ"
                                    />
                                :''
                            }
                            {dataProfile && dataProfile.Doctor_Info && language === LANGUAGES.EN
                            ?
                                <NumericFormat
                                value={dataProfile.Doctor_Info.priceTypeData.valueEn}
                                thousandSeparator={true}
                                displayType="text"
                                suffix="USD"
                                />
                            :''
                            }
                        </span>
                    </span>
                </div>}
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

export default connect(mapStateToProps, mapDispatchToProps)(ProfileDoctor);
