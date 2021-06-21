import React, { Component } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import ToolkitProvider from "react-bootstrap-table2-toolkit";
import MultipleValueTextInput from "react-multivalue-text-input";
import "../style.css";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.css";
import paginationFactory from "react-bootstrap-table2-paginator";
import filterFactory, {
  textFilter,
  multiSelectFilter,
} from "react-bootstrap-table2-filter";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import "react-multivalue-text-input/build/styles/styles.scss";
import "bootstrap/dist/css/bootstrap.css";
import Select from "react-select";
import axios from "axios";
import cellEditFactory from "react-bootstrap-table2-editor";
import configData from "./config.json";
import ClipLoader from "react-spinners/ClipLoader";

export class Dashbord extends Component {
  constructor(props) {
    super(props);

    this.onChangeActionType = this.onChangeActionType.bind(this);
    this.onchangeRejectionReason = this.onchangeRejectionReason.bind(this);
    this.onClickSubmit = this.onClickSubmit.bind(this);

    this.state = {
      filesData: [],
      nonSelected: [],
      selected: [],
      isHidden: true,
      new_status: "",
      show_rejection_reason: "fresh-field-wrapper hide_data",
      rejection_reason: "",
      approver: this.props.email,
      userRole: this.props.userRole,
      loading: false,
      requestTypeList: "",
      zoneList: "",
      requestorTypeList: "",
      requestReasonList: "",
    };
  }
  toggleHidden() {
    this.setState({
      isHidden: !this.state.isHidden,
    });
  }

