import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import * as actions from "../../../store/actions";
import { connect } from 'react-redux';
import './TableManageClinic.scss';
import 'react-markdown-editor-lite/lib/index.css';

class TableManageClinic extends Component {

    constructor(props){
        super(props);
        this.state = {
            clinicRedux:[]
        }
    }
    componentDidMount(){
        this.props.fetchClinicRedux();
    }
    componentDidUpdate(prevProps, prevState,  snapshot){
        if(prevProps.listClinic !==this.props.listClinic){
            this.setState({
                clinicRedux:this.props.listClinic
            })
        }
    }
    handleDeleteClinic =(clinic)=>{
        this.props.deleteAClinicRedux(clinic.id);
    }
    handleEditClinic =(clinic)=>{
        this.props.handleEditClinicFromParentKey(clinic)
    }
    render() {
        console.log('check all clinic: ', this.props.listClinic)
        console.log('check state: ', this.state.clinicRedux)
        let arrClinic = this.state.clinicRedux;
        return (
            <React.Fragment>
                <table id="TableManageClinic">
                <tbody>
                    <tr>
                        <th><FormattedMessage id="admin.manage-clinic.clinic" /> </th>
                        <th><FormattedMessage id="manage-user.address" /> </th>
                        <th> </th>
                    </tr>
                    {arrClinic && arrClinic.length >0 &&
                    arrClinic.map((item, index) =>{
                        return(
                            <tr key={index}>
                                <td>{item.name}</td>
                                <td>{item.address}</td>
                                <td className='action'>
                                    <button
                                    onClick={() =>this.handleEditClinic(item)} 
                                    className='btn-edit' ><i className="fas fa-pencil-alt"></i></button>
                                    <button
                                    onClick={() =>this.handleDeleteClinic(item)} 
                                    className='btn-delete' ><i className="fas fa-trash"></i></button>
                                </td>
                            </tr>
                        )
                    })
                    }
                    </tbody>
                </table>
            </React.Fragment>
        );   
    }
}

const mapStateToProps = state => {
    return {
        listClinic: state.admin.clinic
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchClinicRedux: ()=> dispatch(actions.fetchAllClinicStart()),
        deleteAClinicRedux: (id)=> dispatch(actions.deleteClinic(id))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManageClinic);
