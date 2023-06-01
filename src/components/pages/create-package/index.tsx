import { Col, Radio, Row, Space, Spin, Steps } from "antd";
import { memo, useEffect, useState } from "react";
import style from "./style.module.scss";
import useWindowSize from "@utils/hooks/useWindowSize";

import {
  CAMEL_INPUT_GREY_LAYOUT,
  CAMEL_LOCATION_TYPE,
  LOWER_AREA,
  LOWER_CITY,
  LOWER_COUNTRY,
  LOWER_DESCRIPTION,
  LOWER_FILLED,
  LOWER_HORIZONTAL,
  LOWER_NUMBER,
  LOWER_OUTLINED,
  LOWER_SUBMIT,
  LOWER_TITLE,
  LOWER_VALIDITY,
  LOWER_VERTICAL,
} from "@utils/constants/props";
import { observer } from "mobx-react";
import { useForm } from "react-hook-form";
import { FormInputText } from "@components/common-components/form-input-text";
import CustomButton from "@components/common-components/custom-button";
import { CAP_CANCEL, CAP_SAVE_AND_NEXT } from "@utils/constants/button";
import { constImages } from "@utils/images";
import { useStore } from "@stores/root-store";
import { useNavigate } from "react-router-dom";
import { constRoute } from "@utils/route";
import { FormControl, MenuItem, TextField } from "@mui/material";
import outLinedStyle from "@commonComponents/form-input-text/style.module.scss";
import { renderItemDataOrEmptyNull } from "@utils/common-functions";

const defaultValues = {
  title: "",
  locationType: "",
  description: "",
  noSessions: "",
  validity: "",
  country: "",
  coachingType: "",
  category: "",
  city: "",
  area: "",
  addressLine: "",
};

const initialServerError = {
  title: [],
  locationType: [],
  description: [],
  noSessions: [],
  validity: [],
  coachingType: [],
  category: [],
  country: [],
  city: [],
  area: [],
  addressLine: [],
  serverError: "",
};

