import { COLUMNS, DIRECTIONS, ROWS } from "../constants";

export const checkWinner = (board) => {
    // Dirección para las comprobaciones: [desplazamiento en filas, desplazamiento en columnas]
    function getIndex(row, col) {
        return row * COLUMNS + col;
    }

    // Función para comprobar 4 consecutivos en una dirección
    function checkDirection(startRow, startCol, player, direction) {
        const positions = [[startRow, startCol]]; // Guardar las posiciones ganadoras

        for (let step = 1; step < 4; step++) {
            const newRow = startRow + step * direction[0];
            const newCol = startCol + step * direction[1];

            // Verificar si está dentro del tablero y es del mismo jugador
            if (
                newRow >= 0 && newRow < ROWS &&
                newCol >= 0 && newCol < COLUMNS &&
                board[getIndex(newRow, newCol)] === player
            ) {
                positions.push([newRow, newCol]);
            } else {
                break; // No es consecutivo
            }
        }

        return positions.length === 4 ? positions : null; // Retornar si son 4 consecutivos
    }

    // Recorrer todo el tablero
    for (let row = 0; row < ROWS; row++) {
        for (let col = 0; col < COLUMNS; col++) {
            const player = board[getIndex(row, col)];
            if (!player) continue; // Saltar celdas vacías

            // Comprobar las 4 direcciones
            for (const direction of DIRECTIONS) {
                const winnerPositions = checkDirection(row, col, player, direction);
                if (winnerPositions) {
                    return player;
                }
            }
        }
    }

    return null;
}

export const checkEndGame = (board) => {
    return board.every((square) => square !== null)
}