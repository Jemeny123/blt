import React from "react";
import ReactDOM from "react-dom";
import style from "../../assets/css/list.module.scss";
import "../../assets/font2/iconfont.css";
function Mylist(props) {
  return (
    <React.Fragment>
      <div className={style.header}>
        <span className="iconfont icon-shouye1" onClick={props.toHome}></span>
        <div className={style.check}>
          <span className="iconfont icon-fangdajing1"></span>
          <input
            className="iconfont icon-shouye1"
            placeholder="输入区域，小区搜索房源"
          ></input>
        </div>
        <span className="iconfont icon-wode2"></span>
      </div>
    </React.Fragment>
  );
}
export default Mylist;
