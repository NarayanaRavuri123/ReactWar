import Moment from "moment";
import "./placeOrderTable.css";
import { useContext } from "react";
import { useHistory } from "react-router-dom";
import {
  SupplyOrderContextType,
  SupplyOrderContext,
} from "../../../../../context/SupplyOrderContext";
import { NO_PATIENT_FOUND } from "../../../../../util/staticText";
import { IPatient } from "../../../../myPatients/patient.interface";
import { LoadingSpinner } from "../../../../../core/loader/LoadingSpinner";
import Table from "../../../../../core/customSortingTable/table.component";
import { makeCapitalEachWordInString } from "../../../../../util/utilityFunctions";
import { SupplyOrderPageSection } from "../../../../supplyOrder/SupplyOrderPageSection.enum";
import { IProductContent } from "../../../productsAndSolutions.interface";
import {
  OrderDetailContext,
  OrderDetailContextType,
} from "../../../../../context/OrderDetailsContext";

interface Props {
  columns: any;
  error: boolean;
  handleSorting: any;
  product: IProductContent;
  sortedData: [];
  spinnerPatientList: boolean | null | undefined;
}

export const PlaceOrderTable = ({
  columns,
  error,
  handleSorting,
  product,
  sortedData,
  spinnerPatientList,
}: Props) => {
  const history = useHistory();
  const supplyOrderObj = useContext<SupplyOrderContextType | null>(
    SupplyOrderContext
  );
  const orderOverViewObj = useContext<OrderDetailContextType | null>(
    OrderDetailContext
  );
  const openOrderDetail = (patient: IPatient) => {
    orderOverViewObj?.resetSeletedSupplyOrderData();
    orderOverViewObj?.resetWoundData();
    if (patient) {
      patient.alerts = [];
      history.push({
        pathname: "/home/orderOverview",
        state: {
          stateData: patient,
        },
      });
    }
  };

  const openSuppyOrderpage = (patient: IPatient) => {
    supplyOrderObj?.resetSupplyOrder();
    supplyOrderObj?.setProduct(product);
    supplyOrderObj?.setSelectedPatient(patient);
    supplyOrderObj?.setSupplyOrderPage(SupplyOrderPageSection.SUPPLYORDER_INFO);
    history.push("/orders/supplyOrderList");
  };

  const LoadSpinner = () => {
    return (
      <div className="PatientListSpinner">
        <LoadingSpinner />
      </div>
    );
  };

  return (
    <div className="placeAnOrder_table_container" data-testid="patient-list">
      <Table
        tableClassName="placeAnOrder_table"
        tableColumns={columns}
        handleSorting={handleSorting}
      >
        {!spinnerPatientList && !error && sortedData.length > 0 ? (
          <tbody>
            {sortedData.map((data: any) => {
              return (
                <tr key={data.id}>
                  <td
                    onClick={() => openSuppyOrderpage(data)}
                    className="select-patient-link"
                  >
                    Select
                  </td>
                  <td className="table-static-data">
                    {makeCapitalEachWordInString(
                      `${data.lastName} ${data.firstName}`
                    )}
                  </td>
                  <td className="table-static-data">
                    {data.dob ? Moment(data.dob).format("L") : null}
                  </td>
                  <td
                    onClick={() => openOrderDetail(data)}
                    className="select-ro-link"
                  >
                    {data.roNumber}
                  </td>
                </tr>
              );
            })}
          </tbody>
        ) : null}
      </Table>
      {spinnerPatientList ? LoadSpinner() : null}
      {error ? (
        <div className="patient-Error-msg">Oops something went wrong !</div>
      ) : null}
      {!error && sortedData.length === 0 && !spinnerPatientList ? (
        <div className="patient-Error-msg">{NO_PATIENT_FOUND}</div>
      ) : null}
    </div>
  );
};
