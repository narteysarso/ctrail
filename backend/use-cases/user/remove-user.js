const { makeUser } = require("../../models");

module.exports = function makeRemoveUser({ usersDb }) {
    return async function removeUser({ id } = {}) {
        if (!id) {
            throw new Error('You must supply a user id.')
        }

        const userToDelete = await usersDb.findById({ id })

       
        return softDelete(userToDelete)
    }

    async function softDelete(userInfo) {
        const toDelete = makeUser(userInfo)
        toDelete.markDeleted()
        await usersDb.update({
            id: toDelete.getId(),
            name: toDelete.getName(),
            phone: toDelete.getPhone(),
            email: toDelete.getEmail(),
            type: user.getType(),
            isActive: toDelete.getActiveStatus(),
            roleId: toDelete.getRoleId(),
            deletedAt: Date.now(),
            createdAt: toDelete.getCreatedAt(),
            updatedAt: toDelete.getUpdatedAt()
        })
        return {
            deletedCount: 1,
            softDelete: true,
            message: 'User has been soft deleted.'
        }
    }

    a
}
