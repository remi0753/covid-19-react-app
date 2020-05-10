import React from 'react';
import { Grid } from '@material-ui/core';

import styles from './Cards.module.css';
import sentences from './Sentences';
import DateFormatter from './DateFormatter';
import MyCard from '../MyCard/MyCard';

const Cards = ({ language, data: { countries, date }, country }) => {
    if (!countries) {
        return 'Loading ...';
    }

    const displayDate = DateFormatter(language, date);
    const translatedSentences = sentences[language];
    const { confirmed, recovered, deaths, active } = countries[country];
    const value = { confirmed, recovered, deaths, active };

    return (
        <div className={styles.container}>
            <Grid container spacing={1} justify="center">
                {Object.keys(translatedSentences).map((key, i) => (
                    <MyCard key={i} sentences={ translatedSentences[key] } value={value[key]} date={displayDate} style={styles[key]} />  
                ))}
            </Grid>
        </div>
    );
}

export default Cards;