class LoginApiModalPage {
    constructor(request) {
         this.request = request
    }
    async loginApi_user(data){
          const login_URL = `${process.env.API_URL}/website/register-user/user-login`
           const response = await this.request.post(login_URL,{
            data:{
               email:data.email,
               password:data.password 
            }
           })
           console.log('login response', response)
           console.log('url test automation', login_URL)
           return response
    }
}

module.exports = {LoginApiModalPage}