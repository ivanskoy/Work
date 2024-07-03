const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
    host: 'smtp.yandex.com',
    port: 465, // Используйте 587 для TLS
    secure: true, // true для порта 465, false для других портов
    auth: {
        user: 'email', // Замените на ваш адрес Яндекса
        pass: 'password' // Замените на ваш пароль от Яндекса
    }
});       

const mailOptions = {
    from: '"Test" <IvanskoiVO@yandex.ru>', // sender address
    // to: "IvanskoyVO@yandex.ru", // list of receivers
    to: "ivanskoy.fortech@gmail.com", // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Hello world?", // plain text body
    html: "<b>Hello</b>", // html body
};

transporter.sendMail(mailOptions, function(error, info){
    if (error) {
        console.log(error);
    } else {
        console.log('Email sent: ' + info.response);
    }
});