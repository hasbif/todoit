const { Todo } = require("../models");

class Todos {
  static show(req, res) {
    Todo.findAll({ where: { UserId: req.userId }, order: [['id', 'ASC']] })
      .then(data => {
        res.status(200).json({ todos: data });
      })
      .catch(err => {
        res.status(500).json({ msg: 'Internal Sever Error', err });
      });
  }

  static add(req, res) {
    let { title, due_date } = req.body;
    Todo.create(
      { title, description: 'placeholder', status: false, due_date, UserId: req.userId },
      {}
    )
      .then(data => {
        res.status(201).json({ data });
      })
      .catch(err => {
        if (err.name == "SequelizeValidationError") {
          res.status(400).json({ msg: 'There was a problem with the data input', err });
        } else {
          res.status(500).json({ msg: 'Internal Sever Error', err });
        }
      });
  }



  static getbyId(req, res) {
    Todo.findByPk(req.params.id, {})
      .then(data => {
        if (data) {
          res.status(200).json({ data });
        } else {
          res.status(404).json({ msg: "Error, data not found" });
        }
      })
      .catch(err => {
        res.status(500).json({ msg: 'Internal Sever Error', err });
      });
  }

  static edit(req, res) {
    let { title, status, due_date } = req.body;
    Todo.findByPk(req.params.id)
      .then(data => {
        if (data) {
          return Todo.update(
            { title, status, due_date },
            { where: { id: req.params.id } }
          );
        } else {
          res.status(404).json({ msg: "Error, data not found" });
        }
      })
      .then(data => {
        if (data == 1) {
          res.status(200).json({ title, status, due_date });
        } else {
          res.status(400).json({ msg: "Failed to update data" });
        }
      })
      .catch(err => {
        if (err.name == "SequelizeValidationError") {
          res.status(400).json({ msg: 'There was a problem with the data input', err });
        } else {
          res.status(500).json({ msg: 'Internal Sever Error', err });
        }
      });
  }

  static delete(req, res) {
    let todo;
    Todo.findByPk(req.params.id)
      .then(data => {
        if (data) {
          todo = data;
          return Todo.destroy({ where: { id: req.params.id } });
        } else {
          res.status(404).json({ message: "Error, data not found" });
        }
      })
      .then(data => {
        res.status(200).json({ todo });
      })
      .catch(err => {
        res.status(500).json({ msg: 'Internal Sever Error', err });
      });
  }
}

module.exports = Todos;
