const AuthSchema = require('../models/auth.js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const register = async (req,res) => {
    try {
        const {username, password, email} = req.body;
        const user = await AuthSchema.findOne({email: email})

        if(user){
            return res.status(500).json({message:"Bu kullanıcı zaten var!"})
        }

        if(password.length < 6){
            return res.status(500).json({message:"Şifre yeterli uzunlukta değil."})
        }
        const passwordHash = await bcrypt.hash(password, 12);

        if(!isEmail(email)){
            return res.status(500).json({message:"Email formatı dışındasınız."})
        }

        const newUser = await AuthSchema.create({username, email, password: passwordHash})

        const token = jwt.sign({id: newUser._id},"SECRET_KEY", {expiresIn:'1h'}) //oluşan userın id sinden dönsün. secret key olacak.expiresin diyerek özellik koydum. 
        res.status(201).json({
            status:"OK",
            newUser,
            token
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({message:error.message})
    }
}

const login = async (req,res) => {
    try {
        const {email, password} = req.body;
        const user = await AuthSchema.findOne({email: email}) //user kontrolü emaile göre bir tanesini bul.

        if(!user){
            return res.status(500).json({message:"Böyle bir kullanıcı bulunamadı."})
        }
        const passwordCompare = await bcrypt.compare(password, user.password) //dışardan gelen password değeriyle userdan gelen password değerini kıyaslamak için.

        if(!passwordCompare){
            return res.status(500).json({message:"Girilen şifre yanlış!"})
        }
        const token = jwt.sign({id: user._id},"SECRET_KEY",{expiresIn:'1h'})
        res.status(200).json({
            status:"OK",
            user,
            token
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({message:error.message})
    }
}

function isEmail(emailAdress){
    let regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    
    if(emailAdress.match(regex))
    return true;

    else
    return false;
}
//mail tipindeyse true değilse false döner.


module.exports = {register,login};

