import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import {LANGUAGES,CommonUtils} from "../../../utils";
import './RemedyModal.scss';
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";
import moment from 'moment/moment';
import {Modal,ModalHeader, ModalBody, ModalFooter,Button} from 'reactstrap'; 
import _ from 'lodash';
import { toast } from "react-toastify";
class RemedyModal extends Component {
    constructor(props){
        super(props);
        this.state = {
            previewImgURL:'',
            imageBase64:'',
            firstName:'',
            email:'',
        }
    }
    async componentDidMount(){
        if(this.props.dataModal){
            this.setState({
                email: this.props.dataModal.email,
                firstName: this.props.dataModal.firstName
            })
        }
    }

    async componentDidUpdate(prevProps, prevState,  snapshot){
        if(prevProps.dataModal !==this.props.dataModal){
            this.setState({
                email: this.props.dataModal.email,
                firstName: this.props.dataModal.firstName
        })}
    }
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
    handleOnChangeEmail=(event) => {
        this.setState({
            email:event.target.value
        })
    }
    handleSendRemedy =()=>{
        this.props.sendRemedy(this.state)
    }

    render() {
        //toggle={}
        let {isOpenModalBooking,closeBookingModal}= this.props;
        return (
            <>
                <div>
                    <Modal
                    isOpen={isOpenModalBooking}
                    className={'booking-modal-container'}
                    size='lg'
                    centered
                    >
                        <Button color="primary" onClick={this.toggle}>{this.props.buttonLabel}</Button>
                        <div className="modal-header">
                            <h5 className="modal-title"><FormattedMessage id="patient.remedy-modal.title" /> </h5>
                            <button type="button" className="close" aria-label="Close"
                            onClick={closeBookingModal}>
                                <span aria-hidden="true">×</span>
                            </button>
                        </div>
                        <ModalBody>
                            <div className='row '>
                                <div className='col-6 form-group'>
                                        <label><FormattedMessage id="patient.remedy-modal.firstName" /></label>
                                        <input 
                                        className='form-control' 
                                        type="text"
                                        value={this.state.firstName}
                                        />
                                </div>
                                <div className='col-6 form-group'>
                                        <label><FormattedMessage id="patient.remedy-modal.email" /></label>
                                        <input 
                                        value={this.state.email}
                                        className='form-control' 
                                        type="email"
                                        onChange={(event)=>this.handleOnChangeEmail(event)}
                                        />
                                </div>
                                <div className='col-12 form-group'>
                                        <label><FormattedMessage id="patient.remedy-modal.choose-fee" /></label>
                                        <div className='preview-img-fee-container'>
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
                                                className="preview-fee-image"
                                                style={{
                                                backgroundImage: `url(${this.state.previewImgURL})`,
                                                
                                                }}
                                            >
                                            </div>
                                        </div>
                                </div>
                            </div>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="primary" onClick={()=>this.handleSendRemedy()}><FormattedMessage id="patient.remedy-modal.send" /></Button>{' '}
                            <Button color="secondary" onClick={closeBookingModal}><FormattedMessage id="patient.remedy-modal.cancel" /></Button>
                        </ModalFooter>
                    </Modal>
                </div>                          
            </>
            
        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        genders: state.admin.genders,
    };
};

const mapDispatchToProps = dispatch => {
    return {

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(RemedyModal);
