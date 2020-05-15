const {makeUser} = require("../../models");
const  {makePasswordHash } = require('../../utils');

module.exports = function makeAddUser({ usersDb }) {
    return async function addUser(userInfo = {}) {
        
        if(!userInfo.email.trim() && !userInfo.phone.trim())
            throw new Error("Email or Phone number is required");
            
        const alreadyTaken = await usersDb.findAll({$or:[{email: userInfo.email},{phone: userInfo.phone}]});
        if(alreadyTaken.length > 0)
            throw new Error("Email or phone number is already taken");
            
        const user = makeUser({
             ...userInfo
        });

        //TODO: make policy implementations. eg: check authorization
        const exists = await usersDb.findById(user.getId());
        if (exists)
            return exists;

        return usersDb.insert({
            name: user.getName(),
            phone: user.getPhone(),
            email: user.getEmail(),
            imageUri: user.getImageUri(),
            type: user.getType(),
            intlCode: user.getIntlCode(),
            password: user.getPassword(),
            registerToken: user.getRegisterToken(),
            isActive: user.getActiveStatus(),
            roleId: user.getRoleId(),
            createdAt: user.getCreatedAt(),
            id: user.getId(),
        });
    }
}