import {
  Button,
  FormControlLabel,
  Grid,
  InputBase,
  MenuItem,
  Paper,
  Radio,
  RadioGroup,
  Select,
  TextField,
} from "@mui/material";
import { InputWithLabel } from "../../../core/inputWithLabel/inputWithLabel.component";
import { ReactComponent as SelectIcon } from "../../../assets/selectIcon.svg";
import InputMask from "react-input-mask";
import useMediaQuery from "@mui/material/useMediaQuery";
import "./contactUs.css";
import { useHistory } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { IContactUs, IContactUsProps } from "./contactUs.interface";
import { getDeepClone } from "../../../util/ObjectFunctions";
import { defaultContactData } from "./contactUs.model";
import { ContactUsValidator } from "./contactUs.validator";
import { ValidationStatus } from "../../../core/interfaces/input.interface";
import { AuthContext, AuthContextType } from "../../../context/AuthContext";
import React from "react";
import {
  DD_CONTACTUS_COUNTRY_CONTENT,
  DD_CONTACTUS_SUBJECT_CONTENT,
  CMS_CONTACT_US_CONTENT,
} from "../../../util/staticText";
import { getdropDownContent } from "../../../util/dropDownService";
import { format } from "react-string-format";
import { contactUsRequest } from "../../../util/3meService";
import { getUserProfile } from "../../../util/userService";
import { IUser } from "../../manageProfile/user.interface";
import { getCMSContent } from "../../../util/cmsService";
import { IContactUsPhone } from "./contactUs.interface";
export const ContactUs = ({
  DefaultContactData = defaultContactData,
  Validator = new ContactUsValidator(),
}: IContactUsProps) => {
  let history = useHistory();
  const profile = useContext<AuthContextType | null>(AuthContext);
  const [contactUsData, setContactUsData] = useState<IContactUs>(
    getDeepClone(DefaultContactData)
  );
  const [validator] = useState<ContactUsValidator>(Validator);
  const [focusClasses, setFocusClasses] = useState({ message: "", phone: "" });
  const [subjects, setSubjects] = React.useState([]);
  const [countries, setCountries] = React.useState([]);
  const [contactUsInfo, setContactUsInfo] = useState<IContactUsPhone | null>();
  const isMobileScreen = useMediaQuery("(max-width:700px)");
  const assignLoginUser = (userProfile: IUser | undefined) => {
    const phoneNo = userProfile?.phoneNo
      ? userProfile?.phoneNo
      : userProfile?.mobilePhoneNo;
    setContactUsData(
      Object.assign({}, contactUsData, {
        firstName: {
          value: userProfile?.firstName,
          valid: ValidationStatus.VALID,
          required: contactUsData?.firstName.required,
        },
        lastName: {
          value: userProfile?.lastName,
          valid: ValidationStatus.VALID,
          required: contactUsData?.lastName.required,
        },
        email: {
          value: userProfile?.emailAddress,
          valid: ValidationStatus.VALID,
          required: contactUsData?.email.required,
        },
        phone: {
          value: phoneNo,
          valid: ValidationStatus.VALID,
          required: contactUsData?.phone.required,
        },
        extension: {
          value: userProfile?.extension,
          valid: ValidationStatus.VALID,
          required: contactUsData?.extension.required,
        },
      })
    );
  };
  const redirectToHelpPage = () => {
    history.goBack();
  };
  const loadContactUsPhoneNumber = async () => {
    try {
      const { item } = (await getCMSContent(CMS_CONTACT_US_CONTENT)) || {};
      if (item.phoneNo !== undefined) {
        const contactUsDataPhone: IContactUsPhone = {
          phoneNo: item.phoneNo,
        };
        setContactUsInfo(contactUsDataPhone);
      }
    } catch (error) {
      console.log("error", error);
    }
  };
  useEffect(() => {
    loadContactUsPhoneNumber();
  }, []);

  const validateAll = () => {
    const valResp = validator.validateAll(contactUsData, setContactUsData);
    if (valResp.status === ValidationStatus.VALID) {
      let contactUsObject;
      const phoneNumber =
        contactUsData?.extension.value !== ""
          ? `${contactUsData?.phone.value} ext: ${contactUsData?.extension.value}`
          : `${contactUsData?.phone.value}`;
      contactUsObject = {
        message: contactUsData.message.value,
        subject: contactUsData.subject.value,
        firstName: contactUsData.firstName.value,
        lastName: contactUsData.lastName.value,
        phone: phoneNumber,
        emailAddress: contactUsData.email.value,
        country: contactUsData.country.value,
        contactPreference: contactUsData.shouldContact.value,
        SiteUseId: profile?.registeredFaciltyAddress?.siteUseId ?? "",
      };
      let reqParams;
      reqParams = {
        userName: profile?.userProfile?.userName ?? "",
        ContactUsRequestParams: contactUsObject,
      };
      contactUsRequest(reqParams);
      history.push("/helpAndSupport/ContactUsSent");
    }
  };
  const setClasses = (e: any, classname: string) => {
    setFocusClasses(
      Object.assign({}, focusClasses, { [e.target.name]: classname })
    );
  };
  const validateAndSetData = (e: any) => {
    // adding additional handling for phone input
    if (
      e.target.name === "phone" &&
      contactUsData.phone.valid === ValidationStatus.UNTOUCHED &&
      (e.target.value === "(___) ___-____" || e.target.value === "")
    ) {
      return;
    }
    const isValid = validator.validate(e.target.value, e.target.name);
    setContactUsData(
      Object.assign({}, contactUsData, {
        [e.target.name]: {
          value: e.target.value,
          valid: isValid?.status,
          required: e.target.required,
        },
      })
    );
  };

  const updateUserProfile = async () => {
    const user = await getUserProfile();
    if (user !== undefined) {
      profile?.setUserProfile(user);
      assignLoginUser(user);
    }
  };

  useEffect(() => {
    if (profile?.isLoggedIn) {
      if (profile?.userProfile?.firstName) {
        assignLoginUser(profile?.userProfile);
      } else {
        updateUserProfile();
      }
    }
    fetchDDContent();
  }, []);

  const fetchDDContent = async () => {
    //async and await
    try {
      const ddContent = format(
        "{0},{1}",
        DD_CONTACTUS_SUBJECT_CONTENT,
        DD_CONTACTUS_COUNTRY_CONTENT
      );
      const data = await getdropDownContent(ddContent);
      if (data.items.length > 0) {
        const subjectObject = data.items.filter(
          (item: { name: string }) => item.name === DD_CONTACTUS_SUBJECT_CONTENT
        );
        const subjects = subjectObject[0].data.sort(
          (a: { order: number }, b: { order: number }) =>
            a.order > b.order ? 1 : -1
        );
        setSubjects(subjects);

        const countryObject = data.items.filter(
          (item: { name: string }) => item.name === DD_CONTACTUS_COUNTRY_CONTENT
        );
        const countries = countryObject[0].data.sort(
          (a: { order: number }, b: { order: number }) =>
            a.order > b.order ? 1 : -1
        );
        setCountries(countries);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <div className="contact-us">
      <h2>Contact Us</h2>
      <span className="info-text">
        Customer support for 3M products and services is here to help answer
        your questions.
      </span>
      <span className="info-text">
        3M also provides technical support by phone. If you are available to
        troubleshoot, please call {contactUsInfo?.phoneNo} before entering a
        service request. Troubleshooting information is also available for most
        products online
      </span>
      <Grid container spacing={2} classes={{ root: "contactUsForm" }}>
        <Grid item xs={12}>
          <Paper>
            <InputWithLabel
              isRequired={true}
              label="Subject Line"
              error={contactUsData?.subject.valid === ValidationStatus.INVALID}
            >
              <Select
                autoFocus
                name="subject"
                variant="outlined"
                sx={{ width: "100%" }}
                onChange={validateAndSetData}
                IconComponent={SelectIcon}
                classes={{ icon: "selectIcon" }}
                required={contactUsData?.subject.required}
              >
                {subjects?.map(
                  (
                    x: {
                      code: string | undefined;
                      text: string | undefined;
                    },
                    index
                  ) => (
                    <MenuItem key={index} value={x.code!}>
                      {x.text!}
                    </MenuItem>
                  )
                )}
              </Select>
            </InputWithLabel>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper>
            <InputWithLabel
              isRequired={contactUsData?.message.required}
              label="Message"
              error={contactUsData?.message.valid === ValidationStatus.INVALID}
              labelClassName={focusClasses.message}
            >
              <TextField
                FormHelperTextProps={{ classes: { root: "helperText" } }}
                error={
                  contactUsData?.message.valid === ValidationStatus.INVALID
                }
                InputProps={{ classes: { root: "textarea-root" } }}
                placeholder="What would you like to share?"
                fullWidth
                multiline
                name="message"
                rows={4}
                value={contactUsData?.message.value}
                onChange={validateAndSetData}
                onFocus={(e) => setClasses(e, "Mui-focused")}
                onBlur={(e) => setClasses(e, "")}
                required={contactUsData?.message.required}
              />
            </InputWithLabel>
          </Paper>
        </Grid>
        <Grid item xs={isMobileScreen ? 12 : 6}>
          <Paper>
            <InputWithLabel
              label="First Name"
              isRequired={contactUsData?.firstName.required}
              error={
                contactUsData?.firstName.valid === ValidationStatus.INVALID
              }
              data-testid="first-name-label"
            >
              <InputBase
                className="contact-us-input"
                name="firstName"
                value={contactUsData?.firstName.value}
                onChange={validateAndSetData}
                data-testid="first-name-input"
                required={contactUsData?.firstName.required}
              />
            </InputWithLabel>
          </Paper>
        </Grid>
        <Grid item xs={isMobileScreen ? 12 : 6}>
          <Paper>
            <InputWithLabel
              label="Last Name"
              isRequired={contactUsData?.lastName.required}
              error={contactUsData?.lastName.valid === ValidationStatus.INVALID}
            >
              <InputBase
                className="contact-us-input"
                name="lastName"
                value={contactUsData?.lastName.value}
                onChange={validateAndSetData}
                required={contactUsData?.lastName.required}
              />
            </InputWithLabel>
          </Paper>
        </Grid>
        <Grid item xs={isMobileScreen ? 12 : 5}>
          <Paper>
            <InputWithLabel
              label="Phone Number"
              isRequired={contactUsData?.phone.required}
              error={contactUsData?.phone.valid === ValidationStatus.INVALID}
              labelClassName={focusClasses.phone}
            >
              <InputMask
                placeholder="(___) ___-____"
                className="phone"
                name="phone"
                mask="(999) 999-9999"
                value={contactUsData?.phone.value}
                onChange={validateAndSetData}
                onFocus={(e) => setClasses(e, "Mui-focused")}
                onBlur={(e) => setClasses(e, "")}
                required={contactUsData?.phone.required}
              />
            </InputWithLabel>
          </Paper>
        </Grid>
        <Grid item xs={isMobileScreen ? 5 : 2}>
          <Paper>
            <InputWithLabel
              label="Extension"
              isRequired={contactUsData?.extension.required}
              error={
                contactUsData?.extension.valid === ValidationStatus.INVALID
              }
            >
              <InputBase
                className="extension"
                name="extension"
                value={contactUsData?.extension.value}
                onChange={validateAndSetData}
                required={contactUsData?.extension.required}
              />
            </InputWithLabel>
          </Paper>
        </Grid>
        <Grid item xs={isMobileScreen ? 12 : 5}>
          <Paper>
            <InputWithLabel
              label="Email Address"
              isRequired={contactUsData?.email.required}
              error={contactUsData?.email.valid === ValidationStatus.INVALID}
            >
              <InputBase
                className="contact-us-input"
                name="email"
                value={contactUsData?.email.value}
                onChange={validateAndSetData}
                required={contactUsData?.email.required}
              />
            </InputWithLabel>
          </Paper>
        </Grid>
        <Grid item xs={isMobileScreen ? 12 : 6}>
          <Paper>
            <InputWithLabel
              isRequired={contactUsData?.country.required}
              label="Country"
            >
              <Select
                name="country"
                variant="outlined"
                sx={{ width: "100%" }}
                defaultValue="US"
                className=""
                IconComponent={SelectIcon}
                required={contactUsData?.country.required}
              >
                {countries?.map(
                  (
                    x: {
                      code: string | undefined;
                      text: string | undefined;
                    },
                    index
                  ) => (
                    <MenuItem key={index} value={x.code!}>
                      {x.text!}
                    </MenuItem>
                  )
                )}
              </Select>
            </InputWithLabel>
          </Paper>
        </Grid>
        <Grid item xs={isMobileScreen ? 12 : 6}>
          <InputWithLabel
            label="Would you like to be contacted by 3M?"
            isRequired={contactUsData?.shouldContact.required}
            error={
              contactUsData?.shouldContact.valid === ValidationStatus.INVALID
            }
          >
            <RadioGroup
              name="shouldContact"
              classes={{ root: "radioRoot" }}
              onChange={validateAndSetData}
            >
              <FormControlLabel
                classes={{ root: "optionRoot" }}
                componentsProps={{
                  typography: { classes: { root: "optiontxt" } },
                }}
                value="Yes"
                control={
                  <Radio required={contactUsData?.shouldContact.required} />
                }
                label="Yes"
              />
              <FormControlLabel
                classes={{ root: "optionRoot" }}
                componentsProps={{
                  typography: { classes: { root: "optiontxt" } },
                }}
                value="No"
                control={
                  <Radio required={contactUsData?.shouldContact.required} />
                }
                label="No"
              />
            </RadioGroup>
          </InputWithLabel>
        </Grid>
        <div className="btn-container">
          <Button
            variant="contained"
            className="submitBtn"
            onClick={validateAll}
          >
            Submit
          </Button>
          <Button
            variant="outlined"
            className="cancelBtn"
            onClick={redirectToHelpPage}
          >
            Cancel
          </Button>
        </div>
      </Grid>
    </div>
  );
};
