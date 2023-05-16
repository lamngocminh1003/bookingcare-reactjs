import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import {LANGUAGES} from "../../../utils";
import _ from 'lodash';
import './DetailClinic.scss';
import HomeHeader from '../../HomePage/HomeHeader';
import DoctorSchedule from '../Doctor/DoctorSchedule';
import DoctorExtraInfo from '../Doctor/DoctorExtraInfo';
import ProfileDoctor from '../Doctor/ProfileDoctor';
import {getAllCodeService,getDetailClinicById} from '../../../services/userService'
class DetailClinic extends Component {
    constructor(props){
        super(props);
        this.state = {
            arrDoctorId:[],
            dataDetailClinic: [],
        }
    }
    async componentDidMount(){
        if(this.props.match && this.props.match.params && this.props.match.params.id){
            let id = this.props.match.params.id;
            let res =await getDetailClinicById({
                id: id,
            });
            if(res && res.errCode === 0 ){
                let data =res.data;
                let arrDoctorId=[]
                if(data && !_.isEmpty(data)){
                    let arr = data.doctorClinic;
                    if(arr && arr.length>0){
                        arr.map(item =>{
                            arrDoctorId.push(item.doctorId);
                        })
                }}
                this.setState({
                    dataDetailClinic:res.data,
                    arrDoctorId:arrDoctorId,
            })
        }
    }}
    
    async componentDidUpdate(prevProps, prevState,  snapshot){
        if(this.props.language !== prevProps.language){

        }
    }
    render() {
        let {arrDoctorId,dataDetailClinic} = this.state
        let {language}= this.props
        return (
            <div className='detail-specialty-container'>
                <HomeHeader/>
                <div className='detail-specialty-body'> 
                        <div className='des-specialty' > 
                                {dataDetailClinic && !_.isEmpty(dataDetailClinic) && 
                                    <> 
                                        <div className='info-clinic'>
                                            <div className='image-clinic' style={{backgroundImage: `url(${dataDetailClinic && dataDetailClinic.image ? dataDetailClinic.image:''})`,}}></div>
                                            <div className='clinic-name-address'>
                                                <div className='name-clinic'>{dataDetailClinic.name} </div>
                                                <div className='address-clinic'> 
                                                    <span>
                                                        <i className="fas fa-map-marker-alt"></i>
                                                    </span>
                                                    <span>
                                                        {dataDetailClinic.address}
                                                    </span>
                                                </div>
                                            </div>
                                        </div >
                                        <div dangerouslySetInnerHTML={{__html: dataDetailClinic.descriptionHTML}} className='des-clinic'>
                                        </div>
                                    </>
                                }
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
                                        isShowLinkDetail={true}
                                        isShowPrice={false}
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailClinic);
