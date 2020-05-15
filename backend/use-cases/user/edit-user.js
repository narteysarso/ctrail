const { makeUser } = require("../../models");

module.exports = function makeEditUser({ usersDb}) {
    return async function editUser({ id, ...changes } = {}) {
        if (!id) {
            throw new Error('You must supply an id.')
        }
        
        const existing = await usersDb.findById({ id })

        if (!existing) {
            throw new RangeError('User not found.')
        }
        const user = makeUser({ ...existing, ...changes, updatedAt: Date.now() })
        
        const updated = await usersDb.update({
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

        const {password, ...userInfo} = { ...existing, ...updated }

        return userInfo;
    }
    
}
