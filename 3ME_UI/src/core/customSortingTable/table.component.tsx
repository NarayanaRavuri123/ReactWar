import React from 'react'
import TableHead from './tableHead.component';
import '../../components/supplyOrder/supplyOrderList/supplyOrderList.css';

type Props = {
    tableClassName: any,
    tableColumns: Array<any>,
    handleSorting: any,
    children: any
}

const Table = ({ tableClassName, tableColumns, handleSorting, children }: Props) => {

    return (
        <table className={tableClassName}>
            <TableHead columns={tableColumns} handleSorting={handleSorting} />
            {children}
        </table>
    )
}

export default Table