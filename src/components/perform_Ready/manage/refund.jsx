import "./table.css";

import React from 'react';
import { useTable } from 'react-table';
import { useState } from "react";
import checkbox from "../../../assets/img_Ready/checkbox.svg";
import check from "../../../assets/img_Ready/check.svg";

const mockRefundRequests = [
    {  
      orderNumber: 'R001',
      name: '홍길동',
      bank: '우리은행',
      accountNumber: '123-456-789012',
      refundRequestDate: '2024-07-15T14:48:00',
      isCheckedIn: false,
    },
    {
      orderNumber: 'R002',
      name: '김철수',
      bank: '신한은행',
      accountNumber: '987-654-321098',
      refundRequestDate: '2024-07-16T09:30:00',
      isCheckedIn: false,
    },
    {
      orderNumber: 'R003',
      name: '이영희',
      bank: '국민은행',
      accountNumber: '135-791-113246',
      refundRequestDate: '2024-07-17T11:15:00',
      isCheckedIn: false,
    },
    {
      orderNumber: 'R004',
      name: '박민수',
      bank: '하나은행',
      accountNumber: '246-813-579024',
      refundRequestDate: '2024-07-18T17:45:00',
      isCheckedIn: false,
    },
    {
      orderNumber: 'R005',
      name: '최수진',
      bank: '농협은행',
      accountNumber: '357-924-680135',
      refundRequestDate: '2024-07-19T13:20:00',
      isCheckedIn: false,
    },
    {
      orderNumber: 'R006',
      name: '이민호',
      bank: '기업은행',
      accountNumber: '468-135-792468',
      refundRequestDate: '2024-07-20T10:30:00',
      isCheckedIn: false,
    },
    {
      orderNumber: 'R007',
      name: '김유신',
      bank: '케이뱅크',
      accountNumber: '579-246-813579',
      refundRequestDate: '2024-07-21T11:45:00',
      isCheckedIn: false,
    }
];

const Refund = () => {
    const [data, setData] = useState(mockRefundRequests);

    const columns = React.useMemo(
        () => [
            {
                Header: '환불 확인',
                accessor: 'isCheckedIn',
                Cell: ({ row }) => (
                    <img
                        src={row.original.isCheckedIn ? check : checkbox}
                        alt={row.original.isCheckedIn ? "확인됨" : "확인되지 않음"}
                        onClick={() => {
                            // isCheckedIn이 false일 경우에만 상태를 변경
                            if (!row.original.isCheckedIn) {
                                const newData = data.map(item =>
                                    item.orderNumber === row.original.orderNumber
                                        ? { ...item, isCheckedIn: true } // true로 설정 후 변경 불가
                                        : item
                                );
                                setData(newData);
                            }
                        }}
                        style={{ cursor: row.original.isCheckedIn ? 'default' : 'pointer' }}
                    />
                )
            },
            { Header: '주문번호', accessor: 'orderNumber' },
            { Header: '이름', accessor: 'name' },
            { Header: '은행', accessor: 'bank' },
            { Header: '계좌번호', accessor: 'accountNumber' },
            {
                Header: '환불 요청 일시',
                accessor: 'refundRequestDate',
                Cell: ({ value }) => new Date(value).toLocaleString()
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

export default Refund;
  