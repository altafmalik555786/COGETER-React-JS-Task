import { observer } from "mobx-react";
import { memo, useMemo, useState } from "react";
import style from "./style.module.scss";
import { useStore } from "@stores/root-store";
import { Link, useNavigate } from "react-router-dom";
import { Col, Row } from "antd";
import { constImages } from "@utils/images";
import { useForm } from "react-hook-form";
import { constRoute } from "@utils/route";
import CustomButton from "@components/common-components/custom-button";
import {
  LOWER_EMAIL,
  LOWER_FILLED,
  LOWER_OUTLINED,
  LOWER_PASSWORD,
  LOWER_TEXT,
} from "@utils/constants/props";
import { CAP_LOGIN_IN, CAP_SIGN_UP } from "@utils/constants/button";
import { LOWER_SUBMIT } from "@utils/constants/props";
import { FormInputText } from "@components/common-components/form-input-text";
import { IconButton } from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { DONT_HAVE_AN_ACCOUNT_QUESTION_TEXT } from "./constant";

type FormValues = {
  email: string;
  password: string;
};

const defaultValues = {
  email: "",
  password: "",
};

const initialServerError = {
  email: [],
  password: [],
  serverError: "",
};

const Login = observer(() => {
  const { control } = useForm<FormValues>();
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState(defaultValues);
  const [errors, setErrors] = useState(initialServerError);
  const [showPassword, setShowPassword] = useState(true);
  const [passwordType, setPasswordType] = useState(LOWER_PASSWORD);

  const {
    user: { onUserLogin, isLoadingLogin },
  } = useStore(null);

  const imageSideContent = useMemo(
    () => (
      <div className={style.logoTitleContainer}>
        <img src={constImages?.logo} />
        <h2>COGETER</h2>
      </div>
    ),
    []
  );

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const ShowPassword = () => {
    setPasswordType(LOWER_TEXT);
    setShowPassword(false);
  };

  const HidePassword = () => {
    setPasswordType(LOWER_PASSWORD);
    setShowPassword(true);
  };

  const onHandleSubmit = (e) => {
    e.preventDefault();
    if (
      formValues.email &&
      formValues.email !== "" &&
      formValues.password &&
      formValues.password !== ""
    ) {
      onUserLogin(formValues, navigate);
    } else {
      const isEmail = !formValues?.email;
      const isPassword = !formValues?.password;
      const errorList = {
        email: isEmail ? ["Email field is required"] : [],
        password: isPassword ? ["Password field is required"] : [],
        serverError: "",
      };
      setErrors({ ...errors, ...errorList });
    }
  };

  return (
    <div className={style.mainLoginWrraper}>
      <Row className={style.mainLoginWrraperFluid}>
        <Col lg={12} xs={24}>
          <Row className={style.imageSide}>{imageSideContent}</Row>
        </Col>
        <Col lg={12} xs={24}>
          <Row className={style.formSide}>
            <Row className={style.topBtnBar}>
              <Link to={constRoute?.login}>
                {DONT_HAVE_AN_ACCOUNT_QUESTION_TEXT}
              </Link>
              <CustomButton variant={LOWER_FILLED} title={CAP_SIGN_UP} />
            </Row>

            <Row className={style.formContainerWrapper}>
              <div className={style.formContainer}>
                <h1>Hello! Welcome back.</h1>
                <h4>Login with email and password</h4>

                <form onSubmit={onHandleSubmit} className={style.LoginForm}>
                  <FormInputText
                    className={style.FormStyle}
                    style={{ position: "relative" }}
                    onValueChange={(e) => {
                      handleInputChange(e);
                      setErrors({ ...errors, ...{ email: [] } });
                    }}
                    value={formValues.email}
                    name={LOWER_EMAIL}
                    label={"Email"}
                    control={control}
                    variant={LOWER_OUTLINED}
                    showError={errors?.email?.length > 0 ? true : false}
                    errorMsg={errors.email.join("")}
                  />

                  <Row>
                    <Col span={24}>
                      <div className={style.password}>
                        <FormInputText
                          className={style.FormStyle}
                          style={{ position: "relative" }}
                          onValueChange={(e) => {
                            handleInputChange(e);
                            setErrors({ ...errors, ...{ password: [] } });
                          }}
                          type={passwordType}
                          name={LOWER_PASSWORD}
                          label={"Password"}
                          variant={LOWER_OUTLINED}
                          control={control}
                          showError={
                            errors?.password?.length > 0 ? true : false
                          }
                          errorMsg={errors.password.join("")}
                        />
                        <div className={style.eyeIcon}>
                          {showPassword ? (
                            <IconButton onClick={() => ShowPassword()}>
                              <VisibilityOff
                                style={{ height: "20px", color: "white" }}
                              />
                            </IconButton>
                          ) : (
                            <IconButton onClick={() => HidePassword()}>
                              <Visibility
                                style={{ height: "20px", color: "white" }}
                              />
                            </IconButton>
                          )}
                        </div>
                      </div>
                    </Col>
                  </Row>

                  <div className={style.forgetPassword}>
                    <Link to={constRoute?.hash}>Forget Password</Link>
                  </div>

                  <CustomButton
                    title={CAP_LOGIN_IN}
                    htmlType={LOWER_SUBMIT}
                    className={style.loginBtn}
                    loading={isLoadingLogin}
                  />
                </form>

                <div className={style.aTagSignupContainer}>
                  <Link to={constRoute?.login}>
                    {DONT_HAVE_AN_ACCOUNT_QUESTION_TEXT}{" "}
                    <span>{CAP_SIGN_UP}</span>
                  </Link>
                </div>
              </div>
            </Row>
          </Row>
        </Col>
      </Row>
    </div>
  );
});

export default memo(Login);
