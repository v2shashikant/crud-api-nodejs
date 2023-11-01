const router = require("express").Router();
const jwt = require('jsonwebtoken');

const { getTodos,createTodo,updateTodo,deleteTodo } = require("./controllers/Todo");
const authController = require('./controllers/Auth');
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (token == null) {
    return res.sendStatus(401); // Unauthorized
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.sendStatus(403); // Forbidden
    }
    req.user = user;
    next();
  });
}


router.get("/", (req, res) => {
  res.send("Let's build a CRUD API!");
});
router.get("/todos",authenticateToken, getTodos);
router.post("/todos", authenticateToken,createTodo);
router.put("/todos/:todoID",authenticateToken, updateTodo);
router.delete("/todos/:todoID",authenticateToken, deleteTodo);

router.post('/register', authController.register);
router.post('/login', authController.login);

module.exports = router;
