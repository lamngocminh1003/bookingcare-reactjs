import React, { Component } from 'react';
import { connect } from "react-redux";
import './DoctorSchedule.scss';
import Select from 'react-select';
import moment from 'moment/moment';
import localization from "moment/locale/vi";
import { FormattedMessage } from 'react-intl';
import {LANGUAGES} from "../../../utils"
import BookingModal from '../Modal/BookingModal';
import {getScheduleDoctorByDate} from "../../../services/userService"
class DoctorSchedule extends Component {
    constructor(props){
        super(props);
        this.state = {
            allDays : [],
            allAvailableTimes :[],
            isOpenModalBooking : false,
            dataScheduleTimeModal:{}
        }
    }
    async componentDidMount(){
        let {language} = this.props;
        let allDays = this.getArrDays(language);
            this.setState({
                allDays: allDays,
            })
    }
    capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    getArrDays=(language)=>{
        let allDays =[]
        for (let i = 0; i < 7; i++){
            let object = {}
            if(language === LANGUAGES.VI){
                if(i===0){
                    let labelVi2 =moment(new Date()).format('DD/MM');
                    let today = `Hôm nay - ${labelVi2}`;
                    object.label=today
                }else{
                    let labelVi =moment(new Date()).add(i,'days').format('dddd - DD/MM');
                    object.label = this.capitalizeFirstLetter(labelVi)
                }

            }else{
                if(i===0){
                    let labelVi3 =moment(new Date()).format('DD/MM');
                    let today = `Today - ${labelVi3}`;
                    object.label=today
                }else{
                    object.label = moment(new Date()).add(i,'days').locale('en').format('ddd - DD/MM');
                }
            }
            object.value = moment(new Date()).add(i,'days').startOf('day').valueOf();
            allDays.push(object);
        }
        return allDays
    }
    async componentDidUpdate(prevProps, prevState,  snapshot){
        if(this.props.language !== prevProps.language){
            let allDays = this.getArrDays(this.props.language)
            this.setState({allDays: allDays})
        }
        if(this.props.doctorIdFromParent!==prevProps.doctorIdFromParent){
            let allDays = this.getArrDays(this.props.language)
            let res= await getScheduleDoctorByDate(this.props.doctorIdFromParent,allDays[0].value);
            this.setState({
                allAvailableTimes:res.data ? res.data :[]
            })
        }
    }
    handleOnChangeSelect=async(event) => {
        if(this.props.doctorIdFromParent && this.props.doctorIdFromParent !==-1 ){
            let doctorId = this.props.doctorIdFromParent;
            let date = event.target.value
            let res= await getScheduleDoctorByDate(doctorId,date);
            if(res && res.errCode ===0){
                this.setState({
                    allAvailableTimes: res.data ? res.data:[]
                })
            }

            console.log('check res getScheduleDoctorByDate: ' , res);
        }
    }
    handleClickScheduleTime= (time) => {
        this.setState({
            isOpenModalBooking:true,
            dataScheduleTimeModal:time
        })
        console.log('check time', time);
    }
    closeBookingModal= () => {
        this.setState({isOpenModalBooking:false})
    }

    render() {
        let {allDays,allAvailableTimes,isOpenModalBooking,dataScheduleTimeModal} = this.state;
        let {language} = this.props;
        return (
            <>
                <div className='doctor-schedule-container'>
                    <div className='all-schedule'>
                        <select onChange={(event)=>this.handleOnChangeSelect(event)}>
                            {allDays && allDays.length>0 && allDays.map((item,index) => {
                                return (
                                    <option 
                                    value={item.value}
                                    key = {index}
                                    >
                                        {item.label}
                                    </option>
                                )
                            })}  
                        </select>
                    </div>
                    <div className='all-available-time'>
                            <div className='text-calendar'>
                                <i className="fas fa-calendar-alt">
                                    <span>
                                        <FormattedMessage id='patient.detail-doctor.schedule'/>
                                    </span>
                                </i> 
                            </div>
                            <div className='time-content'>
                                {allAvailableTimes&&allAvailableTimes.length>0 
                                ? <React.Fragment>
                                    <div className='time-content-btn'>
                                    { allAvailableTimes.map((item,index)=>{
                                            let timeDisplay = language ===LANGUAGES.VI ? item.timeTypeData.valueVi : item.timeTypeData.valueEn
                                            return (
                                                <button key={index } className={language ===LANGUAGES.VI ?'btn btn-info btn-vi':'btn btn-info btn-en'}
                                                onClick={()=>this.handleClickScheduleTime(item)}
                                                >
                                                    {timeDisplay}
                                                </button>
                                            )
                                        })}
                                    </div>
                                    <div className='book-free'>
                                        <span>
                                            <FormattedMessage id='patient.detail-doctor.choose'/> 
                                            <i class="far fa-hand-point-up"></i>
                                            <FormattedMessage id='patient.detail-doctor.book-free'/>
                                        </span>
                                    </div>
                                </React.Fragment>:
                                <div className='no-schedule'>
                                    <FormattedMessage id='patient.detail-doctor.no-schedule'/>
                                </div>
                                }
                            </div>
                    </div>
                </div>
                <BookingModal
                isOpenModalBooking={isOpenModalBooking}
                closeBookingModal={this.closeBookingModal}
                dataTime={dataScheduleTimeModal}
                />
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

export default connect(mapStateToProps, mapDispatchToProps)(DoctorSchedule);
