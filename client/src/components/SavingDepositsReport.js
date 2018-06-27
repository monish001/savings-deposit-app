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
    const { startDate, endDate } = this.props.params;
    this.props.mappedFetchSavingDepositsReport({ startDate, endDate });
  }
  render() {
    const savingDepositsReportState = this.props
      .mappedSavingDepositsReportState;
    savingDepositsReportState.savingDepositsReport = {
      // @todo mock data
      rows: [
        {
          _id: 1,
          bankName: 1,
          accountNumber: 2,
          initialAmount: 3,
          startDate: "2018-06-01T06:30:00.000Z",
          endDate: "2018-06-02T06:30:00.000Z",
          gains: 12.12,
          tax: 1.12
        },
        {
          _id: 2,
          bankName: 1,
          accountNumber: 2,
          initialAmount: 3,
          startDate: "2018-06-01T06:30:00.000Z",
          endDate: "2018-06-02T06:30:00.000Z",
          gains: -12.12,
          tax: 0
        }
      ],
      summary: {
        totalGains: 12,
        totalLoss: 13,
        totaltax: 14
      },
      request: {
        startDate: "2018-06-01",
        endDate: "2018-07-01"
      }
    };
    return (
      <div className="savingDepositsReport">
        {!savingDepositsReportState.savingDepositsReport &&
          savingDepositsReportState.isFetching &&
          <div>
            <p>Loading saving deposits report...</p>
          </div>}
        {savingDepositsReportState.savingDepositsReport &&
          savingDepositsReportState.savingDepositsReport.rows &&
          savingDepositsReportState.savingDepositsReport.rows.length == 0 &&
          !savingDepositsReportState.isFetching &&
          <div>No saving deposits active during given period</div>}
        {savingDepositsReportState.savingDepositsReport &&
          savingDepositsReportState.savingDepositsReport.rows &&
          savingDepositsReportState.savingDepositsReport.rows.length > 0 &&
          !savingDepositsReportState.isFetching &&
          <div>
            <h2
            >{`Saving Deposits Report for period ${savingDepositsReportState.savingDepositsReport.request.startDate} - ${savingDepositsReportState.savingDepositsReport.request.endDate}`}</h2>
            <table className="table">
              <thead>
                <tr>
                  <th>Bank name</th>
                  <th>Account number</th>
                  <th>Initial amount (in USD)</th>
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
                      <td
                        style={{
                          color: `${savingDeposit.gains > 0 ? "green" : "red"}`
                        }}
                      >
                        {savingDeposit.gains}
                      </td>
                      <td>{savingDeposit.tax}</td>
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
                        .totaltax
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
