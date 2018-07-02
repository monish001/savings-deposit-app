import React from "react";
import { Alert, Button, Modal } from "react-bootstrap";

const UsersConfirmationModal = props => {
  const {
    show,
    onHide,
    container,
    displayTitle,
    user,
    usersState,
    displayBody,
    confirm,
    hideUserModal
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
        {user &&
          !usersState.error &&
          !usersState.successMsg &&
          !usersState.isFetching &&
          <Alert bsStyle="warning">
            {displayBody}
            {" "}
            <strong>{user.email} </strong>
            {" "}
            ?
          </Alert>}
        {usersState.error &&
          !usersState.isFetching &&
          <Alert bsStyle="danger">
            Failed. <strong>{usersState.error} </strong>
          </Alert>}
        {!usersState.error &&
          !usersState.successMsg &&
          usersState.isFetching &&
          <Alert bsStyle="success">
            <strong>In progress... </strong>
          </Alert>}
        {usersState.successMsg &&
          !usersState.isFetching &&
          <Alert bsStyle="success">
            <strong>{usersState.successMsg} </strong>
          </Alert>}
      </Modal.Body>
      <Modal.Footer>
        {!usersState.successMsg &&
          !usersState.isFetching &&
          <div>
            <Button bsSize="small" onClick={confirm}>
              Yes
            </Button>
            <Button bsSize="small" onClick={hideUserModal}>
              No
            </Button>
          </div>}
        {usersState.successMsg &&
          !usersState.isFetching &&
          <Button bsSize="small" onClick={hideUserModal}>
            Close
          </Button>}
      </Modal.Footer>
    </Modal>
  );
};

export default UsersConfirmationModal;
