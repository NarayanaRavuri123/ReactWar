import "./printCommonDocs.css";
import {
  COMMON_DOCS_INSURANCE_AUTHORIZATION_FORM,
  DD_COMMON_DOCS_CONTENT,
} from "../../../util/staticText";
import { useContext, useEffect, useState } from "react";
import { format } from "react-string-format";
import { Button, Grid } from "@mui/material";
import { NewOrderValidator } from "../newOrder.validator";
import { WindowService } from "../../../util/window.service";
import { IPrintCommonDocs } from "./printCommonDocs.interface";

import { getdropDownContent } from "../../../util/dropDownService";
import VACTherapyOrderPad from "../../../assets/pdf/VACTherapyOrderPad.pdf";
import { ValidationStatus } from "../../../core/interfaces/input.interface";
import { InputWithLabel } from "../../../core/inputWithLabel/inputWithLabel.component";
import { CustomDropDown } from "../../../core/customDropdown/customDropdown.component";
import VACTherapyInsuranceAuthorizationForm from "../../../assets/pdf/VACTherapyInsuranceAuthorizationFormV8.pdf";
import {
  NewOrderContext,
  NewOrderContextType,
} from "../../../context/NewOrderContext";

export const PrintCommonDocs = ({
  data,
  Validator = new NewOrderValidator(),
  setData,
  printableDocumentsLink,
}: IPrintCommonDocs) => {
  const [validator] = useState<NewOrderValidator>(Validator!);
  const [commonDocs, setCommonDocs] = useState([]);
  const [commonDocsText, setCommonDocsText] = useState([]);
  const newOrderObj = useContext<NewOrderContextType | null>(NewOrderContext);
  useEffect(() => {
    fetchCommonDocsContent();
  }, []);

  const fetchCommonDocsContent = async () => {
    //async and await
    try {
      const ddContent = format("{0}", DD_COMMON_DOCS_CONTENT);
      const data = await getdropDownContent(ddContent);
      if (data.items.length > 0) {
        const commonDocObject = data.items.filter(
          (item: { name: string }) => item.name === DD_COMMON_DOCS_CONTENT
        );
        const commonDocArray = commonDocObject[0].data.sort(
          (a: { order: number }, b: { order: number }) =>
            a.order > b.order ? 1 : -1
        );
        setCommonDocs(commonDocArray);
        setCommonDocsText(commonDocArray.map((x: { text: string }) => x.text));
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const validateAndSetData = (e: any) => {
    newOrderObj?.setIsHandleChangeTriggered(true);
    const value = getCodeFromText(e.target.value);
    const isValid = validator.validate(value, e.target.name);
    setData(
      Object.assign({}, data, {
        [e.target.name]: { value: value, valid: isValid?.status },
      })
    );
  };

  const getCodeFromText = (input: string): string => {
    return commonDocs
      .filter((item: { text: string; code: string }) => item.text === input)
      .map((x: { code: string }) => x.code)[0];
  };

  const getTextFromCode = (code: string): string => {
    if (code !== "" && commonDocs.length === 0) {
      return code;
    }
    return commonDocs
      .filter((item: { text: string; code: string }) => item.code === code)
      .map((x: { text: string }) => x.text)[0];
  };

  const openPdfDoc = () => {
    if (data.commonDocs.value !== "") {
      const windowService = new WindowService();
      const pdf =
        data.commonDocs.value === COMMON_DOCS_INSURANCE_AUTHORIZATION_FORM
          ? printableDocumentsLink!.VACTherapyInsuranceAuthorizationForm
          : printableDocumentsLink!.VACTherapyOrderPad;
      windowService.openPdf(pdf);
    }
  };

  return (
    <div className="printCommonDocs">
      <h2 className="printCommonDocs-title" data-testid="printCommonDocs-title">
        Print Common Docs
      </h2>
      <Grid className="printCommonDocs-grid-container" container spacing={2}>
        <Grid item xs={9}>
          <InputWithLabel
            label="Common Docs"
            isRequired={false}
            error={data.commonDocs.valid === ValidationStatus.INVALID}
            testId="printCommonDocs-commonDocs"
          >
            <CustomDropDown
              handleChange={validateAndSetData}
              menuItem={commonDocsText}
              name="commonDocs"
              placeHolder="Select document to print"
              selectpropsClassName={
                data.commonDocs.value ? "printCommonDocs-select" : "placeHolder"
              }
              selectClassName={
                data.commonDocs.value ? "printCommonDocs-input" : "placeHolder"
              }
              testId="printCommonDocs-commonDocs"
              value={
                data.commonDocs.value
                  ? getTextFromCode(data.commonDocs.value)
                  : null
              }
            />
          </InputWithLabel>
        </Grid>
        <Grid className="printCommonDocs-grid-item" item xs={3}>
          <InputWithLabel label="" isRequired={false}>
            <Button
              classes={{ root: "button-printCommonDocs" }}
              data-testid="button-printCommonDocs"
              variant="outlined"
              onClick={openPdfDoc}
              disabled={data.commonDocs.value ? false : true}
            >
              Open
            </Button>
          </InputWithLabel>
        </Grid>
      </Grid>
    </div>
  );
};
