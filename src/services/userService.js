import axios from '../axios';

const handleLoginApi =(userEmail,userPassword)=>{
    return axios.post('/api/login',{email:userEmail,password:userPassword});
}
const getAllUsers =(inputId)=>{
    return axios.get(`/api/get-all-users?id=${inputId}`)
}
const createNewUserService =(data) =>{
    console.log('check data from server: ', data);
    return axios.post(`/api/create-new-user`,data)
}
const deleteUserService =(userId) =>{
    // return axios.delete(`/api/delete-user`,{id: userId})
    return axios.delete(`/api/delete-user`, {
        data: {
          id: userId
        }
      });
}
const editUserService = (inputData) =>{
    return axios.put(`/api/edit-user`, inputData);
}
const getAllCodeService = (inputType) =>{
    return axios.get(`/api/allcode?type=${inputType}`)
}

const getTopDoctorHomeService = (limit) =>{
    return axios.get(`/api/top-doctor-home?limit=${limit}`)
}

const getAllDoctors = () =>{
    return axios.get(`/api/get-all-doctors`)
}

const saveDetailDoctor = (data) =>{
    return axios.post(`/api/save-info-doctors`,data)
}

const getDetailInfoDoctor = (inputId) =>{
    return axios.get(`/api/get-detail-doctor-by-id?id=${inputId}`)
}
const saveBulkCreateScheduleDoctor = (data) =>{
    return axios.post(`/api/bulk-create-schedule`,data)
}
const getScheduleDoctorByDate = (doctorId,date) =>{
    return axios.get(`/api/get-schedule-doctor-by-date?doctorId=${doctorId}&date=${date}`)
}

const getExtraInfoDoctorById = (doctorId) =>{
    return axios.get(`/api/get-extra-info-doctor-by-id?doctorId=${doctorId}`)
}
const getProfileDoctorById = (doctorId) =>{
    return axios.get(`/api/get-profile-doctor-by-id?doctorId=${doctorId}`)
}
const postPatientBookingAppointment = (data) =>{
    return axios.post(`/api/patient-book-appointment`,data)
}
export{handleLoginApi,
    getAllUsers,
    createNewUserService,
    deleteUserService,
    editUserService,
    getAllCodeService,
    getTopDoctorHomeService,
    getAllDoctors,saveDetailDoctor,
    getDetailInfoDoctor,
    saveBulkCreateScheduleDoctor,
    getScheduleDoctorByDate,
    getExtraInfoDoctorById,
    getProfileDoctorById,
    postPatientBookingAppointment
}
