import { httpInstance } from "../http/httpInstance";
import { handleHttpError } from "../helpers/helpers";

const RepositoryService = {
    async getRepository(id, sharedToken) { // GET /repositories/{id}?sharedtoken=<Shared token>
        return await httpInstance.get(`/repositories/${id}`, {
            params: { sharedToken }
        })
        .then(function (response) {
            // todo: ask how it is going to work
            // return response.data;

            return {
                rootFullName: 'rootFullName',
                "displayPath" : "/",
                "displayName" : "repos1",
                "displayFullName" : "/repos1",
                "description" : "some description1",
                "access_types" : ["R_GROUP_group1", "RW_GROUP_group2"],
                "owner" : "username1",
                "tags": ['tag1', 'tag2', 'tag3'],
            };
        })
        .catch(error => handleHttpError(error))
    },

    // OK/CHECK
    // цим самим методом можна взяти shared для файлів, просто взяти з файлу його rootFullName
    async getRepositorySharedToken(rootFullName) { // GET /shared/{rootFullName}
            return await httpInstance.get(`/shared/${rootFullName}`)
            .then(function (response) {
                // return response.data;

                return {
                    token: '<shared token>',
                    sharedUrl: 'https://localhost:9002/api/repositories/root-fullname/${rootFullName}?shared=<shared token>',
                }
            })
            .catch(error => handleHttpError(error))
    },

    // async getRepositorySharedToken_OLD(id) { // GET /repositories/{id}/shared-token
    //     return await httpInstance.get(`/repositories/${id}/shared-token`)
    //     .then(function (response) {
    //         // return response.data; 

    //         return {
    //             token: 'dfgfdg',
    //             sharedUrl: 'fdgfdgfd',
    //         }
    //     })
    //     .catch(error => handleHttpError(error))
    // },

    async createRepository(username, repository) { // POST /users/{username}/repositories
        return await httpInstance.post(`/users/${username}/repositories`, repository)
        .then(function (response) {
            // return response.data;

            return {
                rootFullName: 'rootFullName',
                "displayPath" : "/",
                "displayName" : "repos1",
                "displayFullName" : "/repos1",
                "description" : "some description1",
                "access_types" : ["R_GROUP_group1", "RW_GROUP_group2"],
                "owner" : "username1"
            };
        })
        .catch(error => handleHttpError(error))
    },

    // OK
    async addRepositoryAccessForGroup(rootFullName, readwrite, targetGroupname) { // PUT /access/{rootFullName}/add-access
        const access = {
            type: 'group',
            name: targetGroupname,
            access: readwrite
        };
        return await httpInstance.put(`/access/${rootFullName}/add-access`, access)
        .then(function (response) {
            return response.data;
        })
        .catch(error => handleHttpError(error))
    },

    // OK
    async removeRepositoryAccessForGroup(rootFullName, readwrite, targetGroupname) { // PUT /access/{readwrite}/remove-access
        const access = {
            type: 'group',
            name: targetGroupname,
            access: readwrite
        };
        return await httpInstance.put(`/access/${rootFullName}/remove-access`, access)
        .then(function (response) {
            return response.data;
        })
        .catch(error => handleHttpError(error))
    },

    // async setRepositoryAccess(username, id, accessTypes) { // PUT /users/{username}/repositories/{id}/access
    //     return await httpInstance.put(`/users/${username}/repositories/${id}/access`, {accessTypes})
    //     .then(function (response) {
    //         // return response.data;

    //         return {
    //             rootFullName: 'rootFullName',
    //             "displayPath" : "/",
    //             "displayName" : "repos1",
    //             "displayFullName" : "/repos1",
    //             "description" : "some description1",
    //             "access_types" : ["protected_rw", "public_r"],
    //             "owner" : "username1",
    //             "tags": ['tag1', 'tag2', 'tag5'],
    //         };
    //     })
    //     .catch(error => handleHttpError(error))
    // },

    // async setRepositoryAccessForUser(username, id, targetUsername, accessType) { // PUT /users/{username}/repositories/{id}/access/{username}
    //     return await httpInstance.put(`/users/${username}/repositories/${id}/access/${targetUsername}`, {accessType})
    //     .then(function (response) {
    //         return response.data;
    //     })
    //     .catch(error => handleHttpError(error))
    // },

    // GET /repositories?search=rep&username=usr1&tags=tag1,tag2,tag3&acs-tps=protected_rw,public_r&dateTime=2024-09-25T18-45Z&page=0&onlyroots=false&size=10&sort=name,asc
    async searchRepositories(search, username, page, size, tags, sort='displayName,asc') { // GET /repositories?search=rep&username=usr1&page=0&onlyroots=false&size=10&sort=name,asc
        const params = {
            search,
            username,
            page: page-1,
            size,
            sort,
        };

        if(tags?.length) {
            params.tags = tags
        }
        
        return await httpInstance.get('/repositories', {
            params: params
        })
        .then(function (response) {
            console.log(response)
            return response.data;

            // return {   
            //     content : [
            //         {
            //             rootFullName: 'rootFullName',
            //             "displayPath" : "/",
            //             "displayName" : "repos1",
            //             "displayFullName" : "/repos1",
            //             "description" : "some description1",
            //             "access_types" : ["R_GROUP_group1", "RW_GROUP_group2"],
            //             "owner" : "username1"
            //         },
            //         {
            //             rootFullName: 'rootFullName',
            //             "displayPath" : "/",
            //             "displayName" : "repos2",
            //             "displayFullName" : "/repos2",
            //             "description" : "some description2",
            //             "access_types" : ["R_GROUP_group1", "RW_GROUP_group2"],
            //             "owner" : "username1"
            //         }
            //     ],
            //     "page": 1,
            //     "size": 10,
            //     "sort": "username,acs",
            //     "totalSize": 15
            // };
        })
        .catch(error => handleHttpError(error)) 
    },

    // GET /users/{username}/repositories?search=rep&username=usr1&tags=tag1,tag2,tag3&dateTime=2024-09-25T18-45Z&page=0&onlyroots=false&size=10&sort=name,asc
    // async searchUserRepositories(username, search, page, size, tags, sort='displayName,asc') { // GET /users/{username}/repositories?search=rep&page=0&size=10&sort=name,asc
    //     // ?search=rep&page=0&size=10&sort=name,asc
    //     return await httpInstance.get(`/users/${username}/repositories`, {
    //         params: {
    //             search,
    //             page,
    //             size,
    //             tags,
    //             sort,
    //         }
    //     })
    //     .then(function (response) {
    //         // return response.data;

    //         return {   
    //             content : [
    //                 {
    //                     rootFullName: 'rootFullName',
    //                     "displayPath" : "/",
    //                     "displayName" : "repos1",
    //                     "displayFullName" : "/repos1",
    //                     "description" : "some description1",
    //                     "owner" : "username1",
    //                     "access_types" : ["protected_rw", "public_r"]
    //                 },
    //                 {
    //                     rootFullName: 'rootFullName',
    //                     "displayPath" : "/",
    //                     "displayName" : "repos2",
    //                     "displayFullName" : "/repos2",
    //                     "description" : "some description2",
    //                     "owner" : "username1",
    //                     "access_types" : ["protected_rw", "public_r"]
    //                 }
    //             ],
    //             "page": 1,
    //             "size": 10,
    //             "sort": "username,acs",
    //             "totalSize": 15
    //         };
    //     })
    //     .catch(error => handleHttpError(error)) 
    // },

    // OK
    async resourceAvailableForUser(rootFullName, readwrite, targetUsername) { // /access/{readwrite}/{rootFullName}/available/{username}
        return await httpInstance.delete(`/access/${readwrite}/${rootFullName}/available/${targetUsername}`)
        .then(function (response) {
            return response.data;
        })
        .catch(error => handleHttpError(error))
    },

    async deleteRepository(username, repositoryId) {
        return await httpInstance.delete(`/users/${username}/repositories/${repositoryId}`)
        .then(function (response) {
            return response;
        })
        .catch(error => handleHttpError(error))
    },
};

export default RepositoryService;