import "./table.css";

import React, { useState } from 'react';
import { useTable } from 'react-table';
import allow from "../../../assets/img_Ready/allow.svg";
import cancel from "../../../assets/img_Ready/cancel.svg";

const mockReservations = [
    {
      orderNumber: 'A001',
      name: '홍길동',
      phone: '010-1234-5678',
      quantity: 2,
      totalAmount: 20000,
      bookingDate: '2023-07-15T14:48:00',
      isApproved: true,
    },
    {
      orderNumber: 'A002',
      name: '김철수',
      phone: '010-8765-4321',
      quantity: 4,
      totalAmount: 40000,
      bookingDate: '2023-07-16T09:30:00',
      isApproved: false,
    },
    {
      orderNumber: 'A003',
      name: '이영희',
      phone: '010-1122-3344',
      quantity: 1,
      totalAmount: 10000,
      bookingDate: '2023-07-17T11:15:00',
      isApproved: true,
    },
    {
      orderNumber: 'A004',
      name: '박민수',
      phone: '010-5566-7788',
      quantity: 3,
      totalAmount: 30000,
      bookingDate: '2023-07-18T17:45:00',
      isApproved: false,
    },
    {
      orderNumber: 'A005',
      name: '최수진',
      phone: '010-9988-7766',
      quantity: 2,
      totalAmount: 20000,
      bookingDate: '2023-07-19T13:20:00',
      isApproved: true,
    },
    {
      orderNumber: 'A006',
      name: '이민호',
      phone: '010-1111-2222',
      quantity: 5,
      totalAmount: 50000,
      bookingDate: '2023-07-20T10:30:00',
      isApproved: false,
    },
    {
      orderNumber: 'A007',
      name: '김유신',
      phone: '010-3333-4444',
      quantity: 3,
      totalAmount: 30000,
      bookingDate: '2023-07-21T11:45:00',
      isApproved: true,
    }
  ];

  const AwaitPermission = () => {
    const [data, setData] = useState(mockReservations);

    const columns = React.useMemo(
      () => [
        { Header: '주문번호', accessor: 'orderNumber' },
        { Header: '이름', accessor: 'name' },
        { Header: '전화번호', accessor: 'phone' },
        { Header: '매수', accessor: 'quantity' },
        { Header: '총 결제금액', accessor: 'totalAmount' },
        { Header: '예매 일시', accessor: 'bookingDate', Cell: ({ value }) => new Date(value).toLocaleString() },
        {
          Header: '승인',
          accessor: 'isApproved',
          Cell: ({ row }) => (
            <img
              src={row.original.isApproved ? allow  : cancel }
              alt={row.original.isApproved ? "승인됨" : "승인되지 않음"}
              onClick={() => {
                const newData = data.map(item => 
                  item.orderNumber === row.original.orderNumber 
                    ? { ...item, isApproved: !item.isApproved }
                    : item
                );
                setData(newData);
              }}
              style={{ cursor: 'pointer' }}
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
    )
}

export default AwaitPermission;