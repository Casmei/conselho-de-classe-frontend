import { useCallback, useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  TextField,
  Unstable_Grid2 as Grid
} from '@mui/material';

export const StudentProfileDetails = () => {
  const [values, setValues] = useState({
    name: 'Anika',
    registration: '13436',
    contract: '53309783497',
    course: 'Análise e Desenvolvimento de Sistemas',
    class: 'ADS2021',
  });

  const handleChange = useCallback(
    (event) => {
      setValues((prevState) => ({
        ...prevState,
        [event.target.name]: event.target.value
      }));
    },
    []
  );

  const handleSubmit = useCallback(
    (event) => {
      event.preventDefault();
    },
    []
  );

  return (
    <form
      autoComplete="off"
      noValidate
      onSubmit={handleSubmit}
    >
      <Card>
        <CardHeader
          subheader="As informações podem ser editadas"
          title="Estudante"
        />
        <CardContent sx={{ pt: 0 }}>
          <Box sx={{ m: -1.5 }}>
            <Grid
              container
              spacing={3}
            >
              <Grid
                xs={12}
                md={6}
              >
                <TextField
                  fullWidth
                  label="Nome Completo"
                  name="name"
                  onChange={handleChange}
                  required
                  value={values.name}
                />
              </Grid>
              <Grid
                xs={12}
                md={6}
              >
                <TextField
                  fullWidth
                  label="Registro"
                  name="registration"
                  onChange={handleChange}
                  required
                  type="number"
                  value={values.registration}
                />
              </Grid>
              <Grid
                xs={12}
                md={6}
              >
                <TextField
                  fullWidth
                  label="Contrato"
                  name="contract"
                  onChange={handleChange}
                  type="number"
                  required
                  value={values.contract}
                />
              </Grid>
              <Grid
                xs={12}
                md={6}
              >
                <TextField
                  fullWidth
                  label="Curso"
                  name="course"
                  onChange={handleChange}
                  type="string"
                  value={values.course}
                />
              </Grid>
              <Grid
                xs={12}
                md={6}
              >
                <TextField
                  fullWidth
                  label="Turma"
                  name="class"
                  onChange={handleChange}
                  required
                  value={values.class}
                />
              </Grid>
            </Grid>
          </Box>
        </CardContent>
        <Divider />
        <CardActions sx={{ justifyContent: 'flex-end' }}>
          <Button variant="contained">
            Salvar
          </Button>
        </CardActions>
      </Card>
    </form>
  );
};
