const express = require('express');
const { Client } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

function RandomNumber(min, max) {  
    return Math.floor(
      Math.random() * (max - min + 1) + min
    )
}


const app = express();
app.use(express.json()); // Middleware to parse JSON requests

const client = new Client();

client.on('qr', qr => {
    qrcode.generate(qr, {small: true});
});

client.on('ready', () => {
    console.log('Client is ready!');
});

client.initialize();

app.post('/send-message', async (req, res) => {
    const { number, message } = req.body;

    if (!number || !message) {
        return res.status(400).send({ status: 'error', message: 'Number and message are required' });
    }

    try {
        const chatId = `${number}@c.us`;
        await client.sendMessage(chatId, message);
        res.send({ status: 'success', message: 'Message sent' });
    } catch (error) {
        res.status(500).send({ status: 'error', message: error.toString() });
    }
});


app.post('/send-otp', async (req, res) => {

    //Software developer may futher improve the source code by adding additional features

    var otp_code = RandomNumber(100000, 999999);

    var otp_message = "Your OTP Code is " + otp_code;

    console.log("OTP Code: " + otp_code);

    const { number, message = otp_message } = req.body;

    if (!number || !message) {
        return res.status(400).send({ status: 'error', message: 'Number and message are required' });
    }

    try {
        const chatId = `${number}@c.us`;
        await client.sendMessage(chatId, message);
        res.send({ status: 'success', message: 'Message sent' });
    } catch (error) {
        res.status(500).send({ status: 'error', message: error.toString() });
    }
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
