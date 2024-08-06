import "./table.css";
import React, { useState } from 'react';
import { useTable } from 'react-table';
import checkbox from "../../../assets/img_Ready/checkbox.svg";
import check from "../../../assets/img_Ready/check.svg";

const initialData = [
  { orderNumber: 'A001', name: '홍길동', phone: '010-1234-5678', isApproved: true, isCheckedIn: true },
  { orderNumber: 'A002', name: '김철수', phone: '010-8765-4321', isApproved: false, isCheckedIn: false },
  { orderNumber: 'A003', name: '이영희', phone: '010-1122-3344', isApproved: true, isCheckedIn: false },
  { orderNumber: 'A004', name: '박민수', phone: '010-5566-7788', isApproved: false, isCheckedIn: false },
  { orderNumber: 'A005', name: '최수진', phone: '010-9988-7766', isApproved: true, isCheckedIn: true },
  { orderNumber: 'A006', name: '이민호', phone: '010-1111-2222', isApproved: false, isCheckedIn: false },
  { orderNumber: 'A007', name: '김유신', phone: '010-3333-4444', isApproved: true, isCheckedIn: true },
];

const CheckEntrance = () => {
  const [data, setData] = useState(initialData);

  const columns = React.useMemo(
    () => [
      {
        Header: '입장 확인',
        accessor: 'isCheckedIn',
        Cell: ({ row }) => (
          <img
            src={row.original.isCheckedIn ? check  : checkbox }
            alt={row.original.isApproved ? "승인됨" : "승인되지 않음"}
            onClick={() => {
              const newData = data.map(item => 
                item.orderNumber === row.original.orderNumber 
                ? { ...item, isCheckedIn: !item.isCheckedIn }
                  : item
              );
              setData(newData);
            }}
            style={{ cursor: 'pointer' }}
          />
        )
      },
      { Header: '주문번호', accessor: 'orderNumber' },
      { Header: '이름', accessor: 'name' },
      { Header: '전화번호', accessor: 'phone' },
      {
        Header: '승인',
        accessor: 'isApproved',
        Cell: ({ row }) => (
          <span>
            {row.original.isApproved ? "YES" : "NO"}
          </span>
        )
      }
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
};

export default CheckEntrance;

  