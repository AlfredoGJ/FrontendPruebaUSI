import { Stack, Typography } from "@mui/material";
import { Direccion } from "../types/types";

interface AddresProps {
  direccion: Direccion;
}

export const AddressComponent = ({ direccion }: AddresProps) => {
  return (
    <>
      <Typography variant="subtitle1" fontWeight={600} marginBottom={1}>
        Dirección
      </Typography>{" "}
      <Stack direction="row">
        {" "}
        <Stack marginRight={4}>
          <Stack>
            <Stack direction="row">
              <Typography fontWeight={600} marginRight={2}>
                Calle
              </Typography>
              <Typography>{direccion.calle}</Typography>
            </Stack>
          </Stack>
        </Stack>
        <Stack marginRight={4}>
          <Stack>
            <Stack direction="row">
              <Typography fontWeight={600} marginRight={2}>
                Número
              </Typography>
              <Typography>{`${direccion.numero}`}</Typography>
            </Stack>
          </Stack>
        </Stack>
        <Stack>
          <Stack direction="row">
            <Typography fontWeight={600} marginRight={2}>
              Entidad
            </Typography>
            <Typography>{direccion.entidadFederativa.nombre}</Typography>
          </Stack>
        </Stack>
      </Stack>
    </>
  );
};
