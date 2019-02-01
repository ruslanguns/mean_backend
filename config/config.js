module.exports.SEED = 'este-es-un-seed-dificil';

let from_name = `"No-reply 👻 " `;
let from_email = '<no-reply@mail-01.wificloud.es>';

module.exports.EMAIL_FROM = from_name + from_email;


module.exports.DATOS_SMTP = {
    host: 'mail-01.wificloud.es',
    port: 25,
    secure: false, // true for 465, false for other ports
    auth: {
        user: 'no-reply', // generated ethereal user
        pass: '$%t6`=EU3JrP$R+5' // generated ethereal password
    }
};

// Google
// module.exports.CLIENT_ID = '906401042227-9nuk8m0olvrtmhvq00c2d39igkepmjpq.apps.googleusercontent.com';
module.exports.GOOGLE_CLIENT_ID = '906401042227-9nuk8m0olvrtmhvq00c2d39igkepmjpq.apps.googleusercontent.com';
module.exports.GOOGLE_SECRET = 'bCqDlA-3aXi7viJ1dzcMii3u';