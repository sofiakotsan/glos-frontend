import { httpInstance } from "../http/httpInstance";
import { handleHttpError } from "../helpers/helpers";

const FileService = {
    async setFileAccess(username, repositoryId, filename, accessTypes) { // POST /users/{username}/repositories/{id}/files/{filename}/access/{username}
        return await httpInstance.put(`/users/${username}/repositories/${repositoryId}/files/${filename}/access/`, {accessTypes})
        .then(function (response) {
            // return response.data;

            return {
                id: 1,
                rootPath: 'rootPath',
                rootFilename: 'rootFilename',
                rootFullName: 'rootFullName',
                rootSize: 'rootSize',
                rootFormat: 'rootFormat',
                "displayPath" : "/dir1/dir2",
                "displayFilename" : "file.txt",
                "displayFullName" : "/dir1/dir2/file.txt",
                "tags": ["tag1", "tag2"],
                "accessTypes" : accessTypes,
            };
        })
        .catch(error => handleHttpError(error))
    },

    async setFileAccessForUser(username, repositoryId, filename, targetUsername, accessType) { // POST /users/{username}/repositories/{id}/files/{filename}/access/{username}
        return await httpInstance.put(`/users/${username}/repositories/${repositoryId}/files/${filename}/access/${targetUsername}`, {accessType})
        .then(function (response) {
            // return response.data;

            return {
                "user" : {
                    "username": "username1",
                    "email": "email1@mail.com",
                    "phoneNumber": "+380123456789",
                    "firstName" : "john1",
                    "lastName" : "doe1",
                    "gender" : "male",
                    "ISOBirthDate" : "1996.03.22"
                },
                "file" : 
                {
                    "displayPath" : "/dir1/dir2",
                    "displayFilename" : "file.txt",
                    "displayFullName" : "/dir1/dir2/file.txt",
                    "accessTypes" : ["protected_r"]              
                },
                "accessTypes" : [
                    "protected_r", "protected_rw"
                ]
            };
        })
        .catch(error => handleHttpError(error))
    },

    async getFile(username, filename) { // GET /users/{username}/files/{filename}/download
        return await httpInstance.get(`/users/${username}/files/${filename}/download`)
        .then(function (response) {
            // return response.data;

            return {
                "remote_path" : "/user/username/~/repository/filename.txt",
                "host_name" : "host.net",
                "username" : "username",
                "password" : "asdasg31w",
                "private_key" : "asdm29123"
            };
        })
        .catch(error => handleHttpError(error))
    },

    async downloadFile() {
        // will get info from getFile() and download file through SFTP
    },

    async getFileInfo(username, filename) { // GET /users/{username}/files/{filename}
        return await httpInstance.get(`/users/${username}/files/${filename}`)
        .then(function (response) {
            // return response.data;

            return {
                id: Math.floor(Math.random() * 100),
                rootPath: 'rootPath',
                rootFilename: 'rootFilename',
                rootFullName: 'rootFullName',
                rootSize: 'rootSize',
                rootFormat: 'rootFormat',
                "displayPath" : "/dir1/dir2",
                "displayFilename" : "file1.txt",
                "displayFullName" : "/dir1/dir2/file.txt",
                "tags": ["tag1", "tag2"],
                "accessTypes" : ["protected_r"],
            };
        })
        .catch(error => handleHttpError(error))
    },

    async getFileSharedToken(rootFullName) { // GET /shared/{rootFullName}
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

    async getFileSharedToken_OLD(username, filename) { // GET /users/{username}/files/{filename}/shared-token
        return await httpInstance.get(`/users/${username}/files/${filename}/shared-token`)
        .then(function (response) {
            //return response.data;

            return {
                token: 'dfdfgdfg',
                sharedUrl: 'dfdfgfdgdf',
            }
        })
        .catch(error => handleHttpError(error))
    },

    async uploadFile(username, filename, file) { // PUT /users/{username}/files/{filename}/upload
        // todo: also ask how can a file be uploaded if no filename exists yet
        // todo: filename param has different params in dto and api files
        // todo: ask if only one file is uploaded or multiple, api file shows one, dto file shows miltiple

        const formData = new FormData();
        formData.append('file', file);
        formData.append('filename', filename);

        return await httpInstance.post(`/users/${username}/files/${filename}/files/`, formData, 
        {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        .then(function (response) {
            return response.data;

            // return {
            //     "files" : [
            //         {
            //             "displayPath" : "/dir1/dir2",
            //             "displayFilename" : "file.txt",
            //             "displayFullName" : "/dir1/dir2/file1.txt",
            //             "accessTypes" : ["protected_r"]       
            //         },
            //         {
            //             "displayPath" : "/dir1/dir2",
            //             "displayFilename" : "file.txt",
            //             "displayFullName" : "/dir1/dir2/file2.txt",
            //             "accessTypes" : ["protected_r"] 
            //         }
            //     ]
            // };
        })
        .catch(error => handleHttpError(error))
    },

    async moveFile(username, filename, from, to) { // POST /users/{username}/files/{filename}/files/move
        return await httpInstance.post(`/users/${username}/files/${filename}/files/move`, {from, to})
        .then(function (response) {
            // return response.data;

            return {
                "new_path" : "/user/username/~/repository2/filename.txt"
            };
        })
        .catch(error => handleHttpError(error))
    },

    async deleteFile(username, id, filename) { // DELETE /users/{username}/files/{id}/file/{filename}
        return await httpInstance.delete(`/users/${username}/files/${id}/file/${filename}`)
        .then(function (response) {
            return response;
        })
        .catch(error => handleHttpError(error))
    },

    async searchFiles(search, username, page, size, tags, sort='displayFilename,asc') { // GET /repositories?search=rep&username=usr1&page=0&onlyroots=false&size=10&sort=name,asc
        return await httpInstance.get(`/users/${username}/files`, {
            params: {
                search,
                page,
                size,
                tags,
                sort,
            }
        })
        .then(function (response) {
            return response.data;

            // return {   
            //     content : [
            //         {
            //             id: 1,
            //             rootPath: 'rootPath',
            //             rootFilename: 'rootFilename',
            //             rootFullName: 'rootFullName',
            //             rootSize: 'rootSize',
            //             rootFormat: 'rootFormat',
            //             "displayPath" : "/dir1/dir2",
            //             "displayFilename" : "file.txt",
            //             "displayFullName" : "/dir1/dir2/file.txt",
            //             "tags": ["tag1", "tag2"],
            //             "accessTypes" : ["protected_r"],
            //         },
            //         {
            //             id: 2,
            //             rootPath: 'rootPath',
            //             rootFilename: 'rootFilename',
            //             rootFullName: 'rootFullName',
            //             rootSize: 'rootSize',
            //             rootFormat: 'rootFormat',
            //             "displayPath" : "/dir1/dir2",
            //             "displayFilename" : "file2.txt",
            //             "displayFullName" : "/dir1/dir2/file2.txt",
            //             "tags": ["tag1", "tag2"],
            //             "accessTypes" : ["protected_r"],
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
};

export default FileService;