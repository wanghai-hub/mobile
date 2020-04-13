// 封装模块，用于存贮token
const key = 'user-token'
export const setuser = (obj) =>{
   return localStorage.setItem(key,JSON.stringify(obj))
}
export const getuser = () =>{
    return JSON.parse(localStorage.getItem(key))
}
export const deluser = () =>{
    localStorage.removeItem(key)
}