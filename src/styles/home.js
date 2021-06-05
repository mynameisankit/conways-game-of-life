const styles = theme => ({
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
    },
    cell: {
        border: `1px solid ${theme.palette.primary.light}`,
        transition: theme.transitions.easing.easeInOut,
        boxSizing: 'border-box',
        '&:hover': {
            backgroundColor: theme.palette.primary.main,
            //TODO: Find a solution to remove setting this border
            border: `1px solid ${theme.palette.primary.main}`,
        },
    },
    blocked: {
        backgroundColor: theme.palette.primary.dark,
    },
    buttonWrapper: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: `${theme.spacing(2)}px 0px`,
        gap: theme.spacing(10),
    },
    button: {
        fontSize: '30px',
    },
});

export default styles;