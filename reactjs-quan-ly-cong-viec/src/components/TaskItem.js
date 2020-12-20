import React, { Component } from "react";
import swal from "sweetalert";

class TaskItem extends Component {


  findByIdAndRemoveTask = async () => {
    const result = await swal({
      title: "Are you sure?",
      text: "Are you sure you really want to delete?",
      icon: "warning",
      dangerMode: true,
      buttons: true,
    });

    if (result) {
      swal("Deleted!", "Record deleted successfully!", "success");
      this.props.findByIdAndRemoveTask(this.props.id);
    }
  };

  render() {
    return (
      <tr>
        <td>{this.props.index}</td>
        <td>{this.props.name}</td>
        <td className="text-center">
          <span
            className={
              this.props.status ? "label label-danger" : "label label-success"
            }
          >
            {this.props.status ? "Kích hoạt" : "Ẩn"}
          </span>
        </td>
        <td
          className={
            this.props.isDisplayForm
              ? "text-center d-flex d-flex-status-form"
              : "text-center d-flex"
          }
        >
          <button
            type="button"
            className="btn btn-warning mr-5 width-permanent-70"
          >
            <span className="fa fa-pencil mr-3"></span>Sửa
          </button>
          <button
            type="button"
            className="btn btn-danger width-permanent-70"
            onClick={this.findByIdAndRemoveTask}
          >
            <span className="fa fa-trash mr-3"></span>Xóa
          </button>
        </td>
      </tr>
    );
  }
}

export default TaskItem;
