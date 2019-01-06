// IMPORT PACKAGE REFERENCES

import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { FetchingSpinner } from '../shared/FetchingSpinner/FetchingSpinner';
import Typography from '@material-ui/core/Typography';

export const Header = () => (
    <AppBar position="static" color="default">
        <Toolbar>
            <Typography variant="h6" color="inherit">
                Linkener test
                <FetchingSpinner />
            </Typography>
        </Toolbar>
    </AppBar>
);
