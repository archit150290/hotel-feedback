const express = require("express");
const router = express.Router();
const feedbackService = require('./feedback.service');


router.post('/addfeedback', addFeedback);
router.get('/:whichpage/:itemsize', getAll);

module.exports = router;

function getAll(req, res, next) {
    feedbackService.getAll(req.params.whichpage, req.params.itemsize)
        .then(data => {
            res.json({ "data": data.data, "success": 1, "counter": data.counter, "message": "Feedback Data" });
        }).catch(err => {

        })

}

function addFeedback(req, res, next) {
    feedbackService.create(req.body)
        .then(() => res.json({ "success": 1, "msg": "Feedback added successfully" }))
        .catch(err => res.json({ "success": 0, "msg": err }))
}