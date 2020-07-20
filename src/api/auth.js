import jwtDecode from 'jwt-decode';
export const TOKEN = "token";


export function setToken(token){
localStorage.setItem(TOKEN,token);
}

export function getLocalToken(){
  return localStorage.getItem(TOKEN);
}

export function logout(){
     localStorage.removeItem(TOKEN);
     return console.log('Token eliminado');
  }

export function isUserLoger(setUser){
    const token = getLocalToken();

    if(!token){
        console.log('Token no existe');
        setUser(false)
        return;
    }
    if(isExpired (token)){
      logout();
      setUser(false)
      return;
    }
    console.log('Logeado');;
    getClaimsToken();
    setUser(true)
}

function isExpired(token) {
    const { exp } = jwtDecode(token);
    const expire = exp * 1000;
    const timeOut = expire - Date.now();

    if(timeOut < 0){
      return true
    }
    return false

}

function getClaimsToken() {
  const token = getLocalToken();

  const claims = jwtDecode(token);

  console.log(claims)
}