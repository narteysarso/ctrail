function userFactory({Id, validator, ROLES}){
    return function makeUser({
        id = Id.makeId(),
        name,
        email,
        phone,
        intlCode,
        passwordHash,
        registerToken,
        isActive = true,
        roleId = ROLES.USER,
        createdAt = Date.now(),
        updatedAt = Date.now(),
        deletedAt
    } = {}) {
        

        if (!id)
            throw new Error('User must have a valid Id');

        if (!name || name.length < 3)
            throw new Error('User must have a name with at least three characters')

        if(email && !validator.isValidEmail(email)){
            throw new Error('User must have a valid email') 
        }

        if(!phone && !email)
            throw new Error("User must have a valid email or phone number");

        return Object.freeze({
            getId: () => id,
            getName: () => name,
            getEmail: () => email,
            getIntlCode: () => intlCode,
            getPhone: () => phone,
            getActiveStatus: () => isActive,
            getRegisterToken: () => registerToken,
            getDeletedAt: () => deletedAt,
            getCreatedAt: () => createdAt,
            getUpdatedAt: () => updatedAt,
            getPassword: () => passwordHash,
            getRoleId: () => roleId,
            markDeleted: () => {
                deletedAt = Date.now()
            },
            markActive: () => {
                isActive = true
            },
            markInActive: () => {
                isActive = false
            }
        });
    }
}

module.exports = userFactory