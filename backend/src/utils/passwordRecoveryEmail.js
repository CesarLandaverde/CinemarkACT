
import nodemailer from 'nodemailer';
import { config } from '../config.js';


const transporter = nodemailer.createTransport({
 host: "smtp.gmail.com",
  port: 465,
  secure: true, 
  auth: {
    user: config.emailUser.user_email, 
    pass: config.emailUser.user_pass,}

},)

const sendEmail = async ({ email, subject, text, html }) => {
  
if (!email) {
    throw new Error("No se definió el destinatario (email)");
  }

  try {
    const info =await transporter.sendMail({
from:'"Cinemark Equipo <ignissoftwaredevelopers@gmail.com>"',
to:email,
subject,
text,
html,

    });
    return info
  } catch (error) {
    console.error("Error enviando correo:",error);
    throw error;
  }
};

const HTMLRecoveryEmail = (code) => `
  <div style="font-family: Arial, sans-serif; padding: 20px;">
    <h2>Código de recuperación de contraseña</h2>
    <p>Tu código de verificación es:</p>
    <div style="font-size: 2em; font-weight: bold; color:rgb(255, 0, 0); margin: 20px 0;">
      ${code}
    </div>
    <p>Este código es válido por 10 minutos.</p>
    <p>Si no solicitaste este código, puedes ignorar este correo.</p>
    <br>
    <small>Equipo CINEMARK</small>
  </div>
`;


export {sendEmail, HTMLRecoveryEmail};