
import { ErrorItem } from '@/utils/errors';
import Link from "next/link";
import { useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';


interface RegisterOk {
  onSubmitMail: (email: string) => void;
}

const RegisterForm = ({onSubmitMail}:RegisterOk) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();


  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [errorList, setErrorList] = useState<ErrorItem[]>( [] );

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
        const data:RegisterOk =  await response.json();
        const email = watch('email');
        onSubmitMail(email);
        //router.push('/login');
      } else if (response.status === 400) {
        const errorData = await response.json();
        const errorList: ErrorItem[] = Object.entries(errorData)
          .flatMap(([key, value]) => {
            if (typeof value === 'string') {
              return { key, message: value } as ErrorItem;
            }
            return [];
          });
        setErrorList(errorList );
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
        {errorList.map((errorItem) => (
          <li key={errorItem.key}>{errorItem.message}</li>
        ))}
      </ul>
    </div>
  );
};
interface RegisterOkProps {
  email: string;
}

const RegisterOk = ({ email }: RegisterOkProps) => {
  return (
    <div>
      <h1>Registro Exitoso</h1>
      <p>¡Se ha registrado correctamente con el siguiente email:</p>
      <p>{email}</p>
      <p>Revise su cuenta de correo para activar su cuenta</p>
      <p>¡Gracias por registrarse!</p>
      <p><Link href="/login">Login Page</Link></p>
    </div>
  );
};

const Register = () => {
  const [registeredEmail, setRegisteredEmail] = useState("");

  const handleRegister = (email:string) =>   {
    // Realizar el registro del usuario    // ...
    setRegisteredEmail(email);
  };

  return (
    <div>
      {registeredEmail ? (
        <RegisterOk email={registeredEmail} />
      ) : (
        <RegisterForm onSubmitMail={handleRegister}></RegisterForm>
      )}
    </div>
  );
};

export default Register;

