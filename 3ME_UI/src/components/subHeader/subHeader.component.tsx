import "./subHeader.css";
import { useState } from "react";
import { HeadH5, HeadSpanLight, RootDiv } from "./subHeader.style";

export const SubHeader = () => {
  const [facilityName] = useState("University Medical Center");
  const [facilityBillAddress] = useState(" 1234 Apple Ave, Anytown TX 33445");
  return (
    <RootDiv>
      <HeadH5>{facilityName}</HeadH5>
      <span>, {` `}</span>
      <HeadSpanLight>{facilityBillAddress}</HeadSpanLight>
    </RootDiv>
  );
};
