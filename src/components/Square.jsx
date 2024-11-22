export const Square = ({ isRed = false, isYellow = false, updateBoard, color, index }) => {
    let className = `cell${isRed ? ' cell__red' : (isYellow ? ' cell__yellow' : '')}`;
    className += color ? ` cell__${color}` : ``;

    const handleClick = () => {
        if (index === undefined) return;
        console.log('hola:', index);
        updateBoard(index)
    }

    return (
        <div onClick={handleClick} className={className}></div>
    )
}