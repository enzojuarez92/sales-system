import * as yup from 'yup'

export const userSchema = yup.object({
    name: yup.string()
    .required('El nombre es requerido')
    .matches(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ ]+$/, 'El nombre solo puede contener letras')
    .max(30, 'Máximo 30 caracteres'),
    lastname: yup.string()
        .required('El apellido es requerido')
        .matches(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ ]+$/, 'El apellido solo puede contener letras')
        .max(30, 'Máximo 30 caracteres'),
    document: yup.string()
        .transform((value) => (value ? value.replace(/\./g, '') : value))
        .matches(/^\d+$/, 'Solo se permiten números')
        .max(8, 'Máximo 8 dígitos'),
    gender: yup.string()
        .required('Seleccione un género'),
    dateOfBirth: yup.date()
        .nullable()
        .required('La fecha es requerida'),
    email: yup.string()
        .email('El formato de email no es válido')
        .required('El email es requerido'),
    username: yup.string()
        .required('El usuario es requerido')
        .min(5, 'Mínimo 5 caracteres')
});