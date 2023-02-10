const route = require("express").Router();
const {SUCCESS} = require("../api_response");
const controller = require("../controller/field/field_controller");
const validator = require("../controller/field/field_validation");
{
  /**
   * @swagger
   * /field/create:
   *  post:
   *      summary:
   *      tags:
   *          - field
   *      consumes:
   *          - application/json
   *      parameters:
   *              -   in: body
   *                  name: body
   *                  required: true
   *                  schema:
   *                      type: object
   *                      required:
   *                          - field
   *                      properties:
   *                          field:
   *                              type: array
   *                              items :
   *                                type: object
   *                                required:
   *                                    - title
   *                                    - format
   *                                properties:
   *                                    title:
   *                                        type: string
   *                                        required : true
   *                                    format:
   *                                        type: string
   *                                        required : true
   *                                        enum : [date, number, string, boolean]
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

route.post("/create", async (req, res) => {
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
   * /field/get:
   *  get:
   *      description:
   *      tags:
   *          - field
   *      responses:
   *          200:
   *              description: successful
   */
}

route.get("/get", async (req, res) => {
  let result = await controller.get(req);
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
   * /field/delete:
   *  post:
   *      summary:
   *      tags:
   *          - field
   *      consumes:
   *          - application/json
   *      parameters:
   *              -   in: body
   *                  name: body
   *                  required: true
   *                  schema:
   *                      type: object   
   *                      properties:
   *                          field:
   *                              type: object
   *                              properties:
   *                                  title:
   *                                      type: string
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

route.post("/delete", async (req, res) => {
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
});

module.exports = route;
