require('dotenv').config();
// console.log(process.env.SENDGRID_API_KEY);
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const msg = {
  to: 'duongvanthienbkhoa@gmail.com',
  from: 'duongvanthienbkhoa@gmail.com',
  subject: 'Sending with Twilio SendGrid is Fun',
  text: 'and easy to do anywhere, even with Node.js',
  html: '<strong>and easy to do anywhere, even with Node.js</strong>',
};
sgMail.send(msg).catch(function(error) { console.log(error) });