  pullData() {
    this.setState({
      // filesData: response.data,
      filesData:[{
        Request_id: 1,
        request_zone: 'APAC',
        request_type: 'Qty Change',
        requestor_type: 'Commercial',
        Order: '11223344',
        sales_org: 'ABXZ',
        cust_po_num: '45451122',
        old_value: '200',
        new_value: '300',
        requester_email: 'test@g.com',
        request_reason: 'Validation',
        request_status: 'Pending Approval',
        additional_notification_to: '',
        creation_date: '17-06-2021',
        Reason_Rej: null,
        approver: '',
      },{
        Request_id: 2,
        request_zone: 'APAC',
        request_type: 'Date Change',
        requestor_type: 'Financial',
        Order: '9998888',
        sales_org: 'ABXP',
        cust_po_num: '3324556',
        old_value: '18-01-2020',
        new_value: '21-02-2020',
        requester_email: 'test@email.com',
        request_reason: 'Production',
        request_status: 'Pending Approval',
        additional_notification_to: '',
        creation_date: '27-01-2020',
        Reason_Rej: null,
        approver: '',
      },{
    Request_id: 3,
    request_zone: 'EUR',
    request_type: 'Route',
    requestor_type: 'Commercial',
    Order: '1000000',
    sales_org: 'PPXZ',
    cust_po_num: '1234455',
    old_value: 'AB12',
    new_value: 'AB13',
    requester_email: 'email@test.com',
    request_reason: 'Quality',
    request_status: 'Pending Approval',
    additional_notification_to: '',
    creation_date: '17-03-2021',
    Reason_Rej: null,
    approver: '',
      }]
    });
    this.setState({ loading: true });
    axios
      .get(configData.SERVER_URL + "/api/getall", {
        headers: {
          userRole: this.state.userRole,
          requesterEmail: this.state.approver,
        },
      })
      .then((response) => {
        this.setState({
          filesData: response.data,
        });
        this.handleUnSelect(response.data);
      })
      .catch((error) => {
        console.error("There was an error in fetching data !", error);
      })
      .finally(() => {
        this.setState({
          loading: false, // stop spinner (in response/error)
        });
      });

    axios
      .get(configData.SERVER_URL + "/api/getRequestType")
      .then((res) => {
        console.log(res);
        var ids = res.data.map((r) => {
          return r.label;
        });
        // console.log(ids["Customer"]);
        this.setState({
          requestTypeList: ids,
        });
      })
      .catch((err) => {
        console.log(err);
      });

    axios
      .get(configData.SERVER_URL + "/api/getZone")
      .then((res) => {
        console.log(res);
        var ids = res.data.map((r) => {
          return r.label;
        });
        this.setState({
          zoneList: ids,
        });
      })
      .catch((err) => {
        console.log(err);
      });

    axios
      .get(configData.SERVER_URL + "/api/getRequesterType")
      .then((res) => {
        console.log(res);
        var ids = res.data.map((r) => {
          return r.label;
        });
        this.setState({
          requestorTypeList: ids,
        });
      })
      .catch((err) => {
        console.log(err);
      });

    axios
      .get(configData.SERVER_URL + "/api/getRequestReason")
      .then((res) => {
        console.log(res);
        var ids = res.data.map((r) => {
          return r.label;
        });
        this.setState({
          requestReasonList: ids,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  componentDidMount() {
    console.log(this.state.userRole);
    this.pullData();
  }

  onChangeActionType(e) {
    console.log("dropdown value" + e.value);

    this.setState({
      new_status: e.value,
    });
    if (e.value === 3) {
      console.log("unhide" + this.state.new_status);
      this.setState({
        show_rejection_reason: "fresh-field-wrapper",
      });
    } else {
      this.setState({
        show_rejection_reason: "fresh-field-wrapper hide_data",
      });
    }
  }

  onchangeRejectionReason(e) {
    console.log(e.target.value);
    this.setState({
      rejection_reason: e.target.value,
    });
  }

  onClickSubmit() {
    if (
      this.state.new_status === "" ||
      (this.state.new_status === 3 && this.state.rejection_reason === "")
    ) {
      toast.error("Please populate the mandatory fields");
    } else {
      this.updateRequestStatus();
    }
  }

  updateRequestStatus = () => {
    console.log(this.state.selected);
    if (this.state.new_status !== "") {
      console.log(this.state.approver);
      axios
        .post(configData.SERVER_URL + "/api/update", {
          selected: this.state.selected,
          new_status: this.state.new_status,
          rejection_reason: this.state.rejection_reason,
          approver: this.state.approver,
        })
        .then((res) => {
          // then print response status
          console.log(res);
          if (res.data === "Please select requests to process.") {
            toast.warning(res.data);
          } else {
            toast.success("Request status modified successfully.");
          }

          this.pullData();
          this.setState(() => ({
            selected: [],
            new_status: "",
          }));
          setTimeout(() => window.location.reload(), 1000);
        })
        .catch((err) => {
          console.log(err);
          toast.error("Unknown Error in Modifying status");
          setTimeout(() => window.location.reload(), 1000);
        });
    } else {
      toast.error("Select the New Status from Dropdown");
    }
  };

  handleUnSelect = (data) => {
    var ids = data.map((r) => {
      if (r.request_status === "Completed" || r.request_status === "WIP")
        return r.Request_id;
      else return "";
    });

    console.log(ids);
    this.setState(() => ({
      nonSelected: ids,
    }));
  };

  handleOnSelect = (row, isSelect) => {
    if (isSelect) {
      this.setState(() => ({
        selected: [...this.state.selected, row.Request_id],
      }));
    } else {
      this.setState(() => ({
        selected: this.state.selected.filter((x) => x !== row.Request_id),
      }));
    }
  };

  handleOnSelectAll = (isSelect, rows) => {
    const ids = rows.map((r) => r.Request_id);
    if (isSelect) {
      this.setState(() => ({
        selected: ids,
      }));
    } else {
      this.setState(() => ({
        selected: [],
      }));
    }
  };

  addItemMultipleSO = (item, allItems) => {
    console.log(allItems);
    axios
      .post(
        configData.SERVER_URL + "/api/filterMultipleSO",
        { SO: allItems },
        {
          headers: {
            userRole: this.state.userRole,
            requesterEmail: this.state.approver,
          },
        }
      )
      .then((response) => {
        this.setState({
          filesData: response.data,
        });
        this.handleUnSelect(response.data);
      });
  };

  render() {
    const MyExportCSV = (props) => {
      const handleClick = () => {
        props.onExport();
      };
      return (
        <div className="div_export">
          <button type="button" className="fresh-button" onClick={handleClick}>
            Export to CSV
          </button>
        </div>
      );
    };

    const actionSelect = [
      { label: "Pending Approval", value: 1 },
      { label: "Approve", value: 2 },
      { label: "Reject", value: 3 },
      { label: "OA to be sent", value: 5 },
      { label: "PO Date to be changed", value: 6 },
      { label: "Completed", value: 7 },
    ];

    const selectRow = {
      mode: "checkbox",
      clickToSelect: true,
      clickToEdit: true,
      selected: this.state.selected,
      nonSelectable: this.state.nonSelected,
      onSelect: this.handleOnSelect,
      onSelectAll: this.handleOnSelectAll,
      bgColor: "rgb(159, 223, 237)",
    };

    const sizePerPageList = [
      {
        text: "10",
        value: 10,
      },
      {
        text: "25",
        value: 25,
      },
      {
        text: "30",
        value: 30,
      },
      {
        text: "50",
        value: 50,
      },
      {
        text: "100",
        value: 100,
      },
      {
        text: "All",
        value: this.state.filesData.length,
      },
    ];

    // var requestTypeList = this.state.requestTypeList;
    const columns = [
      {
        dataField: "Request_id",
        text: "REQUEST ID",
        filter: textFilter({
          className: "filter_style",
          style: { fontSize: "0.75rem" },
        }),
        editable: false,
        sort: true,
        style: { "white-space": "nowrap" },
      },
      {
        dataField: "creation_date",
        text: "Creation Date",
        filter: textFilter({
          className: "filter_style",
          style: { fontSize: "0.75rem" },
        }),
        sort: true,
        editable: false,
        style: { "white-space": "nowrap" },
      },
      
      {
        dataField: "request_zone",
        text: "Zone",
        editable: false,
        filter: multiSelectFilter({
          options: this.state.zoneList,
        }),
        style: { "white-space": "nowrap" },
        headerStyle: () => {
          return { minWidth: "150px" };
        },
      },
      {
        dataField: "request_type",
        text: "Type",
        editable: false,
        filter: multiSelectFilter({
          options: this.state.requestTypeList,
        }),
        style: { "white-space": "nowrap" },
        headerStyle: () => {
          return { minWidth: "150px" };
        },
        // formatter: cell => this.state.requestTypeList.filter(opt => opt.value === cell)[0].label || '',
      },
      {
        dataField: "requestor_type",
        text: "Requestor Type",
        editable: false,
        filter: multiSelectFilter({
          options: this.state.requestorTypeList,
        }),
        style: { "white-space": "nowrap" },
        headerStyle: () => {
          return { minWidth: "150px" };
        },
      },
      {
        dataField: "request_reason",
        text: "Request Reason",
        editable: false,
        filter: multiSelectFilter({
          options: this.state.requestReasonList,
        }),
        style: { "white-space": "nowrap" },
        headerStyle: () => {
          return { minWidth: "150px" };
        },
      },
      {
        dataField: "Order",
        text: "Order Number",
        filter: textFilter({
          className: "filter_style",
          style: { fontSize: "0.75rem" },
        }),
        editable: false,
        style: { "white-space": "nowrap" },
      },
      {
        dataField: "sales_org",
        text: "Sales Organization",
        filter: textFilter({
          className: "filter_style",
          style: { fontSize: "0.75rem" },
        }),
        editable: false,
      },
      
      {
        dataField: "old_value",
        text: "Old Value",
        filter: textFilter({
          className: "filter_style",
          style: { fontSize: "0.75rem" },
        }),
        editable: false,
        style: { "white-space": "nowrap" },
      },
      {
        dataField: "new_value",
        text: "New Value",
        filter: textFilter({
          className: "filter_style",
          style: { fontSize: "0.75rem" },
        }),
        editable: false,
        style: { "white-space": "nowrap" },
      },
      
      {
        dataField: "request_status",
        text: "Request Status",
        filter: textFilter({
          className: "filter_style",
          style: { fontSize: "0.75rem" },
        }),
        editable: false,
      },
      {
        dataField: "comments",
        text: "Reason for Rejection",
        filter: textFilter({
          className: "filter_style",
          style: { fontSize: "0.75rem" },
        }),
        editable: false,
      },
      {
        dataField: "requester_email",
        text: "Requester Email",
        filter: textFilter({
          className: "filter_style",
          style: { fontSize: "0.75rem" },
        }),
        editable: false,
        style: { "white-space": "nowrap" },
      },
      {
        dataField: "additional_notification_to",
        text: "Additional Notification To",
        filter: textFilter({
          className: "filter_style",
          style: { fontSize: "0.75rem" },
        }),
        style: { "white-space": "nowrap" },
      },
      
      {
        dataField: "Reason_Rej",
        text: "Reason For Rejection",
        filter: textFilter({
          className: "filter_style",
          style: { fontSize: "0.75rem" },
        }),
        editable: false,
      },
      
      {
        dataField: "approver",
        text: "Request Status Last Modified by",
        filter: textFilter({
          className: "filter_style",
          style: { fontSize: "0.75rem" },
        }),
        editable: false,
      },
    ];

    return (
      <div className="Dashbored_div">
        <div className="div_approve_reject_wrapper ">
          <div
            className={
              this.state.userRole === 3 || this.state.userRole === 1
                ? ""
                : "hide_data"
            }
          >
            <div className="div_approve_reject">
              <label className="fresh-label" for="fresh-action">
                <span className="fresh-title">
                  <span className="reminder">* </span>Modify Selected :
                </span>
              </label>
              <Select
                options={actionSelect}
                onChange={this.onChangeActionType}
              />
            </div>
            <div className={this.state.show_rejection_reason}>
              <label className="fresh-label" for="fresh-rejection-reason">
                <span className="fresh-title">
                  <span className="reminder">* </span>Rejection Reason&nbsp;
                </span>
              </label>
              <input
                className="fresh-input css-yk16xz-control"
                onChange={this.onchangeRejectionReason}
                type="text"
                value={this.state.rejection_reason}
              ></input>
            </div>
            <button
              type="button"
              className="submit fresh-button "
              onClick={this.onClickSubmit}
            >
              Submit
            </button>
          </div>
          <div className="advanced-Search">
            <label className="fresh-label" for="fresh-advanced-search">
              <span className="fresh-title">
                Advanced Search{" "}
                <span className="reminder">
                  (separate multiple entries with COMMA or ENTER)
                </span>
              </span>
            </label>
            <MultipleValueTextInput
              onItemAdded={this.addItemMultipleSO}
              onItemDeleted={this.addItemMultipleSO}
              label="Sales Order"
              name="item-input"
              placeholder="Enter whatever items you want; separate them with COMMA or ENTER."
              deleteButton={<span>[x]</span>}
            />
          </div>
        </div>
        <div className="container-body">
          <ToolkitProvider
            bootstrap4
            keyField="Request_id"
            data={this.state.filesData}
            columns={columns}
            exportCSV={{
              fileName: "RequestList.csv",
              exportAll: false,
              onlyExportFiltered: true,
              onlyExportSelection: false,
            }}
          >
            {(props) => (
              <div>
                <MyExportCSV {...props.csvProps} />
                <BootstrapTable
                  filter={filterFactory()}
                  filterPosition="top"
                  pagination={paginationFactory({
                    sizePerPage: 50,
                    sizePerPageList: sizePerPageList,
                  })}
                  selectRow={selectRow}
                  sort={{ dataField: "creation_date", order: "desc" }}
                  headerClasses="cust_header-class"
                  wrapperClasses="table-responsive"
                  cellEdit={cellEditFactory({
                    mode: "dbclick",
                    afterSaveCell: (oldValue, newValue, row, column) => {
                      var req = { newValue: newValue, req_no: row.Request_id };
                      console.log(req);
                      axios
                        .post(
                          configData.SERVER_URL + "/api/updateCell/update",
                          req
                        )
                        .then((res) => {
                          console.log(res);
                          toast.success(
                            "Updated Additional Notification for " +
                              row.Request_id
                          );
                        })
                        .catch((err) => {
                          console.log(err);
                          toast.error(
                            "Error in updating Additional Notification"
                          );
                        });
                      this.pullData();
                    },
                  })}
                  {...props.baseProps}
                />
              </div>
            )}
          </ToolkitProvider>
        </div>
        <ToastContainer />
        {this.state.loading && <ClipLoader loading={this.state.loaded} />}
      </div>
    );
  }
}

export default Dashbord;
