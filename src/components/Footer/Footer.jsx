import React from 'react';
import { Container, Typography, Link } from '@material-ui/core';

import styles from './Footer.module.css';
import sentences from './Sentences';

const Copyright = () => {
    return (
        <Typography variant="body2" color="textSecondary">
            {'Copyright @ '}
            <Link color="inherit" href="https://github.com/remi0753/">
                Remi
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
};

const DataSources = () => {
    return (
        <Typography variant="body2" color="textSecondary">
            {'Data Source: '}
            <Link color="inherit" href="https://github.com/CSSEGISandData/COVID-19">
                Center for Systems Science and Engineering (CSSE) at Johns Hopkins University
            </Link>
            {'.'}
        </Typography>
    );
};

const SourceCode = () => {
    return (
        <Typography variant="body2" color="textSecondary">
            {'Source code of this page: '}
            <Link color="inherit" href="https://github.com/remi0753/covid-19-react-app">
                COVID-19 React App
            </Link>
            {'.'}
        </Typography>
    );
};

const Footer = ({ language }) => {
    const { title } = sentences[language];
    return (
        <footer className={styles.footer}>
            <Container maxWidth="sm">
                <Typography variant="body1">
                    {title}
                </Typography>
                <Copyright />
                <DataSources />
                <SourceCode />
            </Container>
        </footer>
    );
};

export default Footer;