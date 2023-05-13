import actionTypes from './actionTypes';
import {getAllCodeService,createNewUserService,
    getAllUsers,deleteUserService,
    editUserService,getTopDoctorHomeService,getAllDoctors,
    saveDetailDoctor,getAllSpecialties,deleteSpecialtyService,
    editSpecialtyService} from "../../services/userService"
import { toast } from "react-toastify";

// export const fetchGenderStart = () => ({
//     type: actionTypes.FETCH_GENDER_START
// })

export const fetchGenderStart = () => {
    return async(dispatch,getState)=>{
        try {
            let res = await getAllCodeService('GENDER');
            if(res && res.errCode === 0){
                dispatch(fetchGenderSuccess(res.data))
            }else{
                dispatch(fetchGenderFailed());
            }
        } catch (e) {
            dispatch(fetchGenderFailed());
            console.log('fetchGenderStart error: ' , e.message);
        }
    }
}

export const fetchGenderSuccess = (genderData) => ({
    type: actionTypes.FETCH_GENDER_SUCCESS,
    data: genderData
})

export const fetchGenderFailed = () => ({
    type: actionTypes.FETCH_GENDER_FAILED
})

export const fetchPositionStart = () => {
    return async(dispatch,getState)=>{
        try {
            let res = await getAllCodeService('POSITION');
            if(res && res.errCode === 0){
                dispatch(fetchPositionSuccess(res.data))
            }else{
                dispatch(fetchPositionFailed());
            }
        } catch (e) {
            dispatch(fetchPositionFailed());
            console.log('fetchPositionStart error: ' , e.message);
        }
    }
}

export const fetchPositionSuccess = (positionData) => ({
    type: actionTypes.FETCH_POSITION_SUCCESS,
    data: positionData
})

export const fetchPositionFailed = () => ({
    type: actionTypes.FETCH_POSITION_FAILED
})

export const fetchRoleStart = () => {
    return async(dispatch,getState)=>{

        try {
            let res = await getAllCodeService('ROLE');
            if(res && res.errCode === 0){
                dispatch(fetchRoleSuccess(res.data))
            }else{
                dispatch(fetchRoleFailed());
            }
        } catch (e) {
            dispatch(fetchRoleFailed());
            console.log('fetchRoleStart error: ' , e);
        }
    }
}

export const fetchRoleSuccess = (roleData) => ({
    type: actionTypes.FETCH_ROLE_SUCCESS,
    data: roleData
})

export const fetchRoleFailed = () => ({
    type: actionTypes.FETCH_ROLE_FAILED
})

export const createNewUser = (data) => {
    return async(dispatch,getState)=>{

        try {
            let res = await createNewUserService(data) ;
            toast.success("Created a new user successfully!");
            if(res && res.errCode === 0){
                dispatch(saveUserSuccess())
                dispatch(fetchAllUsersStart()) ;
            }else{
                toast.error("Created a new user error!");
                dispatch(saveUserFailed());
            }
        } catch (e) {
            toast.error("Created a new user error!");
            dispatch(saveUserFailed());
        }
    }
}

export const saveUserSuccess = () => ({
    type: actionTypes.CREATE_USER_SUCCESS
})

export const saveUserFailed = () => ({
    type: actionTypes.CREATE_USER_FAILED
})

export const fetchAllUsersStart = () => {
    return async(dispatch,getState)=>{
        try {
            let res = await getAllUsers("ALL") ;
            if(res && res.errCode === 0){
                dispatch(fetchAllUsersSuccess(res.users.reverse()))
            }else{
                dispatch(fetchAllUsersFailed());
            }
        } catch (e) {
            dispatch(fetchAllUsersFailed());
        }
    }
}

export const fetchAllUsersSuccess = (data) => ({
    type: actionTypes.FETCH_ALL_USERS_SUCCESS,
    users:data
})

export const fetchAllUsersFailed = () => ({
    type: actionTypes.FETCH_ALL_USERS_FAILED,
})

