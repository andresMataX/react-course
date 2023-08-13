import { useMemo } from 'react'
import { Grid, TextField, Button, Typography, Link, Alert } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'
import { useForm, SubmitHandler } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { AuthLayout } from '../layout/AuthLayout'
import { useAppDispatch, useAppSelector } from '../../store'
import { startCreatingUserWithEmailPassword } from '../../store/auth/thunks'

interface Props {}

yup.setLocale({
  string: {
    min: 'Deben de ser mínimo 6 caracteres',
    email: 'Debe de ser un email válido',
  },
  mixed: {
    required: 'Este campo es obligatorio',
  },
})

const schema = yup
  .object({
    email: yup.string().email().required(),
    password: yup.string().min(6).required(),
    displayName: yup.string().min(6).required(),
  })
  .required()

export type FormData = yup.InferType<typeof schema>

export const RegisterPage = ({}: Props) => {
  const dispatch = useAppDispatch()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  })

  const { status, errorMessage } = useAppSelector((state) => state.auth)

  const isCheckingAuthentication = useMemo(
    () => status === 'checking',
    [status]
  )

  const onSubmit: SubmitHandler<FormData> = (data) => {
    dispatch(startCreatingUserWithEmailPassword(data))
  }

  return (
    <AuthLayout title="Crear cuenta">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="animate__animated animate__fadeIn animate__faster"
      >
        <Grid container>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="Nombre completo"
              type="text"
              placeholder="Juan Pérez"
              fullWidth
              error={errors.displayName ? true : false}
              helperText={errors.displayName?.message}
              {...register('displayName')}
            />
          </Grid>

          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="Correo"
              type="email"
              placeholder="correo@google.com"
              fullWidth
              error={errors.email ? true : false}
              helperText={errors.email?.message}
              {...register('email')}
            />
          </Grid>

          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="Contraseña"
              type="password"
              placeholder="Contraseña"
              fullWidth
              error={errors.password ? true : false}
              helperText={errors.password?.message}
              {...register('password')}
            />
          </Grid>

          <Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>
            <Grid item xs={12} display={!!errorMessage ? '' : 'none'}>
              <Alert severity="error">{errorMessage}</Alert>
            </Grid>

            <Grid item xs={12}>
              <Button
                variant="contained"
                fullWidth
                type="submit"
                disabled={isCheckingAuthentication}
              >
                <Typography>Crear cuenta</Typography>
              </Button>
            </Grid>
          </Grid>

          <Grid container direction="row" justifyContent="end">
            <Typography sx={{ mr: 1 }}>¿Ya tienes cuenta?</Typography>
            <Link color="inherit" to="/auth/login" component={RouterLink}>
              Usar mi cuenta
            </Link>
          </Grid>
        </Grid>
      </form>
    </AuthLayout>
  )
}
