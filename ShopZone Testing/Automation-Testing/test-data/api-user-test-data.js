const generatePhone = () =>
  String(Math.floor(6000000000 + Math.random() * 4000000000));
const ApiUser = {
     userDetails:{
     username:'Kundan Kumar',
     email:`kundan1788775537866@gmail.com`,
     phone:generatePhone(),
     password:'Kundan@123',
     confirmPassword:'Kundan@123'
     }
}
module.exports = {ApiUser}