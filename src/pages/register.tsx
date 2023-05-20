import router from 'next/router';
import { useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  interface ErrorItem {
    key: string;
    message: string;
  }
  interface ErrorList {
    errors: ErrorItem[];
  }

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [errorList, setErrorList] = useState<ErrorList>({ errors: [] });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const apiUrl = process.env.API_URL ?? '';

    try {
      const response = await fetch(apiUrl + '/usuario', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        router.push('/login');
      } else if (response.status === 400) {
        const errorData = await response.json();
        const errorList: ErrorItem[] = Object.entries(errorData)
          .flatMap(([key, value]) => {
            if (typeof value === 'string') {
              return { key, message: value } as ErrorItem;
            }
            return [];
          });
        setErrorList({ errors: errorList });
      }
    } catch (error) {
      console.error('Error en la llamada a la API:', error);
    }
  };

  const password = watch('password');

  return (
    <div>
      <h1>Registro de Usuario</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="nombre">Nombre:</label>
          <input type="text" id="nombre" {...register('nombre', { required: true })} />
          {errors.nombre && <span>Este campo es requerido.</span>}
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" {...register('email', { required: true })} />
          {errors.email && <span>Este campo es requerido.</span>}
        </div>
        <div>
          <label htmlFor="password">Contraseña:</label>
          <input
            type="password"
            id="password"
            {...register('password', { required: true })}
          />
          {errors.password && <span>Este campo es requerido.</span>}
        </div>
        <div>
          <label htmlFor="confirmPassword">Confirmar Contraseña:</label>
          <input
            type="password"
            id="confirmPassword"
            {...register('confirmPassword', {
              required: true,
              validate: (value) => value === password || 'Las contraseñas no coinciden',
            })}
          />
          {errors.confirmPassword && <span>Contraseñas no coinciden</span>}
        </div>
        <button type="submit">Registrarse</button>
      </form>
      <ul>
        {errorList.errors.map((errorItem) => (
          <li key={errorItem.key}>{errorItem.message}</li>
        ))}
      </ul>
    </div>
  );
};

export default Register;
