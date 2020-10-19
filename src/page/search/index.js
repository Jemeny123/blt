import React from "react";
import search from "../../assets/css/search.module.scss";
import { withRouter } from "react-router-dom";

class Searchare extends React.Component {
  constructor() {
    super();
    this.state = {
      state1: "none",
      state2: "inline-block",
      data: "",
    };
  }
  searchdata(e) {
    this.setState(
      {
        state1: "inline-block",
        state2: "none",
        data: e.target.value,
      },
      () => {
        console.log(this.state.state1);
      }
    );
  }
  quexiao() {
    this.setState({
      state1: "none",
      state2: "inline-block",
      data: "",
    });
  }
  toHome() {
    this.props.history.push({ pathname: "/home" });
  }
  render() {
    return (
      <React.Fragment>
        <div className={search.data}>
          <div className={search.comtent}>
            <div className={search.title}>
              <form>
                <img
                  className={search.img}
                  src={[require("../../img/quexiao.png")]}
                  onClick={this.quexiao.bind(this)}
                  style={{ display: this.state.state1 }}
                />
                <input
                  type="text"
                  autoComplete="off"
                  autoCorrect="off"
                  id="search_inp"
                  value={this.state.data}
                  className={search.inp}
                  placeholder="请输入商圈、地铁、小区"
                  onChange={this.searchdata.bind(this)}
                />
                <span
                  className={search.quexiao}
                  style={{ display: this.state.state2 }}
                  onClick={this.toHome.bind(this)}
                >
                  取消
                </span>
                <span
                  style={{ display: this.state.state1 }}
                  className={search.sousuo}
                >
                  搜索
                </span>
              </form>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
export default withRouter(Searchare);
