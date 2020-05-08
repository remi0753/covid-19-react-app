import React from 'react';
import { Grid } from '@material-ui/core';

import styles from './Cards.module.css';
import sentences from './Sentences';
import DateFormatter from './DateFormatter';
import MyCard from '../MyCard/MyCard';

const Cards = ({ data: { confirmed, recovered, deaths, lastUpdate }, language }) => {
    if(!confirmed) {
        return 'Loading ...';
    }

    const date = DateFormatter(language, lastUpdate);
    const translatedSentences = sentences[language];
    const value = {
        infectedTotal: confirmed,
        recovered,
        deaths,
        infectedCurrent: {
            value: confirmed.value - recovered.value - deaths.value,
        },
    };

    return (
        <div className={styles.container}>
            <Grid container spacing={1} justify="center">
                {Object.keys(translatedSentences).map((key, i) => (
                    <MyCard key={i} sentences={ translatedSentences[key] } value={value[key].value} date={date} style={styles[key]} />  
                ))}
            </Grid>
        </div>
    );
}

export default Cards;