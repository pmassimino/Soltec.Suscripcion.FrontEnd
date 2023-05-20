import { useState, useEffect, RefCallback, useCallback } from 'react';
import { useForm, UseFormRegisterReturn } from 'react-hook-form';
import { Plan, Sujeto, Suscripcion } from '../../models/model';

interface Props {
  onSubmit: (entity: Suscripcion) => Promise<void>;
  isSubmitting: boolean;
  entity?: Suscripcion;
  planes?:Plan[];
  sujetos?:Sujeto[];
}

const SuscripcionForm = ({ onSubmit, isSubmitting, entity,planes,sujetos }: Props) => {
  const { register, handleSubmit, formState: { errors }, setValue } = useForm<Suscripcion>({
    defaultValues: entity,
  });
  const [submitText, setSubmitText] = useState('Crear');
  const estados = ['ACTIVO', 'AVISO', 'SUSPENDIDO'];

  useEffect(() => {
    if (entity) {
      setSubmitText('Guardar cambios');
    }
  }, [entity]);


  const handleFormSubmit = (data: Suscripcion) => {  
    onSubmit(data);
  };  
  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
     <div>
        <label htmlFor="idCuenta">Cuenta:</label>
        <select id="idCuenta" {...register('idCuenta', { required: true })}>
        <option value="">Seleccione una cuenta</option>
          {sujetos && sujetos.map((sujeto) => (
            <option key={sujeto.id} value={sujeto.id} selected={sujeto.id === entity?.idCuenta}>
              {sujeto.nombre}
            </option>
          ))}
        </select>
        {errors.idCuenta && <span>Este campo es requerido.</span>}
      </div>      
      <div>
        <label htmlFor="idPlan">Plan:</label>
        <select id="idPlan" {...register('idPlan', { required: true })} >
        <option value="" >Seleccione un plan</option>
          {planes && planes.map((plan) => (            
            <option key={plan.id} value={plan.id} selected={plan.id === entity?.idPlan}>              
              {plan.nombre}
            </option>
          ))}
        </select>
        {errors.idPlan && <span>Este campo es requerido.</span>}
      </div>    
      <div>
        <label htmlFor="importe">Importe:</label>
        <input
          type="number"
          id="importe"          
          {...register('importe', { required: true })}
        />
        {errors.importe && <span>Este campo es requerido.</span>}
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
  );
};

export default SuscripcionForm;
