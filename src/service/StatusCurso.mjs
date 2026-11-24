export const statusCurso = {
    aprovado: "aprovado",
    pendente: "pendente",
    reprovado: "reprovado"
}

export const statusCursoRegExp = new RegExp(Object.values(statusCurso).join("|"), "i");