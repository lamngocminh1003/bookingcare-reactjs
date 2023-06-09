import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import * as actions from "../../../store/actions";
import { connect } from 'react-redux';
import './TableManageUser.scss';
import {LANGUAGES} from "../../../utils";
class TableManageUser extends Component {

    constructor(props){
        super(props);
        this.state = {
            usersRedux:[]
        }
    }
    componentDidMount(){
        this.props.fetchUserRedux();
    }
    componentDidUpdate(prevProps, prevState,  snapshot){
        if(prevProps.listUsers !==this.props.listUsers){
            this.setState({
                usersRedux:this.props.listUsers
            })
        }
    }
    handleDeleteUser =(user)=>{
        this.props.deleteAUserRedux(user.id);
    }
    handleEditUser =(user)=>{
        this.props.handleEditUserFromParentKey(user)
    }
    render() {
        let {language} = this.props
        console.log('check all user: ', this.props.listUsers)
        console.log('check state: ', this.state.usersRedux)
        let arrUsers = this.state.usersRedux;
        console.log('check arrUsers: ', arrUsers);
        return (
            <React.Fragment>
                <table id="TableManageUser">
                <tbody>
                    <tr>
                        <th><FormattedMessage id="admin.manage-handbook.ordinal-number" /></th>
                        <th><FormattedMessage id="manage-user.email" /></th>
                        <th><FormattedMessage id="manage-user.firstName" /></th>
                        <th><FormattedMessage id="manage-user.lastName" /></th>
                        <th><FormattedMessage id="manage-user.address" /></th>
                        <th><FormattedMessage id="manage-user.gender" /></th>
                        <th><FormattedMessage id="manage-user.roleId" /></th>
                        <th> </th>
                    </tr>
                    {arrUsers && arrUsers.length >0 &&
                    arrUsers.map((item, index) =>{
                        let gender = language === LANGUAGES.VI ?item.genderData.valueVi : item.genderData.valueEn
                        let role = language === LANGUAGES.VI ?item.roleData.valueVi : item.roleData.valueEn
                        return(
                            <tr key={index}>
                                <td>{index+1}</td>
                                <td>{item.email}</td>
                                <td>{item.firstName}</td>
                                <td>{item.lastName}</td>
                                <td>{item.address}</td>
                                <td>{gender}</td>
                                <td>{role}</td>
                                <td className='action'>
                                    <button
                                    onClick={() =>this.handleEditUser(item)} 
                                    className='btn-edit' ><i className="fas fa-pencil-alt"></i></button>
                                    <button
                                    onClick={() =>this.handleDeleteUser(item)} 
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
        language: state.app.language,
        listUsers: state.admin.users
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchUserRedux: ()=> dispatch(actions.fetchAllUsersStart()),
        deleteAUserRedux: (id)=> dispatch(actions.deleteAUser(id))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManageUser);
