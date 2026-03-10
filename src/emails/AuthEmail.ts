import { transport } from "../config/nodemailer"

type EmailType = {
    nombre: string
    email: string
    token: string
}

export class AuthEmail {
    static enviarConfirmacionRegistro = async(usuario : EmailType) => {
        const email = await transport.sendMail({
            from: "PsicoAgenda <no-reply@PsicoAgenda.com>",
            to: usuario.email,
            subject: "PsicoAgenda - Confirma tu cuenta",
            html: `
            <h1>Hola ${usuario.nombre}! has creado tu cuenta en PsicoAgenda
            ya esta casi lista. </h1>
            <p>Visita el siguiente enlace para confirmar tu cuenta:</p>
            <a href="${process.env.FRONTEND_URL}/auth/confirm-account">Confirmar cuenta </a>
            <p>Ingresa el siguiente codigo: <b>${usuario.token}</b></p> 
            `
        })
        console.log("Email enviado: ", email.messageId)
    }

    static enviarRecuperacionCuenta = async(usuario : EmailType) => {
        const email = await transport.sendMail({
            from: "PsicoAgenda <no-reply@PsicoAgenda.com>",
            to: usuario.email,
            subject: "PsicoAgenda - Recuperación de contraseña",
            html: `
            <h1>Hola ${usuario.nombre}! has solicitado recuperar tu contraseña en PsicoAgenda</h1>
            <p>Visita el siguiente enlace para recuperar tu contraseña:</p>
            <a href="#">Recuperar contraseña </a>
            <p>Ingresa el siguiente codigo: <b>${usuario.token}</b></p> 
            `
        })
        console.log("Email enviado: ", email.messageId)
    }
}