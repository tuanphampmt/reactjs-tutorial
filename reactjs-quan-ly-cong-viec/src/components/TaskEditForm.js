import React, {Component} from "react";

class TaskEditForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: "",
            name: "",
            status: true,
        };
    }

    static getDerivedStateFromProps(props, state) {
        if (props.dataUpdate.id !== state.id) {
            return {
                id: props.dataUpdate.id,
                name: props.dataUpdate.name,
                status: props.dataUpdate.status,
            };
        }
        return null;
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
            id: this.state.id,
            name: this.state.name,
            status: this.state.status,
        };

        this.props.updateOne(task);
    };

    resetForm = (e) => {
        e.preventDefault();
        this.setState({name: "", status: 0});
    };


    render() {
        return (
            <div className="panel panel-warning" id="edit-form">
                <div className="panel-heading">
                    <h3 className="panel-title">Cập nhật Công Việc</h3>
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
                                <i className="fa fa-plus mr-3"></i>Cập nhật
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

export default TaskEditForm;
