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
    const savingDepositToCreate = {
      bankName: form.bankName.value,
      accountNumber: form.accountNumber.value,
      initialAmount: form.initialAmount.value,
      startDate: form.startDate.value,
      endDate: form.endDate.value,
      interest: form.interest.value,
      tax: form.tax.value
    };
    const isAdmin = this.props.mappedProfileState.profile && this.props.mappedProfileState.profile.role === "ADMIN";
    if(isAdmin) {
      savingDepositToCreate.userId = form.userId.value;
    }
    this.props.mappedAddNewSavingDeposit(savingDepositToCreate, isAdmin);
  }

  render() {
    const isAdmin = this.props.mappedProfileState.profile && this.props.mappedProfileState.profile.role === "ADMIN";
    const usersState = this.props.mappedUsersState;
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
            {isAdmin &&
                    <FormGroup>
                      <ControlLabel>User</ControlLabel>
                      <FormControl
                        componentClass="select"
                        placeholder="Select user"
                        name="userId"
                      >
                        {usersState.users.map((user, i) => (
                          <option key={`${user._id}-${i}`} value={user._id}>
                            {user.email}
                          </option>
                        ))}
                      </FormControl>
                    </FormGroup>}            
              <FormGroup>
                <ControlLabel>Bank name</ControlLabel>
                <FormControl
                  type="text"
                  placeholder="Enter bank name"
                  name="bankName"
                />
              </FormGroup>
              <FormGroup>
                <ControlLabel>Account number</ControlLabel>
                <FormControl
                  type="text"
                  placeholder="Enter account number"
                  name="accountNumber"
                />
              </FormGroup>
              <FormGroup>
                <ControlLabel>Initial amount saved</ControlLabel>
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
                <ControlLabel>Start date</ControlLabel>
                <DatePicker
                  id="start-date-picker"
                  name="startDate"
                  value={this.props.mappedSavingDepositState.savingDepositToCreate && this.props.mappedSavingDepositState.savingDepositToCreate.startDate}
                />
              </FormGroup>
              <FormGroup>
                <ControlLabel>End date</ControlLabel>
                <DatePicker
                  id="end-date-picker"
                  name="endDate"
                  value={this.props.mappedSavingDepositState.savingDepositToCreate && this.props.mappedSavingDepositState.savingDepositToCreate.endDate}
                />
              </FormGroup>
              <FormGroup>
                <ControlLabel>Interest per year</ControlLabel>
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
                <ControlLabel>Tax</ControlLabel>
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
        {!this.props.mappedSavingDepositState.isAddingNew &&
          this.props.mappedSavingDepositState.errorAddingNew &&
          <Alert bsStyle="danger">
            <strong>
              Failed. {this.props.mappedSavingDepositState.errorAddingNew}{" "}
            </strong>
          </Alert>}
          {!this.props.mappedSavingDepositState.isAddingNew &&
            this.props.mappedSavingDepositState.successMsgAddingNew &&
            <Alert bsStyle="success">
              <strong>
                Success. {this.props.mappedSavingDepositState.successMsgAddingNew}{" "}
              </strong>
            </Alert>}
        </div>
    );
  }
}
