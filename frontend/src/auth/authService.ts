// authService.js
// import jwt_decode from 'jsonwebtoken';

export const login = (token: string) => {
    localStorage.setItem('token', token);
};

export const logout = () => {
    localStorage.removeItem('token');
};

export const getToken = () => {
    return localStorage.getItem('token');
};

export const isAuthenticated = () => {
    const token = getToken();
    return token !== null;
};

// export const getUserInfo = () => {
//     const token = getToken();
//     return jwt_decode(token);
// };
