import express from "express";

const router = express.Router();

/**
 * @openapi
 * /employee:
 *   get:
 *     tags:
 *       - Employee
 *     summary: Get basic employee route message
 *     description: Returns a simple text response for testing.
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: Employee route
 */
router.get("/", (request, response) => {
  response.send("Employee route");
});
/**
 * @openapi
 * /employee/{id}:
 *   get:
 *     tags:
 *       - Employee
 *     summary: Get employee by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The employee ID
 *     responses:
 *       200:
 *         description: Returns employee info
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 id:
 *                   type: string
 */
router.get("/:id", (request, response) => {
  response.send(`BY ID: ${request.params.id}`);
});

router.put("/:id", (request, response) => {
  response.send(`BY ID: ${request.params.id}`);

  // handle put update
  // service call to get the update
});
router.post("/", (request, response) => {
  // handle post here
  // service call here to update
});

router.delete("/", (request, response) => {
  // handle many deletions or one parse from array request
  //service call it
});

export default router;
