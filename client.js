const axios = require('axios');
const e = require('express');
const { exit } = require('process');

function RandomNumber(min, max) {  
    return Math.floor(
      Math.random() * (max - min + 1) + min
    )
}

var phone_number = '';

var otp_code = RandomNumber(100000, 999999);


if (!phone_number) {
    console.log('Number is required');
    exit();
}

let data = JSON.stringify({
  
    "number": phone_number,
    "message": "OTP is " + otp_code

});

let config = {
  
    method: 'post',
  
    maxBodyLength: Infinity,
    
    url: 'http://localhost:3000/send-message',
    
    headers: { 
        'Content-Type': 'application/json'
    },

    data : data
};

axios.request(config)
.then((response) => {

    console.log(JSON.stringify(response.data));

    const readline = require('readline').createInterface({
        input: process.stdin,
        output: process.stdout
      });
      
      readline.question('OTP Code: ', code => {
        
        if(code == otp_code){
    
            console.log('OTP Code Verified');
        }
        else{
            console.log('Invalid OTP Code');
        }
    
        readline.close();
      });

})
.catch((error) => {
    console.log(error);
});


