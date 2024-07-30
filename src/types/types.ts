interface EntidadFederativa {
  id: string;
  nombre: string;
}
interface GradoDeEstudios {
  id: string;
  nombre: string;
}
interface PuestoDeTrabajo {
  id: string;
  nombre: string;
}
interface EntidadFederativa {
  id: string;
  nombre: string;
}
interface TipoDeEmpleado {
  id: string;
  nombre: string;
}

interface Direccion {
  id: string;
  calle: string;
  numero: Number;
  codigoPostal: Number;
  entidadFederativa: EntidadFederativa;
}
interface Telefono {
  id: string;
  numero: string;
  extension: string;
  tipo: string;
  idEmpleado: string;
}

interface Empleado {
  id: string;
  nombres: string;
  apellidoPaterno: string;
  apellidoMaterno: string;
  edad: Number;
  genero: boolean;
  puestoDeTrabajo: PuestoDeTrabajo;
  gradoDeEstudios: GradoDeEstudios;
  tipoDeEmpleado: TipoDeEmpleado;
  direccion: Direccion;
  telefonos: Array<Telefono>;
}

export type {
  Empleado,
  Telefono,
  Direccion,
  EntidadFederativa,
  GradoDeEstudios,
  TipoDeEmpleado,
  PuestoDeTrabajo,
};
