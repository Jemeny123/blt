import React from "react";
import { withRouter } from "react-router-dom";
import home from "../../assets/css/home.module.scss";
import "../../assets/icon/iconfont.css";
import request from "../../utils/request.js";
import Goodslist from "../../components/goodslist";
class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      romdata: [],
      p: 1,
      scroll: false,
    };
  }
  tosearch() {
    this.props.history.push("/home/search");
  }
  //gz/recomandapi/index
  async gethomedata(page) {
    let p = await request({
      method: "get",
      url: "/dev-baletuqweqwe/gz/recomandapi/index",
      params: {
        p: `${page}`,
        entrance: "1",
      },
    });
    p.data.result.map((item) => {
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
    if (this.getScrollTop() > 100) {
      this.setState({
        scroll: true,
      });
    } else {
      this.setState({
        scroll: false,
      });
    }
    // console.log(document.getElementById("root"));
    if (
      this.getScrollTop() + this.getWindowHeight() + 1 >=
      this.getScrollHeight()
    ) {
      // console.log(this.getScrollTop());
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
  toList() {
    this.props.history.push({ pathname: "/list" });
  }
  toList2() {
    this.props.history.push({ pathname: "/list2" });
  }
  toBrandapartment() {
    this.props.history.push({ pathname: "/brandapartment" });
  }
  handleScrollTop() {
    window.scrollTo({
      left: 0,
      top: 0,
      behavior: "smooth",
    });
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }
  componentWillMount() {
    console.log("componentWillMount");
    this.gethomedata(this.state.p);
    window.addEventListener("scroll", this.scrollFn.bind(this), true); //开始监听
  }
  componentWillUnmount() {
    console.log("componentWillUnmount");
    window.removeEventListener("scroll", this.scrollFn.bind(this), true); // 销毁监听
  }
  render() {
    return (
      <React.Fragment>
        <div className={home.body} id="goodsBody">
          <div className={home.home}>
            <div className={home.header}>
              <img className={home.img1} src="../../img/zf_banner.jpg" />
              {/* <img src="../../../public/img/zf_banner.jpg" /> */}
              <div className={home.search}>
                <div onClick={this.tosearch.bind(this)} className={home.input1}>
                  <img
                    src={[require("../../img/search.png")]}
                    className={home.searchimg}
                  />
                  <span className={home.text1}>请输入区域，小区搜索房源</span>
                </div>
              </div>
            </div>
          </div>
          <div className={home.nav}>
            <ul className={home.ul}>
              <li className={home.li} onClick={this.toList.bind(this)}>
                <span className={home.lide1}>
                  <img
                    className={home.img2}
                    src="https://js.baletoo.cn/static/wx/common/zhengtaoIcon.png?2"
                  />
                  <div>整租</div>
                </span>
              </li>
              <li className={home.li} onClick={this.toList2.bind(this)}>
                <span className={home.lide1}>
                  <img
                    className={home.img2}
                    src="https://js.baletoo.cn/static/wx/common/danjianIcon.png?2"
                  />
                  <div>合租</div>
                </span>
              </li>
              <li
                className={home.li}
                onClick={this.toBrandapartment.bind(this)}
              >
                <span className={home.lide1}>
                  <img
                    className={home.img2}
                    src="https://js.baletoo.cn/static/wx/common/gongyuIcon.png?2.1"
                  />
                  <div>品牌公寓</div>
                </span>
              </li>
              <li className={home.li}>
                <span className={home.lide1}>
                  <img
                    className={home.img2}
                    src="https://js.baletoo.cn/static/wx/common/shiyouIcon.png?2"
                  />
                  <div>找室友</div>
                </span>
              </li>
            </ul>
          </div>
          <div className={home.study}>
            <ul className={home.ul2}>
              <li className={home.li2}>
                <div className={home.wrapper}>
                  <img
                    className={home.imgli}
                    src="https://js.baletoo.cn/Public/indextheme/newtheme/newtheme/pic1h5.png"
                  />
                </div>
              </li>
              <li className={home.li2pdleft15}>
                <div className={home.wrapper}>
                  <img
                    className={home.imgli}
                    src="https://js.baletoo.cn/Public/indextheme/newtheme/newtheme/pic2h5.png"
                  />
                </div>
              </li>
              <li className={home.li2}>
                {" "}
                <div className={home.wrapper}>
                  <img
                    className={home.imgli}
                    src="https://js.baletoo.cn/Public/indextheme/newtheme/newtheme/pic10h5.png"
                  />
                </div>
              </li>
              <li className={home.li2pdleft15}>
                {" "}
                <div className={home.wrapper}>
                  <img
                    className={home.imgli}
                    src="https://js.baletoo.cn/Public/indextheme/newtheme/newtheme/pic9h5.png"
                  />
                </div>
              </li>
            </ul>
            <div className={home.clearboth}></div>
          </div>
          <div className={home.house}>
            <div className={home.title1}>
              <span className={home.guess}>猜你喜欢</span>
            </div>
            <Goodslist romdata={this.state.romdata}></Goodslist>
          </div>
          <div
            onClick={this.handleScrollTop}
            className={this.state.scroll ? home.handlescrolltop : home.handnone}
          >
            <p className={home.topback}>回到顶部</p>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
export default withRouter(Home);
