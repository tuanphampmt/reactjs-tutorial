import React, {Component} from "react";
import "./App.css";
import Control from "./components/Control";
import TaskAddForm from "./components/TaskAddForm";
import TaskEditForm from "./components/TaskEditForm";
import TaskList from "./components/TaskList";
import * as constants from "./constants/index";
import * as converter from "./converter/index"

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tasks: [],
            isDisplayForm: false,
            dataUpdate: {},
            isDisplayEditForm: false,
            searchText: ""
        };
    }

    componentDidMount() {
        const tasks = JSON.parse(localStorage.getItem(constants.DATA_TASK_LIST));

        if (Array.isArray(tasks) && tasks.length) {
            this.setState({tasks: tasks});
        }
    }

    getStatusAddListFrom = () => {
        this.setState({
            isDisplayForm: !this.state.isDisplayForm,
            isDisplayEditForm: false,
        });
    };

    getStatusRemoveFrom = (isDisplayForm) => {
        this.setState({
            isDisplayForm: isDisplayForm,
            isDisplayEditForm: isDisplayForm,
        });
    };

    getInfoTasks = (task) => {
        const {tasks} = this.state;

        tasks.push(task);
        this.setState({tasks: tasks});

        localStorage.setItem(constants.DATA_TASK_LIST, JSON.stringify(tasks));
    };

    findByIdAndRemoveTask = (id) => {
        const tasks = this.state.tasks.filter((task) => task.id !== id);

        this.setState({tasks: tasks});

        localStorage.setItem(constants.DATA_TASK_LIST, JSON.stringify(tasks));
    };

    updateOneById = (id) => {
        const {tasks} = this.state;
        const dataUpdate = tasks.find((task) => task.id === id);
        this.setState({dataUpdate: dataUpdate});
    };

    getStatusEditFrom = () => {
        const editFrom = document.getElementById("edit-form");
        if (!editFrom) {
            this.setState({
                isDisplayEditForm: !this.state.isDisplayEditForm,
                isDisplayForm: false,
            });
        }
    };

    updateOne = (task) => {
        const tasks = this.state.tasks.map((t) => {
            if (t.id === task.id) {
                t.name = task.name;
                t.status = task.status;
                return t;
            }
            return t;
        });

        this.setState({tasks: tasks});
        localStorage.setItem(constants.DATA_TASK_LIST, JSON.stringify(tasks));
    };

    getSearchText = (text) => {
        this.setState({searchText: text.toLowerCase().trim()});
    }
    getArrayList = () => {
        let arrayList = [];
        this.state.tasks.forEach((task) => {
            if (converter.toSlug(task.name).toLowerCase().trim().indexOf(this.state.searchText) !== -1) {
                arrayList.push(task);
            }
        })
        return arrayList;
    }

    render() {
        return (
            <div>
                <div className="container">
                    <div className="text-center">
                        <h1>Quản Lý Công Việc</h1>
                        <hr/>
                    </div>
                    <div className="row">
                        <div className="col-xs-12 col-sm-12 col-md-4 col-lg-4">
                            {this.state.isDisplayForm && (
                                <TaskAddForm
                                    getStatusRemoveFrom={(isDisplayForm) =>
                                        this.getStatusRemoveFrom(isDisplayForm)
                                    }
                                    getInfoTasks={(task) => this.getInfoTasks(task)}
                                />
                            )}

                            {this.state.isDisplayEditForm && (
                                <TaskEditForm
                                    getStatusRemoveFrom={(isDisplayForm) =>
                                        this.getStatusRemoveFrom(isDisplayForm)
                                    }
                                    dataUpdate={this.state.dataUpdate}
                                    updateOne={(task) => this.updateOne(task)}
                                />
                            )}
                        </div>
                        <div
                            className={
                                this.state.isDisplayForm || this.state.isDisplayEditForm
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
                            <Control
                                getSearchText={(text) => this.getSearchText(text)}
                            />
                            <div className="row mt-15">
                                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                                    <TaskList
                                        tasks={this.getArrayList()}
                                        isDisplayForm={this.state.isDisplayForm}
                                        isDisplayEditForm={this.state.isDisplayEditForm}
                                        findByIdAndRemoveTask={(id) =>
                                            this.findByIdAndRemoveTask(id)
                                        }
                                        updateOneById={(id) => this.updateOneById(id)}
                                        getStatusEditFrom={() => this.getStatusEditFrom()}
                                        getSearchText={(text) => this.getSearchText(text)}
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
