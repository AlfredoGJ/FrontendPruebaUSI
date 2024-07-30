import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { Container, Stack, Typography, Button } from "@mui/material";
import { Empleado } from "./types/types";
import { EmpleadosTable } from "./components/Table";
import AddIcon from "@mui/icons-material/Add";
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
      {
        id: "",
        numero: "4442333353",
        extension: "119",
        tipo: "Casa",
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
        <EmpleadosTable empleados={empleados} />
        <Stack  direction="row" justifyContent="space-between" marginTop={2}>
          <Button>Descargar .csv</Button>
          <Button variant="contained" >
            <AddIcon /> Agregar Empleado
          </Button>
        </Stack>
      </Stack>
    </Container>
  );
}

export default App;
