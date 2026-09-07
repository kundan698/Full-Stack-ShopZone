class RegisterApiModal {
    constructor(request) {
        this.request = request;
    }

    async registerUser(data) {

        const url = `${process.env.API_URL}/website/register-user/insert`;

        console.log("================================");
        console.log("API URL:", url);

        const response = await this.request.post(url, {
            data: {
                username: data.username,
                email: data.email,
                phone: data.phone,
                password: data.password,
                confirmPassword: data.confirmPassword
            }
        });

        console.log("STATUS:", response.status());
        console.log("RESPONSE:", await response.text());
        console.log("================================");

        return response;
    }

    async verifyuserOtp(data){
         const otpURL = `${process.env.API_URL}/website/register-user/verify-otp`
         const response = await this.request.post(otpURL,{
              data:{
                email:data.email,
                otp:data.otp
              }
         })
         console.log('user response ', response)
         console.log(otpURL)
         return response
    }
}

module.exports = { RegisterApiModal };