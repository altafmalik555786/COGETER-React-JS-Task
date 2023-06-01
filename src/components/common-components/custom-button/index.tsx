import React, { memo } from "react";
import { Button } from "antd";
import style from "./style.module.scss";
import { ButtonType, ButtonShape, ButtonHTMLType } from "antd/lib/button";
import { SizeType } from "antd/lib/config-provider/SizeContext";
import classNames from "classnames";
import useFitText from "use-fit-text";
import { observer } from "mobx-react";
import { LOWER_OUTLINED } from "@utils/constants/props";

export interface buttonProps {
  className?: string;
  block?: boolean;
  danger?: boolean;
  disabled?: boolean;
  ghost?: boolean;
  href?: string;
  variant?: string;
  htmlType?: ButtonHTMLType;
  icon?: React.ReactNode;
  loading?: boolean;
  endData?: any;
  startData?: any;
  shape?: ButtonShape;
  size?: SizeType;
  target?: string;
  type?: ButtonType;
  title?: string;
  onClick?: React.MouseEventHandler<HTMLElement>;
}

const CustomButton = observer((props: buttonProps) => {
  const { fontSize, ref } = useFitText();

  return (
      <Button
        className={classNames(
          props.variant === LOWER_OUTLINED
            ? style.outLinedCommonButton
            : style.filledCommonButton,
          props.className
        )}
        block={props.block}
        danger={props.danger}
        disabled={props.disabled || props.loading}
        ghost={props.ghost}
        href={props.href}
        htmlType={props.htmlType}
        icon={props.icon}
        loading={props.loading}
        shape={props.shape}
        size={props.size}
        target={props.target}
        type={props.type}
        onClick={props.onClick}
      >
        <div ref={ref} style={{ fontSize }} className={style.textContainer}>
          {props.startData || ""} {props.title} {props.endData || ""}
        </div>
      </Button>
  );
});

export default memo(CustomButton);
