import React from 'react';
import { Grid } from '@material-ui/core';

import styles from './Cards.module.css';
import sentences from './Sentences';
import DateFormatter from './DateFormatter';
import MyCard from '../MyCard/MyCard';

const Cards = ({ data: { confirmed, recovered, deaths, lastUpdate }, language, data1 }) => {
    if(!confirmed) {
        return 'Loading ...';
    }
    if(!data1) {
        return 'Loading ...';
    }

    const date = DateFormatter(language, lastUpdate);
    const translatedSentences = sentences[language];
    const value = {
        infectedTotal: data1.countries.global.confirmed,
        recovered: data1.countries.global.recovered,
        deaths: data1.countries.global.deaths,
        infectedCurrent: data1.countries.global.active,
    };

    return (
        <div className={styles.container}>
            <Grid container spacing={1} justify="center">
                {Object.keys(translatedSentences).map((key, i) => (
                    <MyCard key={i} sentences={ translatedSentences[key] } value={value[key]} date={data1.date} style={styles[key]} />  
                ))}
            </Grid>
        </div>
    );
}

export default Cards;