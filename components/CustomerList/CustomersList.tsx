
import * as React from "react";
import {useState} from "react";
import { RowConfig } from "../../main.types";

interface TableHeaderProps {
  data: RowConfig[];
}

export interface CustomersListProps {
  data: RowConfig[][];
  openViewCustomerView: (customerID: number) => void;
}

interface TablePaginationProps {
  totalPages: number;
  selectedPage: number;
  pageSize: number;
  setSelectedPage: (pageNum: number) => void;
  setPageSize: (pageSize: number) => void;
}

export const TableHeader: React.FunctionComponent<TableHeaderProps> = (props) => {
  const {data = []} = props;
  return (
    <div className="tableHeader">
      {
        data.map((header, index) => {
          return <div key={index} className={`tableColumn ${ header.label === "S.No." ? "snoCol" : ""}`} style={{width: `${header.width || 0}%`}}>
            <div className="content">{header.label}</div>
          </div>
        })
      }
    </div>
  );
}

export const TableRows: React.FunctionComponent<CustomersListProps> = (props) => {
  const {data = []} = props;
  const openViewCustomerView = (rowData: RowConfig[]) => {
    const customerID = rowData.filter((rowItem) => rowItem.label === "Customer ID")[0].value as number;
    props.openViewCustomerView(customerID);
  }
  return (<>
    {
      data.map((rowItem, rowIndex) => {
        return (
          <div className="tableRow" onClick={() => openViewCustomerView(rowItem)}>
            {
              rowItem.map((colItem, colIndex) => {
                return <div className={`tableColumn ${ colItem.label === "S.No." ? "snoCol" : ""}`} style={{width: `${colItem.width || 0}%`}}>
                  <div className="content">{colItem.value}</div>
                </div>
              })
            }
          </div>
        )
      })
    }
  </>);
}

export const TablePagination: React.FunctionComponent<TablePaginationProps> = (props) => {
  const {totalPages = 1, selectedPage = 1, setSelectedPage = () => {}, setPageSize = () => {}} = props;
  const incrementPageNum = () => {
    setSelectedPage(selectedPage + 1);
  }
  const decrementPageNum = () => {
    setSelectedPage(selectedPage - 1);
  }
  const goToLastPage = () => {
    setSelectedPage(totalPages);
  }
  const goToFirstPage = () => {
    setSelectedPage(1);
  }
  const changePageSize = (event: any) => {
    setPageSize(event.target.value);
  }
  const prevDisabled = selectedPage === 1;
  const nextDisabled = selectedPage === totalPages;
  return (
    <div className="paginationContainer">
      <div className="pagination">
        <i className={`paginationItem fa fa-angle-double-left ${prevDisabled ? "disabled" : ''}`} onClick={goToFirstPage}></i>
        <i className={`paginationItem fa fa-angle-left ${prevDisabled ? "disabled" : ''}`} onClick={decrementPageNum}></i>
        <div className="paginationItem paginationText">{`${selectedPage} of ${totalPages}`}</div>
        <i className={`paginationItem fa fa-angle-right ${nextDisabled ? "disabled" : ''}`} onClick={incrementPageNum}></i>
        <i className={`paginationItem fa fa-angle-double-right ${nextDisabled ? "disabled" : ''}`} onClick={goToLastPage}></i>
      </div>
      <div className="pageSize">
        <div className="label">Page Size</div>
        <select className="pageSizeSelect" onChange={changePageSize}>
          <option value="15">15</option>
          <option value="20" selected>20</option>
          <option value="50">50</option>
          <option value="100">100</option>
        </select>
      </div>
    </div>
  );
}

export const CustomersList: React.FunctionComponent<CustomersListProps> = (props) => {
  const {data = [], openViewCustomerView} = props;
  const [selectedPage, setSelectedPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const totalPages = Math.ceil(data.length / pageSize);
  const tableRowsData: CustomersListProps = {
    data: data.slice((selectedPage-1) * pageSize, selectedPage * pageSize),
    openViewCustomerView,
  }
  const tablePaginationProps: TablePaginationProps = {
    totalPages,
    selectedPage,
    pageSize,
    setSelectedPage,
    setPageSize,
  }
  return (
    <>
      <TableHeader data={data[0]}/>
      <div className="tableContainer">
        <TableRows {...tableRowsData}/>
      </div>
      <TablePagination {...tablePaginationProps}/>
      {!data.length && <div className="noCustomersWrapper"><div className="noCustomers">No Customers to show</div></div>}
    </>
  ) 
}
