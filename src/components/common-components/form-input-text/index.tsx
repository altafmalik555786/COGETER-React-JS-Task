import FormControl from "@mui/material/FormControl";
import { TextField } from "@mui/material";
import Style from "./style.module.scss";
import classNames from "classnames";
import { CAMEL_INPUT_GREY_LAYOUT } from "@utils/constants/props";

export const FormInputText = ({
  style,
  name,
  placeholder,
  value,
  label,
  type = "text",
  disabled,
  showError,
  errorMsg,
  onValueChange,
  size,
  variant,
  onClick,
  onFocus,
  className,
  colorVariant,
  multiline,
  width,
}: any) => {
  return (
    <>
      {showError ? (
        <FormControl
          className={className ? className : ""}
          fullWidth={width === undefined ? true : false}
          error
        >
          <TextField
            error
            helperText={errorMsg}
            label={label}
            name={name}
            disabled={disabled}
            size={size ? size : null}
            placeholder={placeholder}
            variant={variant ? variant : "standard"}
            type={type}
            value={value}
            onChange={onValueChange}
            onClick={onClick}
            onFocus={onFocus}
          />
        </FormControl>
      ) : (
        <FormControl
          className={className ? className : ""}
          fullWidth={width === undefined ? true : false}
        >
          <TextField
            style={style}
            className={classNames(
              colorVariant === CAMEL_INPUT_GREY_LAYOUT
                ? Style.greyLayout
                : Style.commonInputStyle
            )}
            label={label}
            name={name}
            disabled={disabled}
            multiline={multiline && true || false}
            placeholder={placeholder}
            size={size ? size : null}
            variant={variant ? variant : "standard"}
            type={type}
            value={value}
            onChange={onValueChange}
            onClick={onClick}
            onFocus={onFocus}
          />
        </FormControl>
      )}
    </>
  );
};
