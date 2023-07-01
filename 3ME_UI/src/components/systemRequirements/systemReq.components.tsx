// React imports
import React, { useEffect, useState } from "react";
// css import
import "./systemReq.css";
// component imports
import parse from "html-react-parser";
import { getCMSContent } from "../../util/cmsService";
import { CMS_HELPSUPPORT_CONTENT } from "../../util/staticText";

export type dataObject = {
  // define the object (singular)
  sectionCode: string;
  sectionHeader: string;
  sectionReqs: Array<string>;
};

function SystemRequirements(props: { data: string }) {
  const [sectionData, setSectionData] = useState("");

  const fetchPageContent = async () => {
    //async and await
    try {
      const data = await getCMSContent(CMS_HELPSUPPORT_CONTENT);
      if (data.item !== undefined) {
        setSectionData(data.item.systemRequirement?.description);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    if (props.data === undefined) {
      fetchPageContent();
    } else {
      setSectionData(props.data);
    }
  }, []);
  return <div className="sysreq-content">{parse(sectionData) || ""}</div>;
}

export default SystemRequirements;
