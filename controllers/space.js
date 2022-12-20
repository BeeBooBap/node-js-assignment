exports.getImage = (req, res, next) => {
    res.status(200).json({
        posts: [{title: 'First Space Post', content: 'This will be a NASA image of the day!'}]
    });
};