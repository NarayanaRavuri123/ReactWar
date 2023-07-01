import React, { ReactNode, useContext, useState } from "react";
import { AddFacilityManually } from "../addFacilityManually/addFacilityManually.component";
import { AddFacility } from "../addFacility/addFacility.component";
import { IFacility } from "../facility.interface";
import { FacilityFound } from "../facilityFound/facilityFound.component";
import { FacilityNotFound } from "../facilityNotFound/facilityNotFound.component";
import { AddFacilityContext } from "./addFacilityContainer.context";
import { SearchSection } from "./addFacilityContainer.enum";
import { IAddFacilityContainer } from "./addFacilityContainer.interface";

export const AddFacilityContainer = ({
  defaultPageSection = SearchSection.SEARCH_FORM,
  isForNewOrder,
  isForAdminFlow,
}: IAddFacilityContainer) => {
  const { addFacilityToList } = useContext(AddFacilityContext);
  const [currentSection, setCurrentSection] =
    useState<SearchSection>(defaultPageSection);
  const [foundSearchData, setfoundSearchData] = React.useState<IFacility[]>();
  const redirectHandler = (
    changeSectionTo: SearchSection,
    searchData?: IFacility[]
  ): void => {
    if (searchData) {
      setfoundSearchData(searchData);
    }
    setCurrentSection(changeSectionTo);
  };
  const sectionToDisplay = () => {
    let page: ReactNode;
    switch (currentSection) {
      case SearchSection.FOUND:
        page = (
          <FacilityFound
            facilities={foundSearchData!}
            redirectHandler={redirectHandler}
          />
        );
        break;
      case SearchSection.NOT_FOUND:
        page = (
          <FacilityNotFound
            redirectHandler={redirectHandler}
            isForNewOrder={isForNewOrder}
            isForAdminFlow={isForAdminFlow}
          />
        );
        break;
      case SearchSection.SEARCH_FORM:
        page = (
          <AddFacility
            redirectHandler={redirectHandler}
            addNewFacility={addFacilityToList}
            isForAdminFlow={isForAdminFlow}
          />
        );
        break;
      case SearchSection.MANUAL_ADD:
        page = (
          <AddFacilityManually
            redirectHandler={redirectHandler}
            addNewFacility={addFacilityToList}
          />
        );
        break;
    }
    return page;
  };
  return sectionToDisplay();
};
