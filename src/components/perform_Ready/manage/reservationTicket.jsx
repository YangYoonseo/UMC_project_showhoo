import "./table.css";

import React from 'react';
import { useTable } from 'react-table';

const mockReservations = [
    {
      orderNumber: 'A001',
      name: '홍길동',
      phone: '010-1234-5678',
      quantity: 2,
      totalAmount: 20000,
      bookingDate: '2023-07-15T14:48:00'
    },
    {
      orderNumber: 'A002',
      name: '김철수',
      phone: '010-8765-4321',
      quantity: 4,
      totalAmount: 40000,
      bookingDate: '2023-07-16T09:30:00'
    },
    {
      orderNumber: 'A003',
      name: '이영희',
      phone: '010-1122-3344',
      quantity: 1,
      totalAmount: 10000,
      bookingDate: '2023-07-17T11:15:00'
    },
    {
      orderNumber: 'A004',
      name: '박민수',
      phone: '010-5566-7788',
      quantity: 3,
      totalAmount: 30000,
      bookingDate: '2023-07-18T17:45:00'
    },
    {
      orderNumber: 'A005',
      name: '최수진',
      phone: '010-9988-7766',
      quantity: 2,
      totalAmount: 20000,
      bookingDate: '2023-07-19T13:20:00'
    },
    {
        orderNumber: 'A003',
        name: '이영희',
        phone: '010-1122-3344',
        quantity: 1,
        totalAmount: 10000,
        bookingDate: '2023-07-17T11:15:00'
      },
      {
        orderNumber: 'A004',
        name: '박민수',
        phone: '010-5566-7788',
        quantity: 3,
        totalAmount: 30000,
        bookingDate: '2023-07-18T17:45:00'
      },
      {
        orderNumber: 'A005',
        name: '최수진',
        phone: '010-9988-7766',
        quantity: 2,
        totalAmount: 20000,
        bookingDate: '2023-07-19T13:20:00'
      }
];

const ReservationTicket = ({ bookData }) => {
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