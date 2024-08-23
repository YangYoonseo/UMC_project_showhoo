import "./table.css";

import React from 'react';
import { useState, useTable, useEffect } from 'react-table';

const ReservationTicket = ({ showId }) => {
  const [bookData, setBookData] = useState([]);

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
      setBookData(list);
      console.log("다운로드 양식 보기", res.data);
    } catch (error) {
      console.log("Error:", error);
    }
  };

  useEffect(() => {
    getDownloadData();
  },[]);

  const data = React.useMemo(() => bookData, []);

  const columns = React.useMemo(
    () => [
      { Header: '주문번호', accessor: 'book_id' },
      { Header: '이름', accessor: 'name' },
      { Header: '전화번호', accessor: 'phoneNum' },
      { Header: '매수', accessor: 'ticketNum' },
      { Header: '총 결제금액', accessor: 'payment' },
      { Header: '예매 일시', accessor: 'dateTime', Cell: ({ value }) => new Date(value).toLocaleString() },
    ],
    []
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
    )
}

export default ReservationTicket;