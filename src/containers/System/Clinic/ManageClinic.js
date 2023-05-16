import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import {LANGUAGES,CommonUtils,CRUD_ACTIONS} from "../../../utils";
import './ManageClinic.scss';
import MarkdownIt from 'markdown-it';
import * as actions from "../../../store/actions";
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";
import {createNewClinic} from '../../../services/userService'
import { toast } from "react-toastify";
import TableManageClinic from './TableManageClinic';
const mdParser = new MarkdownIt(/* Markdown-it options */);
class ManageClinic extends Component {
    constructor(props){
        super(props);
        this.state = {
            name:'',
            imageBase64:'',
            descriptionHTML:'',
            descriptionMarkdown:'',
            previewImgURL:'',
            isOpen: false,
            action:'',
            clinicEditId:'',
            address:''
        }
    }
    async componentDidMount(){
        
    }
    
    async componentDidUpdate(prevProps, prevState,  snapshot){
        if(this.props.language !== prevProps.language){

        }
        if(prevProps.listClinic !== this.props.listClinic){
            this.setState({
                name:'',
                imageBase64:'',
                descriptionHTML:'',
                descriptionMarkdown:'',
                previewImgURL:'',
                address:'',
                action:CRUD_ACTIONS.CREATE
            })
        }
    }
    handleOnChangeInput =(event,id)=>{
        let stateCopy ={...this.state}
        stateCopy[id] = event.target.value;
        this.setState({
            ...stateCopy,
        });
    }
    handleEditorChange= ({ html, text }) => {
        this.setState({
            descriptionMarkdown:text,
            descriptionHTML: html,
        })
    }
    openPreviewImage = () => {
        if (!this.state.previewImgURL) return;
        this.setState({
          isOpen:true
        })
      };
    handleOnChangeImage = async(event) => {
        let data = event.target.files;
        let file = data[0];
        if (file) {
          let base64 = await CommonUtils.getBase64(file);
          let objectUrl = URL.createObjectURL(file);
          this.setState({
            imageBase64: base64,
            previewImgURL: objectUrl,
          })
        }
      }

    handleSaveClinic = async() =>{
        let {action} = this.state
        if(action === CRUD_ACTIONS.CREATE){
            let res = await createNewClinic(this.state)
            if(res && res.errCode ===0){
                toast.success("Add new clinic successfully!");
            }else{
                toast.error("Add new clinic error!");
                console.log('check error',res);
            }
        }
        if(action === CRUD_ACTIONS.EDIT){
            this.props.editClinicRedux({
                id:this.state.clinicEditId,
                name: this.state.name,
                address: this.state.address,
                descriptionHTML : this.state.descriptionHTML,
                descriptionMarkdown : this.state.descriptionMarkdown,
                image: this.state.imageBase64,
            })
        }
        this.props.fetchClinicRedux()
    }
    handleEditClinicFromParentKey = (clinic) => {
        let imageBase ='';
        if(clinic.image){
          imageBase = new Buffer(clinic.image,'base64').toString('binary');
        }
        this.setState({
            name:clinic.name,
            address:clinic.address,
            imageBase64:'',
            descriptionHTML:clinic.descriptionHTML,
            descriptionMarkdown:clinic.descriptionMarkdown,
            previewImgURL: imageBase,
            action: CRUD_ACTIONS.EDIT,
            clinicEditId: clinic.id
        })
      }
    render() {

        return (
            <div className='manage-clinic-container'>
                <div className= {this.state.action === CRUD_ACTIONS.EDIT ? "title" : "title" } 
                        >
                        {this.state.action === CRUD_ACTIONS.EDIT ?
                        <FormattedMessage id="admin.manage-clinic.title-update" /> 
                        :
                        <FormattedMessage id="admin.manage-clinic.title-add" /> 
                        }</div>
                <div className='add-new-clinic row'>
                    <div className='col-6 form-group'>
                        <label><FormattedMessage id="admin.manage-clinic.name" /> </label>
                        <input 
                        className='form-control' 
                        type='text'
                        value={this.state.name}
                        onChange={(event)=>this.handleOnChangeInput(event,'name')}/>
                    </div>
                    <div className='col-6 form-group'>
                        <label><FormattedMessage id="admin.manage-clinic.image" /> </label>
                        <div className='preview-img-clinic-container'>
                            <input
                            id="previewImg" 
                            className='form-control-file' 
                            type='file' 
                            onChange={(event)=>this.handleOnChangeImage(event)}
                            hidden/>
                            <label className="btn btn-info" htmlFor="previewImg">
                                <FormattedMessage id="manage-user.upload-avt"/> 
                                <i className="fas fa-upload"> </i>
                            </label>
                            <div
                                className="preview-clinic-image"
                                style={{
                                backgroundImage: `url(${this.state.previewImgURL})`,
                                }}
                                onClick={() => this.openPreviewImage()}
                            ></div>
                        </div>
                    </div >
                    <div className='col-6 form-group'>
                        <label><FormattedMessage id="admin.manage-clinic.address" /> </label>
                        <input 
                        className='form-control' 
                        type='text'
                        value={this.state.address}
                        onChange={(event)=>this.handleOnChangeInput(event,'address')}/>
                    </div>
                    <div className='col-12'>
                        <MdEditor style={{ height: '300px' }} 
                            renderHTML={text => mdParser.render(text)} 
                            onChange={this.handleEditorChange} 
                            value={this.state.descriptionMarkdown}
                            />
                    </div >
                    <div className='col-12'>
                    <button
                        className= {this.state.action === CRUD_ACTIONS.EDIT ? "btn btn-warning btn-saveSpecialty" : "btn btn-primary btn-saveSpecialty" } 
                        onClick={() => this.handleSaveClinic()}
                        >
                        {this.state.action === CRUD_ACTIONS.EDIT ?
                        <FormattedMessage id="admin.manage-clinic.btn-update" /> 
                        :
                        <FormattedMessage id="admin.manage-clinic.btn-add" /> 
                        }
                    </button> 
                    </div>
                </div>
                <TableManageClinic
                handleEditClinicFromParentKey={this.handleEditClinicFromParentKey}
                action = {this.state.action}
                />
                    {this.state.isOpen === true && (
                        <Lightbox
                            mainSrc={this.state.previewImgURL}
                            onCloseRequest={() => this.setState({ isOpen: false })}
                        />
                    )} 
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        listClinic: state.admin.clinic
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchClinicRedux: ()=> dispatch(actions.fetchAllClinicStart()),
        editClinicRedux: (clinic) => dispatch(actions.editClinic(clinic)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageClinic);
