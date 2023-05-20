import { useState, useEffect, RefCallback, useCallback } from 'react';
import { useForm, UseFormRegisterReturn } from 'react-hook-form';
import { Plan } from '../../models/model';

interface Props {
  onSubmit: (entity: Plan) => Promise<void>;
  isSubmitting: boolean;
  entity?: Plan;
}

const PlanForm = ({ onSubmit, isSubmitting, entity }: Props) => {
  const { register, handleSubmit, formState: { errors }, setValue } = useForm<Plan>({
    defaultValues: entity,
  });
  const [submitText, setSubmitText] = useState('Crear');

  useEffect(() => {
    if (entity) {
      setSubmitText('Guardar cambios');
    }
  }, [entity]);

  const handleFormSubmit = (data: Plan) => {  
    onSubmit(data);
  };  
  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <div>
        <label htmlFor="nombre">Nombre:</label>
        <input
          type="text"
          id="nombre"          
          {...register('nombre', { required: true })}
        />
        {errors.nombre && <span>Este campo es requerido.</span>}
      </div>      
      <button type="submit" disabled={isSubmitting}>
        {submitText}
      </button>
    </form>
  );
};

export default PlanForm;
