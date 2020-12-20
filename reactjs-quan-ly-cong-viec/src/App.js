import React, { Component } from "react";
import "./App.css";
import Control from "./components/Control";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import * as constants from "./constants/index";
import { v4 as uuidv4 } from "uuid";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
      isDisplayForm: false,
    };
  }

  componentDidMount() {
    const tasks = JSON.parse(localStorage.getItem(constants.DATA_TASK_LIST));

    //Check if an array is empty or exists
    if (Array.isArray(tasks) && tasks.length) {
      this.setState({ tasks: tasks });
    }
  }

  getStatusAddListFrom = () => {
    this.setState({ isDisplayForm: !this.state.isDisplayForm });
  };

  getStatusRemoveFrom = (isDisplayForm) => {
    this.setState({ isDisplayForm: isDisplayForm });
  };

  getInfoTasks = (task) => {
    const { tasks } = this.state;

    tasks.push(task);
    this.setState({ tasks: tasks });

    localStorage.setItem(constants.DATA_TASK_LIST, JSON.stringify(tasks));
  };
  findByIdAndRemoveTask = (id) => {
    const tasks = this.state.tasks.filter((task) => task.id !== id);

    this.setState({ tasks: tasks });

    localStorage.setItem(constants.DATA_TASK_LIST, JSON.stringify(tasks));
  };
  render() {
    return (
      <div>
        <div className="container">
          <div className="text-center">
            <h1>Quản Lý Công Việc</h1>
            <hr />
          </div>
          <div className="row">
            <div className="col-xs-12 col-sm-12 col-md-4 col-lg-4">
              {this.state.isDisplayForm && (
                <TaskForm
                  getStatusRemoveFrom={(isDisplayForm) =>
                    this.getStatusRemoveFrom(isDisplayForm)
                  }
                  getInfoTasks={(task) => this.getInfoTasks(task)}
                />
              )}
              {/* <TaskForm /> */}
            </div>
            <div
              className={
                this.state.isDisplayForm
                  ? "col-xs-12 col-sm-12 col-md-8 col-lg-8"
                  : "col-xs-12 col-sm-12 col-md-8 col-lg-8 col-12"
              }
            >
              <button
                type="button"
                className="btn btn-primary mb-10"
                onClick={this.getStatusAddListFrom}
              >
                <i className="fa fa-plus mr-3"></i>Thêm Công Việc
              </button>
              <Control />
              <div className="row mt-15">
                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                  <TaskList
                    tasks={this.state.tasks}
                    isDisplayForm={this.state.isDisplayForm}
                    findByIdAndRemoveTask={(id) =>
                      this.findByIdAndRemoveTask(id)
                    }
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
