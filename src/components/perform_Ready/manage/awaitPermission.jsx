import "./table.css";

import React, { useState, useEffect } from 'react';
import { useTable } from 'react-table';
import allow from "../../../assets/img_Ready/allow.svg";
import cancel from "../../../assets/img_Ready/cancel.svg";
import axios from "axios";

const AwaitPermission = ({ showId }) => {
  const [data, setData] = useState([]);

  // 공연 준비 시 예매자 관리 
  async function getDownloadData() {
    const token = sessionStorage.getItem("accessToken");

    try {
      const res = await axios.get(
        `https://showhoo.site/performer/${showId}/prepare/book-admin`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },           
        }
      );
      const list = res.data.result;
      setData(list);
      console.log("결과", res.data.isSuccess);
      console.log(res.data.code, res.data.message);
    } catch (error) {
      console.log("Error:", error);
    }
  }

  useEffect(() => {
    getDownloadData();
  }, []);

  // 주문 승인 완료 
  async function changeState(bookId) {
    const token = sessionStorage.getItem("accessToken");

    try {
      const res = await axios.put(
        `https://showhoo.site/book/${bookId}/confirmed`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },           
        }
      );
      console.log("결과", res.data.isSuccess);
      console.log(res.data.code, res.data.message);

      if (res.data.isSuccess) {
        const newData = data.map(item => 
          item.book_Id === bookId
            ? { ...item, detail: "CONFIRMED" }
            : item
        );
        setData(newData);
      }
    } catch (error) {
      console.log("Error:", error);
    }
  }

  const columns = React.useMemo(
    () => [
      { Header: '주문번호', accessor: 'book_Id' },
      { Header: '이름', accessor: 'name' },
      { Header: '전화번호', accessor: 'phoneNum' },
      { Header: '매수', accessor: 'ticketNum' },
      { Header: '총 결제금액', accessor: 'payment' },
      { Header: '예매 일시', accessor: 'dateTime', Cell: ({ value }) => new Date(value).toLocaleString() },
      {
        Header: '승인',
        accessor: 'detail',
        Cell: ({ row }) => (
          <img
            src={row.original.detail === "CONFIRMED" ? allow : cancel}
            alt={row.original.detail === "CONFIRMED" ? "승인됨" : "승인되지 않음"}
            onClick={() => {
              if (row.original.detail === "CONFIRMING") {
                changeState(row.original.book_Id);
              }
            }}
            style={{ cursor: row.original.detail === "CONFIRMED" ? 'default' : 'pointer' }}
          />
        )
      },
    ],
    [data]
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow
  } = useTable({ columns, data });

  return (
    <div className="container">
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps()}>{column.render('Header')}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map(row => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => (
                  <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default AwaitPermission;
