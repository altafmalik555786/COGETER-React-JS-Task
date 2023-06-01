import Login from "@components/layout/main-layout/public-layout/login";
import CreatePackage from "@components/pages/create-package";
import Home from "@components/pages/home";
import { constRoute } from "@utils/route";
import { memo } from "react";
import { Route, Routes } from "react-router-dom";

const Routing = () => {
  return (
    <>
      <Routes>
        <Route path={constRoute?.login} element={<Login />} />        
        <Route path={constRoute?.home} element={<Home />} />
        <Route path={constRoute?.createPackage} element={<CreatePackage />} />
      </Routes>
    </>
  );
};
export default memo(Routing); 
