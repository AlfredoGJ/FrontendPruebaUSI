import { Collapse, IconButton, TableCell, TableRow } from "@mui/material";
import { Empleado } from "../types/types";
import HomeIcon from "@mui/icons-material/Home";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import EditIcon from "@mui/icons-material/Edit";
import ClearIcon from "@mui/icons-material/Clear";
import { useState } from "react";

interface EmpleadoRowProps {
  empleado: Empleado;
}

export const EmpleadoRow = ({ empleado }: EmpleadoRowProps) => {
  const Address = <> Address</>;
  const Phone = <>Phone</>;
  const [isCollapseOpen, setIsCollapseOpen] = useState(false);
  const [accordionUI, setAccordionUI] = useState("Address");

  function handleAddressClick() {
    if (isCollapseOpen) {
      if (accordionUI === "Address") setIsCollapseOpen(false);
      else setAccordionUI("Address");
    } else {
      if (accordionUI !== "Address") setAccordionUI("Address");
      setIsCollapseOpen(true);
    }
  }

  function handlePhoneClick() {
    if (isCollapseOpen) {
      if (accordionUI === "Phone") setIsCollapseOpen(false);
      else setAccordionUI("Phone");
    } else {
      if (accordionUI !== "Phone") setAccordionUI("Phone");
      setIsCollapseOpen(true);
    }
  }
  return (
    <>
      <TableRow>
        <TableCell>{empleado.nombres}</TableCell>
        <TableCell>{empleado.apellidoPaterno}</TableCell>
        <TableCell>{empleado.apellidoMaterno}</TableCell>
        <TableCell>{`${empleado.edad}`}</TableCell>
        <TableCell>{empleado.genero ? "Masculino" : "Femenino"}</TableCell>
        <TableCell>{empleado.puestoDeTrabajo.nombre}</TableCell>
        <TableCell>{empleado.tipoDeEmpleado.nombre}</TableCell>
        <TableCell>{empleado.gradoDeEstudios.nombre}</TableCell>
        <TableCell>
          <IconButton onClick={handleAddressClick}>
            <HomeIcon />
          </IconButton>
        </TableCell>
        <TableCell>
          <IconButton onClick={handlePhoneClick}>
            <LocalPhoneIcon />
          </IconButton>
        </TableCell>
        <TableCell>
          <IconButton>
            <EditIcon />
          </IconButton>
        </TableCell>
        <TableCell>
          <IconButton>
            <ClearIcon />
          </IconButton>
        </TableCell>
      </TableRow>
      <Collapse in={isCollapseOpen}>
        <TableRow>{accordionUI === "Phone" ? Phone : Address}</TableRow>
      </Collapse>
    </>
  );
};
