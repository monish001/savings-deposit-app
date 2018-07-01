import React from "react";
import { Panel, Alert, Glyphicon, Button, Modal } from "react-bootstrap";
import {
  InputGroup,
  FormGroup,
  ControlLabel,
  FormControl
} from "react-bootstrap";
import DatePicker from "react-16-bootstrap-date-picker";
import { Link } from "react-router";
import SavingDepositEditForm from "./SavingDepositEditForm";
import { browserHistory } from "react-router";

export default class SavingDeposits extends React.Component {
  constructor(props) {
    super(props);
    this.hideEditModal = this.hideEditModal.bind(this);
    this.submitEditSavingDeposit = this.submitEditSavingDeposit.bind(this);
    this.hideDeleteModal = this.hideDeleteModal.bind(this);
    this.confirmDeleteSavingDeposit = this.confirmDeleteSavingDeposit.bind(
      this
    );
    this.hideGenerateReportModal = this.hideGenerateReportModal.bind(this);
    this.showGenerateReportModal = this.showGenerateReportModal.bind(this);
    // this.getSimpleAmount = this.getSimpleAmount.bind(this);
    // this.getCompoundAmount = this.getCompoundAmount.bind(this);
    // this.getNumberOfDays = this.getNumberOfDays.bind(this);
    this.searchSavingDeposits = this.searchSavingDeposits.bind(this);
    this.generateSavingDepositsReport = this.generateSavingDepositsReport.bind(
      this
    );
  }
  componentWillMount() {
    const isAdmin = this.props.mappedProfileState.profile && this.props.mappedProfileState.profile.role === "ADMIN";
    this.props.mappedFetchSavingDeposits({}, isAdmin); // comment to mock
    isAdmin && this.props.mappedFetchUsers(); // comment to mock
  }
  generateSavingDepositsReport(e) {
    e.preventDefault();
    const generateReportForm = document.getElementById(
      "generateSavingDepositsReport"
    );
    const reportStartDate = generateReportForm.reportStartDate.value;
    const reportEndDate = generateReportForm.reportEndDate.value;
    const url = `/saving-deposits/report/${reportStartDate}/${reportEndDate}`;
    browserHistory.push(url);
  }
  searchSavingDeposits(e) {
    e.preventDefault();
    const searchForm = document.getElementById("searchSavingDepositForm");
    const filters = {
      bankName: searchForm.bankName.value,
      minAmount: searchForm.minAmount.value,
      maxAmount: searchForm.maxAmount.value,
      startDate: searchForm.startDate.value,
      endDate: searchForm.endDate.value
    };
    const isAdmin = this.props.mappedProfileState.profile && this.props.mappedProfileState.profile.role === "ADMIN";
    if (isAdmin) {
      filters.userId = searchForm.userId.value;
    }
    this.props.mappedFetchSavingDeposits(filters, isAdmin);
  }

  // Usage:
  //   this.getCompoundAmount(
  //     savingDeposit.initialAmount,
  //     savingDeposit.interest,
  //     this.getNumberOfDays(savingDeposit.startDate, savingDeposit.endDate)
  //   );

  // getNumberOfDays(startDate, endDate) {
  //   const numberMsInDay = 1000 * 60 * 60 * 24;
  //   const startDayNumber = Math.floor(
  //     new Date(startDate).getTime() / numberMsInDay
  //   );
  //   const endDayNumber = Math.floor(
  //     new Date(endDate).getTime() / numberMsInDay
  //   );
  //   const currentDayNumber = Math.floor(Date.now() / numberMsInDay);
  //   const numberOfDays = currentDayNumber <= endDayNumber
  //     ? currentDayNumber - startDayNumber
  //     : endDayNumber - startDayNumber + 1;
  //   return numberOfDays;
  // }
  // getSimpleAmount(p, r, t) {
  //   // p initial amount,
  //   // r interest per yr
  //   // t time in years
  //   return Number(p * (1 + r * t / 100.0)).toFixed(2);
  // }
  // getCompoundAmount(p, r, t, N = 360) {
  //   // p initial amount,
  //   // r interest per yr
  //   // t time in years
  //   // N number of times that interest is compounded per year
  //   // See https://www.thecalculatorsite.com/articles/finance/compound-interest-formula.php for more details
  //   return Number(p * Math.pow(1 + r / (N * 100.0), N * t)).toFixed(2);
  // }

