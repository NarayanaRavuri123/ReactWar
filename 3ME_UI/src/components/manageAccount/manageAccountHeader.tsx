import "./manageAccount.css";

export const ManageAccountHeader = ({}) => {
  return (
    <div>
      <div className="manage-acc-title" data-testid="manage-acc-title-test">
        Account administration
      </div>
      <div className="accountDes" data-testid="accountDesTest">
        For any questions regarding your account, please contact 3M™ Medical
        Solutions Customer Support at <b>1-800-275-4524 </b> extension 41858
      </div>
    </div>
  );
};