const CreatePackage = observer(() => {
  const { control } = useForm();
  const navigate = useNavigate();
  const [current, setCurrent] = useState(0);
  const { width } = useWindowSize();
  const [formValues, setFormValues] = useState(defaultValues);
  const [errors, setErrors] = useState(initialServerError);
  const [categoriesValue, setCategoriesValue] = useState(null);
  const [currentCategoriesValue, setCurrentCategoriesValue] = useState("");

  const {
    packages: {
      createPackages,
      isLoadingCreatingPackages,
      loadCategories,
      getCategoriesData,
      isLoadingGettingCategories,
    },
  } = useStore(null);

  useEffect(() => {
    if (getCategoriesData === null) {
      loadCategories();
    }
  }, []);

  const onChange = (value: number) => {
    setCurrent(value);
  };

  const onHandleSubmit = (e) => {
    e.preventDefault();

    let payload = {
      title: formValues?.title,
      categoryId: "5cdfca13-0dbe-4d47-acc8-cf06312ea93b",
      description: formValues?.description,
      totalSession: formValues?.noSessions,
      sessionDuration: 60,
      costPerSession: 100,
      validity: formValues?.validity,
      discount: 0,
      coachingType: formValues?.coachingType,
      locationType: formValues?.locationType,
      Latitude: "73.0330018",
      longitude: "33.6425917",
      locationDetails: {
        country: "pakistan",
        city: "islamabad",
        area: "i 10 markaz",
        address: "near Cant",
      },
      files: [
        {
          file: "dnc//dwcnn",
          fileType: "cover",
        },
        {
          file: "d,hc//",
          fileType: "image",
        },
        {
          file: "fjhbklw//",
          fileType: "image",
        },
        {
          file: "fjhbklw//",
          fileType: "video",
        },
      ],
    };

    if (
      formValues.title &&
      formValues.title !== "" &&
      formValues.noSessions &&
      formValues.noSessions !== ""
    ) {
      createPackages(payload).then((res) => {
        if (res?.statusCode === 200) {
          navigate(constRoute?.home);
        }
      });
    } else {
      const isTitleNull = !formValues?.title;
      const isPasswordNull = !formValues?.noSessions;
      const errorList = {
        title: isTitleNull ? ["Title field is required"] : [],
        noSessions: isPasswordNull ? ["No. of Sessions field is required"] : [],
        serverError: "",
      };
      setErrors({ ...errors, ...errorList });
    }
  };

  useEffect(() => {
    const initialValues = { ...formValues };
    initialValues.country = "Pakistan";
    setFormValues(initialValues);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const coachingTypeList = [
    {
      value: "Inperson",
      label: "Person",
    },
    {
      value: "Insession",
      label: "Session",
    },
    {
      value: "Ingrouping",
      label: "Grouping",
    },
    {
      value: "Inclass",
      label: "Class",
    },
  ];

  return (
    <div className={style.createPackageContainer}>
      <div className={style.createPackageContentFluid}>
        <div className={style.createPackageInnerContentFluid}>
          <Row>
            <Col span={24}>
              <Steps
                current={current}
                onChange={onChange}
                className={style.antDStepper}
                direction={width < 780 ? LOWER_VERTICAL : LOWER_HORIZONTAL}
                items={[
                  {
                    title: "Step 1",
                    description: "Add Package Info",
                  },
                  {
                    title: "Step 2",
                    description: "Package Gallery",
                  },
                  {
                    title: "Step 3",
                    description: "Package Cost",
                  },
                ]}
              />
            </Col>
          </Row>

          <div className={style.formContainer}>
            <form onSubmit={onHandleSubmit} className={style.createPackageForm}>
              <Row gutter={40}>
                <Col md={12} sm={24} xs={24}>
                  <Row>
                    <Col
                      onClick={() => {
                        setErrors({ ...errors, ...{ title: [] } });
                      }}
                      span={24}
                    >
                      <FormInputText
                        className={style.FormStyle}
                        style={{ position: "relative" }}
                        onValueChange={(e) => {
                          handleInputChange(e);
                        }}
                        value={formValues.title}
                        name={LOWER_TITLE}
                        label={"Title"}
                        variant={LOWER_OUTLINED}
                        colorVariant={CAMEL_INPUT_GREY_LAYOUT}
                        control={control}
                        showError={errors?.title?.length > 0 ? true : false}
                        errorMsg={errors.title.join("")}
                      />
                      <div className={style.rightText}>0/100</div>
                    </Col>
                  </Row>
                  <FormInputText
                    className={style.FormStyle}
                    style={{ position: "relative" }}
                    onValueChange={(e) => {
                      handleInputChange(e);
                      setErrors({ ...errors, ...{ description: [] } });
                    }}
                    value={formValues.description}
                    name={LOWER_DESCRIPTION}
                    label={"Description"}
                    control={control}
                    variant={LOWER_OUTLINED}
                    multiline
                    colorVariant={CAMEL_INPUT_GREY_LAYOUT}
                    showError={errors?.description?.length > 0 ? true : false}
                    errorMsg={errors.description.join("")}
                  />
                  <Row>
                    <Col span={24}>
                      <FormInputText
                        className={style.FormStyle}
                        style={{ position: "relative" }}
                        onValueChange={(e) => {
                          handleInputChange(e);
                        }}
                        value={formValues.noSessions}
                        name={"noSessions"}
                        label={"No. of Sessions"}
                        variant={LOWER_OUTLINED}
                        onClick={() => {
                          setErrors({ ...errors, ...{ noSessions: [] } });
                        }}
                        type={LOWER_NUMBER}
                        colorVariant={CAMEL_INPUT_GREY_LAYOUT}
                        control={control}
                        showError={
                          errors?.noSessions?.length > 0 ? true : false
                        }
                        errorMsg={errors.noSessions.join("")}
                      />
                      <div className={style.rightText}> Sessions </div>
                    </Col>
                  </Row>
                  <Row>
                    <Col span={24}>
                      <FormInputText
                        className={style.FormStyle}
                        style={{ position: "relative" }}
                        onValueChange={(e) => {
                          handleInputChange(e);
                          setErrors({ ...errors, ...{ validity: [] } });
                        }}
                        value={formValues.validity}
                        name={LOWER_VALIDITY}
                        label={"Validity"}
                        type={LOWER_NUMBER}
                        variant={LOWER_OUTLINED}
                        colorVariant={CAMEL_INPUT_GREY_LAYOUT}
                        control={control}
                        showError={errors?.validity?.length > 0 ? true : false}
                        errorMsg={errors.validity.join("")}
                      />
                      <div className={style.rightText}> Weeks </div>
                    </Col>
                  </Row>
                </Col>

                <Col className={style.leftForm} md={12} sm={24} xs={24}>
                  <FormControl fullWidth>
                    <span className={style.categoriesValue}>
                      {currentCategoriesValue}
                    </span>

                    <TextField
                      select
                      fullWidth
                      name="categoryId"
                      label="Category"
                      value={currentCategoriesValue}
                      className={outLinedStyle.greyLayout}
                    >
                      <div className={style.selectBoxPopupCategories}>
                        {(isLoadingGettingCategories && (
                          <div className={style.loaderContainer}>
                            <Spin />
                          </div>
                        )) || (
                            <Row>
                              <Col span={24}>
                                <TextField
                                  id="outlined-basic"
                                  label="Search"
                                  fullWidth
                                  className={style.searchInput}
                                  variant="outlined"
                                />
                              </Col>
                              <Col span={24}>
                                <Radio.Group
                                  onChange={(e) => {
                                    const event = {
                                      target: {
                                        name: "categoryId",
                                        value: e.target.value,
                                      },
                                    };
                                    setCategoriesValue(e.target.value);
                                    handleInputChange(event);
                                    setErrors({
                                      ...errors,
                                      ...{ validity: [] },
                                    });
                                  }}
                                  value={categoriesValue}
                                >
                                  <Space direction="vertical">
                                    {getCategoriesData?.length > 0 &&
                                      getCategoriesData?.map((option) => (
                                        <div
                                          onClick={() =>
                                            setCurrentCategoriesValue(
                                              option?.title
                                            )
                                          }
                                        >
                                          <Radio value={option?.id}>
                                            {" "}
                                            {renderItemDataOrEmptyNull(
                                              option?.title
                                            )}{" "}
                                          </Radio>
                                        </div>
                                      ))}
                                  </Space>
                                </Radio.Group>
                              </Col>
                            </Row>
                          ) || (
                            <div className={style.loaderContainer}>
                              <span>No Data</span>
                            </div>
                          )}
                      </div>
                    </TextField>
                  </FormControl>
                </Col>
              </Row>

              <p className={style.horizontalLine}></p>

              <Row className={style.coacingAndLocationRow} gutter={40}>
                <Col md={12} sm={24} xs={24}>
                  <FormControl fullWidth>
                    <TextField
                      select
                      fullWidth
                      name="coachingType"
                      label="Coaching Type"
                      className={outLinedStyle.greyLayout}
                      defaultValue="Inperson"
                      style={{ color: "white" }}
                      value={formValues?.coachingType}
                      onChange={(e) => {
                        handleInputChange(e);
                      }}
                    >
                      {coachingTypeList.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </TextField>
                  </FormControl>
                </Col>
                <Col md={12} sm={24} xs={24}>
                  <FormInputText
                    className={style.FormStyle}
                    style={{ position: "relative" }}
                    onValueChange={(e) => {
                      handleInputChange(e);
                    }}
                    value={formValues.locationType}
                    name={CAMEL_LOCATION_TYPE}
                    label={"Location Type"}
                    control={control}
                    variant={LOWER_OUTLINED}
                    colorVariant={CAMEL_INPUT_GREY_LAYOUT}
                    showError={errors?.locationType?.length > 0 ? true : false}
                    errorMsg={errors.locationType.join("")}
                  />
                </Col>
              </Row>

              <Row className={style.locationLine}>
                <Col lg={3} md={4} sm={4} xs={8}>
                  <span className={style.locationText}>Location</span>
                </Col>
                <Col lg={15} md={14} sm={8} xs={0}>
                  <p className={style.horizontalLine}></p>
                </Col>
                <Col lg={6} md={6} sm={10} xs={16}>
                  <div className={style.choosefromMap}>
                    <img src={constImages?.mapIcon} alt="icon" />{" "}
                    <span>Choose from map</span>
                  </div>
                </Col>
              </Row>

              <Row gutter={20}>
                <Col md={8} sm={24} xs={24}>
                  <FormInputText
                    className={style.FormStyle}
                    style={{ position: "relative" }}
                    onValueChange={(e) => {
                      handleInputChange(e);
                    }}
                    value={formValues?.country}
                    name={LOWER_COUNTRY}
                    label={"Country"}
                    control={control}
                    variant={LOWER_OUTLINED}
                    colorVariant={CAMEL_INPUT_GREY_LAYOUT}
                    showError={errors?.country?.length > 0 ? true : false}
                    errorMsg={errors.country.join("")}
                  />
                </Col>
                <Col md={8} sm={24} xs={24}>
                  <FormInputText
                    className={style.FormStyle}
                    style={{ position: "relative" }}
                    onValueChange={(e) => {
                      handleInputChange(e);
                    }}
                    value={formValues.city}
                    name={LOWER_CITY}
                    label={"City"}
                    control={control}
                    variant={LOWER_OUTLINED}
                    colorVariant={CAMEL_INPUT_GREY_LAYOUT}
                    showError={errors?.city?.length > 0 ? true : false}
                    errorMsg={errors.city.join("")}
                  />
                </Col>
                <Col md={8} sm={24} xs={24}>
                  <FormInputText
                    className={style.FormStyle}
                    style={{ position: "relative" }}
                    onValueChange={(e) => {
                      handleInputChange(e);
                    }}
                    value={formValues.area}
                    name={LOWER_AREA}
                    label={"Area"}
                    control={control}
                    variant={LOWER_OUTLINED}
                    colorVariant={CAMEL_INPUT_GREY_LAYOUT}
                    showError={errors?.area?.length > 0 ? true : false}
                    errorMsg={errors.area.join("")}
                  />
                </Col>
              </Row>
              <Row>
                <Col span={24}>
                  <FormInputText
                    className={style.FormStyle}
                    style={{ position: "relative" }}
                    onValueChange={(e) => {
                      handleInputChange(e);
                    }}
                    value={formValues.addressLine}
                    name={"addressLine"}
                    label={"Address Line"}
                    control={control}
                    variant={LOWER_OUTLINED}
                    colorVariant={CAMEL_INPUT_GREY_LAYOUT}
                    showError={errors?.addressLine?.length > 0 ? true : false}
                    errorMsg={errors.addressLine.join("")}
                  />
                </Col>
              </Row>
              <Row className={style.footerBtnsContainer}>
                <CustomButton
                  className={style.saveAndNextBtn}
                  variant={LOWER_FILLED}
                  htmlType={LOWER_SUBMIT}
                  title={CAP_SAVE_AND_NEXT}
                  loading={isLoadingCreatingPackages}
                />
                <div className={style.cancelBtnContainer}>
                  <span
                    onClick={() => navigate(constRoute?.home)}
                    className={style.cancelBtn}
                  >
                    {CAP_CANCEL}
                  </span>
                </div>
              </Row>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
});

export default memo(CreatePackage);
