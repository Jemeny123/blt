import React from "react";
import { withRouter } from "react-router-dom";
import request from "../../utils/request.js";
import home from '../../assets/css/user.module.scss'
import '../../assets/font3/iconfont.css'
import {getCookie,removeCookie} from '../../untils/cookieTools'
class User extends React.Component {
  constructor() {
    super();
    this.state = {
      cookie:''
    };
  }
  tolist(){
    this.props.history.push("/list");
  }
  tologin(){
    this.props.history.push("/login");
  }
  logout(){
    removeCookie('phone')
    removeCookie('token')
    this.setState({
      cookie:''
    },()=> console.log(this.state.cookie))
  }
  toreg(){
    this.props.history.push("/reg");
  }
  componentDidMount(){
    this.setState({
      cookie:getCookie('phone')
    },()=>{
      console.log('cookie1',this.state.cookie);
    })
  }
  getData(){
    if (this.state.cookie) {
      return (
        <React.Fragment>
          <span>
            {this.state.cookie}
          </span>
          <span>/</span>
          <span onClick={this.logout.bind(this)}>退出</span>
        </React.Fragment>
      )
    }else{
      return (
        <React.Fragment>
          <span onClick={this.tologin.bind(this)}>登录</span>
          <span>/</span>
          <span onClick={this.toreg.bind(this)}>注册</span>
        </React.Fragment>
      )
    }
  }

  render() {
    return (
      // box
      <div className={home.box}>
        {/* main */}
        <div className={home.main}>
          {/* header */}
          <div className={home.header}>
            <h2>
              <span className='iconfont icon-zuojiantou-01' onClick={this.tolist.bind(this)}></span>
              我的
            </h2>
          </div>
          {/* con */}
          <div className={home.con}>
            <div className={home.con_box}>
              <div className={home.con_imgbox}>
                <img src='//js.baletoo.cn/static/m/static/images/tx.png'></img>
              </div>
              <div id='reg' className={home.con_reg}>
                {this.getData()}
              </div>
              <div id='user' className={home.con_user}>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default User;
