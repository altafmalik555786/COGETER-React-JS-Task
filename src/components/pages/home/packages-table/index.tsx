import { observer } from "mobx-react";
import { memo } from "react";
import style from "./style.module.scss";
import Table from "@components/common-components/table";
import { EyeFilled, StarFilled } from "@ant-design/icons";
import CustomButton from "@components/common-components/custom-button";
import { renderItemDataOrEmptyNull } from "@utils/common-functions";
import {
  CAMEL_AVERAGE_RATING,
  CAMEL_COST_PER_SESSION,
  CAMEL_IS_PUBLISHED,
  CAP_ACTION,
  CAP_PRICE,
  CAP_RATING,
  CAP_STATUS,
} from "@utils/constants/table-columns";
import { LOWER_OUTLINED } from "@utils/constants/props";
import { CAP_VIEW } from "@utils/constants/button";

interface Props {
  tableData?: any;
  loading?: boolean;
}
const PackagesTable: React.FC<Props> = observer(
  ({ tableData, loading, ...props }) => {
    const columns = [
      {
        title: "Package details",
        dataIndex: "",
        render: (_, rowData) => (
          <div className={style.packageDetailWrapper}>
            {" "}
            <img src={rowData?.files[0]?.file} alt="img" />{" "}
            <span> {renderItemDataOrEmptyNull(rowData?.title)} </span>
          </div>
        ),
      },
      {
        title: "price per session",
        render: (_, rowData) => {
          let pricePerSession = rowData?.grandTotal / rowData?.totalSession
          return pricePerSession?.toFixed(2)
        },
      },
      {
        title: CAP_STATUS,
        dataIndex: CAMEL_IS_PUBLISHED,
        render: (text) => (
          <div
            className={
              (text && style.statusPublished) || style.statusUnpublished
            }
          >
            <ul>
              <li>
                <span> {(text && "Published") || "Unpublished"} </span>
              </li>
            </ul>
          </div>
        ),
      },
      {
        title: CAP_RATING,
        dataIndex: CAMEL_AVERAGE_RATING,
        render: (text) => (
          <div className={style.ratingWrapper}>
            <StarFilled style={{ color: "yellow" }} />
            <span className={style.valuesWrapper}>
              {" "}
              {renderItemDataOrEmptyNull(text)}{" "}
            </span>
          </div>
        ),
      },
      {
        title: CAP_PRICE,
        dataIndex: CAMEL_COST_PER_SESSION,
        render: (_, rowData) => (
          <div className={style.priceWrapper}>
            <span>
              {renderItemDataOrEmptyNull(rowData?.currency) +
                " " +
                renderItemDataOrEmptyNull(rowData?.costPerSession)}
            </span>
          </div>
        ),
      },
      {
        title: CAP_ACTION,
        width: 100,
        render: (_) => (
          <div className={style.actionWrapper}>
            <CustomButton
              variant={LOWER_OUTLINED}
              title={CAP_VIEW}
              icon={<EyeFilled className={style.eyeIcon} />}
            />
          </div>
        ),
      },
    ];

    return (
      <div className={style.mainPackagesTableWrapper}>
        <Table
          checkPagination={false}
          dataSource={tableData}
          loading={loading}
          columns={columns}
        />
      </div>
    );
  }
);

export default memo(PackagesTable);
