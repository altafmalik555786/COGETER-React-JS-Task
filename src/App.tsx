import { memo} from "react";
import "./App.scss";
import "./style.module.scss";
import DefaultLayout from "@components/layout";

function App() {

  return (
    <div
      style={{ position: "relative", overflowX: "hidden", minHeight:'100vh', backgroundColor:'#f5f5f5' }}
    >
        <DefaultLayout />
    </div>
  );
}

export default memo(App);
