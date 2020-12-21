import React, {Component} from "react";
import {v4 as uuidv4} from "uuid";

class TaskAddForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            status: true,
        };
    }

    onChange = (e) => {
        const name = e.target.name;
        const value =
            e.target.type === "select-one"
                ? e.target.value === "true"
                : e.target.value;

        this.setState({[name]: value});
    };

    getStatusRemoveFrom = () => {
        this.props.getStatusRemoveFrom(false);
    };

    onHandleSubmit = (e) => {
        e.preventDefault();

        const task = {
            id: uuidv4(),
            name: this.state.name,
            status: this.state.status,
        };

        this.props.getInfoTasks(task);
    };

    resetForm = (e) => {
        e.preventDefault();
        this.setState({name: "", status: 0});
    };

    render() {
        return (
            <div className="panel panel-warning">
                <div className="panel-heading">
                    <h3 className="panel-title">Thêm Công Việc</h3>
                    <i
                        className="fa fa-window-close"
                        onClick={this.getStatusRemoveFrom}
                    ></i>
                </div>
                <div className="panel-body">
                    <form onSubmit={this.onHandleSubmit}>
                        <div className="form-group">
                            <label>Tên :</label>
                            <input
                                type="text"
                                className="form-control"
                                name="name"
                                value={this.state.name}
                                onChange={this.onChange}
                                required
                            />
                        </div>
                        <label>Trạng Thái :</label>
                        <select
                            className="form-control"
                            required="required"
                            name="status"
                            value={this.state.status}
                            onChange={this.onChange}
                        >
                            <option value={true}>Kích Hoạt</option>
                            <option value={false}>Ẩn</option>
                        </select>
                        <br/>
                        <div className="text-center">
                            <button
                                type="submit"
                                className="btn btn-warning mr-5 width-permanent-90"
                            >
                                <i className="fa fa-plus mr-3"></i>Thêm
                            </button>
                            <button
                                type="submit"
                                className="btn btn-danger width-permanent-90"
                                onClick={this.resetForm}
                            >
                                <i className="fa fa-times mr-3"></i>Hủy Bỏ
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default TaskAddForm;
