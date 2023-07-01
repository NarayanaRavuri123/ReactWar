import React, { useState } from 'react'
import '../../components/supplyOrder/supplyOrderList/supplyOrderList.css';

type Props = {
    columns: Array<any>,
    handleSorting: any
}

const TableHead = ({ columns, handleSorting }: Props) => {
    const [sortField, setSortField] = useState("");
    const [order, setOrder] = useState("asc");

    const handleSortingChange = (accessor: any, sortable: boolean) => {
        if (sortable) {
            const sortOrder =
                accessor === sortField && order === "asc" ? "desc" : "asc";
            setSortField(accessor);
            setOrder(sortOrder);
            handleSorting(accessor, sortOrder);
        }
    };

    return (
        <thead>
            <tr >
                {columns.map(({ label, accessor, sortable }) => {
                    const cl = sortable
                        ? sortField === accessor && order === "asc"
                            ? "up"
                            : sortField === accessor && order === "desc"
                                ? "down"
                                : "default"
                        : "";
                    return (
                        <th
                            key={accessor}
                            onClick={(e) => handleSortingChange(accessor, sortable)}
                            className={cl}
                        >
                            {label}
                        </th>
                    );
                })}
            </tr>
        </thead >
    )
}

export default TableHead