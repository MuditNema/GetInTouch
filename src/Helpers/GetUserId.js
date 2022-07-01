import Cookies from "js-cookie"

export const GetUserId = () => {
    if(!Cookies.get('auth')) return null;
    const ans = JSON.parse(localStorage.getItem('UserId'))
    console.log(ans)
    return ans;
}