// React imports
import React from "react";

type SectionProps = {
  sectionCode: string;
  sectionHeader: string;
  sectionReqs: Array<string>;
};

const RequirementSection = ({
  sectionHeader,
  sectionReqs,
  sectionCode,
}: SectionProps) => {
  return (
    <div>
      <div className="section-header" data-testid="sysReqSecHeader">
        {sectionHeader}
      </div>
      <div>
        <ul className="sys-req" data-testid="sysReqDetails">
          {sectionReqs.map((reqs, ix) => {
            return (
              <li
                className="sys-reqlist"
                key={`${sectionCode}${ix.toString()}`}
              >
                {reqs}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default RequirementSection;
