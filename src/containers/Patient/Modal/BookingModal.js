import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import {LANGUAGES} from "../../../utils";
import './BookingModal.scss';
import moment from 'moment/moment';
import {Modal} from 'reactstrap'; 
import ProfileDoctor from '../Doctor/ProfileDoctor';
import _ from 'lodash';
import DatePicker from ' ../../../src/components/Input/DatePicker';
import * as actions from '../../../../src/store/actions';
import Select from 'react-select';
import { toast } from "react-toastify";
import {postPatientBookingAppointment} from '../../../../src/services/userService'
import LoadingOverlay from 'react-loading-overlay';
class BookingModal extends Component {
    constructor(props){
        super(props);
        this.state = {
            lastName:'',
            firstName:'',
            phoneNumber:'',
            email:'',
            address:'',
            reason:'',  
            birthday:'',
            doctorId:'',
            genders:'',
            selectedGender: '',
            timeType:'',
            isShowLoadingOverlay:false
        }
    }
    async componentDidMount(){
        this.props.getGenderStart()
    }
    buildDataGender=(data)=>{
        let result = [];
        let language= this.props.language;
        if(data && data.length >0){
            data.map(item=>{
                let object ={};
                object.label = language === LANGUAGES.VI ? item.valueVi : item.valueEn
                object.value = item.keyMap;
                result.push(object);
            })
            return result
        }
    }
    async componentDidUpdate(prevProps, prevState,  snapshot){
        if(this.props.language !== prevProps.language){
            this.setState({
                genders: this.buildDataGender(this.props.genders)
            })
        }
        if(this.props.genders !==prevProps.genders){
            this.setState({
                genders: this.buildDataGender(this.props.genders)
            })
        }
        if(this.props.dataTime !== prevProps.dataTime){
            if(this.props.dataTime && !_.isEmpty(this.props.dataTime)){
                let doctorId =this.props.dataTime.doctorId;
                let timeType =this.props.dataTime.timeType;
                this.setState({
                    doctorId:doctorId,
                    timeType:timeType
                })
            }
        }
    }
    handleOnChangeInput = (event,id)=>{
        let valueInput = event.target.value;
        let stateCopy = {...this.state}
        stateCopy[id] = valueInput;
        this.setState({...stateCopy})
    }
    handleOnChangeDatePicker= (date)=>{
        this.setState({
            birthday:date[0]
        })
    }
    handleChangeSelect=(selectedOption)=>{
        this.setState({ selectedGender:selectedOption });
    }
    capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    buildTimeBooking = (dataTime)=>{
        let {language} = this.props
        if(dataTime && !_.isEmpty(dataTime)){
            let time = language === LANGUAGES.VI ? dataTime.timeTypeData.valueVi : dataTime.timeTypeData.valueEn;
            let object = {}
            let labelVi2 = moment.unix(+dataTime.date /1000).format('dddd - DD/MM/YYYY')
            object.label = this.capitalizeFirstLetter(labelVi2)
            let labelVi = moment.unix(+dataTime.date /1000).locale('en').format('ddd - MM/DD/YYYY')
            let date = language === LANGUAGES.VI ? 
            object.label :labelVi

            return `${time} - ${date}`
        }
        return ''
    }
    buildDoctorName=(dataTime) =>{
        let {language} = this.props
        if(dataTime && !_.isEmpty(dataTime)){
            let name = language === LANGUAGES.VI ? `${dataTime.doctorData.lastName} ${dataTime.doctorData.firstName}` 
            : `${dataTime.doctorData.firstName} ${dataTime.doctorData.lastName}`
            return name
        }
        return ''
    }
    handleConfirmBooking=async()=>{

        let {lastName, firstName, phoneNumber , email,address,reason,birthday,selectedGender} = this.state

        if(!lastName){
            toast.error("Invalid last name!");
            return;
        }
        if(!firstName){
            toast.error("Invalid first name!");
            return;
        }
        if(!phoneNumber){
            toast.error("Invalid phone number!");
            return;
        }
        if(!email){
            toast.error("Invalid email!");
            return;
        }
        if(!address){
            toast.error("Invalid address!");
            return;
        }
        if(!reason){
            toast.error("Invalid reason!");
            return;
        }
        if(!selectedGender){
            toast.error("Invalid selected gender!");
            return;
        }
        if(!birthday){
            toast.error("Invalid birthday!");
            return;
        }
        let doctorName = this.buildDoctorName(this.props.dataTime)
        let date = new Date(this.state.birthday).getTime();
        let timeString = this.buildTimeBooking(this.props.dataTime)
        this.setState({
            isShowLoadingOverlay:true
        })
        let res = await postPatientBookingAppointment({
            lastName:this.state.lastName,
            firstName:this.state.firstName,
            phoneNumber:this.state.phoneNumber,
            email:this.state.email,
            address:this.state.address,
            reason:this.state.reason,  
            date:this.props.dataTime.date,
            birthday:date,
            doctorId:this.state.doctorId,
            selectedGender: this.state.selectedGender.value,
            timeType: this.state.timeType,
            language: this.props.language,
            timeString: timeString,
            doctorName:doctorName
        })
        if(res && res.errCode === 0 ) {
            this.setState({
                isShowLoadingOverlay:false
            })
            toast.success("Booking an appointment successfully");
            this.props.closeBookingModal();
        }else{
            this.setState({
                isShowLoadingOverlay:false
            })
            toast.error("Booking an appointment error");
        }
        console.log("check confirmation", this.state);
    }
    render() {
        //toggle={}
        let {isOpenModalBooking,closeBookingModal,dataTime}= this.props;
        let doctorId ='';
        if(dataTime && !_.isEmpty(dataTime)){
            doctorId=dataTime.doctorId
        }
        return (
            <div >
                <LoadingOverlay
                active={this.state.isShowLoadingOverlay}
                spinner
                text='Loading ...'
                >
                <Modal
                isOpen={isOpenModalBooking}
                className={'booking-modal-container'}
                size='lg'
                centered
                >
                    <div className='booking-modal-content'>
                        <div className='booking-modal-header'>
                            <span className='left'>
                                <FormattedMessage id='patient.booking-modal.title'/>
                            </span>
                            <span className='right'>
                                <i className="fas fa-times" onClick={closeBookingModal}>
                                </i>
                            </span>
                        </div>
                        <div className='booking-modal-body container'>
                            {/* {JSON.stringify(dataTime)} */}
                            <div className='doctor-info'>
                                <ProfileDoctor  
                                doctorId={doctorId}
                                isShowDesDoctor={false}
                                dataTime={dataTime}
                                isShowLinkDetail={false}
                                isShowPrice={true}
                                />
                            </div>
                            <div className='row'>
                                <div className='col-6'>
                                    <label>
                                        <FormattedMessage id='patient.booking-modal.lastName'/>
                                    </label>
                                    <input  className='form-control'
                                    value={this.state.lastName}
                                    onChange={(event)=>this.handleOnChangeInput(event,'lastName')}
                                    />
                                </div>
                                <div className='col-6'>
                                    <label>
                                        <FormattedMessage id='patient.booking-modal.firstName'/>
                                    </label>
                                    <input  className='form-control'
                                    value={this.state.firstName}
                                    onChange={(event)=>this.handleOnChangeInput(event,'firstName')}
                                    />
                                </div>
                                <div className='col-6'>
                                    <label><FormattedMessage id='patient.booking-modal.email'/></label>
                                    <input  className='form-control' 
                                    type='email' 
                                    value={this.state.email}
                                    onChange={(event)=>this.handleOnChangeInput(event,'email')}/>
                                </div>
                                <div className='col-6'>
                                    <label><FormattedMessage id='patient.booking-modal.address'/></label>
                                    <input  className='form-control'
                                    value={this.state.address}
                                    onChange={(event)=>this.handleOnChangeInput(event,'address')}/>
                                </div>
                                <div className='col-12'>
                                    <label><FormattedMessage id='patient.booking-modal.reason'/></label>
                                    <input  className='form-control'
                                    value={this.state.reason}
                                    onChange={(event)=>this.handleOnChangeInput(event,'reason')}/>
                                </div>
                                <div className='col-4'>
                                    <label><FormattedMessage id='patient.booking-modal.phoneNumber'/></label>
                                    <input  className='form-control'
                                    value={this.state.phoneNumber}
                                    onChange={(event)=>this.handleOnChangeInput(event,'phoneNumber')}/>
                                </div>
                                <div className='col-4'>
                                    <label><FormattedMessage id='patient.booking-modal.birthday'/></label>
                                    <DatePicker
                                    onChange={this.handleOnChangeDatePicker}
                                    className='form-control'
                                    selectedDate={this.state.currentDate}
                                    value={this.state.birthday}
                                    />
                                </div>
                                <div className='col-4'>
                                    <label><FormattedMessage id='patient.booking-modal.gender'/></label>
                                    <Select
                                    value={this.state.selectedGender}
                                    onChange={this.handleChangeSelect}
                                    options={this.state.genders}
                                    placeholder={<FormattedMessage id='patient.booking-modal.selectedGender'/>}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className='booking-modal-footer'>
                            <button className='btn btn-primary btn-booking-confirm'
                            onClick={()=>this.handleConfirmBooking()}><FormattedMessage id='patient.booking-modal.accept'/></button>
                            <button className='btn btn-secondary btn-cancel'
                            onClick={closeBookingModal}>
                                <FormattedMessage id='patient.booking-modal.cancel'/>
                            </button>
                        </div>
                    </div>
                </Modal>
                </LoadingOverlay>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        genders: state.admin.genders,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getGenderStart: () => dispatch(actions.fetchGenderStart()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookingModal);
