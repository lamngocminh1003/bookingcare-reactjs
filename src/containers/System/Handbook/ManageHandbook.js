import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import {LANGUAGES,CommonUtils,CRUD_ACTIONS} from "../../../utils";
import './ManageHandbook.scss';
import MarkdownIt from 'markdown-it';
import * as actions from "../../../store/actions";
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";
import {createNewHandbook} from '../../../services/userService'
import { toast } from "react-toastify";
import TableManageHandbook from './TableManageHandbook';
const mdParser = new MarkdownIt(/* Markdown-it options */);
class ManageHandbook extends Component {
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
            handbookEditId:''
        }
    }
    async componentDidMount(){
        
    }
    
    async componentDidUpdate(prevProps, prevState,  snapshot){
        if(this.props.language !== prevProps.language){

        }
        if(prevProps.listHandbooks !== this.props.listHandbooks){
            this.setState({
                name:'',
                imageBase64:'',
                descriptionHTML:'',
                descriptionMarkdown:'',
                previewImgURL:'',
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

    handleSaveHandbook = async() =>{
        let {action} = this.state
        if(action === CRUD_ACTIONS.CREATE){
            let res = await createNewHandbook(this.state)
            if(res && res.errCode ===0){
                toast.success("Add new handbook successfully!");
            }else{
                toast.error("Add new handbook error!");
                console.log('check error',res);
            }
        }
        if(action === CRUD_ACTIONS.EDIT){
            this.props.editHandbookRedux({
                id:this.state.handbookEditId,
                name: this.state.name,
                descriptionHTML : this.state.descriptionHTML,
                descriptionMarkdown : this.state.descriptionMarkdown,
                image: this.state.imageBase64,
            })
        }
        console.log('check state: ', this.state);
        this.props.fetchHandbooksRedux()
    }
    handleEditHandbookFromParentKey = (handbook) => {
        let imageBase ='';
        if(handbook.image){
          imageBase = new Buffer(handbook.image,'base64').toString('binary');
        }
        this.setState({
            name:handbook.name,
            imageBase64:'',
            descriptionHTML:handbook.descriptionHTML,
            descriptionMarkdown:handbook.descriptionMarkdown,
            previewImgURL: imageBase,
            action: CRUD_ACTIONS.EDIT,
            handbookEditId: handbook.id
        })
      }
    render() {

        return (
            <div className='manage-specialty-container'>
                <div className= {this.state.action === CRUD_ACTIONS.EDIT ? "title" : "title" } 
                        >
                        {this.state.action === CRUD_ACTIONS.EDIT ?
                        <FormattedMessage id="admin.manage-handbook.title-update" /> 
                        :
                        <FormattedMessage id="admin.manage-handbook.title-add" /> 
                        }</div>
                <div className='add-new-specialty row'>
                    <div className='col-6 form-group'>
                        <label><FormattedMessage id="admin.manage-handbook.name" /> </label>
                        <input 
                        className='form-control' 
                        type='text'
                        value={this.state.name}
                        onChange={(event)=>this.handleOnChangeInput(event,'name')}/>
                    </div>
                    <div className='col-6 form-group'>
                        <label><FormattedMessage id="admin.manage-handbook.image" /> </label>
                        <div className='preview-img-specialty-container'>
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
                                className="preview-image"
                                style={{
                                backgroundImage: `url(${this.state.previewImgURL})`,
                                }}
                                onClick={() => this.openPreviewImage()}
                            ></div>
                        </div>
                    </div >
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
                        onClick={() => this.handleSaveHandbook()}
                        >
                        {this.state.action === CRUD_ACTIONS.EDIT ?
                        <FormattedMessage id="admin.manage-handbook.btn-update" /> 
                        :
                        <FormattedMessage id="admin.manage-handbook.btn-add" /> 
                        }
                    </button> 
                    </div>
                </div>
                <TableManageHandbook
                handleEditHandbookFromParentKey={this.handleEditHandbookFromParentKey}
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
        listHandbooks: state.admin.handbooks
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchHandbooksRedux: ()=> dispatch(actions.fetchAllHandbookStart()),
        editHandbookRedux: (handbook) => dispatch(actions.editHandbook(handbook)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageHandbook);
