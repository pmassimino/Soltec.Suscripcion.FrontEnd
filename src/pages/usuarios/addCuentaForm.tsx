import { useState, useEffect, RefCallback, useCallback } from 'react';
import { useForm, UseFormRegisterReturn } from 'react-hook-form';
import BackEndError, { ErrorItem } from '@/utils/errors';
import { useRouter } from 'next/router';
import ApiService from '@/services/apiService';
import { Sujeto, UsuarioCuenta } from '@/models/model';
import ErrorList from '@/componets/errorList';

interface Props {
  onSubmit: (entity: UsuarioCuenta) => Promise<void>;
  isSubmitting: boolean;
  entity?: UsuarioCuenta; 
  sujetos?:Sujeto[];
  errorList:ErrorItem[];
}

const AddCuentaForm = ({onSubmit,isSubmitting,entity,sujetos,errorList}:Props ) => {
  const { register, handleSubmit, formState: { errors }, setValue } = useForm<UsuarioCuenta>({    
  });    
  
  const handleFormSubmit = (data: UsuarioCuenta) => {  
    onSubmit(data);
  };     
  return (
    <div>
    <form onSubmit={handleSubmit(handleFormSubmit)}>
     <div>         
     <input type="hidden" {...register('idUsuario')} value={entity?.idUsuario} />
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
      <button type="submit" disabled={isSubmitting}>
        Guardar
      </button>
    </form>
    <ErrorList errorList={errorList}></ErrorList>
    </div>
  );
};

export default AddCuentaForm;
