import { useState } from "react"
import { Square } from "./components/Square"
import { COLUMNS, ROWS, TURNS } from "./constants"
import { checkEndGame, checkWinner } from "./logic/board"
import { WinnerModal } from "./components/WinnerModal"
import { resetGameStorage, saveGameToStorage } from "./logic/storage"


export function App() {
    const cells = COLUMNS * ROWS
    
    const [board, setBoard] = useState(() => {
        const boardFromStorage = window.localStorage.getItem('board')
        return boardFromStorage ? JSON.parse(boardFromStorage) : Array(cells).fill(null)
    })

    const [turn, setTurn] = useState(() => {
        const turnFromStorage = window.localStorage.getItem('turn')
        return turnFromStorage ? turnFromStorage : TURNS.RED
    })

    const [winner, setWinner] = useState(null)

    const updateBoard = (index) => {

        const clickedColumn = index % 7;
        const columnIndices = board
            .map((_, index) => index) // Obtener todos los índices
            .filter(index => index % 7 === clickedColumn); // Filtrar los que pertenecen a la columna clicada

        // Encontrar el índice más alto vacío
        const emptyIndex = columnIndices.reverse().find(index => board[index] === null);

        if (emptyIndex === undefined || winner) return

        const newBoard = [...board]
        newBoard[emptyIndex] = turn
        setBoard(newBoard)

        const newTurn = turn === TURNS.RED ? TURNS.YELLOW : TURNS.RED
        setTurn(newTurn)

        saveGameToStorage({
            board: newBoard,
            turn: newTurn
        })

        const newWinner = checkWinner(newBoard)
        if (newWinner) {
            console.log(newWinner)
            setWinner(newWinner)
        } else if (checkEndGame(newBoard)) {
            setWinner(false)
        }
    }

    const resetGame = () => {
        setBoard(Array(cells).fill(null))
        setTurn(TURNS.RED)
        setWinner(null)

        resetGameStorage()
    }

    return (
        <main className='board'>
            <h1>Connect 4</h1>
            <section className='game'>
                {
                    board.map((square, index) => {
                        return (
                            <Square key={index} index={index} updateBoard={updateBoard} color={square}></Square>
                        )
                    })
                }
            </section>

            <section className='turn'>
                <Square isRed={turn === TURNS.RED}></Square>
                <Square isYellow={turn === TURNS.YELLOW}></Square>
            </section>

            <WinnerModal resetGame={resetGame} winner={winner} />
        </main>
    )
}