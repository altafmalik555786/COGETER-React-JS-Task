import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { constRoute } from "@utils/route";
import PrivateLayout from "./main-layout/private-layout";
import PublicLayout from "./main-layout/public-layout";
import WholePageLoader from "@components/common-components/whole-page-loader";
import { CURRENT_PAGE_ROUTE_URL, JWT_AUTH_ACCESS_TOKEN } from "@utils/constants/important";

const DefaultLayout = observer(() => {
  const navigate = useNavigate();
  const [isToken, setIsToken] = useState(
    localStorage.getItem(JWT_AUTH_ACCESS_TOKEN)
  );
  useEffect(() => {
    if (localStorage.getItem(JWT_AUTH_ACCESS_TOKEN)?.length > 0) {
      setIsToken(localStorage.getItem(JWT_AUTH_ACCESS_TOKEN));
      if (localStorage.getItem(CURRENT_PAGE_ROUTE_URL)) {
        navigate(localStorage.getItem(CURRENT_PAGE_ROUTE_URL));
      } else {
        navigate(constRoute?.home);
      }
    } else {
      localStorage.removeItem(JWT_AUTH_ACCESS_TOKEN);
      navigate(constRoute?.login);
      setIsToken("");
    }
  }, [localStorage.getItem(JWT_AUTH_ACCESS_TOKEN)]);
  return (
    (isToken === null && <WholePageLoader />) ||
    (isToken && <PrivateLayout />) || <PublicLayout />
  );
});

export default DefaultLayout;
