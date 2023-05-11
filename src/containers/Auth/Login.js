import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from "connected-react-router";
import * as actions from "../../store/actions";
import './Login.scss';

import { FormattedMessage } from 'react-intl';
import  {handleLoginApi}  from '../../services/userService';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state={
            username:'',
            password:'',
            isShowPassword:false,
            errMessage:''
        }
    }
    handleOnChangeUsername =(Event)=>{
        this.setState(
            {username:Event.target.value})
    }
    handleOnChangePassword =(Event)=>{
        this.setState(
            {password:Event.target.value})
    }
    handleLogin =async()=>{
        this.setState({
            errMessage:''
        })
        try {
            let data = await handleLoginApi(this.state.username,this.state.password);
            if (data && data.errCode!==0){
                this.setState({
                    errMessage:data.message
                })
            }
            if(data && data.errCode === 0){
                this.props.userLoginSuccess(data.user)
            }
        } catch (error) {
            if(error.response){
                if(error.response.data){
                    this.setState({
                        errMessage:error.response.data.message
                    })
                }
            }
        }
    }
    handleShowHidePassword=()=>{
        this.setState({
            isShowPassword: !this.state.isShowPassword
        })
    }
    handleOnKeyDown=(Event)=>{
        if(Event.key === 'Enter' || Event.key === 13){
            this.handleLogin();
        }}
        render(){
        return (
            <div className="login-background">
                <div className='login-container'>
                    <div className='login-content row' >
                        <div className='col-12 text-login'>
                            Login
                        </div>
                        <div className='col-12 form-group login-input' >
                            <label>Username</label>
                            <input type='text'
                             className='form-control'
                             placeholder='Enter your username'
                             value={this.state.username}
                             onChange={(Event)=>this.handleOnChangeUsername(Event)}
                             />
                        </div>
                        <div className='col-12 form-group login-input'>
                            <label>Password</label>
                            <div className='custom-input-password'>
                                <input type={this.state.isShowPassword ? 'text' : 'password'}   
                                className='form-control' 
                                placeholder='Enter your password'
                                onChange={(Event)=>{this.handleOnChangePassword(Event)}}
                                onKeyDown={(Event)=>this.handleOnKeyDown(Event)}
                                />
                                <span onClick={()=>{this.handleShowHidePassword()}}>
                                <i className={this.state.isShowPassword ? "far fa-eye" :"far fa-eye-slash"}></i>
                                </span>
                            </div>
                        </div>
                        <div className='col-12'>
                            <div className='forgot-password'>
                                <span>Forgot your password?</span>
                            </div>
                        </div>
                        <div className='col-12' style={{color:'red'}}>
                            {this.state.errMessage}
                        </div>
                        <div className='col-12 '>
                            <button className='btn-login' onClick={()=>{this.handleLogin()}}>Login</button>
                        </div>
                        <div className='col-12 text-center mt-2'>
                            <span className='text-other-login'>
                                Or login with:
                            </span>
                        </div>
                        <div className='col-12 social-login'>
                            <i className="fab fa-google-plus-g google"></i>
                            <i className="fab fa-facebook-f facebook" ></i>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        navigate: (path) => dispatch(push(path)),
        // userLoginFail: () => dispatch(actions.adminLoginFail()),
        userLoginSuccess:(userInfo) => dispatch(actions.userLoginSuccess(userInfo)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
