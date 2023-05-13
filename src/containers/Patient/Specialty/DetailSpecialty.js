import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import {LANGUAGES} from "../../../utils";
import './DetailSpecialty.scss';
import HomeHeader from '../../HomePage/HomeHeader';
import DoctorSchedule from '../Doctor/DoctorSchedule';
import DoctorExtraInfo from '../Doctor/DoctorExtraInfo';
import ProfileDoctor from '../Doctor/ProfileDoctor';

class DetailSpecialty extends Component {
    constructor(props){
        super(props);
        this.state = {
            arrDoctorId:[20,12,8]
        }
    }
    async componentDidMount(){
        
    }
    
    async componentDidUpdate(prevProps, prevState,  snapshot){
        if(this.props.language !== prevProps.language){

        }
    }
    render() {
        let {arrDoctorId} = this.state
        return (
            <div className='detail-specialty-container'>
                <HomeHeader/>
                <div className='detail-specialty-body'> 
                    <div className='des-specialty'>

                    </div>
                    {arrDoctorId && arrDoctorId.length>0 &&
                    arrDoctorId.map((item,index)=>{
                        return (
                            <div className='each-doctor' key={index}>
                                <div className='dt-content-left'>
                                    <div className='profile-doctor'>
                                        <ProfileDoctor  
                                        doctorId={item}
                                        isShowDesDoctor={true}
                                        // dataTime={dataTime}
                                        />
                                    </div>
                                </div>
                                <div className='dt-content-right'>
                                    <div className='doctor-schedule'>
                                        <DoctorSchedule
                                            doctorIdFromParent={item}
                                        />
                                    </div>
                                    <div className='doctor-extraInfo'>
                                        <DoctorExtraInfo
                                            doctorIdFromParent={item}
                                        />
                                    </div>
                                </div>
                            </div>
                        )
                    })
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailSpecialty);
