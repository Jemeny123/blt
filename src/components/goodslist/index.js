import React from "react";
import ReactDOM from "react-dom";
import request from "../../utils/request.js";
import home from "../../assets/css/home.module.scss";

function Goodslist(props) {
  return (
    <React.Fragment>
      <div className={home.house}>
        <ul className={home.goodlist}>
          {props.romdata &&
            props.romdata.map((item, index) => {
              return (
                <li className={home.goodsitem} key={index}>
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
                          <span>{item.house_title}</span>
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
    </React.Fragment>
  );
}

export default Goodslist;
