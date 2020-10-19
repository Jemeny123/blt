import React from "react";
import reg from '../../assets/css/reg.module.scss'
import '../../assets/font3/iconfont.css'
import '../../assets/font2/iconfont.css'
import request from '../../untils/request'
class Register extends React.Component {
  constructor() {
    super();
    this.state = {
      isuser: false,
      ispass: false,
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
    } else {
      e.target.parentNode.style.border = '#ff8084 1px solid'
      this.setState({
        ispass: false
      }, () => {
        console.log("ispass", this.state.ispass)
      })
    }
  }
  //注册按钮验证，通过就发请求
  regis() {
    if (this.state.isuser === false) {
      document.getElementById('phone').parentNode.style.border = '#ff8084 1px solid'
    }
    if (this.state.ispass === false) {
      console.log();
      document.getElementById('pass').parentNode.style.border = '#ff8084 1px solid'
    }
    if ((this.state.isuser === true) && (this.state.ispass === true)) {
      // console.log(document.getElementById('phone').value);
      // console.log(document.getElementById('pass').value);
      this.getData()
    }
  }
  //发请求，注册
  async getData() {
    try {
      let phone = document.getElementById('phone').value
      let pass = document.getElementById('pass').value
      let p = await request({
        method: "post",
        url: "/dev-usepswreact/user/reg",
        data:{
          username:phone,
          userpass:pass,
          sex:'',
          age:''
        },
      });
      if (p.data.flag) {
        this.props.history.push("/login");
      }  
      console.log(p);
    } catch (err) {
      console.log(err);
    }
  }
  touser(){
    this.props.history.push("/user");
  }

  render() {
    return (
      // box
      <div className={reg.box}>

        {/* main */}
        <div className={reg.main}>
          {/* header */}
          <div className={reg.header}>
            <h2>
              <span className='iconfont icon-zuojiantou-01' onClick={this.touser.bind(this)}></span>
              欢迎注册
              </h2>
          </div>
          {/* con */}
          <div className={reg.con}>
            <div className={reg.con_box}>
              <span className='iconfont icon-dianhua'></span>
              <input id='phone' placeholder='手机号码' onBlur={
                this.usercheck.bind(this)
              }></input>
            </div>
            <div className={reg.con_box}>
              <span className='iconfont icon-dianhua'></span>
              <input id='pass' placeholder='密码' onBlur={
                this.passcheck.bind(this)
              }></input>
            </div>
            <button onClick={this.regis.bind(this)}>注册</button>
          </div>
        </div>
      </div>

    )
  }
}
export default Register