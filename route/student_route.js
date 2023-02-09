const route = require("express").Router();
const {SUCCESS} = require("../api_response");
const controller = require("../controller/student/student_controller");
const validator = require("../controller/student/student_validation");
const config = require("config");
const ELEMENTS_PER_PAGE = config.get("ELEMENTS_PER_PAGE");
{
  /**
   * @swagger
   * /student/create:
   *  post:
   *      summary:
   *      tags:
   *          - student
   *      consumes:
   *          - application/json
   *      parameters:
   *              -   in: body
   *                  name: body
   *                  required: true
   *                  schema:
   *                      type: object
   *                      required:
   *                          - name
   *                          - email
   *                          - phone
   *                          - class
   *                      properties:
   *                          name:
   *                              type: string
   *                              required : true
   *                          email:
   *                              type: string
   *                              required : true
   *                          status:
   *                              type: string
   *                              enum: [Unconfirmed, Admitted, Terminated]
   *                          phone:
   *                              type: string
   *                              required : true
   *                          class:
   *                              type: string
   *                              required : true
   *      responses:
   *          200:
   *              description: success
   *          400:
   *              description: Error
   *          401:
   *              description: Unauthorize
   *
   */
}

route.post("/create", validator.create_validation, async (req, res) => {
  let result = await controller.create(req);
  if (result.failed) {
    res.status(result.status).send({
      msg: result.msg,
    });
    return;
  } else {
    res.send(SUCCESS(result));
    return;
  }
});

{
  /**
   * @swagger
   * /student/get:
   *  get:
   *      description:
   *      tags:
   *          - student
   *      parameters:
   *              -   in: query
   *                  name: filter
   *                  schema:
   *                      type: string
   *              -   in: query
   *                  name: page
   *                  schema:
   *                      type: number
   *              -   in: query
   *                  name: id
   *                  schema:
   *                      type: number
   *      responses:
   *          200:
   *              description: successful
   */
}

route.get("/get", async (req, res) => {
  let result = await controller.get(req);
  let page = req.query.page || 1;
  if (result.failed) {
    res.status(result.status).send({
      msg: result.msg,
    });
    return;
  } else {
    res.send({
      total_document: result.length,
      data: result.slice(
        (page - 1) * ELEMENTS_PER_PAGE,
        page * ELEMENTS_PER_PAGE
      ),
      page: Number(page),
    });
    return;
  }
});

{
  /**
   * @swagger
   * /student/edit:
   *  put:
   *      summary:
   *      tags:
   *          - student
   *      consumes:
   *          - application/json
   *      parameters:
   *              -   in: body
   *                  name: body
   *                  required: true
   *                  schema:
   *                      type: object
   *                      required:
   *                          - id
   *                      properties:
   *                          name:
   *                              type: string
   *                          id:
   *                              type: string
   *                              required : true
   *                          email:
   *                              type: string
   *                          status:
   *                              type: string
   *                              enum: [Unconfirmed, Admitted, Terminated]
   *                          phone:
   *                              type: string
   *                          class:
   *                              type: string
   *      responses:
   *          200:
   *              description: success
   *          400:
   *              description: Error
   *          401:
   *              description: Unauthorize
   *
   */
}

route.put(
  "/edit",
  async (req, res) => {
    let result = await controller.edit(req);
    if (result.failed) {
      res.status(result.status).send({
        msg: result.msg,
      });
      return;
    } else {
      res.send(SUCCESS(result));
      return;
    }
  }
);

{
  /**
   * @swagger
   * /student/delete:
   *  delete:
   *      description:
   *      tags:
   *          - student
   *      parameters:
   *              -   in: query
   *                  name: _id
   *                  schema:
   *                      type: string
   *      responses:
   *          200:
   *              description: successful
   */
}

route.delete(
  "/delete",
  async (req, res) => {
    let result = await controller.delete(req);
    if (result.failed) {
      res.status(result.status).send({
        msg: result.msg,
      });
      return;
    } else {
      res.send(SUCCESS(result));
      return;
    }
  }
);
module.exports = route;
