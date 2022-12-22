const getApodData = async () => {
    const res = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${process.env.NASA_API_KEY}`);
    const json = await res.json();
    return json;
};

const getMarsRoverData = async () => {
    const res = await fetch(`https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&api_key=${process.env.NASA_API_KEY}`);
    const json = await res.json();
    return json;
};

const getCMEAnalysisData = async () => {
    const res = await fetch(`https://api.nasa.gov/DONKI/CMEAnalysis?startDate=2016-09-01&endDate=2016-09-30&mostAccurateOnly=true&speed=500&halfAngle=30&catalog=ALL&api_key=${process.env.NASA_API_KEY}`);
    const json = await res.json();
    return json;
};

exports.getApod = (req, res, next) => {
    getApodData()
    .then(data => {
        console.log(data);
        res.status(200)
        .send(data);
    })
    .catch(error => {
        console.log(error);
    });
};

exports.getMarsRover = (req, res, next) => {
    getMarsRoverData()
    .then(data => {
        console.log(data.photos[0]);
        res.status(200)
        .send(data.photos[0]);
    })
    .catch(error => {
        console.log(error);
    });
};

exports.getCMEAnalysis = (req, res, next) => {
    getCMEAnalysisData()
    .then(data => {
        console.log(data);
        res.status(200)
        .send(data);
    })
    .catch(error => {
        console.log(error);
    });
};

exports.getImage = (req, res, next) => {
    res.status(200).json({
        posts: [{title: 'First Space Post', content: 'This will be a NASA image of the day!'}]
    });
};