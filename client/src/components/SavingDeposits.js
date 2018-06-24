// ./react-redux-client/src/components/SavingDeposits.js
import React from "react";
import { Alert, Glyphicon, Button, Modal } from "react-bootstrap";
import { Link } from "react-router";
// @todo import SavingDepositEditForm from "./SavingDepositEditForm";
// @todo import SavingDepositAddForm from "./SavingDepositAddForm";
export default class SavingDeposits extends React.Component {
  constructor(props) {
    super(props);
    this.hideEditModal = this.hideEditModal.bind(this);
    this.submitEditSavingDeposit = this.submitEditSavingDeposit.bind(this);
    this.hideDeleteModal = this.hideDeleteModal.bind(this);
    this.confirmDeleteSavingDeposit = this.confirmDeleteSavingDeposit.bind(this);
  }
  componentWillMount() {
    this.props.fetchSavingDeposits();
  }
  showEditModal(savingDepositToEdit) {
    this.props.mappedShowEditModal(savingDepositToEdit);
  }
  hideEditModal() {
    this.props.mappedHideEditModal();
  }
  submitEditSavingDeposit(e) {
    e.preventDefault();
    const editForm = document.getElementById("EditSavingDepositForm");
    if (editForm.savingDepositText.value !== "") {
      const data = new FormData();
      data.append("id", editForm.id.value);
      data.append("savingDepositText", editForm.savingDepositText.value);
      data.append("savingDepositDesc", editForm.savingDepositDesc.value);
      this.props.mappedEditSavingDeposit(data);
    } else {
      return;
    }
  }
  hideDeleteModal() {
    this.props.mappedhideDeleteModal();
  }
  showDeleteModal(savingDepositToDelete) {
    this.props.mappedshowDeleteModal(savingDepositToDelete);
  }
  confirmDeleteSavingDeposit() {
    this.props.mappedDeleteSavingDeposit(
      this.props.mappedSavingDepositState.savingDepositToDelete
    );
  }
  render() {
    const savingDepositState = this.props.mappedSavingDepositState;
    let savingDeposits = savingDepositState.savingDeposits;
    savingDeposits = [{
        "bankName": 1,
        "accountNumber": 2,
        "initialAmount": 3,
        "startDate": "2018-06-01T06:30:00.000Z",
        "endDate": "2018-06-02T06:30:00.000Z",
        "interest": 12.12,
        "tax": 1.12
    }];
    const editSavingDeposit = savingDepositState.savingDepositToEdit;
    return (
      <div className="col-md-12">
        <h3 className="centerAlign">SavingDeposits</h3>
        <Link to={`/saving-deposits/create`}>
          <Button
            onClick={() => {}}
            bsStyle="info"
            bsSize="xsmall"
          >
            <Glyphicon glyph="plus" /> Add new record
          </Button>
        </Link>{" "}

        <Button
            onClick={() => {}}
            bsStyle="info"
            bsSize="xsmall"
        >
            <Glyphicon glyph="tasks" /> Generate report
        </Button>


        {!savingDeposits &&
          savingDepositState.isFetching &&
          <p>Loading saving deposits...</p>}
        {savingDeposits.length <= 0 &&
          !savingDepositState.isFetching &&
          <p>
            No Saving Deposits Available. Add A Saving Deposit to List here.
          </p>}
        {savingDeposits &&
          savingDeposits.length > 0 &&
          !savingDepositState.isFetching &&
          <table className="table">
            <thead>
              <tr>
                {//   @todo filters
                }
                <th>Bank name</th>
                <th>Initial amount</th>
                <th>Current amount</th>
                <th>Start date</th>
                <th>End date</th>
                <th className="textCenter">Edit</th>
                <th className="textCenter">Delete</th>
                <th className="textCenter">View</th>
              </tr>
            </thead>
            <tbody>
              {savingDeposits.map((savingDeposit, i) => (
                <tr key={i}>
                  <td>{savingDeposit.bankName}</td>
                  <td>{savingDeposit.initialAmount}</td>
                  <td>{savingDeposit.initialAmount}</td>
                  <td>{savingDeposit.startDate}</td>
                  <td>{savingDeposit.endDate}</td>
                  <td className="textCenter">
                    <Button
                      onClick={() => this.showEditModal(savingDeposit)}
                      bsStyle="info"
                      bsSize="xsmall"
                    >
                      <Glyphicon glyph="pencil" />
                    </Button>
                  </td>
                  <td className="textCenter">
                    <Button
                      onClick={() => this.showDeleteModal(savingDeposit)}
                      bsStyle="danger"
                      bsSize="xsmall"
                    >
                      <Glyphicon glyph="trash" />
                    </Button>
                  </td>
                  <td className="textCenter">
                    <Link to={`/${savingDeposit._id}`}>View Details</Link>{" "}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>}
        {/* Modal for editing savingDeposit */}
        <Modal
          show={savingDepositState.showEditModal}
          onHide={this.hideEditModal}
          container={this}
          aria-labelledby="contained-modal-title"
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title">
              Edit Your SavingDeposit
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="col-md-12">
              {/* @todo editSavingDeposit &&
                <SavingDepositEditForm
                  savingDepositData={editSavingDeposit}
                  editSavingDeposit={this.submitEditSavingDeposit}
              />*/}
              {editSavingDeposit &&
                savingDepositState.isFetching &&
                <Alert bsStyle="info">
                  <strong>Updating...... </strong>
                </Alert>}
              {editSavingDeposit &&
                !savingDepositState.isFetching &&
                savingDepositState.error &&
                <Alert bsStyle="danger">
                  <strong>Failed. {savingDepositState.error} </strong>
                </Alert>}
              {editSavingDeposit &&
                !savingDepositState.isFetching &&
                savingDepositState.successMsg &&
                <Alert bsStyle="success">
                  Book
                  {" "}
                  <strong> {editSavingDeposit.savingDepositText} </strong>
                  {savingDepositState.successMsg}
                </Alert>}
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.hideEditModal}>Close</Button>
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
              Delete Your Book
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {savingDepositState.savingDepositToDelete &&
              !savingDepositState.error &&
              !savingDepositState.isFetching &&
              <Alert bsStyle="warning">
                Are you sure you want to delete this saving deposit
                {" "}
                <strong>
                  {savingDepositState.savingDepositToDelete.savingDepositText}
                  {" "}
                </strong>
                {" "}
                ?
              </Alert>}
            {savingDepositState.savingDepositToDelete &&
              savingDepositState.error &&
              <Alert bsStyle="warning">
                Failed. <strong>{savingDepositState.error} </strong>
              </Alert>}
            {savingDepositState.savingDepositToDelete &&
              !savingDepositState.error &&
              savingDepositState.isFetching &&
              <Alert bsStyle="success">
                <strong>Deleting.... </strong>
              </Alert>}
            {!savingDepositState.savingDepositToDelete &&
              !savingDepositState.error &&
              !savingDepositState.isFetching &&
              <Alert bsStyle="success">
                SavingDeposit <strong>{savingDepositState.successMsg} </strong>
              </Alert>}
          </Modal.Body>
          <Modal.Footer>
            {!savingDepositState.successMsg &&
              !savingDepositState.isFetching &&
              <div>
                <Button onClick={this.confirmDeleteSavingDeposit}>Yes</Button>
                <Button onClick={this.hideDeleteModal}>No</Button>
              </div>}
            {savingDepositState.successMsg &&
              !savingDepositState.isFetching &&
              <Button onClick={this.hideDeleteModal}>Close</Button>}
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}
