import axios from "axios";

// const BASE_URL = 'http://localhost:3001/';
const BASE_URL = 'https://13.49.157.164:9002/api/';

export function createAxiosClient(
    options,
    getCurrentAccessToken,
    getCurrentRefreshToken,
    refreshTokenUrl,
    logout,
    setRefreshedTokens,
) {
    const client = axios.create(options);
    console.log(options)

    client.interceptors.request.use(
        (config) => {
            if (config.authorization !== false) {
                // const token = getCurrentAccessToken();
                const token = localStorage.getItem("glosAccessToken");;
                if (token) {
                    config.headers.Authorization = "Bearer " + token;
                }
            }
            return config;
        },
        (error) => {
            return Promise.reject(error);
        }
    );

    return client;

}

function getAccessToken() {
    return localStorage.getItem("glosAccessToken");
}

export const httpInstanceNoAuth = axios.create({
    baseURL : BASE_URL,
    headers: {
        'Content-Type': "application/json",
    }
});

export const httpInstance = createAxiosClient({
    baseURL: BASE_URL,
    headers: {
        // 'Authorization': `eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0ZXN0dXNlciIsInJvbGVzIjpbIlJPTEVfVVNFUiJdLCJpYXQiOjE3MTczNzg3MTksImV4cCI6MTcxNzM4MjMxOX0.UL85hpB3Efct_xWNMzbl78qeOyjMoUivk2Y2lwX_Kzk1jEwV8pJ7Tdbv7u8ic4Gu7zBW0FE2oNrGDWVh-0W21g`,
        'Content-Type': "application/json",
    },
    // timeout: 100000,
    // withCredentials: true,
}, getAccessToken);

// export const httpInstanceWithAuth = axios.create({
// export const httpInstance = axios.create({
//     baseURL: BASE_URL,
//     headers: {
//         'Authorization': `eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0ZXN0dXNlciIsInJvbGVzIjpbIlJPTEVfVVNFUiJdLCJpYXQiOjE3MTczNzg3MTksImV4cCI6MTcxNzM4MjMxOX0.UL85hpB3Efct_xWNMzbl78qeOyjMoUivk2Y2lwX_Kzk1jEwV8pJ7Tdbv7u8ic4Gu7zBW0FE2oNrGDWVh-0W21g`,
//         'Content-Type': "application/json",
//     },
//     withCredentials: true,
// });