import React, { useEffect, useState } from 'react';
import { fetchDailyData } from '../../api'; 
import { Line, Bar } from 'react-chartjs-2';

import styles from './Chart.module.css';
import sentences from './Sentences';

const Chart = ({ data: { confirmed, recovered, deaths }, country: { country, draw }, language }) => {
    const [dailyData, setDailyData] = useState([]);

    useEffect(() => {
        const fetchAPI = async () => {
            setDailyData(await fetchDailyData());
        };

        fetchAPI();
    }, []);

    const drawSentences = sentences[language];

    const lineChart = (
        dailyData.length ? (
            <Line 
                data={{
                    labels: dailyData.map(({ date }) => date),
                    datasets: [{
                        data: dailyData.map(({ confirmed }) => confirmed),
                        label: drawSentences.Infected,
                        borderColor: '#3333ff',
                        fill: true,
                    }, {
                        data: dailyData.map(({ deaths }) => deaths),
                        label: drawSentences.Deaths,
                        borderColor: 'red',
                        backgroundColor: 'rgba(255, 0, 0, 0.5)',
                        fill: true,
                    }],
                }}
            />
        ) : null
    );

    const barChart = (
        confirmed ? (
            <Bar 
                data={{
                    labels: [drawSentences.Infected, drawSentences.Recovered, drawSentences.Deaths],
                    datasets: [{
                        label: 'People',
                        backgroundColor: [
                            'rgba(0, 0, 255, 0.5)', 
                            'rgba(0, 255, 0, 0.5)', 
                            'rgba(255, 0, 0, 0.5)',
                        ],
                        data: [confirmed.value, recovered.value, deaths.value],
                    }],
                }}
                options={{
                    legend: { display: false },
                    title: { display: true, text: draw },
                }}
            />
        ) : null
    );

    return (
        <div className={styles.container}>
            {country ? barChart : lineChart}
        </div>
    );
}

export default Chart;