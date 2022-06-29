import Cookies from "js-cookie"

export const GetUser =  () => {
    if(!Cookies.get('auth')) return null;
    const ans = JSON.parse(localStorage.getItem('user'))
    console.log(ans)
    return ans;
}