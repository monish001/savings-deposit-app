import React from "react";
import {
  Form,
  Col,
  FormGroup,
  ControlLabel,
  FormControl
} from "react-bootstrap";

export default class SavingDepositsReport extends React.Component {
  componentDidMount() {
    // const { startDate, endDate } = this.props.params;
    // this.props.mappedFetchSavingDepositsReport({ startDate, endDate }); // @todo uncomment
  }
  render() {
    const savingDepositsReportState = this.props
      .mappedSavingDepositsReportState;

    return (
      <div className="savingDepositsReport">
        {!savingDepositsReportState.savingDepositsReport &&
          savingDepositsReportState.isFetching &&
          <div>
            <p>Loading saving deposits report...</p>
          </div>}
        {!savingDepositsReportState.isFetching &&
          savingDepositsReportState.error &&
          <div>{`${savingDepositsReportState.error}`}</div>}
        {savingDepositsReportState.savingDepositsReport &&
          savingDepositsReportState.savingDepositsReport.rows &&
          savingDepositsReportState.savingDepositsReport.rows.length == 0 &&
          !savingDepositsReportState.isFetching &&
          !savingDepositsReportState.error &&
          <div>No saving deposits active during given period</div>}
        {savingDepositsReportState.savingDepositsReport &&
          savingDepositsReportState.savingDepositsReport.rows &&
          savingDepositsReportState.savingDepositsReport.rows.length > 0 &&
          !savingDepositsReportState.isFetching &&
          !savingDepositsReportState.error &&
          <div>
            <h2
            >{`Saving Deposits Report for period ${savingDepositsReportState.savingDepositsReport.request.startDate.substr(0,10)} - ${savingDepositsReportState.savingDepositsReport.request.endDate.substr(0,10)}`}</h2>
            <table className="table">
              <thead>
                <tr>
                  <th>Bank name</th>
                  <th>Account number</th>
                  <th>Initial amount (in USD)</th>
                  <th>Interest %</th>
                  <th>Tax %</th>
                  <th>Gain (+ve) / Loss (-ve) (in USD)</th>
                  <th>Taxes (in USD)</th>
                </tr>
              </thead>
              <tbody>
                {savingDepositsReportState.savingDepositsReport.rows.map(
                  (savingDeposit, i) => (
                    <tr key={`report-row-${i}-${savingDeposit._id}`}>
                      <td>{savingDeposit.bankName}</td>
                      <td>{savingDeposit.accountNumber}</td>
                      <td>{savingDeposit.initialAmount}</td>
                      <td>{savingDeposit.interest}</td>
                      <td>{savingDeposit.tax}</td>
                      <td
                        style={{
                          color: `${Number(savingDeposit.gainsInUsd) > 0 ? "green" : "red"}`
                        }}
                      >
                        {savingDeposit.gainsInUsd}
                      </td>
                      <td>{savingDeposit.taxInUsd}</td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
            <h3>Summary</h3>
            <Form horizontal>
              <FormGroup controlId="formHorizontalGains">
                <Col componentClass={ControlLabel} sm={2}>
                  Total Gains (in USD)
                </Col>
                <Col sm={10}>
                  <FormControl.Static>
                    {
                      savingDepositsReportState.savingDepositsReport.summary
                        .totalGains
                    }
                  </FormControl.Static>
                </Col>
              </FormGroup>

              <FormGroup controlId="formHorizontalLoss">
                <Col componentClass={ControlLabel} sm={2}>
                  Total Loss (in USD)
                </Col>
                <Col sm={10}>
                  <FormControl.Static>
                    {
                      savingDepositsReportState.savingDepositsReport.summary
                        .totalLoss
                    }
                  </FormControl.Static>
                </Col>
              </FormGroup>
              <FormGroup controlId="formHorizontalTax">
                <Col componentClass={ControlLabel} sm={2}>
                  Total tax (in USD)
                </Col>
                <Col sm={10}>
                  <FormControl.Static>
                    {
                      savingDepositsReportState.savingDepositsReport.summary
                        .totalTax
                    }
                  </FormControl.Static>
                </Col>
              </FormGroup>
            </Form>
          </div>}
      </div>
    );
  }
}
