import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { Container, Stack, Typography } from "@mui/material";
import { Empleado } from "./types/types";
import { EmpleadosTable } from "./components/Table";

const empleados: Empleado[] = [
  {
    id: "",
    nombres: "Jose Samuel",
    apellidoPaterno: "Rodriguez",
    apellidoMaterno: "Granja",
    edad: 30,
    genero: true,
    direccion: {
      id: "",
      calle: "Andador Desierto Del Sahara",
      numero: 135,
      codigoPostal: 78345,
      entidadFederativa: {
        id: "",
        nombre: "San Luis Potosi",
      },
    },
    gradoDeEstudios: {
      id: "",
      nombre: "Licenciatura",
    },
    puestoDeTrabajo: {
      id: "",
      nombre: "Gerente General",
    },
    tipoDeEmpleado: {
      id: "",
      nombre: "Administrativo",
    },
    telefonos: [
      {
        id: "",
        numero: "4442776653",
        extension: "456",
        tipo: "Movil",
        idEmpleado: "",
      },
    ],
  },
];

function App() {
  return (
    <Container className="App">
      <Stack>
        <Typography variant="h2"> Registro De Empleados</Typography>
      </Stack>
      <EmpleadosTable empleados={empleados} />
    </Container>
  );
}

export default App;
