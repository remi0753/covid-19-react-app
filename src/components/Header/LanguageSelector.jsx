import React, { useState } from 'react';
import { Button, Typography, Menu, MenuItem } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import LanguageIcon from '@material-ui/icons/Language';

const languageList = {
    jpn: '日本語',
    eng: 'ENGLISH',
};

const LanguageSelector = ({ language, handleChangeLanguage }) => {
    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = (lang) => {
        handleChangeLanguage(lang);
        setAnchorEl(null);
    };

    return (
        <div>
            <Button color="inherit" onClick={handleClick}>
                <LanguageIcon fontSize="large"/>
                <Typography variant="h6">{languageList[language]}</Typography>
                <ExpandMoreIcon fontSize="small"/>
            </Button>
            <Menu 
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={() => handleClose(language)}
                PaperProps={{
                    style: {
                        width: '180px',
                    },
                }}
            >
                {Object.keys(languageList).map((lang, i) => (
                    <MenuItem key={i} selected={lang === language} onClick={(e) => handleClose(lang)}>
                        {languageList[lang]}
                    </MenuItem>
                ))}
            </Menu>
        </div>
    );
};

export default LanguageSelector;