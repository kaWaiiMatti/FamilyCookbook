import { flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { useEffect, useMemo, useState } from "react";
import { Recipe } from "../interfaces.ts";
import { getRecipes } from "../utils/apiClient.ts";

export const RecipesView = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);

  useEffect(() => {
    getRecipes().then((result) => setRecipes(result));
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
  ], []);

  const table = useReactTable({
    columns,
    data: recipes,
    getCoreRowModel: getCoreRowModel()
  });

  const headers = table.getHeaderGroups()[0].headers;


  return <>
    <h1 className="title">Recipes</h1>
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
