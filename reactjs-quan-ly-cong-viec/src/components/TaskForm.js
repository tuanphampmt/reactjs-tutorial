import React, { Component } from "react";

class TaskForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      status: 0,
    };
  }
  onChange = (e) => {
    const name = e.target.name;
    const value = e.target.type === "select-one" ? +e.target.value : e.target.value;

    this.setState({ [name]: value });
  };

  getStatusRemoveFrom = () => {
    this.props.getStatusRemoveFrom(false);
  };

  onHandleSubmit = (e) => {
    e.preventDefault();
    this.props.getInfoTasks(this.state);
  };
  resetForm = (e) => {
    e.preventDefault();
    this.setState({ name: "", status: 0 });
  };
  render() {
    return (
      <div className="panel panel-warning">
        <div className="panel-heading">
          <h3 className="panel-title">Thêm Công Việc</h3>
          <i class="fa fa-window-close" onClick={this.getStatusRemoveFrom}></i>
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
              <option value={1}>Kích Hoạt</option>
              <option value={0}>Ẩn</option>
            </select>
            <br />
            <div className="text-center">
              <button
                type="submit"
                className="btn btn-warning mr-5 width-permanent-80"
              >
                Thêm
              </button>
              <button
                type="submit"
                className="btn btn-danger width-permanent-80"
                onClick={this.resetForm}
              >
                Hủy Bỏ
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default TaskForm;
