const Employee = require("../model/Employee");

const getEmployees = async (req, res) => {
  try {
    let { page = 1, limit = 10, sort, filter } = req.query;
    page = parseInt(page);
    limit = parseInt(limit);

    let query = {};
    let sortOption = {};

    // Implement the filter based on the 'filter' query parameter
    if (filter) {
      query.name = { $regex: new RegExp(filter, 'i') };
      // You can extend this based on your specific filter criteria
    }

    // Implement sorting based on the 'sort' query parameter
    let sortedColumn = 'name'; // Default column to sort
    let sortDirection = 1; // Default sort direction (ascending)

    if (sort) {
      sortedColumn = sort.replace(/^-/, ''); // Remove '-' from the column name
      sortDirection = sort.startsWith('-') ? -1 : 1;
    }

    sortOption[sortedColumn] = sortDirection;

    const totalEmployees = await Employee.countDocuments(query);
    const totalPages = Math.ceil(totalEmployees / limit);

    const employees = await Employee.find(query)
      .sort(sortOption)
      .limit(limit)
      .skip((page - 1) * limit);

    res.json({
      employees,
      page,
      totalPages,
      totalEmployees,
      sortedColumn,
      sortDirection, // Include the sort direction in the response
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }

};

const createEmployee = async (req, res) => {
  const {email} = req.body ;
  const employeeFound = await Employee.findOne({email});
  if (employeeFound) {
    return res.status(401).json({ error: 'Email is already there used diffrent one.' });
  }


  const employee = new Employee({
    name: req.body.name,
    email: req.body.email,
    dob: req.body.dob,
    designation: req.body.designation,
    education: req.body.education,
    address: req.body.address,
    
    
  });
  
  try{
    await employee.save();
    res.json({employee});
  }catch(error){  
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
  


};
const updateEmployee = async  (req, res) => {
  try {
    const empID = req.params.employeeID;
    const { name,
      email,
      dob,
      designation,
      education,
      address } = req.body; 
    const updatedEmp = await Employee.findByIdAndUpdate(empID, { name,
      email,
      dob,
      designation,
      education,
      address }, { new: true });
    if (!updatedEmp) {
      return res.status(404).json({ error: 'Employee not found' });
    }
    return res.json(updatedEmp);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

const deleteEmployee = async (req, res) => {
  try {
    const empID = req.params.employeeID;
    const deletedEmp = await Employee.findByIdAndRemove(empID);
    if (!deletedEmp) {
      return res.status(404).json({ error: 'Employee not found' });
    }
    return res.json({ message: 'Employee deleted successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }

};

const getEmployee = async (req, res) => {
  try {
    const empID = req.params.employeeID;
    const employee = await Employee.findById(empID);
    if (!employee) {
      return res.status(404).json({ error: 'Employee not found' });
    }
    res.status(200).json(employee);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }

};


module.exports = {
    getEmployees,createEmployee,updateEmployee,deleteEmployee,getEmployee
};
  