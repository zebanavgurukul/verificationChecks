const UserModel = require("../models/user");
const config = require("./config")
const client = require("twilio")(config.accountSID,config.authToken)

module.exports = {
    create : (req, res) => {
        let user = new UserModel ({
            First_Name : req.body.First_Name,
            Last_Name : req.body.Last_Name,
            email : req.body.email,
            password :req.body.password,
            phone_number : req.body.phone_number,
        });
        user.save()
            .then(result => {
                res.json({result});
            })
            .catch(err => {
                res.json({err});
            });
    },
    get : (req, res) => {
        const phone_number = req.body.phone_number;
        UserModel.findOne({phone_number})
        .then((person) => {
            var phone_number = person["phone_number"]
            client
                .verify
                .services(config.serviceID)
                .verifications
                .create({
                    to : `+${phone_number}`,
                    // channel : req.query.channel
                    channel : "sms"
                })
                .then(result => {
                    // res.json(result);
                    res.json('OTP sent');
                })
                .catch(err => {
                    res.json({err});
                });
        })
    },
    getverify : (req, res) => {
        var phone_number = req.body.phone_number
        UserModel.findOne({phone_number})
        .then((person) => {
        var phone = person["phone_number"]
        client
            .verify
            .services(config.serviceID)
            .verificationChecks
            .create({
                to : `+${phone}`,
                code : req.query.code
            })
            .then((result) => {
                var status = result["status"]
                if ("approved" == status){
                    res.json('..........login successful..........');
                }else{
                    res.json('OTP is wrong');
                }
            })
            .catch(err => {
                res.json({err});
            });
        })
    }
};