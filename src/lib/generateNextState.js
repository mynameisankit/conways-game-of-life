import _ from 'lodash';
import getNeighbours from './getNeighbours';

function generateNextState(oldBoard) {
    const board = _.cloneDeep(oldBoard);

    for(let i in oldBoard) {
        for(let j in oldBoard[i]) {
            i = parseInt(i);
            j = parseInt(j);

            const neighbours = getNeighbours(oldBoard, i, j);
            if(neighbours <= 1 || neighbours >= 4) {
                board[i][j] = 0;
            }
            else if(neighbours === 3) {
                board[i][j] = 1;
            }
            else if(oldBoard[i][j] !== 0) {
                board[i][j] = 1;
            }
        }
    }

    return board;
}

export default generateNextState;