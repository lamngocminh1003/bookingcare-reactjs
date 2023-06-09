import axios from '../axios';

const handleLoginApi =(userEmail,userPassword)=>{
    return axios.post('/api/login',{email:userEmail,password:userPassword});
}
const getAllUsers =(inputId)=>{
    return axios.get(`/api/get-all-users?id=${inputId}`)
}
const getAllSpecialties = () =>{
    return axios.get(`/api/get-all-specialties`)
}
const createNewUserService =(data) =>{
    console.log('check data from server: ', data);
    return axios.post(`/api/create-new-user`,data)
}
const deleteUserService =(userId) =>{
    return axios.delete(`/api/delete-user`, {
        data: {
          id: userId
        }
      });
}
const deleteSpecialtyService =(specialtyId) =>{
    return axios.delete(`/api/delete-specialty`, {
        data: {
          id: specialtyId
        }
      });
}
const editUserService = (inputData) =>{
    return axios.put(`/api/edit-user`, inputData);
}
const editSpecialtyService = (inputData) =>{
    return axios.put(`/api/edit-specialty`, inputData);
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
const postVerifyBookingAppointment = (data) =>{
    return axios.post(`/api/verify-book-appointment`,data)
}
const createNewSpecialty = (data) =>{
    return axios.post(`/api/create-new-specialty`,data)
}
const getDetailSpecialtyById = (data) =>{
    return axios.get(`/api/get-detail-specialty-by-id?id=${data.id}&location=${data.location}`)
}
const createNewClinic = (data) =>{
    return axios.post(`/api/create-new-clinic`,data)
}
const getAllClinic = () =>{
    return axios.get(`/api/get-all-clinic`)
}
const deleteClinicService =(clinicId) =>{
    return axios.delete(`/api/delete-clinic`, {
        data: {
          id: clinicId
        }
      });
}
const editClinicService = (inputData) =>{
    return axios.put(`/api/edit-clinic`, inputData);
}
const getDetailClinicById = (data) =>{
    return axios.get(`/api/get-detail-clinic-by-id?id=${data.id}`)
}

const getAllPatientForDoctor = (data) =>{
    return axios.get(`/api/get-list-patients-for-doctor?doctorId=${data.doctorId}&date=${data.date}`)
}
const postSendRemedy = (data) =>{
    return axios.post(`/api/send-remedy`,data)
}

const createNewHandbook = (data) =>{
    return axios.post(`/api/create-new-handbook`,data)
}
const getAllHandbook = () =>{
    return axios.get(`/api/get-all-handbook`)
}
const deleteHandbookService =(handbookId) =>{
    return axios.delete(`/api/delete-handbook`, {
        data: {
          id: handbookId
        }
      });
}
const editHandbookService = (inputData) =>{
    return axios.put(`/api/edit-handbook`, inputData);
}
const getDetailHandbookById = (data) =>{
    return axios.get(`/api/get-detail-handbook-by-id?id=${data.id}`)
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
    postPatientBookingAppointment,
    postVerifyBookingAppointment,
    createNewSpecialty,
    getAllSpecialties,
    deleteSpecialtyService,
    editSpecialtyService,
    getDetailSpecialtyById,
    createNewClinic,
    getDetailClinicById,
    editClinicService,
    deleteClinicService,
    getAllClinic,
    getAllPatientForDoctor,
    postSendRemedy,
    getDetailHandbookById,
    editHandbookService,
    deleteHandbookService,
    getAllHandbook,
    createNewHandbook
}
