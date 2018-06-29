import React from "react";
import { FormGroup, ControlLabel, FormControl, Alert } from "react-bootstrap";

export default class SavingDeposit extends React.Component {
  componentDidMount() {
    // this.props.mappedFetchSavingDepositById(this.props.params.id); // @todo uncomment
  }
  render() {
    const savingDepositState = this.props.mappedSavingDepositState;
    return (
      <div className="savingDepositDetail">
        <h2>Saving Deposit Detail</h2>
        {!savingDepositState.savingDeposit &&
          savingDepositState.isFetching &&
          <div>
            <p>Loading saving deposit...</p>
          </div>}
        {!savingDepositState.savingDeposit &&
          !savingDepositState.isFetching &&
          savingDepositState.error &&
          <Alert bsStyle="danger">
            <strong>Failed. {savingDepositState.error} </strong>
          </Alert>}
        {savingDepositState.savingDeposit &&
          !savingDepositState.isFetching &&
          !savingDepositState.error &&
          <form className="form form-horizontal" id="showSavingDepositForm">
            <div className="row">
              <div className="col-md-12">
                <FormGroup>
                  <ControlLabel>Bank name: </ControlLabel>
                  <FormControl.Static>
                    {savingDepositState.savingDeposit.bankName}
                  </FormControl.Static>
                </FormGroup>
                <FormGroup>
                  <ControlLabel>Account number: </ControlLabel>
                  <FormControl.Static>
                    {savingDepositState.savingDeposit.accountNumber}
                  </FormControl.Static>
                </FormGroup>
                <FormGroup>
                  <ControlLabel>Initial amount saved: </ControlLabel>
                  <FormControl.Static>
                    {savingDepositState.savingDeposit.initialAmount}
                  </FormControl.Static>
                </FormGroup>
                <FormGroup>
                  <ControlLabel>Start date: </ControlLabel>
                  <FormControl.Static>
                    {savingDepositState.savingDeposit.startDate}
                  </FormControl.Static>
                </FormGroup>
                <FormGroup>
                  <ControlLabel>End date: </ControlLabel>
                  <FormControl.Static>
                    {savingDepositState.savingDeposit.endDate}
                  </FormControl.Static>
                </FormGroup>
                <FormGroup>
                  <ControlLabel>Interest per year: </ControlLabel>
                  <FormControl.Static
                  >{`${savingDepositState.savingDeposit.interest}%`}</FormControl.Static>
                </FormGroup>
                <FormGroup>
                  <ControlLabel>Tax: </ControlLabel>
                  <FormControl.Static
                  >{`${savingDepositState.savingDeposit.tax}%`}</FormControl.Static>
                </FormGroup>
              </div>
            </div>
          </form>}
      </div>
    );
  }
}
