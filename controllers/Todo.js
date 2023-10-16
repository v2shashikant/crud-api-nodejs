const Todo = require("../model/Todo");

const getTodos = async (req, res) => {
    try{
      const todoList = await Todo.find();
      res.json(todoList);
    }catch(error){  
      console.error(error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  };
const createTodo = async (req, res) => {
  const todo = new Todo({
    title: req.body.title,
    description: req.body.description,
    completed: req.body.completed,
  });
  try{
    await todo.save();
    res.json({todo});
  }catch(error){  
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
  


};
const updateTodo = async  (req, res) => {
  try {
    const taskId = req.params.todoID;
    const { title, description,completed } = req.body; 
    const updatedTodo = await Todo.findByIdAndUpdate(taskId, { title, description,completed }, { new: true });
    if (!updatedTodo) {
      return res.status(404).json({ error: 'Todo Task not found' });
    }
    return res.json(updatedTodo);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};
const deleteTodo = async (req, res) => {
  try {
    const taskId = req.params.todoID;
    const deletedTodo = await Todo.findByIdAndRemove(taskId);
    if (!deletedTodo) {
      return res.status(404).json({ error: 'Todo Task not found' });
    }
    return res.json({ message: 'Todo Task deleted successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }

};

module.exports = {
    getTodos,createTodo,updateTodo,deleteTodo
};
  