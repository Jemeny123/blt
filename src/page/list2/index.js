import React from "react";
import { withRouter } from "react-router-dom";
import request from "../../utils/request.js";
// import style from "../../assets/css/list.module.scss";
import Mylist from "../../components/list";
import "../../assets/font2/iconfont.css";
import home from "../../assets/css/home.module.scss";

class Rent extends React.Component {
  constructor() {
    super();
    this.state = {
      romdata: [],
      p: 1,
      scroll: false,
    };
  }
  //跳转到首页
  toHome() {
    this.props.history.push("/home");
  }
  //跳转到详情页
  toDetails() {
    this.props.history.push("/details");
  }
  async gethomedata(page) {
    let p = await request({
      method: "get",
      url: "/dev-baletuqweqwe/gz/Zhaofangapi/index",
      params: {
        kill_crawler: "b0ebf8eeb72776eb69df4e334f4b0807",
        city_id: "1272",
        p: `${page}`,
        entrance: "1",
        param: "/c1/",
      },
    });
    console.log(p.data.result.house_list);
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
  handleScrollTop() {
    console.log(window.scrollTo);
    window.scrollTo({
      left: 0,
      top: 0,
      behavior: "smooth",
    });
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }
  //底部执行函数
  scrollFn() {
    // console.log(window.scrollTo());
    // console.log(this.getScrollTop());
    //滑动底部判断
    if (this.getScrollTop() > 60) {
      this.setState({
        scroll: true,
      });
    } else {
      this.setState({
        scroll: false,
      });
    }
    if (
      this.getScrollTop() + this.getWindowHeight() + 1 >=
      this.getScrollHeight()
    ) {
      if (this.state.p === 1) {
        this.setState(
          {
            p: 2,
          },
          () => {
            // this.gethomedata(this.state.p);
          }
        );
      }
    } else {
    }
  }
  componentDidMount() {
    console.log(this.getScrollTop());
    window.addEventListener("scroll", this.scrollFn.bind(this), true); //开始监听//window.addEventListener("scroll", this.scrollFn.bind(this));
    this.gethomedata(this.state.p);
    console.log("componentWillMount");
  }
  componentWillUnmount() {
    console.log("componentWillUnmount");
    window.removeEventListener("scroll", this.scrollFn.bind(this), true); // 销毁监听
  }
  render() {
    return (
      <React.Fragment>
        <Mylist toHome={this.toHome.bind(this)}></Mylist>
        <div className={home.house}>
          <ul className={home.goodlist}>
            {this.state.romdata &&
              this.state.romdata.map((item, index) => {
                return (
                  <li
                    className={home.goodsitem}
                    key={index}
                    onClick={this.toDetails.bind(this)}
                  >
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
                              style={{
                                width: "230px !important",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                whiteSpace: "nowrap",
                              }}
                            >
                              {item.house_title}
                            </span>
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
        <div
          onClick={this.handleScrollTop}
          className={this.state.scroll ? home.handlescrolltop : home.handnone}
        >
          <p className={home.topback}>回到顶部</p>
        </div>
      </React.Fragment>
    );
  }
}

export default withRouter(Rent);
