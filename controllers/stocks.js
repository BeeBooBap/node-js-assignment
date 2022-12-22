const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': `${process.env.RAPID_API_KEY}`,
        'X-RapidAPI-Host': 'yh-finance.p.rapidapi.com'
    }
};

const getTimeSeriesData = async () => {
    const res = await fetch(`https://yh-finance.p.rapidapi.com/stock/v2/get-summary?symbol=AMRN&region=US`, options);
    const json = await res.json();
    return json;
};

exports.getTimeSeries = (req, res, next) => {
    getTimeSeriesData()
    .then(data => {
        console.log(data.financialData);
        res.status(200)
        .send(data);
    })
    .catch(error => {
        console.log(error);
        res.status(400);
    })
};