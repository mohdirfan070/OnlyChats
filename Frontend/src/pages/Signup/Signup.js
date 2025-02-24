import axios from "axios";
export const signupFunction = async (data) => {
    try {
        const resposne = await axios.post(import.meta.env.VITE_BACKEND_URL+'/apiv1/user/signup', data , {withCredentials:true});
        if (!resposne) throw new Error("Something went wrong");
        // console.log(resposne);
        // if (!resposne.data.status) throw new Error(resposne.data.msg);
        return resposne;
    } catch (error) {
        // console.log(error.response.data.message);
        return error;
    }

};