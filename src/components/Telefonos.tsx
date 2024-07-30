import { Stack, Typography } from "@mui/material";
import { Telefono } from "../types/types";

interface PhonesProps {
  telefonos: Telefono[];
}

export const PhonesComponent = ({ telefonos }: PhonesProps) => {
  return (
    <>
      <Typography variant="subtitle1" fontWeight={600} marginBottom={1}>
        Telefonos
      </Typography>{" "}
      {telefonos.map((telefono) => (
        <Stack direction="row">
          {" "}
          <Stack marginRight={4}>
            <Stack>
              <Stack direction="row">
                <Typography fontWeight={600} marginRight={2}>
                  Numero
                </Typography>
                <Typography>{telefono.numero}</Typography>
              </Stack>
            </Stack>
          </Stack>
          <Stack marginRight={4}>
            <Stack>
              <Stack direction="row">
                <Typography fontWeight={600} marginRight={2}>
                  Extension
                </Typography>
                <Typography>{`${telefono.extension}`}</Typography>
              </Stack>
            </Stack>
          </Stack>
          <Stack marginRight={4}>
            <Stack>
              <Stack direction="row">
                <Typography fontWeight={600} marginRight={2}>
                  Tipo
                </Typography>
                <Typography>{`${telefono.tipo}`}</Typography>
              </Stack>
            </Stack>
          </Stack>
        </Stack>
      ))}
    </>
  );
};
