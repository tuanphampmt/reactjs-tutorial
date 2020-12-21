import React, {Component} from "react";
import * as converter from "../converter/index"

class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchText: ""
        }
    }

    onChange = (e) => {
        this.setState({searchText: e.target.value})
    }

    search = () => {
        this.props.getSearchText(converter.toSlug(this.state.searchText))
    }

    render() {
        return (
            <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                <div className="input-group">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Nhập từ khóa..."
                        value={this.state.searchText}
                        onChange={this.onChange}
                    />
                    <span className="input-group-btn">
            <button className="btn btn-primary" type="button"
                    onClick={this.search}
            >
              <span className="fa fa-search mr-3"></span>Tìm kiếm
            </button>
          </span>
                </div>
            </div>
        );
    }
}

export default Search;
