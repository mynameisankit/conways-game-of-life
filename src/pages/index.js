import React from 'react';
import clsx from 'clsx';
import _ from 'lodash/array';
import Container from '@material-ui/core/Container';
import MuiGrid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import withStyles from '@material-ui/styles/withStyles';
import withTheme from '@material-ui/styles/withTheme';
//Simulation Logic
import generateNextState from '../lib/generateNextState';

import styles from '../styles/home';

class Home extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            grid: {
                board: [],
                rows: 0,
                cols: 0,
            },
            cell: {
                sideLength: 30,
            },
            isMouseClicked: false,
            isMouseInsideGrid: false,
            isSimulating: false,
            //isPaused: false,
            timer: null,
        };

        //Method Bindings
        this.handleResize = this.handleResize.bind(this);
        this.updateWalls = this.updateWalls.bind(this);
        this.updateGrid = this.updateGrid.bind(this);
        this.handleMouseState = this.handleMouseState.bind(this);
        this.handleIfMouseInsideGrid = this.handleIfMouseInsideGrid.bind(this);
        this.startSimulation = this.startSimulation.bind(this);
        this.resetBoard = this.resetBoard.bind(this);
        this.stopSimulation = this.stopSimulation.bind(this);
        this.pauseSimulation = this.pauseSimulation.bind(this);
    }

    componentDidMount() {
        window.addEventListener('resize', this.handleResize);
        this.handleResize();
    }

    componentWillUnmount() {
        this.stopSimulation();
    }

    handleResize() {
        const { innerWidth: screenWidth/*, innerHeight: screenHeight*/ } = window;
        const { sideLength } = this.state.cell;

        const rows = 20;//parseInt(screenHeight / sideLength);
        const cols = parseInt(screenWidth / sideLength);

        const board = Array(rows).fill(0).map(() => Array(cols).fill(0));

        this.setState({
            grid: {
                board, rows, cols,
            },
        });
    }

    updateWalls(point) {
        this.setState(state => ({
            walls: _.concat(state.walls, point),
        }));
    }

    updateGrid(event, row, col, override = false) {
        event.preventDefault();

        const { isMouseClicked, isSimulating } = this.state;

        if (!isSimulating && (isMouseClicked || override)) {
            const { board, ...rest } = this.state.grid;

            board[row][col] = !board[row][col];

            this.setState({
                board, ...rest
            });
        }
    }

    handleMouseState(event, state) {
        event.preventDefault();

        const { isMouseInsideGrid, isSimulating } = this.state;

        if (isMouseInsideGrid && !isSimulating) {
            if (state === 'down') {
                this.setState({ isMouseClicked: true });
            }
            else {
                this.setState({ isMouseClicked: false });
            }
        }
        else {
            this.setState({ isMouseClicked: false });
        }
    }

    handleIfMouseInsideGrid(event, state) {
        event.preventDefault();

        this.setState({
            isMouseInsideGrid: state,
            isMouseClicked: false,
        });
    }

    startSimulation() {
        const { isSimulating } = this.state;
        
        //Start simulation if not already simulating
        if (!isSimulating) {
            this.setState({
                isSimulating: true,
                //isPaused: false,
            });

            this.setState(() => ({
                timer: setInterval(() => {
                    this.setState(state => {
                        //const { isPaused } = state;

                        // if(!isPaused) {
                        return ({
                            grid: {
                                board: generateNextState(state.grid.board),
                                rows: state.grid.rows,
                                cols: state.grid.cols,
                            },
                        });
                        // }
                        // else {
                        //     return {};
                        // }
                    });
                }, 300),
            }));
        }
    }

    pauseSimulation(event) {
        event.preventDefault();

        this.setState(state => ({
            isSimulating: !state.isSimulating,
            //isPaused: !state.isPaused,
        }));
    }

    stopSimulation() {
        const { timer } = this.state;

        clearInterval(timer);

        this.setState({
            timer: null,
            isSimulating: false,
            //isPaused: false,
        });
    }

    resetBoard() {
        this.stopSimulation();

        this.setState({
            grid: {
                board: [],
                rows: 0,
                cols: 0,
            },
            cell: {
                sideLength: 30,
            },
            isMouseClicked: false,
            isSimulating: false,
        });

        this.handleResize();
    }

    render() {
        const { classes } = this.props;
        const { cell, grid/*, isSimulating */ } = this.state;
        const { board, rows, cols } = grid;
        const { sideLength } = cell;

        return (
            <Container maxWidth={false} className={classes.container}>
                <MuiGrid
                    container
                    spacing={0}
                    onMouseEnter={(event) => this.handleIfMouseInsideGrid(event, true)}
                    onMouseLeave={(event) => this.handleIfMouseInsideGrid(event, false)}
                >
                    {
                        Array(rows).fill(0).map((item, rowIdx) => (
                            <MuiGrid key={rowIdx} xs={12} item>
                                <Box
                                    display='flex'
                                    flexDirection='row'
                                >
                                    {
                                        Array(cols).fill(0).map((item, colIdx) => (
                                            <Box
                                                key={colIdx}
                                                width={sideLength}
                                                height={sideLength}
                                                className={clsx(classes.cell, {
                                                    [classes.blocked]: Boolean(board[rowIdx][colIdx]),
                                                })}
                                                onMouseDown={(event) => this.handleMouseState(event, 'down')}
                                                onMouseUp={(event) => this.handleMouseState(event, 'up')}
                                                onMouseOver={(event) => this.updateGrid(event, rowIdx, colIdx)}
                                                onClick={(event) => this.updateGrid(event, rowIdx, colIdx, true)}
                                            />
                                        ))
                                    }
                                </Box>
                            </MuiGrid>
                        ))
                    }
                </MuiGrid>
                <Box className={classes.buttonWrapper}>
                    {
                        [
                            // !isSimulating ? ({
                            //     text: 'Start',
                            //     onClickHandler: this.startSimulation,
                            // }) : ({
                            //     text: 'Stop (Pause)',
                            //     onClickHandler: this.pauseSimulation,
                            // }),
                            {
                                text: 'Start',
                                onClickHandler: this.startSimulation,
                            },
                            {
                                text: 'Reset',
                                onClickHandler: this.resetBoard,
                            }
                        ].map(button => (
                            <Button
                                key={button.text}
                                onClick={button.onClickHandler}
                                variant='contained'
                                color='primary'
                                className={classes.button}
                            >
                                {button.text}
                            </Button>
                        ))
                    }
                </Box>
            </Container>
        );
    }
}

export default withTheme(withStyles(styles)(Home));