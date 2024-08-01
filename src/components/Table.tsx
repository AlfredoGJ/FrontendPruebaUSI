import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { Empleado } from "../types/types";
import { EmpleadoRow } from "./EmpleadoRow";
import "./Table.css"
interface EmpleadosTableProps {
  empleados: Array<Empleado>;
  onEmpledoDelete: (empleado:Empleado)=> void
}

export const EmpleadosTable = ({ empleados, onEmpledoDelete }: EmpleadosTableProps) => {

 

  return (
    <Table>
      <TableHead className="empleado-table-head">
        <TableCell>Nombres</TableCell>
        <TableCell>Apellido Paterno</TableCell>
        <TableCell>Apellido Materno</TableCell>
        <TableCell>Edad</TableCell>
        <TableCell>Genero</TableCell>
        <TableCell>Puesto</TableCell>
        <TableCell>Tipo</TableCell>
        <TableCell>Ultimo Grado De Estudios</TableCell>
        <TableCell>Direccion</TableCell>
        <TableCell>Telefono(s)</TableCell>
        <TableCell>Eliminar</TableCell>
      </TableHead>
      <TableBody>
        {empleados.map((empleado) => (
          <EmpleadoRow empleado={empleado} onDelete={onEmpledoDelete} />
        ))}
      </TableBody>
    </Table>
  );
};
