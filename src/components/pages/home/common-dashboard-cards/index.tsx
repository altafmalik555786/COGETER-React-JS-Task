import { observer } from "mobx-react";
import { memo, useRef, useEffect, useState } from "react";
import style from "./style.module.scss";
import { FieldTimeOutlined } from "@ant-design/icons";
import { constImages } from "@utils/images";

interface Props {}
const CommonDashboardCards: React.FC<Props> = observer(({ ...props }) => {
  const cardRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      const element = cardRef.current;
      const rect = element.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      if (
        rect.top < windowHeight * 0.8 &&
        rect.bottom > 0 &&
        rect.top < windowHeight
      ) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  return (
    <div className={style.mainWrapper}>
      <div className={`${style.mainCard} ${ style.animatedCard} ${isVisible ? style.show : ''}`}  ref={cardRef}>
        <h1>Piff Jinkeins</h1>
        <p>Boxing-session - Learn Quickly</p>
        <p>Session 3 of 5</p>
        <div className={style.dateTimeWrapper}>
          <span>
            <FieldTimeOutlined /> Tue, 20 MAY
          </span>{" "}
          <span>
            <FieldTimeOutlined /> 11:00 AM
          </span>
        </div>
        <hr className={style.hrow} />
        <div className={style.messageWrraper}>
          <img src={constImages?.messageIcon} alt="" />
          <span>Message</span>
        </div>
      </div>
    </div>
  );
});

export default memo(CommonDashboardCards);
