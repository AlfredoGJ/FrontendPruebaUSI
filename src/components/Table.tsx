import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { Empleado } from "../types/types";
import { EmpleadoRow } from "./EmpleadoRow";

interface EmpleadosTableProps {
  empleados: Array<Empleado>;
}

export const EmpleadosTable = ({ empleados }: EmpleadosTableProps) => {
  return (
    <Table>
      <TableHead>
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
        <TableCell>Editar</TableCell>
        <TableCell>Eliminar</TableCell>
      </TableHead>
      <TableBody>
        {empleados.map((empleado) => (
          <EmpleadoRow empleado={empleado} />
        ))}
      </TableBody>
    </Table>
  );
};
