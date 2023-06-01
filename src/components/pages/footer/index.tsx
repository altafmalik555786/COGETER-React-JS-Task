import style from "./style.module.scss";
import CopyrightIcon from "@mui/icons-material/Copyright";
import { Link, useNavigate } from "react-router-dom";
import { constRoute } from "@utils/route";
import {
  CAP_CURRENCY,
  CAP_PRIVACY_POLICY,
  CAP_SUPPORT,
  CAP_TERMS_AND_CONDITIONS,
  UPPER_AED,
} from "@utils/constants/text";
import { memo } from "react";
import { observer } from "mobx-react";
import { constImages } from "@utils/images";
import { useStore } from "@stores/root-store";

const Footer = observer(() => {
  const {
    user: { getUserInfo },
  } = useStore(null);

  const navigate = useNavigate();

  return (
    <div className={style.footerContainer}>
      <div className={style.footerContentFluid}>
        <div className={style.footerLeftSide}>
          <img
            src={constImages?.logo}
            alt="Logo"
            onClick={() => navigate(constRoute?.home)}
          />
          <span className={style.logoCopyright2022}>
            <h2>COGETER</h2>
            <span className={style.copyright2022}>
              <CopyrightIcon /> <span>2022</span>
            </span>
          </span>
          <div className={style.footerLinks}>
            <Link to={constRoute?.hash}> {CAP_TERMS_AND_CONDITIONS} </Link>
            <Link to={constRoute?.hash}> {CAP_PRIVACY_POLICY} </Link>
          </div>
        </div>
        <div className={style.footerRightSide}>
          <span className={style.footerCurrency}>
            {" "}
            {CAP_CURRENCY}: {getUserInfo?.currency || UPPER_AED + " >"}{" "}
          </span>
          <Link to={constRoute?.hash}> {CAP_SUPPORT} </Link>
        </div>
      </div>
    </div>
  );
});

export default memo(Footer);
