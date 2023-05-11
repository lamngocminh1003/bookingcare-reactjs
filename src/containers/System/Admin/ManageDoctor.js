import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import * as actions from "../../../store/actions";
import { LANGUAGES, CRUD_ACTIONS } from "../../../utils";
import { connect } from 'react-redux';
import './ManageDoctor.scss';
import { getDetailInfoDoctor } from '../../../services/userService';

import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import Select from 'react-select';

const mdParser = new MarkdownIt(/* Markdown-it options */);
class ManageDoctor extends Component {
    constructor(props){
        super(props);
        this.state = {
            //save to markdown table
            contentMarkdown:'',
            contentHTML: '',
            selectedOption:'',
            description:'',
            listDoctors:[],
            hasOldData: false,

            //save to doctor info table
            listPrice:[],
            listPayment:[],
            listProvince:[],
            selectedPrice:'',
            selectedPayment:'',
            selectedProvince:'',
            nameClinic:'',
            addressClinic:'',
            note:''
    }}
    componentDidMount(){
        this.props.fetchAllDoctors()
        this.props.getAllRequireDoctorInfo()
    }
    componentDidUpdate(prevProps, prevState,snapshot){
        if (prevProps.allDoctors !== this.props.allDoctors){
            let dataSelect =this.buildDataInputSelect(this.props.allDoctors,'USER')
            this.setState({listDoctors:dataSelect});
        }
        if(prevProps.allRequiredDoctorInfo !== this.props.allRequiredDoctorInfo){
            let {resPayment, resPrice, resProvince} = this.props.allRequiredDoctorInfo
            let dataSelectPrice =this.buildDataInputSelect(resPrice,'PRICE')
            let dataSelectPayment =this.buildDataInputSelect(resPayment,'PAYMENT')
            let dataSelectProvince =this.buildDataInputSelect(resProvince,'PROVINCE')

            console.log('check dataSelectPayment',dataSelectPrice,dataSelectPayment,dataSelectProvince);
            this.setState({
                listPrice:dataSelectPrice,
                listPayment:dataSelectPayment,
                listProvince:dataSelectProvince,
            });
        }
        if(prevProps.language !== this.props.language){
            let dataSelect =this.buildDataInputSelect(this.props.allDoctors,'USER')
            let {resPayment, resPrice, resProvince} = this.props.allRequiredDoctorInfo
            let dataSelectPrice =this.buildDataInputSelect(resPrice,'PRICE')
            let dataSelectPayment =this.buildDataInputSelect(resPayment,'PAYMENT')
            let dataSelectProvince =this.buildDataInputSelect(resProvince,'PROVINCE')
            this.setState({
                listDoctors:dataSelect,
                listPrice:dataSelectPrice,
                listPayment:dataSelectPayment,
                listProvince:dataSelectProvince,
            });
        }
    }
    handleEditorChange= ({ html, text }) => {
        this.setState({
            contentMarkdown:text,
            contentHTML: html,
        })
    }
    handleSaveContentMarkdown = ()=>{
        let{hasOldData}=this.state;
        this.props.SaveDetailDoctor({
            contentHTML:this.state.contentHTML,
            contentMarkdown:this.state.contentMarkdown,
            description:this.state.description,
            doctorId:this.state.selectedOption.value,
            test: hasOldData === true ? CRUD_ACTIONS.EDIT : CRUD_ACTIONS.CREATE,
       
            selectedPrice:this.state.selectedPrice.value,
            selectedPayment:this.state.selectedPayment.value,
            selectedProvince:this.state.selectedProvince.value,
            nameClinic:this.state.nameClinic,
            addressClinic:this.state.addressClinic,
            note:this.state.note
        })
        console.log('check state: ',this.state);
    }

