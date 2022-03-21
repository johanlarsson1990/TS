import React from 'react';
import { useTable } from 'react-table'

const  Tables = (column:any, datas:any) => {
  const columns = column;
  const data = datas;
  console.log(data)
  console.log(columns)
    // Use the state and functions returned from useTable to build your UI
    const {
      getTableProps,
      getTableBodyProps,
      headerGroups,
      rows,
      prepareRow,
    } = useTable({
      columns,
      data,
    })

    return (
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
            {rows.map((row, i) => {
              prepareRow(row)
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map(cell => {
                    return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                  })}
                </tr>
              )
            })}
          </tbody>
        </table>
      )
    }


      
      //   const data = React.useMemo(() => makeData(20), [])
      
      //   return (
      //     // <Styles>
      //     //   <Table columns={columns} data={data} />
      //     // </Styles>
      //   )
      // }




    export default Tables