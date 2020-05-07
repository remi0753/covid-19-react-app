import React from 'react';
import { AppBar, Toolbar, Typography } from '@material-ui/core';

import LanguageSelector from './LanguageSelector';
import styles from './Header.module.css';

const Header = ({ language, handleChangeLanguage }) => {
    const title = language === 'eng' ? 'COVID-19' : 'ころなぁ';
    return (
        <div className={styles.container}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" className={styles.title}>{title}</Typography>
                    <LanguageSelector language={language} handleChangeLanguage={handleChangeLanguage}/>
                </Toolbar>
            </AppBar>
        </div>
    );
};

export default Header;