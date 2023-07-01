import "./loaderModal.css";
import { LoadingSpinner } from "../../../../core/loader/LoadingSpinner";

export const LoaderModal = () => {
  return (
    <div className="loader" data-testid="loader">
      <LoadingSpinner />
    </div>
  );
};
