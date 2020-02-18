import cookie from "cookie_js";

const adminToken = "admin_token";
const usernameKey = "username";
// getToken 获取token
export function getToken() {
    return cookie.get(adminToken)
}
// setToken
export function setToken(token) {
    return cookie.set(adminToken,token)
}
// removeToken 删除token
export function removeToken(token) {
    return cookie.remove(adminToken)
}
// removeToken 删除username
export function removeUserName() {
    return cookie.remove(usernameKey)
}
// setUserName
export function setUserName(value) {
    return cookie.set(usernameKey,value)
}

export function getUserName() {
    return cookie.get(usernameKey)
}
