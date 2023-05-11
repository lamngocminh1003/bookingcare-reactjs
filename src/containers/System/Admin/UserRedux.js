import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { getAllCodeService } from "../../../services/userService";
import { LANGUAGES ,CRUD_ACTIONS,CommonUtils} from "../../../utils";
import "./UserRedux.scss";
import * as actions from "../../../store/actions";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";
import TableManageUser from "./TableManageUser";
class UserRedux extends Component {
  constructor(props) {
    super(props);
    this.state = {
      genderArr: [],
      positionArr: [],
      roleArr: [],
      previewImgURL: "",
      isOpen: false,

      email: "",
      password: "",
      firstName: "",
      lastName: "",
      phoneNumber: "",
      address: "",
      gender: "",
      positionId: "",
      roleId: "",
      avatar: "",
      action:'',
      userEditId: "",
    };
  }
  async componentDidMount() {
    this.props.getGenderStart();
    this.props.getPositionStart();
    this.props.getRoleStart();
    // try {
    //     let res = await getAllCodeService('gender');
    //     if(res && res.errCode ===0){
    //         this.setState({
    //             genderArr: res.data
    //         })
    //     }
    //     console.log("check res",res);
    // } catch (e) {
    //     console.log(e);
    // }
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.genderRedux !== this.props.genderRedux) {
      let arrGenders = this.props.genderRedux;
      this.setState({
        genderArr: arrGenders,
        gender: arrGenders && arrGenders.length > 0 ? arrGenders[0].keyMap : "",
      });
    }
    if (prevProps.positionRedux !== this.props.positionRedux) {
      let arrPositions = this.props.positionRedux;
      this.setState({
        positionArr: arrPositions,
        positionId:arrPositions && arrPositions.length > 0 ? arrPositions[0].keyMap : "",
      });
    }
    if (prevProps.roleRedux !== this.props.roleRedux) {
      let arrRoles = this.props.roleRedux;
      this.setState({
        roleArr: arrRoles,
        roleId: arrRoles && arrRoles.length > 0 ? arrRoles[0].keyMap : "",
      });
    }
    if(prevProps.listUsers !== this.props.listUsers){
      let arrRoles = this.props.roleRedux;
      let arrPositions = this.props.positionRedux;
      let arrGenders = this.props.genderRedux;

      this.setState({
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      phoneNumber: "",
      address: "",
      roleId: arrRoles && arrRoles.length > 0 ? arrRoles[0].keyMap: "",
      positionId:arrPositions && arrPositions.length > 0 ? arrPositions[0].keyMap: "",
      gender: arrGenders && arrGenders.length > 0 ? arrGenders[0].keyMap: "",
      avatar: "",
      previewImgURL:"",
      action: CRUD_ACTIONS.CREATE,
      })
    }
  }
  handleOnChangeImage = async(event) => {
    let data = event.target.files;
    let file = data[0];
    if (file) {
      let base64 = await CommonUtils.getBase64(file);
      let objectUrl = URL.createObjectURL(file);
      this.setState({
        previewImgURL: objectUrl,
        avatar: base64
      })
    }
  }

  openPreviewImage = () => {
    if (!this.state.previewImgURL) return;
    this.setState({
      isOpen:true
    })
  };
  handleSaveUser = () => {
    let isValid = this.checkValidateInput();
    if (isValid === false) return;
    let {action} = this.state;
    if(action === CRUD_ACTIONS.CREATE){
          //fire  redux create user
      this.props.createNewUser({
        email: this.state.email,
        password: this.state.password,
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        phoneNumber: this.state.phoneNumber,
        address: this.state.address,
        gender: this.state.gender,
        roleId: this.state.roleId,
        positionId: this.state.positionId,
        avatar: this.state.avatar
      });
    }if(action === CRUD_ACTIONS.EDIT){
          //fire  redux edit user
          this.props.editAUserRedux({
            id: this.state.userEditId,
            email: this.state.email,
            password: this.state.password,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            phoneNumber: this.state.phoneNumber,
            address: this.state.address,
            gender: this.state.gender,
            roleId: this.state.roleId,
            positionId: this.state.positionId,
            avatar: this.state.avatar,
          });
    }
  };
  checkValidateInput = () => {
    let isValid = true;
    let arrCheck = [
      "email",
      "password",
      "firstName",
      "lastName",
      "phoneNumber",
      "address",
    ];
    for (let i = 0; i < arrCheck.length; i++) {
      if (!this.state[arrCheck[i]]) {
        isValid = false;
        alert("This input is required " + arrCheck[i]);
        break;
      }
    }
    return isValid;
  };
  onChangeInput = (event, id) => {
    let copyState = { ...this.state };

    copyState[id] = event.target.value;
    this.setState({
      ...copyState,
    });
  };
  handleEditUserFromParent = (user) => {
    let imageBase64 ='';
    if(user.image){
      imageBase64 = new Buffer(user.image,'base64').toString('binary');
    }
    this.setState({
      email: user.email,
      password: 'HARDCODE',
      firstName: user.firstName,
      lastName: user.lastName,
      phoneNumber: user.phoneNumber,
      address: user.address,
      roleId: user.roleId,
      positionId: user.positionId,
      gender: user.gender,
      avatar: '',
      previewImgURL: imageBase64,
      action: CRUD_ACTIONS.EDIT,
      userEditId: user.id
      })
  }
  render() {
    let genders = this.state.genderArr;
    let positions = this.state.positionArr;
    let roles = this.state.roleArr;
    let language = this.props.language;
    let isLoadingGender = this.props.isLoadingGender;
    let isLoadingPosition = this.props.isLoadingPosition;
    let isLoadingRole = this.props.isLoadingRole;

    let {
      email,
      password,
      firstName,
      lastName,
      phoneNumber,
      address,
      gender,
      positionId,
      roleId,
      avatar,
    } = this.state;
    return (
      <div className="user-redux-container">
        <div className="title"> 
          <FormattedMessage id="manage-user.title" /> 
        </div> 
        <div className="user-redux-body">
          <div className="container">
            <div className="row">
              <div className="col-12 my-3">
                <div> {isLoadingGender === true ? "Loading genders" : ""} </div> 
                <div>
                  {isLoadingPosition === true ? "Loading positions" : ""} 
                </div> 
                <div> {isLoadingRole === true ? "Loading roles" : ""} </div> 
              </div> 
              <div className="col-6">
                <label>
                  <FormattedMessage id="manage-user.email" /> 
                </label> 
                <input
                  className="form-control"
                  disabled={this.state.action === CRUD_ACTIONS.EDIT ? true : false}
                  type="email"
                  value={email}
                  onChange={(event) => {
                    this.onChangeInput(event, "email");
                  }}
                /> 
              </div> 
              <div className="col-6">
                <label>
                  <FormattedMessage id="manage-user.password" /> 
                </label> 
                <input
                  disabled={this.state.action === CRUD_ACTIONS.EDIT ? true : false}
                  className="form-control"
                  type="password"
                  value={password}
                  onChange={(event) => {
                    this.onChangeInput(event, "password");
                  }}
                /> 
              </div> 
              <div className="col-6">
                <label>
                   
                  <FormattedMessage id="manage-user.firstName" /> 
                </label> 
                <input
                  className="form-control"
                  type="text"
                  value={firstName}
                  onChange={(event) => {
                    this.onChangeInput(event, "firstName");
                  }}
                /> 
              </div> 
              <div className="col-6">
                <label>
                   
                  <FormattedMessage id="manage-user.lastName" /> 
                </label> 
                <input
                  className="form-control"
                  type="text"
                  value={lastName}
                  onChange={(event) => {
                    this.onChangeInput(event, "lastName");
                  }}
                /> 
              </div> 
              <div className="col-3">
                <label>
                   
                  <FormattedMessage id="manage-user.phoneNumber" /> 
                </label> 
                <input
                  className="form-control"
                  type="text"
                  value={phoneNumber}
                  onChange={(event) => {
                    this.onChangeInput(event, "phoneNumber");
                  }}
                /> 
              </div> 
              <div className="col-9">
                <label>
                   
                  <FormattedMessage id="manage-user.address" /> 
                </label> 
                <input
                  className="form-control"
                  type="text"
                  value={address}
                  onChange={(event) => {
                    this.onChangeInput(event, "address");
                  }}
                /> 
              </div> 
              <div className="col-3">
                <label>       
                  <FormattedMessage id="manage-user.gender" /> 
                </label> 
                <select
                  value={gender}
                  className="form-control"
                  onChange={(event) => {
                    this.onChangeInput(event, "gender");
                  }}
                >
                  {genders &&
                    genders.length > 0 &&
                    genders.map((item, index) => {
                      return (
                        <option key={index} value={item.keyMap}>
                          {language === LANGUAGES.VI
                            ? item.valueVi
                            : item.valueEn} 
                        </option>
                      );
                    })} 
                </select> 
              </div> 
              <div className="col-3">
                <label>
                  <FormattedMessage id="manage-user.position" /> 
                </label> 
                <select
                  value={positionId}
                  className="form-control"
                  onChange={(event) => {
                    this.onChangeInput(event, "positionId");
                  }}
                >
                  {positions &&
                    positions.length > 0 &&
                    positions.map((item, index) => {
                      return (
                        <option key={index} value={item.keyMap}>
                          {language === LANGUAGES.VI
                            ? item.valueVi
                            : item.valueEn} 
                        </option>
                      );
                    })} 
                </select> 
              </div> 
              <div className="col-3">
                <label>
                  <FormattedMessage id="manage-user.roleId" /> 
                </label> 
                <select
                  value={roleId}
                  className="form-control"
                  onChange={(event) => {
                    this.onChangeInput(event, "roleId");
                  }}
                >
                  {roles &&
                    roles.length > 0 &&
                    roles.map((item, index) => {
                      return (
                        <option key={index} value={item.keyMap}>
                           
                          {language === LANGUAGES.VI
                            ? item.valueVi
                            : item.valueEn} 
                        </option>
                      );
                    })} 
                </select> 
              </div> 
              <div className="col-3">
                <label>
                  <FormattedMessage id="manage-user.image" /> 
                </label> 
                <div className="preview-img-container">
                  <input
                    id="previewImg"
                    type="file"
                    hidden
                    onChange={(event) => this.handleOnChangeImage(event)}
                  /> 
                  <label className="btn btn-primary" htmlFor="previewImg">
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
              </div> 
              <div className="col-12 my-3">
                <button
                  className= {this.state.action === CRUD_ACTIONS.EDIT ? "btn btn-warning" : "btn btn-primary" } 
                  onClick={() => this.handleSaveUser()}
                >
                  {this.state.action === CRUD_ACTIONS.EDIT ?
                  <FormattedMessage id="manage-user.edit" /> 
                  :
                  <FormattedMessage id="manage-user.save" /> 
                }
                </button> 
              </div> 
              <div className="col-12 mb-5">
                <TableManageUser
                handleEditUserFromParentKey={this.handleEditUserFromParent}
                action = {this.state.action}
                />
              </div>
            </div> 
          </div>
        </div> 
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

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    genderRedux: state.admin.genders,
    isLoadingGender: state.admin.isLoadingGender,
    positionRedux: state.admin.positions,
    isLoadingPosition: state.admin.isLoadingPosition,
    roleRedux: state.admin.roles,
    isLoadingRole: state.admin.isLoadingRole,
    listUsers: state.admin.users
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getGenderStart: () => dispatch(actions.fetchGenderStart()),
    getPositionStart: () => dispatch(actions.fetchPositionStart()),
    getRoleStart: () => dispatch(actions.fetchRoleStart()),
    createNewUser: (data) => dispatch(actions.createNewUser(data)),
    fetchUserRedux: ()=> dispatch(actions.fetchAllUsersStart()),
    editAUserRedux: (data) => dispatch(actions.editAUser(data)),

    // processLogout: () => dispatch(actions.processLogout()),
    // changeLanguageAppRedux:(language)=> dispatch(actions.changeLanguageApp(language)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
