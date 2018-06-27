import React from "react";
import {
  Alert,
  InputGroup,
  FormGroup,
  ControlLabel,
  FormControl,
  Button
} from "react-bootstrap";
import DatePicker from "react-16-bootstrap-date-picker";

/**
Saving deposit is identified by a 
    bank name, 
    account number, 
    an initial amount saved (currency in USD), 
    start date, 
    end date, 
    interest percentage per year (The interest could be positive or negative)
    taxes percentage (The taxes are only applied over profit.)
 */
export default class SavingDepositsForm extends React.Component {
  constructor(props) {
    super(props);
    this.addSavingDeposit = this.addSavingDeposit.bind(this);
  }

  addSavingDeposit(e) {
    e.preventDefault();
    const form = document.getElementById("addSavingDepositForm"); // @todo dont use getElementById
    const newSavingDeposit = {
      bankName: form.bankName.value,
      accountNumber: form.accountNumber.value,
      initialAmount: form.initialAmount.value,
      startDate: form.startDate.value,
      endDate: form.startDate.value,
      interest: form.interest.value,
      tax: form.tax.value
    };
    this.props.mappedAddNewSavingDeposit(newSavingDeposit);
  }

  render() {
    return (
      <div>
        <form
          className="form form-horizontal"
          id="addSavingDepositForm"
          onSubmit={this.addSavingDeposit}
        >
          <div className="row">
            <h3 className="centerAlign">Add your saving deposit</h3>
            <div className="col-md-12">
              <FormGroup>
                <ControlLabel>Bank name: </ControlLabel>
                <FormControl
                  type="text"
                  placeholder="Enter bank name"
                  name="bankName"
                />
              </FormGroup>
              <FormGroup>
                <ControlLabel>Account number: </ControlLabel>
                <FormControl
                  type="text"
                  placeholder="Enter account number"
                  name="accountNumber"
                />
              </FormGroup>
              <FormGroup>
                <ControlLabel>Initial amount saved: </ControlLabel>
                <InputGroup>
                  <InputGroup.Addon>$</InputGroup.Addon>
                  <FormControl
                    type="text"
                    placeholder="Enter initial amount saved"
                    name="initialAmount"
                  />
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <ControlLabel>Start date: </ControlLabel>
                <DatePicker
                  id="start-date-picker"
                  value={this.state && this.state.startDate}
                  onChange={this.handleChange}
                  name="startDate"
                />
              </FormGroup>
              <FormGroup>
                <ControlLabel>End date: </ControlLabel>
                <DatePicker
                  id="end-date-picker"
                  value={this.state && this.state.endDate}
                  onChange={this.handleChange}
                  name="endDate"
                />
              </FormGroup>
              <FormGroup>
                <ControlLabel>Interest per year: </ControlLabel>
                <InputGroup>
                  <FormControl
                    type="text"
                    placeholder="Enter interest per year"
                    name="interest"
                  />
                  <InputGroup.Addon>%</InputGroup.Addon>
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <ControlLabel>Tax: </ControlLabel>
                <InputGroup>
                  <FormControl type="text" placeholder="Enter tax" name="tax" />
                  <InputGroup.Addon>%</InputGroup.Addon>
                </InputGroup>
              </FormGroup>
            </div>
          </div>
          <FormGroup>
            <Button type="submit" bsStyle="info" bsSize="small" block>
              Submit
            </Button>
          </FormGroup>
        </form>
        {!this.props.mappedSavingDepositState.isFetching &&
          this.props.mappedSavingDepositState.error &&
          <Alert bsStyle="danger">
            <strong>
              Failed. {this.props.mappedSavingDepositState.error}{" "}
            </strong>
          </Alert>}
      </div>
    );
  }
}
