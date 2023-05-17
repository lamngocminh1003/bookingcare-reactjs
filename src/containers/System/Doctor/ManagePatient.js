import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import {LANGUAGES} from "../../../utils";
import moment from 'moment/moment';
import './ManagePatient.scss';
import {getAllPatientForDoctor} from '../../../services/userService'
import DatePicker from ' ../../../src/components/Input/DatePicker';
class ManagePatient extends Component {
    constructor(props){
        super(props);
        this.state = {
            currentDate: moment(new Date()).startOf('day').valueOf(),
            dataPatient:[]
        }
    }
    async componentDidMount(){
        let {user} = this.props
        let {currentDate}= this.state
        let formattedDate = new Date(currentDate).getTime();
        this.getDataPatient(user,formattedDate)
        
    }
     getDataPatient = async (user,formattedDate)=>{
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
        },()=>{
            let {user} = this.props
            let {currentDate}= this.state
            let formattedDate = new Date(currentDate).getTime();
            this.getDataPatient(user,formattedDate)
        })
    }
    handleBtnConfirm=()=>{}
    handleBtnFee=()=>{}
    render() {
        console.log('checking state:',this.state);
        let {dataPatient} = this.state
        return (
            <div className='manage-patient-container'>
                <div className='m-p-title title'>
                    Quản lý bệnh nhân khám bệnh
                </div>
                <div className='manage-patient-body row'>
                    <div className='col-4 form-group'>
                        <label>Chọn ngày khám</label>
                        <DatePicker
                            onChange={this.handleOnChangeDatePicker}
                            className='form-control'
                            selectedDate={this.state.currentDate}
                            />
                    </div>
                    <div className='col-12 table-manage-patient'>
                        <table id="customers">
                            <tbody>
                                <tr>
                                    <th>STT</th>
                                    <th>Thời gian</th>
                                    <th>Last name</th>
                                    <th>First name</th>
                                    <th>Phone Number</th>
                                    <th>Giới tính</th>
                                    <th>Address</th>
                                    <th>Lý do khám</th>
                                    <th></th>
                                </tr> 
                                {dataPatient && dataPatient.length>0
                                ? dataPatient.map ((item, index) =>{
                                    return( 
                                        <tr key={index}>
                                            <td>{index+1}</td>
                                            <td>{item.timeTypeDataPatient.valueVi}</td>
                                            <td>{item.patientData.lastName}</td>
                                            <td>{item.patientData.firstName}</td>
                                            <td>{item.patientData.phoneNumber}</td>
                                            <td>{item.patientData.genderData.valueVi}</td>
                                            <td>{item.patientData.address}</td>
                                            <td>{item.patientData.reason}</td>
                                            <td className='doctor-action'>
                                                <button className='btn btn-success'
                                                onClick={()=> this.handleBtnConfirm()}
                                                >Xác nhận</button>
                                                <button className='btn btn-info'
                                                onClick={()=> this.handleBtnFee()}
                                                >Gửi hóa đơn</button>
                                            </td>
                                        </tr>
                                    )
                                }):
                                <tr>
                                    <td colspan="9" className='no-have-booking text-center'
                                    >Ngày này hiện chưa có bệnh nhân đăng ký khám!</td>
                                </tr>
                                
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
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
