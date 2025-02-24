import axios from 'axios';
import backendUrl from './url.js';
const loginFunction = async (data) => {
    try {
        const resposne = await axios.post(backendUrl+'/apiv1/user/login', data , {withCredentials:true});
        if (!resposne) throw new Error("Something went wrong");
        // if (!resposne.data.status) throw new Error(resposne.data.msg);
        return resposne;
    } catch (error) {
        // console.log(error.response.data.message);
        return error;
    }

};

const signupFunction = async (data) => {
    try {
        const resposne = await axios.post(backendUrl+'/apiv1/user/signup', data , {withCredentials:true});
        if (!resposne) throw new Error("Something went wrong");
        // if (!resposne.data.status) throw new Error(resposne.data.msg);
        return resposne;
    } catch (error) {
        // console.log(error.response.data.message);
        return error;
    }

}

export  { loginFunction , signupFunction};