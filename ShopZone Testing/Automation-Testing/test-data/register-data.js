
const generatePhone = () =>
  String(Math.floor(6000000000 + Math.random() * 4000000000));
const registerData = {
    validuser: {
        username: `Kundan${Date.now()}`,
        email: `test${Date.now()}@gmail.com`,
       phone: generatePhone(),
        password: "Kundan@123",
        confirmPassword: "Kundan@123"
        
    }
};
const userLogin_Data = {
      validId:{
         userId:'patelkundan9693@gmail.com',
         userPassword : 'Kundan@123'
      }
}

module.exports = { registerData, userLogin_Data };