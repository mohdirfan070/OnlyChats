const User  = require("../models/user");

const updateSocketId = async (user)=>{
    // {
    //     socketId: 'hPSi1263j2fDzGOoAAAB',
    //     _id: '6795105d9bf950a772a0d35e',
    //     email: 'user@gmail.com',
    //     iat: 1738053936,
    //     exp: 1738313136
    //   }
    const {socketId ,_id ,email , iat , exp} = user;
    try {
            const result = await User.findByIdAndUpdate({_id},{socketId , isOnline : true , },{new:true});
        // console.log(user);
        return result;
    } catch (error) {
        // console.log(error);
        return null;
    }
};

const updateStatus = async (user)=>{

    const {socketId , status  } = user;
    try {
            const result = await User.findOneAndUpdate({ socketId :socketId  },{ isOnline : status , },{new:true});
        // console.log(user);
        return result;
    } catch (error) {
        // console.log(error);
        return null;
    }
};


module.exports = { updateSocketId , updateStatus };