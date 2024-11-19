export const Square = ({ isRed = false, isYellow = false, updateBoard, color, index }) => {
    let className = `cell ${isRed ? 'cell__red' : (isYellow ? 'cell__yellow' : '')}`;
    className += ` cell__${color}`

    const handleClick = () => {
        if (index === undefined) return;
        updateBoard(index)
    }

    return (
        <div onClick={handleClick} className={className}></div>
    )
}