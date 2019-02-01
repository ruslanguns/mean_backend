'use strict';
const nodemailer = require('nodemailer');
var email_from = require('./config/config').EMAIL_FROM;
var datos_smtp = require('./config/config').DATOS_SMTP;

var token = 123;
var cuerpo = '<b><br>Para restablecer tu contraseña, <br><br> <a href="http://localhost:4200/#/' + token + '">Haz click Aquí</a> <br><br> O ingresa el siguiente código: <br><div class="danger">' + token + ' </div> <br><br> y tu nueva contraseña en: http://localhost:4200/#/reset <br><br>  Gracias!  <br>  </b>';
// console.log(cuerpo);

nodemailer.createTestAccount((err, account) => {
    let transporter = nodemailer.createTransport(datos_smtp);
    let mailOptions = {
        from: '"No-reply 👻" <no-reply@mail-01.wificloud.es>', // sender address
        to: 'ruslanguns@gmail.com', // list of receivers
        subject: 'Hello ✔', // Subject line
        text: 'Hello world?', // plain text body
        html: cuerpo // html body
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
        // Preview only available when sending through an Ethereal account
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
        // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
    });
});