  showGenerateReportModal() {
    this.props.mappedShowGenerateReportModal();
  }
  hideGenerateReportModal() {
    this.props.mappedHideGenerateReportModal();
  }
  showEditModal(savingDepositToEdit) {
    this.props.mappedShowEditModal(savingDepositToEdit);
  }
  hideEditModal() {
    this.props.mappedHideEditModal();
  }
  submitEditSavingDeposit(e) {
    e.preventDefault();
    const isAdmin = this.props.mappedProfileState.profile && this.props.mappedProfileState.profile.role === "ADMIN";
    const editForm = document.getElementById("EditSavingDepositForm");
    const data = {
      _id: editForm.id.value,
      bankName: editForm.bankName.value,
      accountNumber: editForm.accountNumber.value,
      initialAmount: editForm.initialAmount.value,
      startDate: editForm.startDate.value,
      endDate: editForm.endDate.value,
      interest: editForm.interest.value,
      tax: editForm.tax.value
    };

    this.props.mappedEditSavingDeposit(data, isAdmin);
  }
  hideDeleteModal() {
    this.props.mappedHideDeleteModal();
  }
  showDeleteModal(savingDepositToDelete) {
    this.props.mappedShowDeleteModal(savingDepositToDelete);
  }
  confirmDeleteSavingDeposit() {
    const isAdmin = this.props.mappedProfileState.profile && this.props.mappedProfileState.profile.role === "ADMIN";
    this.props.mappedDeleteSavingDeposit(
      this.props.mappedSavingDepositState.savingDepositToDelete,
      isAdmin
    );
  }