    handleChangeSelect = async (selectedOption) => {
        this.setState({ selectedOption });
        let {listPayment,listPrice,listProvince} = this.state;
        let res = await getDetailInfoDoctor(selectedOption.value);
        if(res && res.errCode === 2 && res.data.Markdown){
            let markdown = res.data.Markdown;
            let nameClinic ='';
            let addressClinic='';
            let note='';
            let priceId='';
            let provinceId='';
            let paymentId='';
            let selectedProvince='';
            let selectedPrice='';
            let selectedPayment='';
            
            if(res.data.Doctor_Info){
                nameClinic=res.data.Doctor_Info.nameClinic;
                addressClinic=res.data.Doctor_Info.addressClinic;
                note=res.data.Doctor_Info.note;
                priceId=res.data.Doctor_Info.priceId;
                provinceId=res.data.Doctor_Info.provinceId;
                paymentId=res.data.Doctor_Info.paymentId;

                selectedPayment = listPayment.find(item => {
                    return item && item.value === paymentId 
                })
                selectedPrice = listPrice.find(item => {
                    return item && item.value === priceId 
                })
                selectedProvince = listProvince.find(item => {
                    return item && item.value === provinceId 
                })
            }
            this.setState({ 
                contentHTML:markdown.contentHTML,
                contentMarkdown:markdown.contentMarkdown,
                description:markdown.description,
                hasOldData:true,
                nameClinic:nameClinic,
                addressClinic:addressClinic,
                note:note,
                priceId:priceId,
                provinceId:provinceId,
                paymentId:paymentId,
                selectedProvince:selectedProvince,
                selectedPrice:selectedPrice,
                selectedPayment:selectedPayment,
             })
        }else{
            this.setState({ 
                contentHTML:'',
                contentMarkdown:'',
                description:'',
                hasOldData:false ,
                nameClinic:'',
                addressClinic:'',
                note:'',
            })
        }
          console.log(`check res:`, res)
      };
    handleChangeSelectDoctorInfo = async (selectedOption,name)=>{
        let stateName = name.name;
        let stateCopy ={...this.state}
        stateCopy[stateName] = selectedOption
        this.setState({...stateCopy})
    }
    handleOnChangeText =(event,id)=>{
        let stateCopy = {...this.state};
        stateCopy[id] = event.target.value;
        this.setState({ 
            ...stateCopy
        })
    }
    buildDataInputSelect = (inputData,type)=>{
        let result=[];
        let {language} = this.props;
        if(inputData && inputData.length >0 ){
            if(type === 'USER'){
                inputData.map((item,index)=>{
                    let object ={};
                    let labelVi = `${item.lastName} ${item.firstName}`;
                    let labelEn = `${item.firstName} ${item.lastName}`;
                    object.label = language === LANGUAGES.VI ? labelVi : labelEn;
                    object.value = item.id;
                    result.push(object);
                })
            }
            if(type === 'PRICE'){
                inputData.map((item,index)=>{
                    let object ={};
                    let labelVi = `${item.valueVi} VNĐ`;
                    let labelEn = `${item.valueEn} USD`;
                    object.label = language === LANGUAGES.VI ? labelVi : labelEn;
                    object.value = item.keyMap;
                    result.push(object);
                })
            }
            if(type === 'PAYMENT'){
                inputData.map((item,index)=>{
                    let object ={};
                    let labelVi = `${item.valueVi}`;
                    let labelEn = `${item.valueEn}`;
                    object.label = language === LANGUAGES.VI ? labelVi : labelEn;
                    object.value = item.keyMap;
                    result.push(object);
                })
            }
            if(type === 'PROVINCE'){
                inputData.map((item,index)=>{
                    let object ={};
                    let labelVi = `${item.valueVi}`;
                    let labelEn = `${item.valueEn}`;
                    object.label = language === LANGUAGES.VI ? labelVi : labelEn;
                    object.value = item.keyMap;
                    result.push(object);
                })
            }
        }
        return result
    }
    render() {
        let {hasOldData} = this.state;
        return (
            <div className='manage-doctor-container'>
                <div className='manage-doctor-title title'>
                    <FormattedMessage id="admin.manage-doctor.title"/>
                </div>
                <div className='more-info'>
                    <div className='content-left'>
                        <label><FormattedMessage id="admin.manage-doctor.select-doctor"/></label>
                            <Select
                                value={this.state.selectedOption}
                                onChange={this.handleChangeSelect}
                                options={this.state.listDoctors}
                                placeholder={<FormattedMessage id="admin.manage-doctor.select-doctor"/>}
                                name={"selectedOption"}
                            />
                    </div>
                    <div className='content-right'>
                        <label><FormattedMessage id="admin.manage-doctor.intro"/></label>
                        <textarea 
                        className='form-control' 
                        onChange={(event)=>this.handleOnChangeText(event,'description')}
                        value={this.state.description}
                        >
                        </textarea>
                    </div>
                </div>
                <div className='more-info-extra row'>
                    <div className='col-4 form-group'>
                        <label><FormattedMessage id="admin.manage-doctor.select-price"/></label>
                        <Select
                                value={this.state.selectedPrice}
                                onChange={this.handleChangeSelectDoctorInfo}
                                options={this.state.listPrice}
                                placeholder={<FormattedMessage id="admin.manage-doctor.select-price"/>}
                                name="selectedPrice"
                            />
                    </div>
                    <div className='col-4 form-group'>
                        <label><FormattedMessage id="admin.manage-doctor.select-payment"/></label>
                        <Select
                                value={this.state.selectedPayment}
                                onChange={this.handleChangeSelectDoctorInfo}
                                options={this.state.listPayment}
                                placeholder={<FormattedMessage id="admin.manage-doctor.select-payment"/>}
                                name="selectedPayment"
                            />
                    </div>
                    <div className='col-4 form-group'>
                        <label><FormattedMessage id="admin.manage-doctor.select-province"/></label>
                        <Select
                                value={this.state.selectedProvince}
                                onChange={this.handleChangeSelectDoctorInfo}
                                options={this.state.listProvince}
                                placeholder={<FormattedMessage id="admin.manage-doctor.select-province"/>}
                                name="selectedProvince"
                            />
                    </div>
                    <div className='col-4 form-group'>
                        <label><FormattedMessage id="admin.manage-doctor.nameClinic"/></label>
                        <input className='form-control'
                        onChange={(event)=>this.handleOnChangeText(event,'nameClinic')}
                        value={this.state.nameClinic}/>
                    </div>
                    <div className='col-4 form-group'>
                        <label><FormattedMessage id="admin.manage-doctor.addressClinic"/></label>
                        <input className='form-control'
                        onChange={(event)=>this.handleOnChangeText(event,'addressClinic')}
                        value={this.state.addressClinic}/>
                    </div>
                    <div className='col-4 form-group'>
                        <label><FormattedMessage id="admin.manage-doctor.note"/></label>
                        <input className='form-control'
                        onChange={(event)=>this.handleOnChangeText(event,'note')}
                        value={this.state.note}/>
                    </div>
                </div>
                <div className='manage-doctor-editor'>
                    <MdEditor style={{ height: '500px' }} 
                    renderHTML={text => mdParser.render(text)} 
                    onChange={this.handleEditorChange} 
                    value={this.state.contentMarkdown}
                    />
                </div>
                <button
                onClick={()=>this.handleSaveContentMarkdown()}  
                className={hasOldData === true ? "save-content-doctor btn btn-warning" :  ' btn btn-info create-content-doctor'}>
                        {hasOldData === true ? 
                        <span><FormattedMessage id="admin.manage-doctor.save"/></span>:
                        <span><FormattedMessage id="admin.manage-doctor.add"/></span>
                    } 
                </button>
            </div>
        );   
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        allDoctors:state.admin.allDoctors,
        allRequiredDoctorInfo:state.admin.allRequiredDoctorInfo
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllDoctors:()=>dispatch(actions.fetchAllDoctors()),
        getAllRequireDoctorInfo: () => dispatch(actions.getRequireDoctorInfo()),
        SaveDetailDoctor:(data)=>dispatch(actions.SaveDetailDoctor(data))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
