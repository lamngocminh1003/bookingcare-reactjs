import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import * as actions from "../../../store/actions";
import { connect } from 'react-redux';
import './TableManageHandbook.scss';
import 'react-markdown-editor-lite/lib/index.css';

class TableManageHandbook extends Component {

    constructor(props){
        super(props);
        this.state = {
            handbooksRedux:[]
        }
    }
    componentDidMount(){
        this.props.fetchHandbooksRedux();
    }
    componentDidUpdate(prevProps, prevState,  snapshot){
        if(prevProps.listHandbooks !==this.props.listHandbooks){
            this.setState({
                handbooksRedux:this.props.listHandbooks
            })
        }
    }
    handleDeleteHandbook =(handbook)=>{
        this.props.deleteAHandbookRedux(handbook.id);
    }
    handleEditHandbook =(handbook)=>{
        this.props.handleEditHandbookFromParentKey(handbook)
    }
    render() {
        console.log('check all handbooks: ', this.props.listHandbooks)
        console.log('check state: ', this.state.handbooksRedux)
        let arrHandbooks = this.state.handbooksRedux;
        return (
            <React.Fragment>
                <table id="TableManageHandbook">
                <tbody>
                    <tr>
                        <th ><FormattedMessage id="admin.manage-handbook.ordinal-number" /></th>
                        <th><FormattedMessage id="admin.manage-handbook.handbook" /> </th>
                        <th> </th>
                    </tr>
                    {arrHandbooks && arrHandbooks.length >0 &&
                    arrHandbooks.map((item, index) =>{
                        return(
                            <tr key={index}>
                                <td>{index+1}</td>
                                <td>{item.name}</td>
                                <td className='action'>
                                    <button
                                    onClick={() =>this.handleEditHandbook(item)} 
                                    className='btn-edit' ><i className="fas fa-pencil-alt"></i></button>
                                    <button
                                    onClick={() =>this.handleDeleteHandbook(item)} 
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
        listHandbooks: state.admin.handbooks
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchHandbooksRedux: ()=> dispatch(actions.fetchAllHandbookStart()),
        deleteAHandbookRedux: (id)=> dispatch(actions.deleteHandbook(id))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManageHandbook);
