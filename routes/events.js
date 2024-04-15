/**
 * Routes: Events
 * host + /api/events
 */
const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const { validateFields } = require("../middlewares/fieldValidator");
const { validateJWT } = require("../middlewares/jwtValidator");
const {
  getEvents,
  createEvent,
  updateEvent,
  deleteEvent,
} = require("../controllers/events");
const { isDate } = require("../helpers/isDate");

//* all requests after this must go through validateJWT
router.use(validateJWT);

//' get events
router.get("/", getEvents);

//' create new event
router.post(
  "/new",
  [
    check("title", "Title required").not().isEmpty(),
    check("start", "Start date required").custom(isDate),
    check("end", "End date required").custom(isDate),
    validateFields,
  ],
  createEvent
);

//' update event
router.put(
  "/:id",
  [
    check("title", "Title required").not().isEmpty(),
    check("start", "Start date required").custom(isDate),
    check("end", "End date required").custom(isDate),
    validateFields,
  ],
  updateEvent
);

//' delete event
router.delete("/:id", deleteEvent);

module.exports = router;
