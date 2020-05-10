const sentences = {
    jpn: {
        confirmed: {
            title: '感染者数（累計）',
            comment: 'これまでにコロナに感染した累計人数',

        },
        recovered: {
            title: '回復者数',
            comment: 'これまでにコロナに感染し回復した人数',
        },
        deaths: {
            title: '死亡者数',
            comment: 'これまでにコロナに感染し死亡した人数',
        },
        active: {
            title: '感染者数（現在）',
            comment: '現在生存するコロナ感染者数',
        },
    },
    eng: {
        confirmed: {
            title: 'Infected',
            comment: 'Total number of infections of COVID-19',

        },
        recovered: {
            title: 'Recovered',
            comment: 'Number of recoveries from COVID-19',
        },
        deaths: {
            title: 'Deaths',
            comment: 'Number of deaths caused by COVID-19',
        },
        active: {
            title: 'Active',
            comment: 'Current number of living infections of COVID-19',
        },
    },
};

export default sentences;