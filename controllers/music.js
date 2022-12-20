exports.getMusic = (req, res, next) => {
    res.status(200).json({
        posts: [{title: 'First Music Request', content: 'This will return information about an artist!'}]
    });
};