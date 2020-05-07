const toJpnDateString = (date) => {
    const toJpnDay = (day) => {
        switch(day) {
            case 0:
                return '日';
            case 1:
                return '月';
            case 2:
                return '火';
            case 3:
                return '水';
            case 4:
                return '木';
            case 5:
                return '金';
            case 6:
                return '土';
            default:
                return 'error';
        }
    };
    
    const str = date.getFullYear()
        + '年' + ('0' + (date.getMonth() + 1)).slice(-2)
        + '月' + ('0' + date.getDate()).slice(-1)
        + '日(' + toJpnDay(date.getDay()) + ')';

    return str;
}

const DateFormatter = (lang, date) => {
    const drawDate = new Date(date);

    switch (lang) {
        case 'eng':
            return drawDate.toDateString();
        case 'jpn':
            return toJpnDateString(drawDate);
        default:
            return 'error';

    }
};

export default DateFormatter;