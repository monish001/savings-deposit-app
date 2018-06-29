import React from "react";
import {
  Alert,
  Button,
  Modal,
  FormGroup,
  ControlLabel,
  FormControl
} from "react-bootstrap";

const UsersInviteModal = props => {
  const {
    show,
    onHide,
    container,
    hideUserModal,
    displayTitle,
    submitAction,
    state
  } = props;
  return (
    <Modal
      show={show}
      onHide={onHide}
      container={container}
      aria-labelledby="contained-modal-title"
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title">
          {displayTitle}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {state &&
          !state.isFetching &&
          <div className="col-md-12" style={{ float: "initial" }}>
            <form
              className="form form-horizontal"
              id="UserInviteForm"
              onSubmit={submitAction}
            >
              <div className="row">
                <div className="col-md-12">
                  <FormGroup>
                    <ControlLabel>Email</ControlLabel>
                    <FormControl
                      type="email"
                      placeholder="Enter email"
                      name="email"
                    />
                  </FormGroup>
                </div>
              </div>
              <FormGroup>
                <Button type="submit" bsStyle="info" bsSize="small" block>
                  Submit
                </Button>
              </FormGroup>
            </form>
          </div>}
        {state &&
          state.error &&
          <Alert bsStyle="danger">
            Failed. <strong>{state.error} </strong>
          </Alert>}
        {state &&
          !state.error &&
          state.isFetching &&
          <Alert bsStyle="success">
            <strong>In progress... </strong>
          </Alert>}
        {!state &&
          !state.error &&
          !state.isFetching &&
          <Alert bsStyle="success">
            <strong>{state.successMsg} </strong>
          </Alert>}
      </Modal.Body>
      <Modal.Footer>
        <Button bsSize="small" onClick={hideUserModal}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
export default UsersInviteModal;