export const deleteAUser = (userId) => {
    return async(dispatch,getState)=>{

        try {
            let res = await deleteUserService(userId) ;
            if(res && res.errCode === 0){
                toast.success("Delete the user successfully!");
                dispatch(deleteUserSuccess())
                dispatch(fetchAllUsersStart()) ;
            }else{
                toast.error("Delete the user error!");
                dispatch(deleteUserFailed());
            }
        } catch (e) {
            toast.error("Delete the user error!");
            dispatch(deleteUserFailed());
        }
    }
}

export const deleteUserSuccess =()=>({
    type: actionTypes.DELETE_USER_SUCCESS
})

export const deleteUserFailed =()=>({
    type: actionTypes.DELETE_USERS_FAILED
})


export const editAUser = (data) => {
    return async(dispatch,getState)=>{

        try {
            let res = await editUserService(data) ;
            toast.success("Update the user successfully!");
            if(res && res.errCode === 0){
                dispatch(editUserSuccess())
                dispatch(fetchAllUsersStart()) ;
            }else{
                toast.error("Update the user error!");
                dispatch(editUserFailed());
            }
        } catch (e) {
            toast.error("Update the user error!");
            dispatch(editUserFailed());
        }
    }
}

export const editUserSuccess =()=>({
    type: actionTypes.EDIT_USER_SUCCESS
})

export const editUserFailed =()=>({
    type: actionTypes.EDIT_USER_FAILED
})


export const fetchTopDoctor = () => {
    return async(dispatch,getState)=>{
        try {
            let res = await getTopDoctorHomeService('');
            console.log('check res', res);
            if (res && res.errCode ===0){
                dispatch({
                    type:actionTypes.FETCH_TOP_DOCTORS_SUCCESS,
                    dataDoctors:res.data
                })
            }else{
                dispatch({
                    type:actionTypes.FETCH_TOP_DOCTORS_FAILED,
                })
            }
        } catch (e) {
            console.log('FETCH_TOP_DOCTORS_FAILED',e);
            dispatch({
                type:actionTypes.FETCH_TOP_DOCTORS_FAILED,
            })
        }
    }
}

export const fetchAllDoctors = () => {
    return async(dispatch,getState)=>{
        try {
            let res = await getAllDoctors();
            if (res && res.errCode ===0){
                dispatch({
                    type:actionTypes.FETCH_ALL_DOCTORS_SUCCESS,
                    dataDr:res.data
                })
            }else{
                dispatch({
                    type:actionTypes.FETCH_ALL_DOCTORS_FAILED,
                })
            }
        } catch (e) {
            console.log('FETCH_ALL_DOCTORS_FAILED',e);
            dispatch({
                type:actionTypes.FETCH_ALL_DOCTORS_FAILED,
            })
        }
    }
}

export const SaveDetailDoctor = (data) => {
    return async(dispatch,getState)=>{
        try {
            let res = await saveDetailDoctor(data);
            console.log('check res', res);
            if (res && res.errCode ===0){
                toast.success("Save info detail's doctor successfully!");
                dispatch({
                    type:actionTypes.SAVE_DETAIL_DOCTOR_SUCCESS,
                })
            }else{
                toast.error("Save info detail's doctor error!");
                dispatch({
                    type:actionTypes.SAVE_DETAIL_DOCTOR_FAILED,
                })
            }
        } catch (e) {
            toast.error("Save info detail's doctor error!");
            console.log('FETCH_ALL_DOCTORS_FAILED',e);
            dispatch({
                type:actionTypes.SAVE_DETAIL_DOCTOR_FAILED,
            })
        }
    }
}

export const fetchAllScheduleTime= () => {
    return async(dispatch,getState)=>{
        try {
            let res = await getAllCodeService("TIME");
            console.log('check res', res);
            if (res && res.errCode ===0){
                dispatch({
                    type:actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_SUCCESS,
                    dataTime:res.data
                })
            }else{
                dispatch({
                    type:actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_FAILED,
                })
            }
        } catch (e) {
            console.log('FETCH_ALLCODE_SCHEDULE_TIME_FAILED',e);
            dispatch({
                type:actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_FAILED,
            })
        }
    }
}

