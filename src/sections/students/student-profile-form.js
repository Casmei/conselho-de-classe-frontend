import { useCallback, useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Unstable_Grid2 as Grid
} from '@mui/material';

export const StudentProfileForm = ({title, subheader, method}) => {
  const [values, setValues] = useState({
    name: '',
    registre: '',
    class: '',
    course: '',

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

  const handleSubmit = () => {
    //TODO: realizar requisição ao backend para editar
  }

  return (
    <form
      autoComplete="off"
      noValidate
      onSubmit={handleSubmit}
    >
      <Card>
        <CardHeader
          title={title}
          subheader={subheader}
        />
        <CardContent sx={{ pt: 0 }}>
          <Box sx={{ m: -1.5 }}>
            <Grid
              container
              spacing={3}
            >
              <Grid
                xs={12}
                md={12}
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
            {method == 'POST' &&
              <>
                <Grid
                  xs={12}
                  md={6}
                >
                  <TextField
                    label="Curso"
                    name="course"
                    select
                    fullWidth
                    helperText="Selecione o curso que o aluno realiza"
                  >
                      <MenuItem value={1}>
                        Análise e Desenvolvimento de Sistemas
                      </MenuItem>
                  </TextField>

                </Grid>
                <Grid
                  xs={12}
                  md={6}
                >
                  <TextField
                    label="Turma"
                    name="class"
                    select
                    fullWidth
                    helperText="Selecione a turma que o aluno participa"
                  >
                    <MenuItem value={1}>
                      ADS2021
                    </MenuItem>
                  </TextField>
                </Grid>
              </>
            }
            </Grid>
          </Box>
        </CardContent>
        <Divider />
        <CardActions sx={{ justifyContent: 'flex-end' }}>
          <Button variant="contained"
onClick={handleSubmit}>
            {method == 'POST' ? 'Criar' : 'Editar'}
          </Button>
        </CardActions>
      </Card>
    </form>
  );
};
