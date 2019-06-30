
import * as React from "react";
import {useState} from "react";
import { RowConfig } from "../../main.types";

interface TableHeaderProps {
  data: RowConfig[];
}

interface CustomersListProps {
  data: RowConfig[][];
  openEditCustomerView: (customerID: number) => void;
}

interface TablePaginationProps {
  totalPages: number;
  selectedPage: number;
  pageSize: number;
  setSelectedPage: (pageNum: number) => void;
  setPageSize: (pageSize: number) => void;
}

const TableHeader: React.FunctionComponent<TableHeaderProps> = (props) => {
  const {data = []} = props;
  return (
    <div className="tableHeader">
      {
        data.map((header, index) => {
          return <div key={index} className="tableColumn" style={{width: `${header.width || 0}%`}}>{header.label}</div>
        })
      }
    </div>
  );
}

const TableRows: React.FunctionComponent<CustomersListProps> = (props) => {
  const {data = []} = props;
  const openEditCustomerView = (rowData: RowConfig[]) => {
    const customerID = rowData.filter((rowItem) => rowItem.label === "Customer ID")[0].value as number;
    props.openEditCustomerView(customerID);
  }
  return (<>
    {
      data.map((rowItem, rowIndex) => {
        return (
          <div className="tableRow" onClick={() => openEditCustomerView(rowItem)}>
            {
              rowItem.map((colItem, colIndex) => {
                return <div className="tableColumn" style={{width: `${colItem.width || 0}%`}}>{colItem.value}</div>
              })
            }
          </div>
        )
      })
    }
  </>);
}

const TablePagination: React.FunctionComponent<TablePaginationProps> = (props) => {
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
        <div className="paginationItem">{`${selectedPage} of ${totalPages}`}</div>
        <i className={`paginationItem fa fa-angle-right ${nextDisabled ? "disabled" : ''}`} onClick={incrementPageNum}></i>
        <i className={`paginationItem fa fa-angle-double-right ${nextDisabled ? "disabled" : ''}`} onClick={goToLastPage}></i>
      </div>
      <div className="pageSize">
        <div className="label">Page Size</div>
        <select className="pageSizeSelect" onChange={changePageSize}>
          <option value="10">10</option>
          <option value="15" selected>15</option>
          <option value="20">20</option>
        </select>
      </div>
    </div>
  );
}

export const CustomersList: React.FunctionComponent<CustomersListProps> = (props) => {
  const {data = [], openEditCustomerView} = props;
  const [selectedPage, setSelectedPage] = useState(1);
  const [pageSize, setPageSize] = useState(15);
  const totalPages = Math.ceil(data.length / pageSize);
  const tableRowsData: CustomersListProps = {
    data: data.slice((selectedPage-1) * pageSize, selectedPage * pageSize),
    openEditCustomerView,
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
      <div className="tableContainer">
        <TableHeader data={data[0]}/>
        <TableRows {...tableRowsData}/>
      </div>
      <TablePagination {...tablePaginationProps}/>
    </>
  );
}
