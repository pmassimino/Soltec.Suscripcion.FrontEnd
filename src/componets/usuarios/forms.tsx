import { useState, useEffect, RefCallback, useCallback } from 'react';
import { useForm, UseFormRegisterReturn } from 'react-hook-form';
import { Plan, Sujeto, Suscripcion, Usuario } from '../../models/model';
import { ErrorItem } from '@/utils/errors';

interface Props {
  onSubmit: (entity: Usuario) => Promise<void>;
  isSubmitting: boolean;
  entity?: Usuario;  
  errorList:ErrorItem[];
}

const UsuarioForm = ({ onSubmit, isSubmitting, entity,errorList }: Props) => {
  const { register, handleSubmit, formState: { errors }, setValue } = useForm<Usuario>({
    defaultValues: entity,
  });
  const [submitText, setSubmitText] = useState('Crear');  
  const estados = ['ACTIVO', 'PENDIENTE'];

  useEffect(() => {
    if (entity) {
      setSubmitText('Guardar cambios');
    }
  }, [entity]);


  const handleFormSubmit = (data: Usuario) => {  
    onSubmit(data);
  };  
  return (
    <div>
    <form onSubmit={handleSubmit(handleFormSubmit)}>
    <div>
        <label htmlFor="nombre">Nombre:</label>
        <input
          type="text"
          id="Nombre"          
          {...register('nombre', { required: true })}
        />
        {errors.nombre && <span>Este campo es requerido.</span>}
      </div>            
     
      <div>
        <label htmlFor="email">email:</label>
        <input
          type="text"
          id="email"          
          {...register('email', { required: true })}
        />
        {errors.email && <span>Este campo es requerido.</span>}
      </div>      
      <div>
        <label htmlFor="estado">Estado:</label>
        <select id="estado" {...register('estado', { required: true })} >          
          {estados.map((estado) => (
            <option key={estado} value={estado}>
              {estado}
            </option>
          ))}
        </select>
        {errors.estado && <span>Este campo es requerido.</span>}
      </div>       
      <button type="submit" disabled={isSubmitting}>
        {submitText}
      </button>
    </form>
    <div>
      <ul>
        {errorList.map(item => (
          <li key={item.key}>{item.message}</li>
        ))}
      </ul>
      </div>
    </div>
  );
};

export default UsuarioForm;
