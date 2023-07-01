import "./newOrderWoundInfo.css";
import { Grid } from "@mui/material";
import {
  NewOrderContext,
  NewOrderContextType,
} from "../../../context/NewOrderContext";
import { useContext, useEffect } from "react";
import WoundBed from "../woundBed/woundBed.component";
import { Exudate } from "../exudate/exudate.component";
import { Nutrition } from "../nutrition/nutrition.component";
import Debridement from "../debridement/debridement.component";
import { INewOrderWoundInfo } from "./newOrderWoundInfo.interface";
import Comorbodities from "../comorbodities/comorbodities.component";
import WoundDimension from "../woundDimension/woundDimension.component";
import WoundTunneling from "../woundTunneling/woundTunneling.component";
import { Osteomyelitis } from "../osteomyelitis/osteomyelitis.component";
import PreviousTherapy from "../previousTherapies/previousTherapy.component";
import WoundUndermining from "../woundUndermining/woundUndermining.component";
import { IVacTherapyInformation } from "../woundBed/vacTherapyInformation.interface";
import { ExposedStructures } from "../exposedStructures/exposedStructures.component";
import { ClinicalInformation } from "../clinicalInformation/clinicalInformation.component";
import { SecondaryWoundInfo } from "../clinicalInformation/secondaryWoundInfo/secondaryWoundInfo.component";
import { ISecondaryWoundInfo } from "../clinicalInformation/secondaryWoundInfo/secondaryWoundInfo.interface";

interface Props {
  secondaryWoundInfoData: ISecondaryWoundInfo;
  setSecondaryWoundInfoData: any;
  woundInfoData: INewOrderWoundInfo;
  setWoundInfoData: any;
  vacTherapyInformationData: IVacTherapyInformation;
}

export const WoundInformation = ({
  secondaryWoundInfoData,
  setSecondaryWoundInfoData,
  woundInfoData,
  setWoundInfoData,
  vacTherapyInformationData,
}: Props) => {
  const newOrderObj = useContext<NewOrderContextType | null>(NewOrderContext);

  useEffect(() => {
    setTimeout(() => {
      if (newOrderObj && newOrderObj.scrollableComponentClassName) {
        let scrollableComponent = document.getElementsByClassName(
          newOrderObj.scrollableComponentClassName
        )[0];
        if (scrollableComponent) {
          scrollableComponent.scrollIntoView({
            behavior: "smooth",
            block: "start",
            inline: "start",
          });
        } else {
          window.scrollTo(0, 0);
        }
        newOrderObj.setScrollableComponentClassName(undefined);
      }
    }, 300);
  }, [newOrderObj?.scrollableComponentClassName]);

  return (
    <>
      <Grid className="woundinfo-newOrder-container">
        <div className="woundinfo-patientForm">
          <div className="woundinfo-short-form">
            <Nutrition
              woundInfoData={woundInfoData}
              setWoundInfoData={setWoundInfoData!}
            />
            <PreviousTherapy
              woundInfoData={woundInfoData}
              setWoundInfoData={setWoundInfoData!}
            />
            <Comorbodities
              woundInfoData={woundInfoData}
              setWoundInfoData={setWoundInfoData!}
            />
            <Osteomyelitis
              woundInfoData={woundInfoData}
              setWoundInfoData={setWoundInfoData!}
            />
            <ClinicalInformation
              woundInfoData={woundInfoData}
              setWoundInfoData={setWoundInfoData!}
            />
            <Debridement
              woundInfoData={woundInfoData}
              setWoundInfoData={setWoundInfoData!}
            />
            <WoundDimension
              woundInfoData={woundInfoData}
              setWoundInfoData={setWoundInfoData!}
            />
            <WoundUndermining
              woundInfoData={woundInfoData}
              setWoundInfoData={setWoundInfoData!}
            />
            <WoundTunneling
              woundInfoData={woundInfoData}
              setWoundInfoData={setWoundInfoData!}
            />
            <WoundBed
              woundInfoData={woundInfoData}
              setWoundInfoData={setWoundInfoData!}
              vacTherapyInformationData={vacTherapyInformationData!}
            />
            <Exudate
              woundInfoData={woundInfoData}
              setWoundInfoData={setWoundInfoData!}
            />
            <ExposedStructures
              woundInfoData={woundInfoData}
              setWoundInfoData={setWoundInfoData!}
            />
            <SecondaryWoundInfo
              data={woundInfoData}
              setData={setWoundInfoData}
              woundInfoData={secondaryWoundInfoData}
              setWoundInfoData={setSecondaryWoundInfoData}
              vacTherapyInformationData={vacTherapyInformationData}
            />
          </div>
        </div>
      </Grid>
    </>
  );
};
