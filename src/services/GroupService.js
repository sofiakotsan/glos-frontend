import { httpInstance } from "../http/httpInstance";
import { handleHttpError } from "../helpers/helpers";

const GroupService = {
    async getUserGroups(username) { // GET /users/{username}/groups
        return await httpInstance.get(`/users/${username}/groups`, {
            params: {
                page: 0,
                size: 1000,
            }
        })
        .then(function (response) {
            return response.data;

            // return [
            //     {
            //         "name": "name1",
            //         "access_type" :  "protected_rw",
            //         owner: {
            //             "username": "username1",
            //             "email": "email1@mail.com",
            //             "phoneNumber": "+380123456789",
            //             "firstName" : "john1",
            //             "lastName" : "doe1",
            //             "gender" : "male",
            //             "ISOBirthDate" : "1996.03.22"
            //         },
            //         "users" : [
            //             {
            //                 "username": "username1",
            //                 "email": "email1@mail.com",
            //                 "phoneNumber": "+380123456789",
            //                 "firstName" : "john1",
            //                 "lastName" : "doe1",
            //                 "gender" : "male",
            //                 "ISOBirthDate" : "1996.03.22"
            //             },
            //             {
            //                 "username": "username2",
            //                 "email": "email1@mail.com",
            //                 "phoneNumber": "+380123456789",
            //                 "firstName" : "john2",
            //                 "lastName" : "doe2",
            //                 "gender" : "male",
            //                 "ISOBirthDate" : "1996.03.22"
            //             },
            //         ]
            //     },
            //     {
            //         "name": "name2",
            //         "access_type" :  "protected_rw",
            //         owner: {
            //             "username": "username1",
            //             "email": "email1@mail.com",
            //             "phoneNumber": "+380123456789",
            //             "firstName" : "john1",
            //             "lastName" : "doe1",
            //             "gender" : "male",
            //             "ISOBirthDate" : "1996.03.22"
            //         },
            //         "users" : [
            //             {
            //                 "username": "username1",
            //                 "email": "email1@mail.com",
            //                 "phoneNumber": "+380123456789",
            //                 "firstName" : "john1",
            //                 "lastName" : "doe1",
            //                 "gender" : "male",
            //                 "ISOBirthDate" : "1996.03.22"
            //             },
            //             {
            //                 "username": "username2",
            //                 "email": "email1@mail.com",
            //                 "phoneNumber": "+380123456789",
            //                 "firstName" : "john2",
            //                 "lastName" : "doe2",
            //                 "gender" : "male",
            //                 "ISOBirthDate" : "1996.03.22"
            //             },
            //         ]
            //     }
            // ];
        })
        .catch(error => handleHttpError(error))
    },

    async getGroup(username, name, showError) { // GET /users/{username}/groups/{name}
        return await httpInstance.get(`/users/${username}/groups/${name}`)
        .then(function (response) {
            return response.data;

            // return {
            //     "name": "name1",
            //     "access_type" :  "protected_rw",
            //     owner: {
            //         "username": "username1",
            //         "email": "email1@mail.com",
            //         "phoneNumber": "+380123456789",
            //         "firstName" : "john1",
            //         "lastName" : "doe1",
            //         "gender" : "male",
            //         "ISOBirthDate" : "1996.03.22"
            //     },
            //     "users" : [
            //         {
            //             "username": "username1",
            //             "email": "email1@mail.com",
            //             "phoneNumber": "+380123456789",
            //             "firstName" : "john1",
            //             "lastName" : "doe1",
            //             "gender" : "male",
            //             "ISOBirthDate" : "1996.03.22"
            //         },
            //         {
            //             "username": "username2",
            //             "email": "email1@mail.com",
            //             "phoneNumber": "+380123456789",
            //             "firstName" : "john2",
            //             "lastName" : "doe2",
            //             "gender" : "male",
            //             "ISOBirthDate" : "1996.03.22"
            //         },
            //     ]
            // };
        })
        .catch(error => {if(showError) handleHttpError(error)})
    },

    // NEW - робочий, використовувати як для створення груп так і для їх оновлення
    async putGroup(username, name, group) {
        return await httpInstance.put(`/users/${username}/groups/${name}`, group)
        .then(function (response) {
            return response.data; // todo: ask if returns object
        })
        .catch(error => handleHttpError(error))
    },

    // todo: ask how can group be created if there's no group name yet?
    // todo: in api map but not in dto map, does it still exist?, same for delete operation
    // async createGroup(username, name, group) { // PUT /users/{username}/group/{name}
    //     return await httpInstance.put(`/users/${username}/groups/${name}`, group)
    //     .then(function (response) {
    //         // return response.data;

    //         return {
    //             "name": "name1",
    //             "access_type" :  "protected_rw",
    //             "users" : []
    //         };
    //     })
    //     .catch(error => handleHttpError(error))
    // },

    // todo: ask about name and users
    // todo: ask what happend if access field is null
    // async updateGroup(username, name, group) { // PATCH /users/{username}/groups/{name}
    //     return await httpInstance.patch(`/users/${username}/groups/${name}`, group)
    //     .then(function (response) {
    //         return response;
    //     })
    //     .catch(error => handleHttpError(error))
    // },

    async deleteGroup(username, name) { // DELETE /users/{username}/groups/{name}
        return await httpInstance.delete(`/users/${username}/groups/${name}`)
        .then(function (response) {
            return response;
        })
        .catch(error => handleHttpError(error))
    },

    // async addUsersToGroup(username, name, users) { // PATCH /users/{username}/groups/{name}/append-users
    //     return await httpInstance.put(`/users/${username}/groups/${name}/append-users`, users)
    //     .then(function (response) {
    //         return response;
    //     })
    //     .catch(error => handleHttpError(error))
    // },

    // NEW -- робочий
    // додається тільки 1 користувач зараз, достатньо буде вказати його username в url
    async addUserToGroup(username, name, otherUsername) { // PUT /users/{username}/groups/{name}/add-user
        return await httpInstance.put(`/users/${username}/groups/${name}/add-user/${otherUsername}`)
        .then(function (response) {
            return response;
        })
        .catch(error => handleHttpError(error))
   },

    // async removeUsersFromGroup(username, name, users) { // DELETE /users/{username}/groups/{name}/delete-users
    //     return await httpInstance.delete(`/users/${username}/groups/${name}/delete-users`, users)
    //     .then(function (response) {
    //         return response;
    //     })
    //     .catch(error => handleHttpError(error))
    // },

    // NEW -- робочий
    async removeUserFromGroup(username, name, otherUsername) { // DELETE /users/{username}/groups/{name}/delete-users
    return await httpInstance.delete(`/users/${username}/groups/${name}/delete-user/${otherUsername}`)
    .then(function (response) {
        return response;
    })
    .catch(error => handleHttpError(error))
   },
};

export default GroupService;