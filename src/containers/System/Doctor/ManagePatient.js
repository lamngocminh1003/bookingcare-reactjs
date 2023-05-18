import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import {LANGUAGES} from "../../../utils";
import moment from 'moment/moment';
import './ManagePatient.scss';
import {getAllPatientForDoctor,postSendRemedy} from '../../../services/userService'
import DatePicker from ' ../../../src/components/Input/DatePicker';
import RemedyModal from './RemedyModal';
import { toast } from "react-toastify";
import LoadingOverlay from 'react-loading-overlay';
class ManagePatient extends Component {
    constructor(props){
        super(props);
        this.state = {
            currentDate: moment(new Date()).startOf('day').valueOf(),
            dataPatient:[],
            isOpenRemedyModal: false,
            dataModal:{},
            isCloseRemedyModal:false,
            isShowLoadingOverlay:false
        }
    }
    async componentDidMount(){

        this.getDataPatient()
        
    }
     getDataPatient = async ()=>{
        let {user} = this.props
        let {currentDate}= this.state
        let formattedDate = new Date(currentDate).getTime();
        let res =await getAllPatientForDoctor({
            doctorId:user.id,
            date: formattedDate
        })
        if(res && res.errCode === 2 ){
            this.setState({
                dataPatient:res.data
            })
        }
    }
    async componentDidUpdate(prevProps, prevState,  snapshot){
        if(this.props.language !== prevProps.language){

        }
    }
    handleOnChangeDatePicker=(date)=>{
        this.setState({
            currentDate:date[0]
        }, async()=>{
            await this.getDataPatient()
        })
    }
    handleBtnConfirm=(item)=>{
        let data ={
            doctorId:item.doctorId,
            patientId:item.patientId,
            email:  item.patientData.email,
            lastName: item.patientData.lastName,
            firstName: item.patientData.firstName,
            timeType:item.timeType
        }
        this.setState({
            isOpenRemedyModal:true,
            dataModal:data
        })
    }
    isCloseRemedyModal=()=>{
        this.setState({
            isOpenRemedyModal:false,
            dataModal:{}
        })
    }
    sendRemedy = async(dataChild)=>{
        let {dataModal}= this.state
        this.setState({
            isShowLoadingOverlay:true
        })
        let res =await postSendRemedy({
            email:dataChild.email,
            firstName:dataChild.firstName,
            imageBase64: dataChild.imageBase64,
            doctorId:dataModal.doctorId,
            patientId:dataModal.patientId,
            timeType:dataModal.timeType,
            language:this.props.language
        });
        if(res && res.errCode ===0){
            this.setState({
                isShowLoadingOverlay:false
            })
            toast.success('Send Remedy successfully')
            await this.getDataPatient()
            this.isCloseRemedyModal()
        }else{
            this.setState({
                isShowLoadingOverlay:false
            })
            toast.error('Something is wrong ')
            console.log('error sending remedy',res);
        }
    }
    render() {
        let {dataPatient,currentDate,isOpenRemedyModal,dataModal} = this.state
        let {language} = this.props
        return (
            <>
                <LoadingOverlay
                active={this.state.isShowLoadingOverlay}
                spinner
                text='Loading ...'
                >
                <div className='manage-patient-container'>
                    <div className='m-p-title title'>
                        <FormattedMessage id="admin.manage-patient.title" />
                    </div>
                    <div className='manage-patient-body row'>
                        <div className='col-4 form-group'>
                            <label><FormattedMessage id="admin.manage-patient.choose-date" /></label>
                            <DatePicker
                                onChange={this.handleOnChangeDatePicker}
                                className='form-control'
                                selectedDate={currentDate}
                                />
                        </div>
                        <div className='col-12 table-manage-patient'>
                            <table id="customers">
                                <tbody>
                                    <tr>
                                        <th><FormattedMessage id="admin.manage-handbook.ordinal-number" /></th>
                                        <th><FormattedMessage id="admin.manage-patient.time" /></th>
                                        <th><FormattedMessage id="manage-user.lastName" /></th>
                                        <th><FormattedMessage id="manage-user.firstName" /></th>
                                        <th><FormattedMessage id="manage-user.phoneNumber" /></th>
                                        <th><FormattedMessage id="manage-user.gender" /></th>
                                        <th><FormattedMessage id="manage-user.address" /></th>
                                        <th><FormattedMessage id="admin.manage-patient.reason" /></th>
                                        <th></th>
                                    </tr> 
                                    {dataPatient && dataPatient.length>0
                                    ? dataPatient.map ((item, index) =>{
                                        let gender = language === LANGUAGES.VI ?item.patientData.genderData.valueVi : item.patientData.genderData.valueEn
                                        let time = language === LANGUAGES.VI ?item.timeTypeDataPatient.valueVi : item.timeTypeDataPatient.valueEn
                                        return( 
                                            <tr key={index}>
                                                <td>{index+1}</td>
                                                <td>{time}</td>
                                                <td>{item.patientData.lastName}</td>
                                                <td>{item.patientData.firstName}</td>
                                                <td>{item.patientData.phoneNumber}</td>
                                                <td>{gender}</td>
                                                <td>{item.patientData.address}</td>
                                                <td>{item.patientData.reason}</td>
                                                <td className='doctor-action'>
                                                    <button className='btn btn-success'
                                                    onClick={()=> this.handleBtnConfirm(item)}
                                                    ><FormattedMessage id="patient.booking-modal.accept" />
                                                    </button>
                                                </td>
                                            </tr>
                                        )
                                    }):
                                    <tr>
                                        <td colspan="9" className='no-have-booking text-center'
                                        ><FormattedMessage id="admin.manage-patient.no-appointment" /></td>
                                    </tr>
                                    
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <RemedyModal
                isOpenModalBooking={isOpenRemedyModal}
                dataModal={dataModal}
                closeBookingModal={this.isCloseRemedyModal}
                sendRemedy={this.sendRemedy}
                />
                </LoadingOverlay>
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        user:state.user.userInfo,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManagePatient);
