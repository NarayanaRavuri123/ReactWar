import { Link } from "react-router-dom";
import { ReactComponent as SelectIcon } from "../../../assets/selectIcon.svg";
import { INavigator } from "./navigator.interface";
import "./navigator.css";

export const Navigator = ({
  array,
  className = "route-section",
  title,
  isStateDataPresent = false,
  stateData,
}: INavigator) => {
  return (
    <div className={className} data-testid={className}>
      {array.map((router, index) => {
        return (
          <>
            {isStateDataPresent !== true ? (
              <Link
                className="link-to-navigator"
                data-testid={`link-to-navigator-${index}`}
                key={`${index}link`}
                onClick={router.onLinkClick ?? (() => {})}
                to={router.route}
              >
                {router.pageName}
              </Link>
            ) : (
              <Link
                className="link-to-navigator"
                data-testid={`link-to-navigator-${index}`}
                key={`${index}link`}
                onClick={router.onLinkClick ?? (() => {})}
                to={{
                  pathname: router.route,
                  state: { stateData: stateData },
                }}
              >
                {router.pageName}
              </Link>
            )}
            <SelectIcon
              className="arrow-right"
              data-testid={`arrow-right-${index}`}
              key={`${index}selectIcon`}
            />
          </>
        );
      })}
      <span className="title-txt" data-testid="title-txt">
        {title}
      </span>
    </div>
  );
};
