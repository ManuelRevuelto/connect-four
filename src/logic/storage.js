export function saveGameToStorage ({ board, turn }) {
    // guardar aqui partida en el storage
    window.localStorage.setItem('board', JSON.stringify(board))
    window.localStorage.setItem('turn', turn)
}
export function resetGameStorage() {
    // eliminar datos de la partida del storage
    window.localStorage.removeItem('board')
    window.localStorage.removeItem('turn')
}