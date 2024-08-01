import React, { useEffect, useRef, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import {
  Container,
  Stack,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Snackbar,
} from "@mui/material";
import { Empleado } from "./types/types";
import { EmpleadosTable } from "./components/Table";
import AddIcon from "@mui/icons-material/Add";
import { EmpleadoForm } from "./components/EmpleadoForm";
import axios from "axios";
import { SnackbarProvider, enqueueSnackbar } from "notistack";

function App() {
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [empleados, setEmpleados] = useState([]);
  const [reloadEmpleados, setReloadEmpleados] = useState(false);
  const [toDelete, setToDelete] = useState<Empleado | null>(null);

  const formRef = useRef<HTMLFormElement>(null);
  function fetchData() {
    axios
      .get(`${process.env.REACT_APP_EMPLEADOS_API_URI}/empleados`)
      .then((response) => {
        console.log("Response Empleados", response);
        setEmpleados(response.data);
      })
      .catch((error) => {
        console.log("Error Empleados", error);
      });
  }

  function handleAceptar() {
    console.log(formRef);
    formRef.current!.requestSubmit();
  }

  function handleFormSubmitSuccess(data: Empleado) {
    console.log("Data as Object", data);
    axios
      .post(`${process.env.REACT_APP_EMPLEADOS_API_URI}/empleados`, data)
      .then((response) => {
        setAddDialogOpen(false);
        enqueueSnackbar("Empleado Agregado Exitosamente!", {
          variant: "success",
        });
        setReloadEmpleados(true);
      })
      .catch((error) => {
        console.log("Error adding empleado", error);
        enqueueSnackbar("No Se Pudo Agregar el Empleado", { variant: "error" });
      });
  }

  function handleFormSubmitError() {}

  function handleEmpleadoDeleteClick(empleado: Empleado) {
    setDeleteDialog(true);
    setToDelete(empleado);
    console.log("ToDelete:", empleado);
  }

  function handleEmpleadoDelete() {
    axios
      .delete(
        `${process.env.REACT_APP_EMPLEADOS_API_URI}/empleados/${toDelete?.id}`
      )
      .then((response) => {
        setToDelete(null);
        setDeleteDialog(false);
        setReloadEmpleados(true);
        enqueueSnackbar("Empleado eliminado exitosamente", {
          variant: "success",
        });
      })
      .catch((error) => {
        enqueueSnackbar("Error: No se pudo eliminar el empleado", {
          variant: "error",
        });
      });
  }

  // initial loada
  useEffect(() => {
    fetchData();
  }, []);

  // conditional load
  useEffect(() => {
    if (reloadEmpleados) {
      fetchData();
      setReloadEmpleados(false);
    }
  }, [reloadEmpleados]);

  return (
    <Container className="App">
      <SnackbarProvider />
      <Stack>
        <Typography variant="h2" marginY={4}>
          {" "}
          Registro De Empleados
        </Typography>
        <EmpleadosTable
          empleados={empleados}
          onEmpledoDelete={handleEmpleadoDeleteClick}
        />
        <Stack direction="row" justifyContent="space-between" marginTop={2}>
          <Button>Descargar .csv</Button>
          <Button variant="contained" onClick={() => setAddDialogOpen(true)}>
            <AddIcon /> Agregar Empleado
          </Button>
        </Stack>
      </Stack>
      <Dialog open={addDialogOpen} maxWidth="sm" fullWidth>
        <DialogTitle>Agregar Empleado</DialogTitle>
        <DialogContent>
          <EmpleadoForm
            ref={formRef}
            onSubmitError={handleFormSubmitError}
            onSubmitSuccess={handleFormSubmitSuccess}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setAddDialogOpen(false)} color="error">
            Cancelar
          </Button>
          <Button variant="contained" onClick={handleAceptar}>
            Aceptar
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={deleteDialog}>
        <DialogTitle>Eliminar Empleado</DialogTitle>
        <DialogContent>{`Esta seguro que desea eliminar al usuario: ${toDelete?.nombres} ${toDelete?.apellidoPaterno} ${toDelete?.apellidoMaterno} `}</DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialog(false)}>Cancelar</Button>
          <Button variant="contained" onClick={handleEmpleadoDelete}>
            Aceptar
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default App;
