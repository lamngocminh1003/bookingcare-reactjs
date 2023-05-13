import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import Slider from "react-slick";
import {getAllSpecialties} from '../../../services/userService';
import { withRouter } from 'react-router';

class Specialty extends Component {
    constructor(props){
        super(props);
        this.state = {
            dataSpecialty:[]
        }
    }
    async componentDidMount(){
        let res = await getAllSpecialties();
        if(res && res.errCode ===0){
            this.setState({
                dataSpecialty:res.specialties ? res.specialties:[]
            })
        }
    }
    handleViewDetailSpecialty = (item) =>{
        if(this.props.history){
            this.props.history.push(`/detail-specialty/${item.id}`)
        }
    }
    render() {
        let {dataSpecialty} = this.state
        return (
            <div className=' section-share section-specialty'>
                <div className='section-container'>
                    <div className='section-header'>
                        <span className='title-section'>
                        <FormattedMessage id="homepage.specialty-popular"/>
                        </span>
                        <button className='btn-section'>
                        <FormattedMessage id="homepage.more-info"/>
                        </button>
                    </div>
                    <div className='section-body'>
                        <Slider {...this.props.settings}>
                            {dataSpecialty && dataSpecialty.length>0 &&
                            dataSpecialty.map((item, index)=>{
                                let imageBase64 ='';
                                    if(item.image){
                                        imageBase64 = new Buffer(item.image,'base64').toString('binary');
                                    }
                                return(
                                <div 
                                onClick={()=>this.handleViewDetailSpecialty(item)}
                                className='section-customize specialty-child' 
                                key={index}>
                                        <div className='bg-image section-specialty '
                                        style={{
                                            backgroundImage: `url(${imageBase64})`,
                                          }}
                                        />
                                        <div className='text-center specialty-name'>{item.name}</div>
                                </div>
                                )
                            })
                            }
                        </Slider>   
                    </div>
                </div>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Specialty));
