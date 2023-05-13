import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import * as actions from "../../../store/actions";
import { connect } from 'react-redux';
import './TableManageSpecialty.scss';
import 'react-markdown-editor-lite/lib/index.css';

class TableManageSpecialty extends Component {

    constructor(props){
        super(props);
        this.state = {
            specialtiesRedux:[]
        }
    }
    componentDidMount(){
        this.props.fetchSpecialtiesRedux();
    }
    componentDidUpdate(prevProps, prevState,  snapshot){
        if(prevProps.listSpecialties !==this.props.listSpecialties){
            this.setState({
                specialtiesRedux:this.props.listSpecialties
            })
        }
    }
    handleDeleteSpecialty =(specialty)=>{
        this.props.deleteASpecialtyRedux(specialty.id);
    }
    handleEditSpecialty =(specialty)=>{
        this.props.handleEditSpecialtyFromParentKey(specialty)
    }
    render() {
        console.log('check all specialties: ', this.props.listSpecialties)
        console.log('check state: ', this.state.specialtiesRedux)
        let arrSpecialties = this.state.specialtiesRedux;
        return (
            <React.Fragment>
                <table id="TableManageSpecialty">
                <tbody>
                    <tr>
                        <th><FormattedMessage id="admin.manage-specialty.specialty" /> </th>
                        <th> </th>
                    </tr>
                    {arrSpecialties && arrSpecialties.length >0 &&
                    arrSpecialties.map((item, index) =>{
                        return(
                            <tr key={index}>
                                <td>{item.name}</td>
                                <td className='action'>
                                    <button
                                    onClick={() =>this.handleEditSpecialty(item)} 
                                    className='btn-edit' ><i className="fas fa-pencil-alt"></i></button>
                                    <button
                                    onClick={() =>this.handleDeleteSpecialty(item)} 
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
        listSpecialties: state.admin.specialties
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchSpecialtiesRedux: ()=> dispatch(actions.fetchAllSpecialtiesStart()),
        deleteASpecialtyRedux: (id)=> dispatch(actions.deleteSpecialty(id))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManageSpecialty);
