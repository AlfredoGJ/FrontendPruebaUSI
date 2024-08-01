import {
  MenuItem,
  TextField,
  Typography,
  Select,
  Button,
  FormControl,
  InputLabel,
  Stack,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import {
  Empleado,
  EntidadFederativa,
  GradoDeEstudios,
  PuestoDeTrabajo,
  Telefono,
  TipoDeEmpleado,
} from "../types/types";
import { useForm, SubmitHandler, SubmitErrorHandler } from "react-hook-form";
import { forwardRef, useEffect, useRef, useState } from "react";
import { error } from "console";
import axios, { Axios } from "axios";

interface EmpleadoFormProps {
  onSubmitSuccess: (data: Empleado) => void;
  onSubmitError: () => void;
}

export const EmpleadoForm = forwardRef<HTMLFormElement, EmpleadoFormProps>(
  ({ onSubmitError, onSubmitSuccess }: EmpleadoFormProps, ref) => {
    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm<Empleado>();

    const [gradosDeEstudio, setGradosDeEstudio] = useState<
      Array<GradoDeEstudios>
    >([]);
    const [tiposDeEmpleado, setTiposDeEmpleado] = useState<
      Array<TipoDeEmpleado>
    >([]);
    const [puestosDeTrabajo, setPuestosDeTrabajo] = useState<
      Array<PuestoDeTrabajo>
    >([]);
    const [entidadesFederativas, setEntidadesFederativas] = useState<
      Array<EntidadFederativa>
    >([]);

    const onSubmit: SubmitHandler<Empleado> = (data: any, event) => {
      event!.preventDefault();

      const cleanData: Empleado = {
        ...data,
        genero: data.genero === 1 ? true : false,
        edad: Number.parseInt(data.edad),
        puestoDeTrabajoId: data.puestoDeTrabajo.id,
        gradoDeEstudiosId: data.gradoDeEstudios.id,
        tipoDeEmpleadoId: data.tipoDeEmpleado.id,
        direccion: {
          ...data.direccion,
          numero: Number.parseInt(data.direccion.numero),
          codigoPostal: Number.parseInt(data.direccion.codigoPostal),
          entidadFederativaId: data.direccion.entidadFederativa.id,
        },
        telefonos: data.telefonos
          .filter(
            (t: Telefono) =>
              t.numero !== "" && t.extension !== "" && t.tipo !== ""
          )
          .map((t: Telefono) => ({
            numero: t.numero,
            extension: t.extension,
            tipo: t.tipo,
          })),
      };
      onSubmitSuccess(cleanData);
      
    };

    const onError: SubmitErrorHandler<Empleado> = (data: any, event) => {
      event!.preventDefault();
      console.log("Error", data);
      onSubmitError();
    };

    const getCatalogos = () => {
      axios
        .get(`${process.env.REACT_APP_EMPLEADOS_API_URI}/puestosDeTrabajo`)
        .then((response) => {
          console.log("Response puestos de trabajo", response);
          setPuestosDeTrabajo(response.data);
        })
        .catch((error) => {});

      axios
        .get(`${process.env.REACT_APP_EMPLEADOS_API_URI}/tiposDeEmpleado`)
        .then((response) => {
          console.log("Response tiposDeEmpleado", response);
          setTiposDeEmpleado(response.data);
        })
        .catch((error) => {});

      axios
        .get(`${process.env.REACT_APP_EMPLEADOS_API_URI}/gradosDeEstudio`)
        .then((response) => {
          console.log("Response gradosDeEstudio", response);
          setGradosDeEstudio(response.data);
        })
        .catch((error) => {
          console.log("Error", error);
        });

      axios
        .get(`${process.env.REACT_APP_EMPLEADOS_API_URI}/entidadesFederativas`)
        .then((response) => {
          console.log("Response entidadesFederativas", response);
          setEntidadesFederativas(response.data);
        })
        .catch((error) => {});
    };

    useEffect(() => {
      getCatalogos();
    }, []);

    return (
      <form onSubmit={handleSubmit(onSubmit, onError)} ref={ref}>
        <Stack>
          <Typography fontWeight={600}>Datos Personales</Typography>

          <Stack direction="row">
            <TextField
              {...register("nombres", { required: true })}
              error={errors.nombres && true}
              fullWidth
              variant="standard"
              placeholder="Nombre(s)"
              label="Nombres"
            />
          </Stack>
          <Stack direction="row" gap={1}>
            <TextField
              {...register("apellidoPaterno", { required: true })}
              error={errors.apellidoPaterno && true}
              margin="normal"
              fullWidth
              variant="standard"
              placeholder="Apellido Paterno"
              label="Apellido Paterno"
            />
            <TextField
              {...register("apellidoMaterno", { required: true })}
              error={errors.apellidoMaterno && true}
              margin="normal"
              fullWidth
              variant="standard"
              placeholder="Apellido Materno"
              label="Apellido Materno"
            />
          </Stack>
          <Stack direction="row" gap={1}>
            <TextField
              {...register("edad", { required: true })}
              error={errors.edad && true}
              fullWidth
              variant="standard"
              placeholder="Edad"
              label="Edad"
              type="number"
            />
            <FormControl margin="normal" fullWidth>
              <InputLabel>Genero</InputLabel>
              <Select
                defaultValue={"Femenino"}
                variant="standard"
                {...register("genero", { required: true })}
                error={errors.genero && true}
              >
                <MenuItem value={1}>Masculino</MenuItem>
                <MenuItem value={0}>Femenino</MenuItem>
              </Select>
            </FormControl>
          </Stack>
          <FormControl margin="normal" fullWidth>
            <InputLabel>Grado De Estudios</InputLabel>
            <Select
              variant="standard"
              {...register("gradoDeEstudios.id", { required: true })}
              error={errors.gradoDeEstudios?.id && true}
            >
              {gradosDeEstudio.map((estudios) => (
                <MenuItem value={estudios.id}>{estudios.nombre}</MenuItem>
              ))}
            </Select>
          </FormControl>

          <Typography fontWeight={600} paddingY={2}>
            Empleo
          </Typography>
          <Stack direction="row" gap={1}>
            <FormControl fullWidth>
              <InputLabel>Puesto De Trabajo</InputLabel>
              <Select
                {...register("puestoDeTrabajo.id", { required: true })}
                error={errors.puestoDeTrabajo?.id && true}
                variant="standard"
                placeholder="Puesto De Trabajo"
                label="Puesto De Trabajo"
              >
                {puestosDeTrabajo.map((puesto) => (
                  <MenuItem value={puesto.id}>{puesto.nombre}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel>Tipo De Empleado</InputLabel>
              <Select
                {...register("tipoDeEmpleado.id", { required: true })}
                error={errors.tipoDeEmpleado?.id && true}
                variant="standard"
                placeholder="Tipo De Empleado"
                label="Tipo De Empleado"
              >
                {tiposDeEmpleado.map((tipo) => (
                  <MenuItem value={tipo.id}>{tipo.nombre}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Stack>

          <Typography fontWeight={600} paddingTop={2}>
            Dirección
          </Typography>

          <TextField
            {...register("direccion.calle", { required: true })}
            error={errors.direccion?.calle && true}
            variant="standard"
            placeholder="Calle"
            label="Calle"
          />
          <Stack direction="row" gap={1}>
            <TextField
              {...register("direccion.numero", { required: true })}
              error={errors.direccion?.numero && true}
              fullWidth
              variant="standard"
              placeholder="Número"
              label="Número"
              type="number"
            />
            <TextField
              {...register("direccion.codigoPostal", { required: true })}
              error={errors.direccion?.codigoPostal && true}
              fullWidth
              variant="standard"
              placeholder="Código Postal"
              label="Código Postal"
              type="number"
            />
          </Stack>
          <FormControl fullWidth margin="normal">
            <InputLabel>Entidad Federativa</InputLabel>
            <Select
              {...register("direccion.entidadFederativa.id", {
                required: true,
              })}
              error={errors.direccion?.entidadFederativa?.id && true}
              variant="standard"
              placeholder="Entidad Federativa"
              label="Entidad Federativa"
            >
              {entidadesFederativas.map((tipo) => (
                <MenuItem value={tipo.id}>{tipo.nombre}</MenuItem>
              ))}
            </Select>
          </FormControl>

          <Typography fontWeight={600} paddingTop={2} paddingBottom={2}>
            Telefono(s)
          </Typography>
          <Typography>Telefono Principal</Typography>
          <Stack direction="row" gap={1}>
            <TextField
              {...register("telefonos.0.numero", { required: true })}
              error={errors.telefonos && errors.telefonos[0]?.numero && true}
              fullWidth
              variant="standard"
              placeholder="Número"
              label="Número"
              type="number"
            />
            <TextField
              {...register("telefonos.0.extension", { required: true })}
              error={errors.telefonos && errors.telefonos[0]?.extension && true}
              fullWidth
              variant="standard"
              placeholder="Extension"
              label="Extension"
              type="number"
            />
          </Stack>
          <TextField
            {...register("telefonos.0.tipo", { required: true })}
            error={errors.telefonos && errors.telefonos[0]?.tipo && true}
            fullWidth
            variant="standard"
            placeholder="Tipo"
            label="Tipo"
          />

          <Typography marginTop={2}>Telefono Secundario</Typography>

          <Stack direction="row" gap={1}>
            <TextField
              {...register("telefonos.1.numero", { required: false })}
              error={errors.telefonos && errors.telefonos[1]?.numero && true}
              fullWidth
              variant="standard"
              placeholder="Número"
              label="Número"
              type="number"
            />
            <TextField
              {...register("telefonos.1.extension", { required: false })}
              error={errors.telefonos && errors.telefonos[1]?.extension && true}
              fullWidth
              variant="standard"
              placeholder="Extension"
              label="Extension"
              type="number"
            />
          </Stack>
          <TextField
            {...register("telefonos.1.tipo", { required: false })}
            error={errors.telefonos && errors.telefonos[1]?.tipo && true}
            fullWidth
            variant="standard"
            placeholder="Tipo"
            label="Tipo"
          />

          <Stack direction="row" justifyContent="left" paddingTop={2}></Stack>
        </Stack>
      </form>
    );
  }
);
