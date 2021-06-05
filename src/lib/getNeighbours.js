function isValidCell(m, n, row, col) {
    let flag = true;

    if(!(row >= 0 && row < m)) {
        flag &= false;
    }

    if(!(col >= 0 && col < n)) {
        flag &= false;
    }

    return flag;
}

function getNeighbours(board, row, col) {
    let count = 0;
    
    for(let i = -1; i <= 1; i++) {
        for(let j = -1; j <= 1; j++) {
            const neighbourRowIdx = row + i;
            const neighbourColIdx = col + j;

            if(i === 0 & j === 0) continue;

            if(isValidCell(board.length, board[row].length, neighbourRowIdx, neighbourColIdx)) {
                count += board[neighbourRowIdx][neighbourColIdx];
            }
        }
    }

    return count;
}

export default getNeighbours;