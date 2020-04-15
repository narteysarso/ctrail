
module.exports = function makeEditUser({ usersDb}) {
    return async function editUser({ id, ...changes } = {}) {
        if (!id) {
            throw new Error('You must supply an id.')
        }
        
        const existing = await usersDb.findById({ id })

        if (!existing) {
            throw new RangeError('User not found.')
        }
        const user = { ...existing, ...changes, updatedAt: Date.now() }
        
        const updated = await usersDb.update({
           ...user
        });

        const {password, ...userInfo} = { ...existing, ...updated }

        return userInfo;
    }
    
}
