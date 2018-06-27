import React from 'react';
import {
  InputGroup,
  FormGroup,
  ControlLabel,
  FormControl,
  Button
} from "react-bootstrap";
import DatePicker from "react-16-bootstrap-date-picker";

const SavingDepositEditForm = (props) => {
  return (
    <form className="form form-horizontal" id="EditSavingDepositForm" onSubmit={props.editSavingDeposit}>
        <div className="row">
            <div className="col-md-12">

            <FormGroup>
                <ControlLabel>Bank name: </ControlLabel>
                <input type="hidden" value={props.savingDepositData._id} name="id"/>
                <FormControl
                    type="text"
                    placeholder="Enter bank name"
                    name="bankName"
                    defaultValue={props.savingDepositData.bankName}
                />
                </FormGroup>
                <FormGroup>
                <ControlLabel>Account number: </ControlLabel>
                <FormControl
                    type="text"
                    placeholder="Enter account number"
                    name="accountNumber"
                    defaultValue={props.savingDepositData.accountNumber}
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
                    defaultValue={props.savingDepositData.initialAmount}
                />
                </InputGroup>
                </FormGroup>
                <FormGroup>
                <ControlLabel>Start date: </ControlLabel>
                <DatePicker
                    id="start-date-picker"
                    onChange={this.handleChange}
                    name="startDate"
                    defaultValue={props.savingDepositData.startDate}
                />
                </FormGroup>
                <FormGroup>
                <ControlLabel>End date: </ControlLabel>
                <DatePicker
                    id="end-date-picker"
                    onChange={this.handleChange}
                    name="endDate"
                    defaultValue={props.savingDepositData.endDate}
                />
                </FormGroup>
                <FormGroup>
                <ControlLabel>Interest per year: </ControlLabel>
                <InputGroup>
                    <FormControl
                        type="text"
                        placeholder="Enter interest per year"
                        name="interest"
                        defaultValue={props.savingDepositData.interest}
                    />
                    <InputGroup.Addon>%</InputGroup.Addon>
                </InputGroup>
                </FormGroup>
                <FormGroup>
                <ControlLabel>Tax: </ControlLabel>
                <InputGroup>
                    <FormControl 
                        type="text" 
                        placeholder="Enter tax" 
                        name="tax" 
                        defaultValue={props.savingDepositData.tax}
                    />
                    <InputGroup.Addon>%</InputGroup.Addon>
                </InputGroup>
                </FormGroup>
            </div>
        </div>
        <FormGroup>
            <Button type="submit" bsStyle="info" bsSize="small" block>Submit</Button>
        </FormGroup>
    </form>
  );
}
export default SavingDepositEditForm;