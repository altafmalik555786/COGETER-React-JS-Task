import { constRoute } from "@utils/route";
import { Dropdown, Menu, Row, Space } from "antd";
import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { DownOutlined, MenuOutlined } from "@ant-design/icons";
import useWindowSize from "@utils/hooks/useWindowSize";
import type { MenuProps } from "antd";
import style from "./style.module.scss";
import { observer } from "mobx-react";
import { resetStore, useStore } from "@stores/root-store";
import { constImages } from "@utils/images";
import {
  CURRENT_PAGE_ROUTE_URL,
  JWT_AUTH_ACCESS_TOKEN,
} from "@utils/constants/important";
import CustomButton from "@components/common-components/custom-button";
import { LOWER_OUTLINED } from "@utils/constants/props";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import { CAP_CHAT, CAP_HOME, CAP_SESSIONS } from "@utils/constants/text";
import LogoutIcon from "@mui/icons-material/Logout";
import {
  onLogOutClearAll,
  renderItemDataOrEmptyNull,
} from "@utils/common-functions";

const Header = observer(() => {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const [current, setCurrent] = useState(
    localStorage.getItem(CURRENT_PAGE_ROUTE_URL) || "/"
  );
  const {
    user: { getUserInfo },
  } = useStore(null);
  const onLogout = () => {
    onLogOutClearAll(navigate);
  };
  const data = useWindowSize().width;
  useEffect(() => {
    if (data < 940) {
      setCollapsed(true);
    } else {
      setCollapsed(false);
    }
  }, [data]);

  useEffect(() => {
    if (!localStorage.getItem(JWT_AUTH_ACCESS_TOKEN)) {
      navigate(constRoute.login);
    }
  }, []);

  const items: MenuProps["items"] = [
    {
      label: CAP_HOME,
      key: constRoute?.home,
    },
    {
      label: CAP_SESSIONS,
      key: constRoute?.sessions,
    },
    {
      label: CAP_CHAT,
      key: constRoute.chat,
    },
    {
      label: "Menu",
      key: "SubMenu",
      expandIcon: <DownOutlined style={{ marginLeft: "5px" }} />,
      children: [
        {
          label: "My Packages",
          key: constRoute?.myPackages,
        },
        {
          label: "Create Package",
          key: constRoute?.createPackage,
        },
        {
          label: "My Clients",
          key: constRoute?.myClients,
        },
        {
          label: "Transection History",
          key: constRoute?.transectionHistory,
        },
      ],
    },
  ];

  const onClick: MenuProps["onClick"] = (e) => {
    localStorage?.setItem(CURRENT_PAGE_ROUTE_URL, e?.key);
    setCurrent(e.key);
    navigate(e.key);
  };

  const dropdownMenu = (
    <div className={style.profileDropDonwMenu}>
      <div className={style.userData}>
        <b
          style={{ textTransform: "capitalize" }}
        >{`${renderItemDataOrEmptyNull(
          getUserInfo?.firstName
        )}  ${renderItemDataOrEmptyNull(getUserInfo?.lastName)}`}</b>
        <p>{renderItemDataOrEmptyNull(getUserInfo?.email)}</p>
      </div>

      <Menu>
        <Menu.Item className={style.itemWithImgIcon} onClick={onLogout}>
          <LogoutIcon />
          Logout
        </Menu.Item>
      </Menu>
    </div>
  );

  const styles = { background: `linear-gradient(to right,#00c5fb, 0%, 100%)` };

  const menuMemoized = useMemo(
    () =>
      !collapsed && (
        <Menu
          onClick={onClick}
          selectedKeys={[current]}
          mode={data > 576 ? "horizontal" : "vertical"}
          className={style.menuHeader}
          inlineCollapsed={false}
          items={items}
        />
      ),
    [collapsed, items]
  );

  return (
    <div className={style.topHeaderBar}>
      <div
        className={style.headerContainer}
        style={{ right: "0px", ...styles }}
      >
        <div className={style.headerMenuContainer}>
          {/* {(data < 940 ) && ( */}
          <MenuOutlined
            onClick={() => setCollapsed(!collapsed)}
            className={style.menuOutlinedIcon}
          />
          {/* )} */}
          <Link
            className={style.welcomeText}
            to={constRoute?.home}
            onClick={() => {
              setCurrent("/home");
            }}
          >
            <img src={constImages?.logo} alt="logo" />
          </Link>
        </div>

        {menuMemoized}

        <ul className={style.rightMenuHeader}>
          <li className={style.userProfileDropDownContainer}>
            <NotificationsNoneIcon className={style.betIconHeader} />
            <CustomButton
              className={style.switchToTraining}
              title={"Switch to training"}
              variant={LOWER_OUTLINED}
            />

            <Row className={style.userProfileDropDownWrapper}>
              <Dropdown overlay={dropdownMenu} trigger={["click"]}>
                <a onClick={(e) => e.preventDefault()}>
                  <Space className={style.spaceUserProfile}>
                    <img
                      src={
                        getUserInfo?.avatar
                          ? getUserInfo?.avatar
                          : constImages?.profileAvatar
                      }
                      alt=""
                    />
                  </Space>
                </a>
              </Dropdown>
            </Row>
          </li>
        </ul>
      </div>
    </div>
  );
});

export default Header;
