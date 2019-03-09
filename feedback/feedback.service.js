const db = require('_helpers/db');
const Feedback = db.Feedback;

module.exports = {
    getAll,
    create
};

function getAll(whichpage, itemsize) {

    return new Promise(function (res, rej) {
        let skipper = itemsize * (whichpage - 1);
        whichpage = parseInt(whichpage);
        skipper = parseInt(skipper);
        itemsize = parseInt(itemsize);
        Feedback.find().skip(skipper).limit(itemsize).sort({"_id" : -1}).then(function (data) {
            Feedback.estimatedDocumentCount({}, function (err, noofdocs) {
                res({ "data": data, "counter": noofdocs });
            });
        });

    });

    // var results = {};
    // var feedbacks = await Feedback.find();
    // var counter = 0;

    // // Feedback.estimatedDocumentCount({}, async function (err, noofdocs) {
    // //     return await noofdocs;
    // // });
    // // console.log(counter);
    // return feedbacks;
}

async function create(feedbackParam) {
    const feedback = new Feedback(feedbackParam);
    await feedback.save();
}

