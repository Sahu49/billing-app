
const Invoice = require("../models/invoice")
const User = require("../models/user")
const nodemailer = require("nodemailer")
const dotenv = require("dotenv")
dotenv.config()
exports.makeInvoice = (req, res) => {
    const userId = req.body.storeId;
    const newInvoiace = new Invoice(req.body);
    newInvoiace.save((err, inv) => {
        if (err) {
            return res.status(400).json({
                error: "something went wrong"
            })
        }
        User.findByIdAndUpdate(userId,
            { $push: { invoices: inv._id } },
            (err, updatedUser) => {
                if (err) {
                    return res.status(400).json({
                        error: "unable to update user"
                    })
                }
                var transporter = nodemailer.createTransport({
                    service: "gmail",
                    auth: {
                        user: process.env.MAIL_ID,
                        pass: process.env.MAIL_PASSWORD,
                    },
                });

                var mailOptions = {
                    from: JSON.stringify(process.env.MAIL_ID),
                    to: JSON.stringify(req.body.customerDetails.email),
                    subject: `${req.body.storeDetails.name} invoice`,
                    html: `<h4>Dear ${req.body.customerDetails.name}! Thanks for visiting ${req.body.storeDetails.name}</h4>
                    /* <a href="http://localhost:3000/invoice/display/email/${inv._id}">click here ti see the invoice</a>*/
                    <a href="https://helpbiz.herokuapp.com/invoice/display/email/${inv._id}">click here ti see the invoice</a>
                    `
                };

                transporter.sendMail(mailOptions, function (error, info) {
                    if (error) {
                        // return res.status(400).json({
                        //   error:"not able to send email to verify"
                        // })
                        console.log("not able to send mail----------------------" + error);
                    } else {
                        console.log("Email sent: " + info.response);
                    }
                });
                return res.status(200).json(inv)
            }
        )
    })

}
exports.getInvoiceById = (req, res, next, id) => {
    Invoice.findById(id).exec((err, inv) => {
        if (err) {
            return res.status(400).json({
                error: "something went wrong"
            })
        }
        req.invoiceProfile = inv;
        next()
    })

}

exports.getInvoiceLink = (req, res) => {
    console.log("hiii" + req.invoiceProfile._id)
    return res.status(200).json(req.invoiceProfile)

}

//search invoice by prefix of email of customer 
exports.searchInvoiceByCustomersEmail = (req, res) => {
    const storeId = req.profile._id

    const emailPrefix = req.body.email
    // console.log("req profile " + storeId)
    let re = new RegExp(`^${emailPrefix}`);
    Invoice.find(
        {

            $and:
                [

                    { "customerDetails.email": re }

                ]


            // storeDetails:
            //     { id: storeId },
            // customerDetails: { email: { $regex: /^s/i } }
        }, (err, inv) => {
            if (err) {
                return res.status(400).json({
                    error: "No records found"
                })
            }
            let len = inv.length
            let reqInv = []
            for (let i = 0; i < len; i++) {
                if (inv[i].storeDetails.id == storeId)
                    reqInv.push(inv[i])
            }
            return res.status(200).json(reqInv)
        })
}

exports.getInvoicesByCustomerMail = (req, res) => {
    console.log(req.query.email)
    // res.status(200).json({ message: "Hello" })
    Invoice.find({ "customerDetails.email": req.query.email }, (err, data) => {
        if (err) {
            return res.status(404).json({ error: true, message: "something went wrong" })
        }
        return res.status(200).json({
            error: false,
            data
        })
    })
}