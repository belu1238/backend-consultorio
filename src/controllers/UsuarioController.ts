import type { Request, Response } from "express";
import Usuario from "../models/Usuario";

import { checkPassword, hashPassword } from "../utils/auth";
import { generateToken } from "../utils/token";
import { AuthEmail } from "../emails/AuthEmail";
import { generateJWT } from "../utils/jwt";
export class UsuarioController {
    static registrarUsuario = async(req: Request, res: Response) => {
        try{
        // primero consultar si el usuario ya existe
        const {email, password} = req.body
        const usuarioExistente = await Usuario.findOne({where: {email}})
        if(usuarioExistente){
            const error = new Error('El usuario ya existe')
            res.status(409).json({msg: error.message}) // 409 conflicto
            return
        }

        //segundo crear el usuario
        const usuario = new Usuario(req.body)
        usuario.password = await hashPassword(password)
        usuario.token = generateToken()
        await usuario.save()

        await AuthEmail.enviarConfirmacionRegistro({
            nombre: usuario.nombre,
            email: usuario.email,
            token: usuario.token
        })

        res.send('Usuario creado correctamente')
    } catch(error){
        res.status(500).json({msg: 'Error al crear el usuario'})
    }
    }

    static loginUsuario = async(req: Request, res: Response) => {
        try {
            const {email, password} = req.body
            const usuario = await Usuario.findOne({where: {email}})
        if(!usuario){
            const error = new Error('El usuario no existe')
            res.status(404).json({msg: error.message}) 
            return
        }

        // Comprobar si la cuenta está confirmada
        if(!usuario.confirmed){
            const error = new Error('La cuenta no está confirmada')
            res.status(403).json({msg: error.message}) 
            return
        }

        //Comprobar el password
        const contraseñaCorrecta = await checkPassword(password, usuario.password)
        if(!contraseñaCorrecta){
            const error = new Error('La contraseña es incorrecta')
            res.status(401).json({msg: error.message}) 
            return
        }

        const token = generateJWT(usuario.id)
        res.json(token)
        res.send('Inicio de sesión exitoso')
        } catch (error) {
            res.status(500).json({msg: 'Error al iniciar sesión'})
        }
    }

    static confirmarCuenta = async(req: Request, res: Response) => {
        const { token }= req.body
        
        //Buscar el token en la base de datos 
        const usuario = await Usuario.findOne({ where: {token} })
        
        if(!usuario){
            const error = new Error('Token no válido')
            return res.status(401).json({msg: error.message})
        }
        usuario.confirmed = true
        usuario.token = null  // para eliminar el token
        await usuario.save()

        res.json({msg: 'Cuenta confirmada correctamente'})
    }

    static recuperarContraseña = async(req: Request, res: Response) => {
        // Recibir el email del usuario
        const { email } = req.body
        const usuario = await Usuario.findOne({ where: {email} })

        // verifico si el usuario existe
        if(!usuario){
            const error = new Error('El usuario no existe')
            res.status(404).json({msg: error.message}) 
            return
        }

        // Generar un token de recuperación
        usuario.token = generateToken()
        await usuario.save()
        
        await AuthEmail.enviarRecuperacionCuenta({
            nombre: usuario.nombre,
            email: usuario.email,
            token: usuario.token 
        })
        res.send('Se ha enviado un email con las instrucciones para recuperar tu contraseña')
    }

    static validarToken = async(req: Request, res: Response) => {
        const {token} = req.body
        
        const tokenExistente = await Usuario.findOne({where: {token}})
        if(!tokenExistente){
            const error = new Error('Token no válido')
            return res.status(404).json({msg: error.message})
        }

        res.send('Codigo válido')
    }

    static resetearContraseña = async(req: Request, res: Response) => {
        const {token} = req.params
        const { password } = req.body
        
        const usuario = await Usuario.findOne({where: {token}})
        if(!usuario){
            const error = new Error('Token no válido')
            return res.status(404).json({msg: error.message})
        }

        // Asignar el nuevo password
        usuario.password = await hashPassword(password)
        usuario.token = null // eliminar el token
        await usuario.save()
        
        res.send('Contraseña cambiada correctamente')
    }

    static usuario = async(req: Request, res: Response) => {
        res.json(req.user)
    }

    //usuario ya autenticado
    static actualizarContraseña = async(req: Request, res: Response) => {
        const {actualPassword, password} = req.body
        // buscar el usuario 
        const { id } = req.user 
        const usuario = await Usuario.findByPk(id)

        const contraseñaCorrecta = await checkPassword(actualPassword, usuario.password)
        if(!contraseñaCorrecta){
            const error = new Error('La contraseña actual es incorrecta')
            return res.status(401).json({error: error.message})
        }

        // Actualizar la contraseña
        usuario.password = await hashPassword(password)
        await usuario.save()

        res.json({msg: 'Contraseña actualizada correctamente'})
    }
}