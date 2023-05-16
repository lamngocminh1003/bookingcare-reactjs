import React, { Component } from 'react';
import { connect } from "react-redux";
import './ManageSchedule.scss';
import { FormattedMessage } from 'react-intl';
import Select from 'react-select';
import { LANGUAGES,dateFormat } from "../../../utils";
import * as actions from "../../../store/actions";
import DatePicker from ' ../../../src/components/Input/DatePicker';
import moment from 'moment/moment';
import reactRouterDom from 'react-router-dom';
import _ from 'lodash';
import { toast } from "react-toastify";
import { saveBulkCreateScheduleDoctor } from '../../../services/userService';
class ManageSchedule extends Component {
    constructor(props){
        super(props);
        this.state = {
            listDoctors:[],
            selectedDoctor:{},
            currentDate:'',
            rangeTime:[],
        }
    }
    componentDidMount(){
        this.props.fetchAllDoctors();
        this.props.fetchAllScheduleTime();
    }
    componentDidUpdate(prevProps, prevState,snapshot){
        if (prevProps.allDoctors !== this.props.allDoctors){
            let dataSelect =this.buildDataInputSelect(this.props.allDoctors)
            this.setState({listDoctors:dataSelect});
        }

        if(prevProps.allScheduleTime !== this.props.allScheduleTime){
            let data = this.props.allScheduleTime
            if(data && data.length > 0){
                data = data.map(item =>({...item,isSelected:false}))
            }
            this.setState({
                rangeTime:data
            })
        }
        // if(prevProps.language !== this.props.language){
        //     let dataSelect =this.buildDataInputSelect(this.props.allDoctors)
        //     this.setState({listDoctors:dataSelect});
        // }
    }
    buildDataInputSelect = (inputData)=>{
        let result=[];
        let {language} = this.props;
        if(inputData && inputData.length >0 ){
            inputData.map((item,index)=>{
                let object ={};
                let labelVi = `${item.lastName} ${item.firstName}`;
                let labelEn = `${item.firstName} ${item.lastName}`;
                object.label = language === LANGUAGES.VI ? labelVi : labelEn;
                object.value = item.id;
                result.push(object);
            })
        }
        return result
    }
    handleChangeSelect = async selectedOption => {
        this.setState({ selectedDoctor:selectedOption });
      };
    handleOnChangeDatePicker=(date)=>{
        this.setState({
            currentDate:date[0]
        })
    }
    handleClickBtnTime=(time)=>{
        let {rangeTime} = this.state;
        if(rangeTime && rangeTime.length > 0) {
            rangeTime =  rangeTime.map(item => {
                if(item.id === time.id) 
                    item.isSelected = !item.isSelected;
                    return item;
                 
            })
            this.setState({
                rangeTime:rangeTime
            })
        }
    }
    handleSaveSchedule= async()=>{
        let {rangeTime , selectedDoctor , currentDate} = this.state
        let result =[]
        if(!currentDate){
            toast.error("Invalid date!");
            return;
        }
        if(selectedDoctor && _.isEmpty(selectedDoctor)){
            toast.error("Invalid selected doctor!");
            return;
        }
        let formattedDate = new Date(currentDate).getTime();
        if(rangeTime && rangeTime.length>0){
            let selectedTime = rangeTime.filter(item => item.isSelected === true);
            console.log("checked " , selectedTime);
            if(selectedTime && selectedTime.length>0){
                selectedTime.map(schedule => { 
                    let object = {} ;
                    object.doctorId = selectedDoctor.value;
                    object.date = formattedDate;
                    object.timeType = schedule.keyMap;
                    result.push(object);
                })
                
            }else{
                toast.error("Invalid selected time!");
            }
        }
        let res = await saveBulkCreateScheduleDoctor({
            arrSchedule:result,
            doctorId:selectedDoctor.value,
            formattedDate:''+formattedDate
        })
        if (res&&res.errCode===0){
            toast.success("Save information succeed!");
        }else{
            toast.error("saveBulkCreateScheduleDoctor!");
            console.log('saveBulkCreateScheduleDoctor >>> res: ',res);
        }
        
        console.log('result: ',result);
    }
    render() {
        let {rangeTime} = this.state
        let {language} = this.props
        let yesterday = new Date(new Date().setDate(new Date().getDate()-1));
        return (
            <div className='manage-schedule-container'>
                <div className='m-s-title title'>
                    <FormattedMessage id='manage-schedule.title'/>
                </div>
                <div className='container'>
                    <div className='row'>
                        <div className='col-6 form-group'>
                            <label><FormattedMessage id='manage-schedule.choose-doctor'/></label>
                            <Select
                                value={this.state.selectedDoctor}
                                onChange={this.handleChangeSelect}
                                options={this.state.listDoctors}
                            />
                        </div>
                        <div className='col-6 form-group'>
                            <label><FormattedMessage id='manage-schedule.choose-date'/></label>
                            <DatePicker
                            onChange={this.handleOnChangeDatePicker}
                            className='form-control'
                            selectedDate={this.state.currentDate}
                            minDate={yesterday}
                            />
                        </div>
                        <div className='col-12 pick-hour-container'>
                            {rangeTime && rangeTime.length>0 &&
                            rangeTime.map((item,index)=>{
                                return(
                                    <button 
                                    className={item.isSelected  ===true ? 'btn btn-warning' 
                                    : 'btn btn-info'} 
                                    key = {index}
                                    onClick={()=>this.handleClickBtnTime(item)}>
                                        {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                                    </button>
                                )
                            })
                            }
                        </div>
                        <div className='col-12'>
                            <button 
                            className='btn btn-warning btn-save-schedule'
                            onClick={()=>this.handleSaveSchedule()}>
                                <FormattedMessage id='manage-schedule.save'/>
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
        allDoctors:state.admin.allDoctors,
        allScheduleTime:state.admin.allScheduleTime
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllDoctors:()=>dispatch(actions.fetchAllDoctors()),
        fetchAllScheduleTime:()=>dispatch(actions.fetchAllScheduleTime()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSchedule);
