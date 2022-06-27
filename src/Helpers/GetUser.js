
export const GetUser =  () => {
    const ans = JSON.parse(localStorage.getItem('user'))
    console.log(ans)
    return ans;
}