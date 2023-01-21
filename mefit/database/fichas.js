const fs = require('fs')
const { promisify } = require('util')
const readFile = promisify(fs.readFile)
const writeFile = promisify(fs.writeFile)

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

const readFichasFile = async () => {
    try {
        const data = await readFile('./database/fichas.json', 'utf8')
        return data ? JSON.parse(data) : data
    } catch (err) {
        console.log('Something went wrong reading fichas.json file')
        console.log('Error:', err)
    }
}

const writeFichasFile = async (fichas) => {
    await writeFile('./database/fichas.json', JSON.stringify(fichas))
}

const getFichas = async () => {
    let fichas = await readFichasFile()
    if (fichas === '') {
        console.log('fichas is empty')
        fichas = makeFichas()
        await writeFichasFile(fichas)
    } else {
        console.log('fichas not empty')
    }

    return fichas
}

module.exports = getFichas