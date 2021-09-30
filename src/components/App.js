import React, {useState} from 'react';
import {AppBar, CssBaseline, Drawer, Hidden, IconButton, Switch as MuiSwitch, Toolbar} from '@material-ui/core';
// import { useTheme } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import {AnimatePresence} from 'framer-motion';
import {createMuiTheme, ThemeProvider} from '@material-ui/core/styles';
import {BsMoon} from 'react-icons/bs';
import {FaSun} from 'react-icons/fa';
import {useDispatch, useSelector} from 'react-redux';
import {MovieInfo, Movies, Search, Sidebar} from '.';
// import MovieInfo from './Movies/MovieInformation/MovieInformation.js';
import useStyles from './AppStyles';
import {toggleMode} from '../actions';

const App = ({container}) => {
    // const [isDarkMode, setIsDarkMode] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const {isDarkMode} = useSelector((state) => state.config);
    const dispatch = useDispatch();

    // console.log(isDarkMode);

    const classes = useStyles();

    const theme = React.useMemo(
        () => createMuiTheme({
            palette: {
                type: isDarkMode ? 'dark' : 'light',
                background: {
                    default: isDarkMode ? '#242526' : '#FFFFFF',
                },
            },
        }),
        [isDarkMode],
    );

    return (
        <BrowserRouter>
            <ThemeProvider theme={theme}>
                <div className={classes.root}>
                    <CssBaseline/>
                    <AppBar position="fixed" className={classes.appBar}>
                        <Toolbar className={classes.toolbar}>
                            <IconButton color="inherit" aria-label="open drawer" edge="start"
                                        onClick={() => setMobileOpen(!mobileOpen)} className={classes.menuButton}>
                                <MenuIcon/>
                            </IconButton>

                            <Search/>
                            <FaSun/>

                            <MuiSwitch size="small" color="default" checked={isDarkMode}
                                       onChange={() => dispatch(toggleMode())}/>
                            <BsMoon/>
                        </Toolbar>
                    </AppBar>
                    <nav className={classes.drawer} aria-label="mailbox folders">
                        <Hidden smUp implementation="css">
                            <Drawer container={container} variant="temporary"
                                    anchor={theme.direction === 'rtl' ? 'right' : 'left'} open={mobileOpen}
                                    onClose={() => setMobileOpen(!mobileOpen)} classes={{paper: classes.drawerPaper}}
                                    ModalProps={{keepMounted: true}}>
                                {/* <div className={classes.toolbar} /> */}
                                <Sidebar/>
                            </Drawer>
                        </Hidden>
                        <Hidden xsDown implementation="css">
                            <Drawer classes={{paper: classes.drawerPaper}} variant="permanent" open>
                                {/* <div className={classes.toolbar} /> */}
                                <Sidebar/>
                            </Drawer>
                        </Hidden>
                    </nav>
                    <main className={classes.content}>
                        <div className={classes.toolbar}/>
                        <AnimatePresence>
                            <Switch>
                                <Route exact path="/movie">
                                    <MovieInfo/>
                                </Route>
                                <Route exact path="/">
                                    <Movies/>
                                </Route>
                            </Switch>
                        </AnimatePresence>
                    </main>
                </div>
            </ThemeProvider>
        </BrowserRouter>
    );
};

export default App;
