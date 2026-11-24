export const statusAutor = {
    aprovado: "aprovado",
    pendente: "pendente",
    reprovado: "reprovado"
}

export const statusAutorRegExp = new RegExp(Object.values(statusAutor).join("|"), "i");