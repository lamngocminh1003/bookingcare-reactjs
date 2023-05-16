import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import {LANGUAGES} from "../../../utils";
import './ManagePatient.scss';
import DatePicker from ' ../../../src/components/Input/DatePicker';
class ManagePatient extends Component {
    constructor(props){
        super(props);
        this.state = {
            currentDate: new Date(),
        }
    }
    async componentDidMount(){
        
    }
    
    async componentDidUpdate(prevProps, prevState,  snapshot){
        if(this.props.language !== prevProps.language){

        }
    }
    handleOnChangeDatePicker=(date)=>{
        this.setState({
            currentDate:date[0]
        })
    }
    render() {

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
                                    <th>Email</th>
                                    <th>First name</th>
                                    <th>Last name</th>
                                    <th>Address</th>
                                </tr> 
                                <tr>
                                    <td>email</td>
                                    <td>email</td>
                                    <td>email</td>
                                    <td>email</td>
                                </tr>
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
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManagePatient);
