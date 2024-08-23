import "./table.css";

import React from 'react';
import { useTable } from 'react-table';
import { useState } from "react";
import checkbox from "../../../assets/img_Ready/checkbox.svg";
import check from "../../../assets/img_Ready/check.svg";

const Refund = ({ showId }) => {
    const [data, setData] = useState([]);

    // 공연 준비 시 환불 관리  
    async function getDownloadData() {
        const token = sessionStorage.getItem("accessToken");

        try {
            const res = await axios.get(
                `https://showhoo.site/performer/${showId}/prepare/book-admin/cancel`,
                {
                headers: {
                    Authorization: `Bearer ${token}`,
                },           
                }
            );
            const list = res.data.result;
            setData(list);
            console.log("다운로드 양식 보기", res.data);
        } catch (error) {
            console.log("Error:", error);
        }
    };

    useEffect(() => {
        getDownloadData();
    },[]);

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
            { Header: '주문번호', accessor: 'book_id' },
            { Header: '이름', accessor: 'name' },
            { Header: '은행', accessor: 'bankName' },
            { Header: '계좌번호', accessor: 'account' },
            {
                Header: '환불 요청 일시',
                accessor: 'dateTime',
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
  