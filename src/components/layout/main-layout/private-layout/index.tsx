import { memo } from "react";
import Routing from "../../../../router-service";
import { observer } from "mobx-react";
import style from "../../style.module.scss";
import Header from "./header";
import { Layout } from "antd";

const PrivateLayout = observer(() => {
  const {  Content } = Layout;

  return (
      <Layout className={style.layoutSetting}>
        <Layout>
          <Header />
          <Content className={style.routingPagesContainer}>
            <Routing />
          </Content>
        </Layout>
      </Layout>
  );
});
export default memo(PrivateLayout);
