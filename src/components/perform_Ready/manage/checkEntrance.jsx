import "./table.css";
import React, { useState } from 'react';
import { useTable } from 'react-table';
import checkbox from "../../../assets/img_Ready/checkbox.svg";
import check from "../../../assets/img_Ready/check.svg";

const CheckEntrance = ({ showId }) => {
  const [data, setData] = useState([]);

    // 공연 준비 시 입장 관리  
    async function getDownloadData() {
        const token = sessionStorage.getItem("accessToken");

        try {
            const res = await axios.get(
                `https://showhoo.site/performer/${showId}/prepare/book-admin/entrance`,
                {
                headers: {
                    Authorization: `Bearer ${token}`,
                },           
                }
            );
            const list = res.data.result.entranceList;
            setData(list);
            console.log("결과", res.data.isSuccess);
            console.log(res.data.code, res.data.message);
        } catch (error) {
            console.log("Error:", error);
        }
    };

    useEffect(() => {
        getDownloadData();
    },[]);

    async function putEntrance(bookId, entrance) {
      const token = sessionStorage.getItem("accessToken");

      try {
          const res = await axios.put(
              `https://showhoo.site/performer/prepare/book-admin/${bookId}?request=${entrance}`,
              {
                headers: {
                    Authorization: `Bearer ${token}`,
                },           
              }
          );
          console.log("결과: ", res.data.isSuccess);
          console.log(res.data.code, res.data.message);
      } catch (error) {
          console.log("Error:", error);
      }
    };

  const columns = React.useMemo(
    () => [
      {
        Header: '입장 확인',
        accessor: 'entrance',
        Cell: ({ row }) => (
          <img
            src={row.original.entrance ? check  : checkbox }
            alt={row.original.entrance ? "승인됨" : "승인되지 않음"}
            onClick={() => {
              const newData = data.map(item => 
                item.bookId === row.original.bookId
                ? { ...item, entrance: !item.entrance }
                  : item
              );
              setData(newData);
              putEntrance(row.original.bookId, row.original.entrance);
            }}
            style={{ cursor: 'pointer' }}
          />
        )
      },
      { Header: '주문번호', accessor: 'bookId' },
      { Header: '이름', accessor: 'name' },
      { Header: '전화번호', accessor: 'phoneNum' },
      {
        Header: '승인',
        accessor: 'detail',
        Cell: ({ row }) => (
          <span>
            {row.original.datail === "CONFIRMED" ? "YES" : "NO"}
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

  