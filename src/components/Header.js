import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
}));

export default function ButtonAppBar() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <AppBar style={{
                backgroundColor: 'dodgerblue',
            }} position="static">
                <Toolbar>
                    <Typography variant="h6" className={classes.title}>
                        <center>
                            Covid-19 Tracker
                        </center>
                    </Typography>
                </Toolbar>
            </AppBar>
        </div>
    );
}