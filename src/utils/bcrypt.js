import bcrypt from "bcrypt";

export const passHashed=(password)=>{
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
}

export const validatePass = (password,hashedPass) => {
    return bcrypt.compareSync(password,hashedPass)
}
