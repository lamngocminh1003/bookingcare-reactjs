 import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import Slider from "react-slick";
import { withRouter } from 'react-router';
import {getAllClinic} from '../../../services/userService'
class MedicalFacility extends Component {
    constructor(props){
        super(props);
        this.state = {
            dataClinics:[]
        }
    }
    async componentDidMount(){
        let res = await getAllClinic()
        if(res && res.errCode ===0){
            this.setState({dataClinics:res.clinic? res.clinic:[]
            })
        }
    }
    handleViewDetailClinic = (item) =>{
        if(this.props.history){
            this.props.history.push(`/detail-clinic/${item.id}`)
        }
    }
    render() {
        let {dataClinics} = this.state
        return (
            <div className=' section-share section-clinic'>
                <div className='section-container'>
                    <div className='section-header'>
                        <span className='title-section'>Cơ sở y tế nổi bật</span>
                        <button className='btn-section'>Tìm kiếm</button>
                    </div>
                    <div className='section-body'>
                        <Slider {...this.props.settings}>
                            {dataClinics && dataClinics.length > 0 && dataClinics &&
                            dataClinics.map((item,index) => {
                                let imageBase64 ='';
                                    if(item.image){
                                        imageBase64 = new Buffer(item.image,'base64').toString('binary');
                                    }
                                return(
                                    <div className='section-customize' 
                                    onClick={()=>this.handleViewDetailClinic(item)}
                                    key ={index}>
                                            <div className='bg-image section-medical-facility'
                                            style={{
                                                backgroundImage: `url(${imageBase64})`,
                                              }}
                                              />
                                            <div className='text-center clinic-name'>{item.name} </div>
                                    </div>  
                                )
                            })}
                        </Slider>   
                    </div>
                </div>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MedicalFacility));
