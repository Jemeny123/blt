import React from "react";
import { withRouter } from "react-router-dom";
import request from "../../utils/request.js";
import '../../assets/font3/iconfont.css'
import '../../assets/font2/iconfont.css'
import log from '../../assets/css/login.module.scss'
import {addCookie} from '../../untils/cookieTools'
class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      isuser: false,
      ispass: false,
      iscookie:'',
    };
  }
  //前台手机号码正则验证
  usercheck(e) {
    let checkphone = /^1[3456789]\d{9}$/
    let value = e.target.value
    if (checkphone.test(value)) {
      e.target.parentNode.style.border = ''
      this.setState({
        isuser: true
      }, () => {
        console.log("isuser", this.state.isuser)
      })
      // document.getElementById('msg').style.display = ''
    } else {
      e.target.parentNode.style.border = '#ff8084 1px solid'
      this.setState({
        isuser: false
      }, () => {
        console.log("isuser", this.state.isuser)
      })
    }
  }
  //前台密码正则验证
  passcheck(e) {
    if (e.target.value !== '') {
      e.target.parentNode.style.border = ''
      this.setState({
        ispass: true
      }, () => {
        console.log("ispass", this.state.ispass)
      })
      // document.getElementById('msg').style.display = ''
    } else {
      e.target.parentNode.style.border = '#ff8084 1px solid'
      this.setState({
        ispass: false
      }, () => {
        console.log("ispass", this.state.ispass)
      })
    }
  }
  //是否保留7天免登录
  iscook() {
    // console.log(this.state);
    if (this.state.iscookie === '') {
      this.state.iscookie = 7
    }else{
      this.state.iscookie = ''
    }
    this.setState({
      iscookie: this.state.iscookie
    }, () => {
      console.log('iscookie', this.state.iscookie);
    })
  }
  //登录按钮验证，通过就发请求
  logis() {
    if (this.state.isuser === false) {
      document.getElementById('phone').parentNode.style.border = '#ff8084 1px solid'
    }
    if (this.state.ispass === false) {
      console.log();
      document.getElementById('pass').parentNode.style.border = '#ff8084 1px solid'
    }
    if ((this.state.isuser === true) && (this.state.ispass === true)) {
      this.getData()
    }
  }
  //发请求，登录
  async getData() {
    try {
      let phone = document.getElementById('phone').value
      let pass = document.getElementById('pass').value
      let p = await request({
        method: "get",
        url: "/dev-usepswreact/user/login",
        params: {
          username: phone,
          userpass: pass,
        },
      });
      if (p.data.flag === false) {
        document.getElementById('msg').style.display = 'inline-block'
      }else if (p.data.flag) {
        if (this.state.iscookie) {
          addCookie('phone',document.getElementById('phone').value,this.state.iscookie)
          addCookie('token',p.data.token,this.state.iscookie)
        }else{
          addCookie('phone',document.getElementById('phone').value)
          addCookie('token',p.data.token)
        }
        this.props.history.push("/user");
      }
      console.log(p);
    } catch (err) {
      console.log(err);
    }
  }
  // 手机号和密码有变化后，登录错误信息消失
  change(){
    document.getElementById('msg').style.display = ''
  }
  touser(){
    this.props.history.push("/user");
  }

  render() {
    return (
      // box
      <div className={log.box}>

        {/* main */}
        <div className={log.main}>
          {/* header */}
          <div className={log.header}>
            <span className='iconfont icon-zuojiantou-01' onClick={this.touser.bind(this)}></span>
          </div>
          {/* show */}
          <div className={log.show}>
            <div className={log.show_img}>
              <img src='//js.baletoo.cn/static/m/static/images/newlogo2.png?2018'></img>
            </div>
          </div>
          {/* con */}
          <div className={log.con}>
            <h2>欢迎登录</h2>
            <div className={log.con_box}>
              <span className='iconfont icon-dianhua'></span>
              <input id='phone' placeholder='手机号码' onBlur={this.usercheck.bind(this)} onChange={this.change.bind(this)}></input>
            </div>
            <div className={log.con_box}>
              <span className='iconfont icon-dianhua'></span>
              <input id='pass' placeholder='密码' onBlur={this.passcheck.bind(this)} onChange={this.change.bind(this)}></input>
            </div>
            <div className={log.con_checkbox}>
              <span id='msg' className={log.msg}>用户名或密码错误</span>
            </div>
            <div className={log.con_checkbox}>
              <input type='checkbox' onClick={this.iscook.bind(this)}></input>
              <span>保留7天免登录</span>
            </div>
            <button onClick={this.logis.bind(this)}>登录</button>
          </div>
        </div>
      </div>

    );
  }
}

export default Login;
