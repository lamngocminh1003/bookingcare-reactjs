import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import Slider from "react-slick";
import {getAllHandbook} from '../../../services/userService'
import { withRouter } from 'react-router';

class HandBook extends Component {
    constructor(props){
        super(props);
        this.state = {
            dataHandbooks:[]
        }
    }
    async componentDidMount(){
        let res = await getAllHandbook();
        if(res && res.errCode ===0){
            this.setState({
                dataHandbooks:res.handbook?res.handbook:[]
            })
        }
    }
    handleViewDetailHandbook = (handbook)=>{
        if(this.props.history){
            this.props.history.push(`/detail-handbook/${handbook.id}`)
        }
    }
    render() {
        let {dataHandbooks} = this.state
        return (
            <div className=' section-share section-handbook'>
                <div className='section-container'>
                    <div className='section-header'>
                        <span className='title-section'><FormattedMessage id="homepage.handbook" /></span>
                        <button className='btn-section'><FormattedMessage id="homepage.more-info" /></button>
                    </div>
                    <div className='section-body'>
                        <Slider {...this.props.settings}>
                            {dataHandbooks && dataHandbooks.length > 0 && 
                                dataHandbooks.map((item, index)=>{
                                    let imageBase64 ='';
                                    if(item.image){
                                        imageBase64 = new Buffer(item.image,'base64').toString('binary');
                                    }
                                    return(
                                        <div className='section-customize' key={index}
                                        onClick={()=>this.handleViewDetailHandbook(item)}
                                        >
                                                <div className='bg-image section-handbook'
                                                style={{
                                                    backgroundImage: `url(${imageBase64})`,
                                                  }}
                                                />
                                                <div className='handbook-name'>{item.name}</div>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HandBook));
