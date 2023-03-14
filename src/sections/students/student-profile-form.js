import { useCallback, useEffect, useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  MenuItem,
  TextField,
  Unstable_Grid2 as Grid
} from '@mui/material';
import { ApiService } from 'src/service/Api';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useRouter } from 'next/navigation';


export const StudentProfileForm = ({title, subheader, method}) => {
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      name: '',
      registration: '',
      class: '',
      course: '',
    },
    validationSchema: Yup.object({
      name: Yup
        .string()
        .max(255)
        .required('É necessário informar o nome'),
      registration: Yup
        .string()
        .max(255)
        .required('Informe o número de registro'),
      class: Yup
        .string()
        .max(255)
        .required('Informe a turma'),
      course: Yup
        .string()
        .max(255)
        .required('Informe o curso')
    }),
    onSubmit: async (values, helpers) => {
      try {
        if(method == 'POST') {
          ApiService.post(`/institutions/40/students`, values).then(() => {
            router.back()
          })
        }
        router.push('/students');
      } catch (err) {
        helpers.setStatus({ success: false });
        helpers.setErrors({ submit: err.message });
        helpers.setSubmitting(false);
      }
    }
  });

  const [courses, setCourses] = useState([])
  const [classes, setClasses] = useState([])

  useEffect(() => {
    ApiService.get('/institutions/40/classes').then((response) => {
      setClasses(response.data)
    })

    ApiService.get('/institutions/40/courses').then((response) => {
      setCourses(response.data)
    })
  }, [])

  return (
    <form
      autoComplete="off"
      noValidate
      onSubmit={formik.handleSubmit}
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
                md={8}
              >
                <TextField
                  fullWidth
                  error={!!(formik.touched.name && formik.errors.name)}
                  label="Nome Completo"
                  name="name"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  required
                  value={formik.values.name}
                />
              </Grid>
            {method == 'POST' &&
              <>
                <Grid
                  xs={12}
                  md={4}
                >
                  <TextField
                    fullWidth
                    label="Número de registro"
                    error={!!(formik.touched.registration && formik.errors.registration)}
                    name="registration"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    required
                    value={formik.values.registration}
                  />
                </Grid>
                <Grid
                  xs={12}
                  md={6}
                >
                  <TextField
                    label="Curso"
                    name="course"
                    error={!!(formik.touched.course && formik.errors.course)}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    select
                    fullWidth
                    helperText="Selecione o curso que o aluno realiza"
                  >
                    {courses.map(option => (
                      <MenuItem 
                        key={option.id}
                        value={option.id}
                      >
                        {option.name}
                      </MenuItem>
                    ))}
                  </TextField>

                </Grid>
                <Grid
                  xs={12}
                  md={6}
                >
                  <TextField
                    label="Turma"
                    name="class"
                    error={!!(formik.touched.class && formik.errors.class)}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    select
                    fullWidth
                    helperText="Selecione a turma que o aluno participa"
                  >
                    {classes.map(option => (
                      <MenuItem 
                        key={option.id}
                        value={option.id}
                      >
                        {option.name}
                      </MenuItem>
                    ))}
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
            type="submit">
            {method == 'POST' ? 'Criar' : 'Editar'}
          </Button>
        </CardActions>
      </Card>
    </form>
  );
};
