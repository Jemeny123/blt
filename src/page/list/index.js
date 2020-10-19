import React from "react";
import { withRouter } from "react-router-dom";
import request from "../../utils/request.js";
import style from '../../assets/css/list.module.scss'
import '../../assets/font2/iconfont.css'
import home from "../../assets/css/home.module.scss";
import {addCookie} from '../../untils/cookieTools'

class Rent extends React.Component {
  constructor() {
    super();
    this.state = {
      romdata: [],
      p: 1,
    };
  }
  //跳转到首页
  toHome() {
    this.props.history.push("/home");
  }
  //跳转到详情页
  toDetails(index) {
    if (index%2 == 0) {
      addCookie('house_id','6396735')
      addCookie('kill_crawler','325a1b7d6e59c0fdb7bb4b2e97a7d97b')
    }else{
      addCookie('house_id','6116544')
      addCookie('kill_crawler','af2c0cbb8c4a73cbc2f5ced940f9e08c')
      
    }
    this.props.history.push("/details");
    // console.log(index+1);
    console.log(index%2);

  }
  async gethomedata(page) {
    let p = await request({
      method: "get",
      url: "/dev-baletuqweqwe/gz/Zhaofangapi/index",
      params: {
        kill_crawler:'b0ebf8eeb72776eb69df4e334f4b0807',
        city_id:'1272',
        p: `${page}`,
        entrance: "1",
      },
    });
    console.log(p);
    p.data.result.house_list.map((item) => {
      this.state.romdata.push(item);
    });
    this.setState(
      {
        romdata: this.state.romdata,
      },
      () => {}
    );
  }
  //文档高度
  getScrollTop() {
    let scrollTop = 0,
      bodyScrollTop = 0,
      documentScrollTop = 0;
    if (document.body) {
      bodyScrollTop = document.body.scrollTop;
    }
    if (document.documentElement) {
      documentScrollTop = document.documentElement.scrollTop;
    }
    scrollTop =
      bodyScrollTop - documentScrollTop > 0 ? bodyScrollTop : documentScrollTop;
    return scrollTop;
  }
  //可视窗口高度
  getWindowHeight() {
    let windowHeight = 0;
    if (document.compatMode === "CSS1Compat") {
      windowHeight = document.documentElement.clientHeight;
    } else {
      windowHeight = document.body.clientHeight;
    }
    return windowHeight;
  }
  //滚动条高度
  getScrollHeight() {
    // var scrollHeight = 0,
    let scrollHeight = 0,
      bodyScrollHeight = 0,
      documentScrollHeight = 0;
    if (document.body) {
      bodyScrollHeight = document.body.scrollHeight;
    }
    if (document.documentElement) {
      documentScrollHeight = document.documentElement.scrollHeight;
    }
    scrollHeight =
      bodyScrollHeight - documentScrollHeight > 0
        ? bodyScrollHeight
        : documentScrollHeight;
    return scrollHeight;
  }
  //底部执行函数
  scrollFn() {
    // console.log(document.getElementById("root"));
    if (
      this.getScrollTop() + this.getWindowHeight() + 1 >=
      this.getScrollHeight()
    ) {
      console.log("this ok start");
      if (this.state.p === 1) {
        this.setState(
          {
            p: 2,
          },
          () => {
            this.gethomedata(this.state.p);
          }
        );
      }
    } else {
    }
  }
  componentWillMount() {
    console.log("componentWillMount");
    this.gethomedata(this.state.p);
    window.addEventListener("scroll", this.scrollFn.bind(this)); //开始监听
  }
  componentWillUnmount() {
    console.log("componentWillUnmount");
    window.removeEventListener("scroll", this.scrollFn.bind(this)); // 销毁监听
  }
  //跳到我的页面
  touser(){
    this.props.history.push("/user")
  }
  render() {
    return (
      //   <React.Fragment>
      <div>
        <div className={style.header}>
          <span className='iconfont icon-shouye1' onClick={this.toHome.bind(this)}></span>
          <div className={style.check}>
            <span className='iconfont icon-fangdajing1'></span>
            <input className='iconfont icon-shouye1' placeholder='输入区域，小区搜索房源'></input>
          </div>
          <span className='iconfont icon-wode2' onClick={this.touser.bind(this)}></span>
        </div>
        <div className={home.house}>
          {/* <div className={home.title1}>
            <span className={home.guess}>猜你喜欢</span>
          </div> */}
          <ul className={home.goodlist}>
            {this.state.romdata &&
              this.state.romdata.map((item, index) => {
                return (
                  <li className={home.goodsitem} key={index} onClick={this.toDetails.bind(this,index)}>
                    <div className={home.housecard}>
                      <div className={home.baseinfo}>
                        <div className={home.mainphoto}>
                          <div
                            className={home.mainimage}
                            style={{
                              backgroundImage:
                                "url(" + `${item.house_main_image}` + ")",
                            }}
                          ></div>
                          <div className={home.photolive}>
                            {item.house_img_source}·{item.house_photo_num}
                          </div>
                        </div>
                        <div className={home.goodsdetails}>
                          <p className={home.goodtitle}>
                            <span
                              style={{width:'230px !important', overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}
                            >{item.house_title}</span>
                          </p>
                          <p className={home.roominfo}>{item.house_desc}</p>
                          <div className={home.traffic}>
                            <div className="iconfont icon-map"></div>
                            <div className={home.goodstext}>
                              {item.house_area_desc}
                            </div>
                          </div>
                          <div className={home.labels}>
                            {item.house_tags.map((ite, ind) => {
                              return (
                                <span className={home.label} key={ind}>
                                  {ite}
                                </span>
                              );
                            })}
                          </div>
                          <div className={home.goodsprice}>
                            <span className={home.goodsnum}>
                              {item.month_rent}
                            </span>
                              元
                            </div>
                        </div>
                      </div>
                    </div>
                  </li>
                );
              })}

          </ul>
        </div>
      </div>
      //   </React.Fragment>
    );
  }
}

export default Rent;
