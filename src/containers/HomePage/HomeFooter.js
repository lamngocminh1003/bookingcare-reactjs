import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
class HomeFooter extends Component {
    render() {
        return (
            <div className='home-footer'>
                <p>&copy; <FormattedMessage id="home-footer.source" /> </p>
                <p><FormattedMessage id="home-footer.contact" /> 
                    <a target="_blank" href='https://www.facebook.com/'>
                         &#8594; 
                         <span style={{color: `blue`,}}>
                            <FormattedMessage id="home-footer.here" />  
                         </span>
                         &#8592;
                    </a> 
                </p>
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

export default connect(mapStateToProps, mapDispatchToProps)(HomeFooter);
