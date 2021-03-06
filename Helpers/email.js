import mailer from 'nodemailer';
import * as config from '../config';
import * as ejs from 'ejs';

const send = async (to, subject, msg, verifyObj) => {
    let mailOptions;
    new Promise(async (res, rej) => {

        let transporter = mailer.createTransport({
            service: 'gmail',
            host: 'smtp.gmail.com',
            port: 587,
            ignoreTLS: false,
            secure: false,
            auth: {
                user: "ilovecoding777@gmail.com",
                pass: "webprojects"
            }
        });

        if (verifyObj) {
            ejs.renderFile(__dirname + "/../view/email_verification.ejs", {user_firstname: verifyObj.user_firstname, confirm_link: verifyObj.confirm_link}, function (err, data) {
                if (err) {
                    console.log(err);
                } else {
                    mailOptions = {
                        from: process.env.SUPER_ADMIN_EMAIL,
                        to: to,
                        subject: subject,
                        html: data
                    };
                }
            })
        } else {
            mailOptions = {
                from: process.env.SUPER_ADMIN_EMAIL,
                to: to,
                subject: subject,
                html:
                    '<div>' +
                    '<div style="text-align: center; font-size:1.2rem">Hello from Techraise</div>' +
                    '<div style="text-align: center; font-size:1.2rem; margin-top:10px">' + subject + '</div>' +
                    '<div style="text-align: center; font-size:1.5rem;color: #ff0000; margin-top:10px">' + msg + '</div>' +
                    '</div>',
            };
        }

        transporter.sendMail(mailOptions, function(error, info){
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });
    })
    return subject;
}

export default send;



