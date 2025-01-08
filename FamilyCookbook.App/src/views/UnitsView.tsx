import { flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { useEffect, useMemo, useState } from "react";
import { Unit } from "../interfaces.ts";
import { getUnits } from "../utils/apiClient.ts";

export const UnitsView = () => {
  const [units, setUnits] = useState<Unit[]>([]);

  useEffect(() => {
    getUnits().then((result) => setUnits(result));
  }, []);

  const columns  = useMemo(() => [
    {
      header: 'ID',
      accessorKey: 'id',
    },
    {
      header: 'Name',
      accessorKey: 'name',
    },
    {
      header: 'Abbreviation',
      accessorKey: 'abbreviation',
    },
  ], []);

  const table = useReactTable({
    columns,
    data: units,
    getCoreRowModel: getCoreRowModel()
  });

  const headers = table.getHeaderGroups()[0].headers;

  return <>
    <h1 className="title">Units</h1>
    <table className='table is-striped is-fullwidth'>
      <thead>
      <tr>
        {headers.map(header => (
          <th key={header.id}>
            {flexRender(header.column.columnDef.header, header.getContext())}
          </th>
        ))}
      </tr>
      </thead>
      <tbody>
      {table.getRowModel().rows.map(row => (
        <tr key={row.id}>
          {row.getVisibleCells().map(cell => (
            <td key={cell.id}>
              {flexRender(cell.column.columnDef.cell, cell.getContext())}
            </td>
          ))}
        </tr>
      ))}
      </tbody>
    </table>
  </>;
};

