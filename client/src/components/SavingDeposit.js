import React from "react";
import {
  FormGroup,
  ControlLabel,
  FormControl,
  Button
} from "react-bootstrap";

export default class SavingDeposit extends React.Component {
  componentDidMount() {
    this.props.mappedFetchSavingDepositById(this.props.params.id);
  }
  render() {
    const savingDepositState = this.props.mappedSavingDepositState;
    savingDepositState.savingDeposit = {
        "_id": 1,
        "bankName": 1,
        "accountNumber": 2,
        "initialAmount": 3,
        "startDate": "2018-06-01T06:30:00.000Z",
        "endDate": "2018-06-02T06:30:00.000Z",
        "interest": 12.12,
        "tax": 1.12
    };
    return (
      <div className="savingDepositDetail">
        <h2>Saving Deposit Detail</h2>
        {!savingDepositState.savingDeposit &&
          savingDepositState.isFetching &&
          <div>
            <p>Loading saving deposit...</p>
          </div>}
        {savingDepositState.savingDeposit &&
          !savingDepositState.isFetching &&
          <form className="form form-horizontal" id="showSavingDepositForm">
            <div className="row">
              <div className="col-md-12">
                <FormGroup>
                  <ControlLabel>Bank name: </ControlLabel>
                  <FormControl.Static>{savingDepositState.savingDeposit.bankName}</FormControl.Static>
                </FormGroup>
                <FormGroup>
                  <ControlLabel>Account number: </ControlLabel>
                  <FormControl.Static>{savingDepositState.savingDeposit.accountNumber}</FormControl.Static>
                </FormGroup>
                <FormGroup>
                  <ControlLabel>Initial amount saved: </ControlLabel>
                  <FormControl.Static>{savingDepositState.savingDeposit.initialAmount}</FormControl.Static>
                </FormGroup>
                <FormGroup>
                  <ControlLabel>Start date: </ControlLabel>
                  <FormControl.Static>{savingDepositState.savingDeposit.startDate}</FormControl.Static>
                </FormGroup>
                <FormGroup>
                  <ControlLabel>End date: </ControlLabel>
                  <FormControl.Static>{savingDepositState.savingDeposit.endDate}</FormControl.Static>
                </FormGroup>
                <FormGroup>
                  <ControlLabel>Interest per year: </ControlLabel>
                  <FormControl.Static>{`${savingDepositState.savingDeposit.interest}%`}</FormControl.Static>
                </FormGroup>
                <FormGroup>
                  <ControlLabel>Tax: </ControlLabel>
                  <FormControl.Static>{`${savingDepositState.savingDeposit.tax}%`}</FormControl.Static>
                </FormGroup>
              </div>
            </div>
          </form>}
      </div>
    );
  }
}
