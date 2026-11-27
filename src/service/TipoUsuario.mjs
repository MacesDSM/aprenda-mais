export const tipoUsuario = {
    estudante: "estudante",
    autor: "autor",
    admin: "admin"
}

export const tipoUsuarioRegExp = new RegExp(Object.values(tipoUsuario).join("|"), "i");

export const validateTipoUsuario = {
    estudante: /estudante/i,
    autor: /autor/i,
    admin: /admin/i
}