import type { Request, Response } from "express";
import Usuario from "../models/Usuario";
import { checkPassword, hashPassword } from "../utils/auth";
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
        await usuario.save()

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

        //Comprobar el password
        const passwordCorrecto = await checkPassword(password, usuario.password)
        if(!passwordCorrecto){
            const error = new Error('La contraseña es incorrecta')
            res.status(401).json({msg: error.message}) 
            return
        }
        res.send('Inicio de sesión exitoso')
        } catch (error) {
            res.status(500).json({msg: 'Error al iniciar sesión'})
        }
    }
}