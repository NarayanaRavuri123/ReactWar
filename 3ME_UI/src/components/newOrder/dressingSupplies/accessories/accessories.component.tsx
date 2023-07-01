import "./accessories.css";
import {
  DropdownValueWithOrder,
  IAccessories,
  IAccessory,
} from "./accessories.interface";
import { Button, Grid } from "@mui/material";
import { useEffect, useState, useContext } from "react";
import AddIcon from "@mui/icons-material/Add";
import { CustomRemovableDropDown } from "../../../../core/customRemovableDropdown/customRemovableDropdown.component";
import {
  NewOrderContext,
  NewOrderContextType,
} from "../../../../context/NewOrderContext";

export const Accessories = ({
  accessoriesList,
  data,
  orderId = "",
  setData,
}: IAccessories) => {
  const [accessories, setAccessories] = useState<IAccessory[]>([]);
  const [accessoryTypes, setAccessoryTypes] = useState<
    DropdownValueWithOrder[]
  >([]);
  const [loadAccesory, setLoadAccesory] = useState<boolean>(false);
  const newOrderObj = useContext<NewOrderContextType | null>(NewOrderContext);
  const addAccessoryAction = () => {
    newOrderObj?.setIsHandleChangeTriggered(true);
    const newAccesory = {
      id: 0,
      code: "",
      value: "",
      index: getNewAccessoryId(),
    };
    setAccessories((array) => [...array, newAccesory]);
  };

  const closeAccessoryAction = (index: number) => {
    setAccessories((array) =>
      array.filter((_, itemIndex) => itemIndex !== index)
    );
  };

  const updateAccessoryAction = (e: any, index: number) => {
    newOrderObj?.setIsHandleChangeTriggered(true);
    const accessory = accessoriesList.filter(
      (accessory) => accessory.text === e.target.value
    )[0];
    if (orderId !== "" && data.accessories.length === 0) {
      setLoadAccesory(true);
    }
    setAccessories((curr) =>
      curr.map((item) => {
        if (item.index === index) {
          item.code = accessory.code;
          item.value = e.target.value;
          item.id = accessory.id;
        }
        return item;
      })
    );
  };

  const getNewAccessoryId = (): number => {
    const existingIds = accessories.map((item) => item.index).sort();
    if (existingIds.length > 0) {
      const remaingIds = [1, 2, 3, 4].filter(
        (x) => ![...existingIds].includes(x)
      );
      return remaingIds[0];
    }
    return 1;
  };

  const checkDataAndUpdateAccessories = () => {
    if (data.accessories.length > 0) {
      const updatedAccessories: IAccessory[] = data.accessories.map(
        (
          accessory: { code: string; value: string; id: number },
          index: number
        ) => {
          return {
            id: accessory.id,
            code: accessory.code,
            value: accessory.value,
            index: index,
          };
        }
      );
      setAccessories(updatedAccessories);
    }
  };

  const updateAccessoriesToData = () => {
    setData((dt: any) => ({
      ...dt,
      accessories: accessories.filter(
        (accessory) => accessory.value !== "" && accessory.id !== 0
      ),
    }));
  };

  const updateAccessoryTypes = () => {
    if (accessoriesList.length > 0) {
      const selectedValues = accessories.map((accessory) => accessory.value);
      const remaingAccessoryType = accessoriesList.filter(
        (x) => !selectedValues.includes(x.text)
      );
      setAccessoryTypes(remaingAccessoryType);
    }
  };

  useEffect(() => {
    checkDataAndUpdateAccessories();
    if (orderId === "") {
      setLoadAccesory(true);
    }
  }, []);

  useEffect(() => {
    if (!loadAccesory && data.accessories.length > 0) {
      checkDataAndUpdateAccessories();
      setLoadAccesory(true);
    }
  }, [data.accessories]);

  useEffect(() => {
    updateAccessoriesToData();
    updateAccessoryTypes();
  }, [accessories]);

  useEffect(() => {
    updateAccessoryTypes();
  }, [accessoriesList]);

  return (
    <div className="add-accessories">
      <Grid className="add-accessories-grid-container" container spacing={2}>
        <Grid className="add-accessories-grid-item" item xs={12}>
          <div className="add-accessories-header-div">
            <h2
              className="add-accessories-header"
              data-testid="add-accessories-header"
            >
              3M™ V.A.C.® Therapy Accessories
            </h2>
            <h2
              className="add-accessories-description"
              data-testid="add-accessories-description"
            >
              3M™ V.A.C.® Therapy Accessories are provided as a case of the
              selected accessory.
            </h2>
          </div>
        </Grid>
        {accessories && Array.isArray(accessories) && (
          <Grid className="delivery-information-grid-item" item xs={12}>
            <div
              className={
                accessories.length === 4
                  ? "accessories-list bottom"
                  : "accessories-list"
              }
            >
              {accessories.map((item: IAccessory, index: number) => {
                return (
                  <CustomRemovableDropDown
                    closeBtnClassName="reomove-accessory-button"
                    closeHandler={() => closeAccessoryAction(index)}
                    dropdownClassName="custom-removable-dropdown"
                    dropdownInputClassName="add-accessories-input"
                    dropDownMenuObj={accessoryTypes}
                    dropdownSelectPropClassName="add-accessories-select"
                    error={false}
                    handleChange={(e: any) =>
                      updateAccessoryAction(e, item.index)
                    }
                    inputTitle="Accessory"
                    inputTitleClassName="accessory-title"
                    name="accessory"
                    placeHolder="Select an accessory"
                    requiredInput={false}
                    testId={`custom-removable-dropDown-${index}`}
                    value={item.value}
                  />
                );
              })}
            </div>
            {accessories.length < 4 && (
              <Button
                classes={{ root: "add-accessory-button" }}
                data-testid="add-accessory-button"
                onClick={addAccessoryAction}
                startIcon={<AddIcon classes={{ root: "add-accessory-icon" }} />}
              >
                Add Accessory
              </Button>
            )}
          </Grid>
        )}
      </Grid>
    </div>
  );
};
