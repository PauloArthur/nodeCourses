
const makeFichas = () => [
    makeFicha('A', 'Peito', 'Aqui eh so peitola', 8),
    makeFicha('B', 'Perna', 'Peito e panturilha', 1),
    makeFicha('C', 'Costa', '', 8),
]

const makeFicha = (type, name, description, numeroExercicios) => ({
    type,
    name,
    description,
    exercicios: Array.apply(null, {length: numeroExercicios}).map(makeExercicio)
})

const makeExercicio = () => ({
    series: getRandomIntBetweenMinAndMax(3, 5),
    repeticoes: getRandomIntBetweenMinAndMax(8, 15)
})

const getRandomIntBetweenMinAndMax = (min = 0, max = Number.MAX_SAFE_INTEGER) =>{
    return min + Math.floor(Math.random() * (max - min));
}

module.exports = makeFichas