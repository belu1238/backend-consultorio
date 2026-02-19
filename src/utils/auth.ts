import bcrypt from 'bcrypt'

export const hashPassword = async (password: string) => {
    const salt = await bcrypt.genSalt(10)  // 10 es la cantidad de rondas que se aplican para generar el hash, mientras más alto el número, más seguro pero también más lento
    return await bcrypt.hash(password, salt)
}

export const checkPassword = async (enteredPassword: string, hash: string) => {
    return await bcrypt.compare(enteredPassword, hash)

}