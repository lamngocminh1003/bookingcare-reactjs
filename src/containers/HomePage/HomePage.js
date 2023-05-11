import React, { Component } from 'react';
import { connect } from 'react-redux';
import HomeHeader from './HomeHeader';
import HomeFooter from './HomeFooter';
import Specialty from './Section/Specialty';
import MedicalFacility from './Section/MedicalFacility';
import OutStandingDoctor from './Section/OutStandingDoctor';
import About from './Section/About';
import HandBook from './Section/HandBook';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './HomePage.scss';
class HomePage extends Component {
    // handleAfterChange = (index, dontAnimate) =>{
    //     console.log('check currentSlide: ', index);
    // }
    render() {
        let settings = {
            dots: false,
            infinite: false,
            speed: 500,
            slidesToShow: 4,
            slidesToScroll: 1,
            // slickGoTo: this.handleAfterChange,
          };
        return (
            <div> 
                <HomeHeader isShowBanner={true}/>
                <Specialty settings = {settings}/>
                <MedicalFacility settings = {settings}/>
                <OutStandingDoctor settings = {settings}/>
                <HandBook settings = {settings}/>
                <About/>
                <HomeFooter/>
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

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
