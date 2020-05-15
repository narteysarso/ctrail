const sanitizeHtml = require('sanitize-html');
const cuid = require('cuid');
const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const isValidEmail = require('is-valid-email');
const nodemailer = require('nodemailer');


const Id = Object.freeze({
  makeId: cuid,
  isValidId: cuid.isCuid
});

const validator = Object.freeze({
  isValidEmail: isValidEmail,
  isValidPhone: (phone) => typeof phone === 'string' && phone.match(/^\+?[0-9]{10,}$/)
})

async function makePasswordHash(password) {
  if(!password)
    throw new Error("No password set");
  return await bcrypt.hash(password, 10);
}

async function authenticate(password, passwordHash){
  return await bcrypt.compare(password, passwordHash);
}

function makeToken(details={}, expiresIn = "8h"){
  //Generate jwttoken
  const {email, id, phone, roleId} = details;
  if(!id)
    throw new Error("Token details must have an id");
  
  if(!roleId)
    throw new Error("Token details must have an role");

  if(!email && !phone)
    throw new Error("Token detials must have at least an email or a phone number");

  const token = jwt.sign({
      email,
      roleId,
      phone,
      id
    },
      process.env.JWT_KEY, {
        expiresIn: expiresIn
    }
  );

  return token
}

function makeRegistrationToken(details={}){
  //Generate jwttoken
  const {name, email, phone, roleId} = details;

  if(!roleId)
    throw new Error("Token details must have an role");

  if(!email && !phone)
    throw new Error("Token detials must have at least an email or a phone number");

  const token = jwt.sign({
    hash: md5(name + email + phone)
    },
      process.env.JWT_KEY, {
    }
  );

  return token
}

function verifyToken(authorizationHeader){
  //modify header
  if (!authorizationHeader) {
    const error = new Error("Not Authenticated");
    error.statusCode = 401;
    throw error;
  }
  const token = authorizationHeader.split(' ')[1];
  let verfiedToken
  try {
    verfiedToken = jwt.verify(token, process.env.JWT_KEY,);
  } catch (err) {
    err.statusCode = 401;
    throw err;
  }


  if (!verfiedToken) {
    const error = new Error("Not Authenticated");
    error.statusCode = 401;
    throw error;
  }

  return token;
}
function verifyExpiredToken(authorizationHeader){
  //modify header
  if (!authorizationHeader) {
    const error = new Error("Not Authenticated");
    error.statusCode = 401;
    throw error;
  }
  const token = authorizationHeader.split(' ')[1];
  let verfiedToken
  try {
    verfiedToken = jwt.verify(token, process.env.JWT_KEY,{ignoreExpiration:true});
  } catch (err) {
    err.statusCode = 401;
    throw err;
  }


  if (!verfiedToken) {
    const error = new Error("Not Authenticated");
    error.statusCode = 401;
    throw error;
  }

  return token;
}

function decodeToken(token = ""){
  return jwt.decode(token);
}

function sanitize(text) {
  // TODO: allow more coding embeds
  return sanitizeHtml(text, {
    allowedIframeHostnames: ['codesandbox.io', 'repl.it']
  })
}

function md5(text) {
  return crypto
    .createHash('md5')
    .update(text, 'utf-8')
    .digest('hex')
}

function extractUSSDCodeFromPhoneNumber(phone){
  if(!validator.isValidPhone(phone)){
    return null
  };
  return phone.substr(-5);
}

const ROLES = Object.freeze({
  ADMIN: "Jg59qTKwpkyD9b02sg085A",
  CLERK: "ck8pm36hy000301jwfro1duse",
  OWNER: "ck8olxgkf000501m988wg51j0",
  SUPERVISOR: "ck8olw0bj000101m98jy529xh",
  USER: "n7XtEg0aNEW_km3FvnvhDg",
  CLIENT: "ck9dl2oc0000101l37adj4q05",
});

function verifyPermission(userRole){
  if (userRole != ROLES.ADMIN && userRole != ROLES.OWNER && userRole != ROLES.SUPERVISOR) {
    const error = new Error("Permission revoked. Unauthorized");
    error.status7890Code = 401;
    throw error;
  }
}

function verifyPointPermission({userRole, userId, pointAuthor}){
  if ((userRole != ROLES.ADMIN && userRole != ROLES.OWNER && userRole != ROLES.SUPERVISOR) && (userRole === ROLES.CLIENT && userId !== pointAuthor)  ){
    const error = new Error("Permission revoked. Unauthorized");
    error.statusCode = 401;
    throw error;
  }
}
function verifyServicePermission({userRole, userId, serviceAuthor}){
  if ((userRole != ROLES.ADMIN && userRole != ROLES.OWNER && userRole != ROLES.SUPERVISOR) && (userRole === ROLES.CLIENT && userId !== serviceAuthor)  ){
    const error = new Error("Permission revoked. Unauthorized");
    error.statusCode = 401;
    throw error;
  }
}

function getRoleKey(roleId) {
  for (let key in ROLES) {
    if (ROLES[key] === roleId)
      return key;
  }
}

// async..await is not allowed in global scope, must use a wrapper
async function mail({from="",to, subject="",text="",html=""}) {

  try {
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      
      service: 'gmail',
      
      auth: {
        user: `${process.env.MAIL_USERNAME}`, // generated ethereal user
        pass: `${process.env.MAIL_PASSWORD}` // generated ethereal password
      }

    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
      from,
      to,
      subject,
      text,
      html
    })

    console.log("Message sent: %s", info.messageId);
  } catch (error) {
    error.statusCode = error.statusCode || 500;
    throw error;
  }
}

module.exports = {
  sanitize,
  Id,
  ROLES,
  verifyPermission,
  verifyPointPermission,
  verifyServicePermission,
  makePasswordHash,
  makeRegistrationToken,
  validator,
  extractUSSDCodeFromPhoneNumber,
  mail,
  getRoleKey,
  makeToken,
  verifyToken,
  verifyExpiredToken,
  authenticate,
  decodeToken
}



