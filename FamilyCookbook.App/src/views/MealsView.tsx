import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useEffect, useMemo, useState } from "react";
import { Meal } from "../interfaces.ts";
import { getMeals } from "../utils/apiClient.ts";
import { useNavigate } from "react-router-dom";

export const MealsView = () => {
  const navigate = useNavigate();

  const [meals, setMeals] = useState<Meal[]>([]);

  useEffect(() => {
    getMeals().then((result) => setMeals(result));
  }, []);

  const columns = useMemo(
    () => [
      {
        header: "ID",
        accessorKey: "id",
      },
      {
        header: "Name",
        accessorKey: "name",
      },
      {
        header: "Date",
        accessorKey: "date",
      },
    ],
    []
  );

  const table = useReactTable({
    columns,
    data: meals,
    getCoreRowModel: getCoreRowModel(),
  });

  const headers = table.getHeaderGroups()[0].headers;

  return (
    <>
      <h1 className="title">Meals</h1>
      <table className="table is-striped is-fullwidth">
        <thead>
          <tr>
            {headers.map((header) => (
              <th key={header.id}>
                {flexRender(
                  header.column.columnDef.header,
                  header.getContext()
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr
              className="cursor-pointer"
              key={row.id}
              onClick={() => navigate(`/meal/${row.original.id}`)}
            >
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};
