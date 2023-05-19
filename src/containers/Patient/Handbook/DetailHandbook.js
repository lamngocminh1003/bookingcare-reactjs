import React, { Component } from 'react';
import { connect } from "react-redux";
import _ from 'lodash';
import './DetailHandbook.scss';
import HomeHeader from '../../HomePage/HomeHeader';
import {getDetailHandbookById} from '../../../services/userService'
class DetailHandbook extends Component {
    constructor(props){
        super(props);
        this.state = {
            arrDoctorId:[],
            dataDetailHandbook: [],
        }
    }
    async componentDidMount(){
        if(this.props.match && this.props.match.params && this.props.match.params.id){
            let id = this.props.match.params.id;
            let res =await getDetailHandbookById({
                id: id,
            });
            if(res && res.errCode === 0 ){
                let data =res.data;
                let arrDoctorId=[]
                if(data && !_.isEmpty(data)){
                    let arr = data.doctorClinic;
                    if(arr && arr.length>0){
                        arr.map(item =>{
                            arrDoctorId.push(item.doctorId);
                        })
                }}
                this.setState({
                    dataDetailHandbook:res.data,
            })
        }
    }}
    
    async componentDidUpdate(prevProps, prevState,  snapshot){
        if(this.props.language !== prevProps.language){

        }
    }
    render() {
        let {dataDetailHandbook} = this.state
        return (
            <div className='detail-handbook-container'>
                <HomeHeader/>
                <div className='detail-handbook-body'> 
                    {dataDetailHandbook && !_.isEmpty(dataDetailHandbook) && 
                        <> 
                            <div dangerouslySetInnerHTML={{__html: dataDetailHandbook.descriptionHTML}} className='des-handbook'>
                            </div>
                        </>
                    }   
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailHandbook);