  render() {
    const savingDepositState = this.props.mappedSavingDepositState;
    const usersState = this.props.mappedUsersState;
    const isAdmin = this.props.mappedProfileState.profile && this.props.mappedProfileState.profile.role === "ADMIN";
    const savingDeposits = savingDepositState.savingDeposits;
    const { savingDepositsFilter, savingDepositToDelete } = savingDepositState;
    const savingDepositToEdit = savingDepositState.savingDepositToEdit;
    return (
      <div className="col-md-12">
        <h3 className="centerAlign">Saving Deposits</h3>

        <Panel>
          <Panel.Heading>
            <Panel.Title componentClass="h3">Actions</Panel.Title>
          </Panel.Heading>
          <Panel.Body>
            <Link to={`/saving-deposits/create`}>
              <Button onClick={() => {}} bsStyle="info" bsSize="small">
                <Glyphicon glyph="plus" /> Add new record
              </Button>
            </Link>{" "}

            {!isAdmin &&
              <Button
                onClick={() => {
                  this.showGenerateReportModal();
                }}
                bsStyle="info"
                bsSize="small"
              >
                <Glyphicon glyph="tasks" /> Generate report
              </Button>}
          </Panel.Body>
        </Panel>

        <Panel>
          {" "}<Panel.Heading>
            <Panel.Title componentClass="h3">Search</Panel.Title>
          </Panel.Heading>
          <Panel.Body>
            {/*Amount gteq : min
                Amount lteq : max
                Bank: ABC
                start date: sldfkj
                end date: sdlfj*/}
            <form
              className="form"
              id="searchSavingDepositForm"
              onSubmit={this.searchSavingDeposits}
            >
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
                <ControlLabel>Bank name: </ControlLabel>
                <FormControl
                  type="text"
                  placeholder="Enter bank name"
                  name="bankName"
                  defaultValue={
                    (savingDepositsFilter && savingDepositsFilter.bankName) ||
                      ""
                  }
                />
              </FormGroup>
              <FormGroup>
                <ControlLabel>Minimum invested amount </ControlLabel>
                <InputGroup>
                  <InputGroup.Addon>$</InputGroup.Addon>
                  <FormControl
                    type="text"
                    placeholder="Enter minimum amount"
                    name="minAmount"
                    defaultValue={
                      (savingDepositsFilter &&
                        savingDepositsFilter.minAmount) ||
                        ""
                    }
                  />
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <ControlLabel>Maximum invested amount </ControlLabel>
                <InputGroup>
                  <InputGroup.Addon>$</InputGroup.Addon>
                  <FormControl
                    type="text"
                    placeholder="Enter maximum amount"
                    name="maxAmount"
                    defaultValue={
                      (savingDepositsFilter &&
                        savingDepositsFilter.maxAmount) ||
                        ""
                    }
                  />
                </InputGroup>
              </FormGroup>

              <FormGroup>
                <ControlLabel>Start date: </ControlLabel>
                <DatePicker
                  id="start-date-picker"
                  name="startDate"
                  value={
                    (savingDepositsFilter && savingDepositsFilter.startDate) ||
                      ""
                  }
                />
                {" "}
              </FormGroup>
              <FormGroup>

                <ControlLabel>End date: </ControlLabel>
                <DatePicker
                  id="end-date-picker"
                  name="endDate"
                  value={
                    (savingDepositsFilter && savingDepositsFilter.endDate) || ""
                  }
                />
              </FormGroup>

              <FormGroup>
                <Button type="submit" bsStyle="info" bsSize="small" block>
                  Search
                </Button>
              </FormGroup>
            </form>
          </Panel.Body>
        </Panel>

        {!savingDeposits &&
          (savingDepositState.isFetching || usersState.isFetching) &&
          <p>Loading saving deposits...</p>}
        {savingDeposits.length <= 0 &&
          !savingDepositState.error &&
          !(savingDepositState.isFetching || usersState.isFetching) &&
          <p>
            No Saving Deposits Available. Add A Saving Deposit to List here.
          </p>}
        {savingDeposits.length <= 0 &&
          savingDepositState.error &&
          !(savingDepositState.isFetching || usersState.isFetching) &&
          <Alert bsStyle="danger">
            <strong>Failed. {savingDepositState.error} </strong>
          </Alert>}
        {savingDeposits &&
          savingDeposits.length > 0 &&
          !(savingDepositState.isFetching || usersState.isFetching) &&
          <div>
            <Panel>

              <Panel.Body>

                <table className="table">
                  <thead>
                    <tr>
                      {isAdmin && <th>User</th>}
                      <th>Bank name</th>
                      <th>Initial amount</th>
                      <th>Start date</th>
                      <th>End date</th>
                      <th className="textCenter">Edit</th>
                      <th className="textCenter">Delete</th>
                      <th className="textCenter">View</th>
                    </tr>
                  </thead>
                  <tbody>
                    {savingDeposits.map((savingDeposit, i) => {
                      let userEmail;
                      if (isAdmin) {
                        userEmail = usersState.users.find(
                          user => user._id == savingDeposit.userId
                        ).email;
                      }
                      return (
                        <tr key={`sd-${savingDeposit._id}-${i}`}>
                          {isAdmin && <th>{userEmail}</th>}
                          <td>{savingDeposit.bankName}</td>
                          <td>{savingDeposit.initialAmount}</td>
                          <td>{savingDeposit.startDate.substr(0, 10)}</td>
                          <td>{savingDeposit.endDate.substr(0, 10)}</td>
                          <td className="textCenter">
                            <Button
                              onClick={() => this.showEditModal(savingDeposit)}
                              bsStyle="info"
                              bsSize="small"
                            >
                              <Glyphicon glyph="pencil" />
                            </Button>
                          </td>
                          <td className="textCenter">
                            <Button
                              onClick={() =>
                                this.showDeleteModal(savingDeposit)}
                              bsStyle="danger"
                              bsSize="small"
                            >
                              <Glyphicon glyph="trash" />
                            </Button>
                          </td>
                          <td className="textCenter">
                            <Link to={`/saving-deposits/${savingDeposit._id}`}>
                              View Details
                            </Link>
                            {" "}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </Panel.Body>
            </Panel>

          </div>}

        {/* Modal for editing savingDeposit */}
        <Modal
          show={savingDepositState.showEditModal}
          onHide={this.hideEditModal}
          container={this}
          aria-labelledby="contained-modal-title"
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title">
              Edit Saving Deposit Record
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="col-md-12" style={{ float: "initial" }}>
              {savingDepositToEdit &&
                <SavingDepositEditForm
                  savingDepositData={savingDepositToEdit}
                  isAdmin={isAdmin}
                  userEmail={
                    isAdmin && savingDepositToEdit
                      ? usersState.users.find(
                          user => user._id == savingDepositToEdit.userId
                        ).email
                      : ""
                  }
                  editSavingDeposit={this.submitEditSavingDeposit}
                />}
              {savingDepositToEdit &&
                savingDepositState.isFetching &&
                <Alert bsStyle="info">
                  <strong>Updating... </strong>
                </Alert>}
              {savingDepositToEdit &&
                !savingDepositState.isFetching &&
                savingDepositState.error &&
                <Alert bsStyle="danger">
                  <strong>Failed. {savingDepositState.error} </strong>
                </Alert>}
              {!savingDepositState.isFetching &&
                savingDepositState.successMsg &&
                <Alert bsStyle="success">
                  Success.
                  {" "}
                  <strong> {savingDepositState.successMsg} </strong>
                </Alert>}
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button bsSize="small" onClick={this.hideEditModal}>Close</Button>
          </Modal.Footer>
        </Modal>

        {/* Modal for deleting savingDeposit */}
        <Modal
          show={savingDepositState.showDeleteModal}
          onHide={this.hideDeleteModal}
          container={this}
          aria-labelledby="contained-modal-title"
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title">
              Delete Saving Deposit Record
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {savingDepositToDelete &&
              <Alert bsStyle="warning">
                Are you sure you want to delete the saving deposit with bank
                {" "}
                <strong>{savingDepositToDelete.bankName}</strong>
                ?
              </Alert>}
            {savingDepositToDelete &&
              savingDepositState.isFetching &&
              <Alert bsStyle="success">
                <strong>Deleting... </strong>
              </Alert>}
            {savingDepositToDelete &&
              !savingDepositState.isFetching &&
              savingDepositState.error &&
              <Alert bsStyle="danger">
                Failed. <strong>{savingDepositState.error} </strong>
              </Alert>}
            {!savingDepositToDelete &&
              !savingDepositState.isFetching &&
              savingDepositState.successMsg &&
              <Alert bsStyle="success">
                Saving Deposit <strong>{savingDepositState.successMsg} </strong>
              </Alert>}
          </Modal.Body>
          <Modal.Footer>
            {!savingDepositState.successMsg &&
              !savingDepositState.isFetching &&
              <div>
                <Button
                  bsSize="small"
                  onClick={this.confirmDeleteSavingDeposit}
                >
                  Yes
                </Button>
                <Button bsSize="small" onClick={this.hideDeleteModal}>
                  No
                </Button>
              </div>}
            {savingDepositState.successMsg &&
              !savingDepositState.isFetching &&
              <Button bsSize="small" onClick={this.hideDeleteModal}>
                Close
              </Button>}
          </Modal.Footer>
        </Modal>

        {/* Modal for generating report */}
        <Modal
          show={savingDepositState.showGenerateReportModal}
          onHide={this.hideGenerateReportModal}
          container={this}
          aria-labelledby="contained-modal-title"
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title">
              Generate Saving Deposit Report
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div>
              <form
                className="form"
                id="generateSavingDepositsReport"
                onSubmit={this.generateSavingDepositsReport}
              >

                <FormGroup>
                  <ControlLabel>Start date: </ControlLabel>
                  <DatePicker
                    id="report-start-date-picker"
                    name="reportStartDate"
                  />
                </FormGroup>

                <FormGroup>
                  <ControlLabel>End date: </ControlLabel>
                  <DatePicker
                    id="report-end-date-picker"
                    name="reportEndDate"
                  />
                </FormGroup>

                <FormGroup>
                  <Button
                    type="submit"
                    bsStyle="info"
                    bsSize="small"
                    block
                    id="generate-report"
                  >
                    Generate
                  </Button>
                </FormGroup>{" "}
              </form>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button bsSize="small" onClick={this.hideGenerateReportModal}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}
