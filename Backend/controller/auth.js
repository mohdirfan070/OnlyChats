const User = require('../models/User');
const { generateToken } = require('../utils/auth');

const Login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({
            email: email
        });
        
        if (!user) {
            return res.status(200).json({
                message: "User not found",
                status : false
            });
        }
        if (user.password !== password) {
            return res.status(200).json({
                message: "Incorrect Password",
                status : false
            });
        }

        // console.log(user);

        const token = await generateToken(user);
        res.cookie('token', `Bearer ${token}`, {
            httpOnly: true,
            secure: true,
            sameSite: 'None',
            // expires: new Date(new Date().getTime() + 24 * 60 * 60 * 1000)
        });
        return res.status(200).json({
            message: "Login successful",
            status:true,
            user:{
                name:user.name,
                email:user.email,
                profilePicture:user.profilePicture,
                token 
            }
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message,
            status:false
        });
    }
};


const Signup = async (req, res) => {
    const { name, username, email, password } = req.body;

    try {
        // Check if user already exists
        let user = await User.findOne({ $or:[{username},{email}]});
        if (user) {
            // console.log("huurr");
            return res.status(200).json({ message: 'Email or Username already exists' });
        }

        // Create a new user instance
        user = new User({
            name,
            username,
            email,
            password
        });

       
        // Save the user to the database
      const result =   await user.save();
      if(!result) throw new Error(result);

        // Create and sign a JWT token
        const token = await generateToken(user);
        res.cookie('token', `Bearer ${token}`, {
            httpOnly: true,
            secure: true,
            sameSite: 'None',
            // expires: new Date(new Date().getTime() + 24 * 60 * 60 * 1000)
        });
        return res.status(200).json({
            message: "Login successful",
            status:true,
            user:{
                name:user.name,
                email:user.email,
                profilePicture:user.profilePicture,
                
            }
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message,
            status:false
        });
    }
};




module.exports = { Signup, Login };
