const router = require("express").Router();
const { getTodos,createTodo,updateTodo,deleteTodo } = require("./controllers/Todo");
const authController = require('./controllers/Auth');


router.get("/", (req, res) => {
  res.send("Let's build a CRUD API!");
});
router.get("/todos", getTodos);
router.post("/todos", createTodo);
router.put("/todos/:todoID", updateTodo);
router.delete("/todos/:todoID", deleteTodo);

router.post('/register', authController.register);
router.post('/login', authController.login);

module.exports = router;
