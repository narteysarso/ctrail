module.exports = function makeFindAllByIdExcept({ usersDb }) {

    return async function ({id}) {
        const users = await usersDb.findAllByIdExcept({id});

        return users;
    }
}
