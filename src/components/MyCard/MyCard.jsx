import React from 'react';
import { Card, Grid, CardContent, Typography } from '@material-ui/core';
import CountUp from 'react-countup';
import cx from 'classnames';

import styles from './MyCard.module.css';

const MyCard = ({ sentences, date, value, style }) => {
    return (
        <Grid item component={Card} xs={12} md={4} className={cx(styles.card, style)}>
            <CardContent>
                <Typography color="textSecondary" gutterBottom>{sentences.title}</Typography>
                <Typography variant='h5'>
                    <CountUp start={0} end={value} duration={2.5} separator="," />
                </Typography>
                <Typography color="textSecondary">{date}</Typography>
                <Typography variant="body2">{sentences.comment}</Typography>
            </CardContent>
        </Grid>
    );
};

export default MyCard;