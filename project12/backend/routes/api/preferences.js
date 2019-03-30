const express = require('express');
const router = express.Router();
const Preference = require('../../models/preferences')

router.post('/addpreference', (req,res) => {
    const Pref = new Preference({
        cashondelivery : req.body.cashondelivery,
        cardondelivery : req.body.cardondelivery,
        onlinepayment : req.body.onlinepayment,
        gstbilling :req.body.gstbilling,
        minimumorderamount : req.body.minimumorderamount,
        deliverycharge : req.body.deliverycharge
    });

    Pref.save().then(pref => res.json(pref)).catch(err => console.log(err))
})

router.put('/changepreference', (req,res) => {
    Preference.findOneAndUpdate({}, {$set : req.body}, (err,pref) => {
        if(err) res.status(400).json(err);
        res.json(pref);
    })
})

module.exports = router;