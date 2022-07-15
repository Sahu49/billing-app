const router = require("express").Router()
const { isAuthenticated, isSignedIn } = require("../controllers/auth")
const { makeInvoice, getInvoiceById, getInvoiceLink, searchInvoiceByCustomersEmail, getInvoicesByCustomerMail } = require("../controllers/invoice")
const { getUserById } = require("../controllers/user")

router.param("userId", getUserById)
router.param("invoiceId", getInvoiceById)

router.post("/add/:userId", isAuthenticated, isSignedIn, makeInvoice)
router.get("/email/:invoiceId", getInvoiceLink)
router.post("/search/by/email/:userId", isAuthenticated, isSignedIn, searchInvoiceByCustomersEmail)
router.get("/customer/byemail", getInvoicesByCustomerMail)

module.exports = router