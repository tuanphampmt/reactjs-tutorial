import React, { Component } from "react";
import TaskItem from "./TaskItem";

class TaskList extends Component {
  render() {
    return (
      <table className="table table-bordered table-hover">
        <thead>
          <tr className="width-100">
            <th className="text-center width-5">STT</th>
            <th className="text-center width-60">Tên</th>
            <th className="text-center width-15">Trạng Thái</th>
            <th className="text-center width-20">Hành Động</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td></td>
            <td>
              <input type="text" className="form-control" />
            </td>
            <td>
              <select className="form-control">
                <option value="-1">Tất Cả</option>
                <option value="0">Ẩn</option>
                <option value="1">Kích Hoạt</option>
              </select>
            </td>
            <td></td>
          </tr>
          {this.props.tasks.map((task, i) => (
            <TaskItem
              key={i}
              index={i + 1}
              id={task.id}
              name={task.name}
              status={task.status}
              isDisplayForm={this.props.isDisplayForm}
              findByIdAndRemoveTask={(id) => this.props.findByIdAndRemoveTask(id)}
            />
          ))}
        </tbody>
      </table>
    );
  }
}

export default TaskList;
