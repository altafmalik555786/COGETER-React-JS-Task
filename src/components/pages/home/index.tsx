import { Col, Input, Row } from "antd";
import Footer from "../footer";
import style from "./style.module.scss";
import CommonDashboardCards from "./common-dashboard-cards";
import { observer } from "mobx-react";
import { memo, useState, useRef, useEffect, useMemo } from "react";
import CustomButton from "@components/common-components/custom-button";
import PackagesTable from "./packages-table";
import { RightOutlined } from "@ant-design/icons";
import { SEN_VIEW_ALL_PLUS } from "@utils/constants/text";
import { LOWER_FILLED } from "@utils/constants/props";
import { constImages } from "@utils/images";
import AnimationOnSkroll from "@components/common-components/animation-on-skroll";
import { useNavigate } from "react-router-dom";
import { constRoute } from "@utils/route";
import { useStore } from "@stores/root-store";
import {
  copyToClipboard,
  renderItemDataOrEmptyNull,
} from "@utils/common-functions";

const Home = observer(() => {
  const navigate = useNavigate();
  const [activeBtn, setActiveBtn] = useState(0);
  const animationBoxRef = useRef(null);
  const initialSkrollRef = useRef(null);
  const cardRef2nd = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isVisible2, setIsVisible2] = useState(false);
  const [inviteLink] = useState("cogeter.ae/profilelink");

  const {
    packages: { loadPackages, getPackagesData, isLoadingPackages },
    user: { getUserInfo },
  } = useStore(null);

  useEffect(() => {
    if (getPackagesData == null) {
      loadPackages();
    }
  }, []);

  const reviewRatingArr = [
    {
      icon: constImages?.totalReviewIcon,
      heading: "Total Review",
      number: getPackagesData?.reduce((a, b) => a + b.totalReviews, 0),
      action: "See All Reviews",
    },
    {
      icon: constImages?.overallRatingIcon,
      heading: "Overall Ratings",
      number:
        getPackagesData?.reduce((a, b) => a + b.averageRating, 0) /
        getPackagesData?.length,
      action: "See All Ratings",
    },
  ];

  const eventBoxes = useMemo(
    () => (
      <div className={style.eventsWrapper}>
        <div className={style.eventBoxWrapper}>
          {Array(4)
            .fill(4)
            .map((item, index) => (
              <div
                key={index}
                onClick={() => setActiveBtn(index)}
                className={
                  (activeBtn === index && style.activeEventBox) ||
                  style.eventBox
                }
              >
                Today(4)
              </div>
            ))}
        </div>
      </div>
    ),
    [activeBtn]
  );

  const accountAnalytics = useMemo(
    () => (
      <div className={style.earningContainer}>
        <div
          className={`${style.earningWrapper} ${style.animatedCard} ${
            isVisible ? style.show : ""
          }`}
          ref={animationBoxRef}
        >
          <Row>
            <Col span={12}>
              {" "}
              <h1>Account Analytics</h1>
            </Col>
            <Col span={12}>
              <div className={style.earningBtnWrapper}>
                <CustomButton title="My Earnings" />
              </div>
            </Col>
          </Row>
          <Row
            className={`${style.earningCardsContainer} ${style.animatedCard} ${
              isVisible2 ? style.show : ""
            }`}
            ref={cardRef2nd}
          >
            <Col span={24}>
              <Row gutter={20} style={{ padding: 10 }}>
                <Col
                  md={12}
                  sm={24}
                  xs={24}
                  className={`${style.firstColContainer} `}
                >
                  <div className={style.firstColWrapper}>
                    <p className={style.incomeText}>Grass Income</p>
                    <div className={style.priceWrapper}>
                      <h1>
                        {renderItemDataOrEmptyNull(getUserInfo?.currency) + " "}
                        {getPackagesData?.reduce(
                          (a, b) => a + b?.grandTotal,
                          0
                        )}
                      </h1>
                      <span>view Details</span>
                    </div>
                    <p className={style.monthText}>November</p>
                  </div>
                </Col>
                <Col
                  md={6}
                  sm={12}
                  xs={24}
                  className={`${style.secondColContainer}`}
                >
                  <div className={style.secondColWrapper}>
                    <div className={style.imgWrapper}>
                      <img src={constImages?.inquiriesIcon} alt="" />
                    </div>
                    <div>
                      <p>Inquires</p>
                      <p>24</p>
                    </div>
                  </div>
                </Col>
                <Col
                  md={6}
                  sm={12}
                  xs={24}
                  className={`${style.secondColContainer} `}
                >
                  <div className={style.secondColWrapper}>
                    <div className={style.imgWrapper}>
                      <img src={constImages?.packageIcon} alt="" />
                    </div>
                    <div>
                      <p>Package Sold</p>
                      <p>
                        24 <RightOutlined />
                      </p>
                    </div>
                  </div>
                </Col>
              </Row>
            </Col>
            <Col span={24}>
              <Row>
                {reviewRatingArr?.map((item, index) => {
                  return (
                    <Col
                      key={index}
                      sm={12}
                      xs={24}
                      className={style.secondRowfirstColContainer}
                    >
                      <div className={style.secondRowfirstColWrapper}>
                        <div className={style.secondRowfirstColImgWrapper}>
                          <img src={item?.icon} alt="icons" />
                          <div>
                            <p>{item?.heading}</p>
                            <p>{item?.number}</p>
                          </div>
                        </div>
                        <div>
                          <span className={style.viewAllText}>
                            {item?.action}
                          </span>
                        </div>
                      </div>
                    </Col>
                  );
                })}
              </Row>
            </Col>
          </Row>
        </div>
      </div>
    ),
    [reviewRatingArr, animationBoxRef]
  );

  return (
    <>
      <div ref={initialSkrollRef} className={style.homePagePageContainer}>
        <div className={style.todaySessionWrapper}>
          <h1>Today Sessions</h1>
        </div>

        {eventBoxes}

        <div className={style.cardsMainContainer}>
          <div className={style.cardsWrapper}>
            <Row gutter={20} justify={"center"}>
              {Array(6)
                .fill(6)
                .map((item, index) => (
                  <Col lg={8} md={8}>
                    <CommonDashboardCards key={index} />
                  </Col>
                ))}
            </Row>
            <span className={style.viewAllText}>{SEN_VIEW_ALL_PLUS}</span>
          </div>
        </div>

        <div
          className={`${style.packageContainer} ${style.animatedCard} ${
            isVisible ? style.show : ""
          }`}
          ref={animationBoxRef}
        >
          <div className={style.packageWrapper}>
            <Row className={style.packageTitleContainer}>
              <Col span={12}>
                {" "}
                <h1>My Packages</h1>
              </Col>
              <Col span={12}>
                <div className={style.plusBtn}>
                  <span>+</span>
                </div>
              </Col>
            </Row>
            <Row>
              <PackagesTable
                tableData={getPackagesData}
                loading={isLoadingPackages}
              />
            </Row>
            <span className={style.viewAllText}>{SEN_VIEW_ALL_PLUS}</span>
          </div>
        </div>

        {accountAnalytics}

        <div
          className={`${style.inviteClientContainer} ${style.animatedCard} ${
            isVisible2 ? style.show : ""
          }`}
          ref={cardRef2nd}
        >
          <div className={style.inviteClientWrapper}>
            <Row className={style.clientCardsContainer}>
              <Col md={14}>
                <h1>Invite Client today</h1>
                <h4>Share link and help them get onboard.</h4>
                <div className={style.clientInputWrapper}>
                  <Input value={inviteLink} />{" "}
                  <CustomButton
                    title="Copy Link"
                    variant={LOWER_FILLED}
                    onClick={() => copyToClipboard(inviteLink)}
                  />
                </div>
              </Col>
              <Col md={10}>
                <div className={style.imgWrapper}>
                  <img
                    onClick={() => navigate(constRoute.home)}
                    src={constImages?.logo}
                    alt=""
                  />
                </div>
              </Col>
            </Row>
          </div>
        </div>
      </div>
      <div>
        <Footer />
      </div>
      <AnimationOnSkroll
        animationBoxRef={animationBoxRef}
        setIsVisible={setIsVisible}
        initialSkrollRef={initialSkrollRef}
      />
      <AnimationOnSkroll
        animationBoxRef={cardRef2nd}
        setIsVisible={setIsVisible2}
        initialSkrollRef={initialSkrollRef}
      />
    </>
  );
});

export default memo(Home);
