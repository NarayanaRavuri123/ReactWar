import { useContext, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import {
  BoxStyle,
  CardStyle,
  ParaStyle,
  PerButtonStyle,
  TopDivStyle,
  BottomDivStyle,
} from "./cmsContent.style";
import { ReactComponent as VectorIcon } from "../../assets/Vector.svg";
import "./cmsContent.css";
import parse from "html-react-parser";
import { getCMSContent } from "../../util/cmsService";
import { MobileDisplayContext } from "../../context/MobileDisplayContext";

export const CMSContent = () => {
  const [terms, setTerms] = useState();
  const history = useHistory();
  const { type } = useParams<{ type: string }>();
  const { isMobileScreen } = useContext(MobileDisplayContext);
  // yuo can find all params from here
  useEffect(() => {
    getCMSContent(type).then((content) => {
      if (content.item !== undefined) setTerms(content.item.data);
      else setTerms(content);
    });
  }, [type]);

  return (
    <>
      <CardStyle variant="outlined" className="containerMobile">
        <TopDivStyle>
          <PerButtonStyle
            className={isMobileScreen ? "returnToPreviousPageResponsive" : ""}
            data-testid="previous-test"
            startIcon={<VectorIcon />}
            variant="text"
            onClick={() => {
              history.goBack();
            }}
          >
            Return to previous page
          </PerButtonStyle>

          <BoxStyle>
            <ParaStyle data-testid="para-test" className="para">
              {parse(terms || "")}
            </ParaStyle>
          </BoxStyle>
        </TopDivStyle>
        <BottomDivStyle>
          <PerButtonStyle
            className={isMobileScreen ? "returnToPreviousPageResponsive" : ""}
            startIcon={<VectorIcon />}
            variant="text"
            onClick={() => {
              history.goBack();
            }}
          >
            Return to previous page
          </PerButtonStyle>
        </BottomDivStyle>
      </CardStyle>
    </>
  );
};
