import classNames from "classnames";
import { Modal } from "antd";
import React from "react";
import CustomButton from "../custom-button";
import style from "./style.module.scss";
import { LOWER_FILLED, LOWER_OUTLINED } from "@utils/constants/props";
import { CAP_CANCEL, CAP_CONFIRM } from "@utils/constants/button";

interface ModalPropsTypes {
  setIsOpen?: (value) => void;
  title?: string;
  confirmBtnTitle?: string;
  cancelBtnTitle?: string;
  description?: string;
  warningText?: string;
  isOpen?: boolean;
  onConfirm?: () => void;
  loadingConfirmBtn?: boolean;
  onCancel?: (value) => void;
}
export const ConfirmationModal: React.FC<ModalPropsTypes> = ({
  onConfirm,
  isOpen,
  onCancel,
  warningText = "This action cannot be undo",
  description = "",
  confirmBtnTitle = CAP_CONFIRM,
  cancelBtnTitle = CAP_CANCEL,
  loadingConfirmBtn = false,
}) => {
  return (
    <Modal
      onCancel={onCancel}
      closable={false}
      open={isOpen}
      className={classNames(style.confirmationModal)}
      footer={
        <div className={style.footerBtnWrapper}>
          <CustomButton
            onClick={onCancel}
            variant={LOWER_OUTLINED}
            title={cancelBtnTitle}
          />
          <CustomButton
            onClick={onConfirm}
            variant={LOWER_FILLED}
            title={confirmBtnTitle}
            loading={loadingConfirmBtn}
          />
        </div>
      }
    >
      <div className={style.modalBodyContent}>
        <p> {description} </p>
        <p className={style.warningText}> {warningText} </p>
      </div>
    </Modal>
  );
};