export const getRequireDoctorInfo= () => {
    return async(dispatch,getState)=>{
        try {
            let resPrice = await getAllCodeService('PRICE');
            let resPayment = await getAllCodeService('PAYMENT');
            let resProvince = await getAllCodeService('PROVINCE');
            let resSpecialty = await getAllSpecialties();
            // let resClinic = await getAllCodeService('PROVINCE');
            if(resPrice && resPrice.errCode === 0 
                && resPayment && resPayment.errCode === 0 
                && resProvince && resProvince.errCode === 0
                && resSpecialty && resSpecialty.errCode === 0){
                    let data={
                        resPrice:resPrice.data,
                        resPayment:resPayment.data,
                        resProvince:resProvince.data,
                        resSpecialty:resSpecialty.specialties,
                    }
                dispatch(fetchRequireDoctorInfoSuccess(data))
            }else{
                dispatch(fetchRequireDoctorInfoFailed());
            }
        } catch (e) {
            dispatch(fetchRequireDoctorInfoFailed());
            console.log('fetchRequireDoctorInfoStart error: ' , e.message);
        }
    }
}

export const fetchRequireDoctorInfoSuccess = (allRequiredData) => ({
    type: actionTypes.FETCH_REQUIRE_DOCTOR_INFO_SUCCESS,
    data: allRequiredData
})

export const fetchRequireDoctorInfoFailed = () => ({
    type: actionTypes.FETCH_REQUIRE_DOCTOR_INFO_FAILED
})

export const fetchAllSpecialtiesStart = () => {
    return async(dispatch,getState)=>{
        try {
            let res = await getAllSpecialties() ;
            if(res && res.errCode === 0){
                dispatch(fetchAllSpecialtiesSuccess(res.specialties.reverse()))
            }else{
                dispatch(fetchAllSpecialtiesFailed());
            }
        } catch (e) {
            dispatch(fetchAllSpecialtiesFailed());
        }
    }
}

export const fetchAllSpecialtiesSuccess = (specialties) => ({
    type: actionTypes.FETCH_ALL_SPECIALTIES_SUCCESS,
    specialties:specialties
})

export const fetchAllSpecialtiesFailed = () => ({
    type: actionTypes.FETCH_ALL_SPECIALTIES_FAILED,
})

export const deleteSpecialty = (specialtyId) => {
    return async(dispatch,getState)=>{

        try {
            let res = await deleteSpecialtyService(specialtyId) ;
            if(res && res.errCode === 0){
                toast.success("Delete the specialty successfully!");
                dispatch(deleteSpecialtySuccess())
                dispatch(fetchAllSpecialtiesStart()) ;
            }else{
                toast.error("Delete the user error!");
                dispatch(deleteUserFailed());
            }
        } catch (e) {
            toast.error("Delete the user error!");
            dispatch(deleteUserFailed());
        }
    }
}

export const deleteSpecialtySuccess =()=>({
    type: actionTypes.DELETE_SPECIALTY_SUCCESS
})

export const deleteSpecialtyFailed =()=>({
    type: actionTypes.DELETE_SPECIALTY_FAILED
})

export const editSpecialty = (specialties) => {
    return async(dispatch,getState)=>{

        try {
            let res = await editSpecialtyService(specialties) ;
            toast.success("Update the specialty successfully!");
            if(res && res.errCode === 0){
                dispatch(editSpecialtySuccess())
                dispatch(fetchAllSpecialtiesStart()) ;
            }else{
                toast.error("Update the specialty error!");
                dispatch(editSpecialtyFailed());
            }
        } catch (e) {
            toast.error("Update the specialty error!");
            dispatch(editSpecialtyFailed());
        }
    }
}

export const editSpecialtySuccess =()=>({
    type: actionTypes.EDIT_SPECIALTY_FAILED
})

export const editSpecialtyFailed =()=>({
    type: actionTypes.EDIT_SPECIALTY_FAILED
})