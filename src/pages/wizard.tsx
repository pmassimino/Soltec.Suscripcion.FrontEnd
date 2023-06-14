import React, { useState } from 'react';

// Definición de tipos
interface FormData {
  name: string;
  email: string;
  address: string;
}

interface StepProps {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
  nextStep: () => void;
  prevStep: () => void;
}

// Componente del paso 1
const Step1: React.FC<StepProps> = ({ formData, setFormData, nextStep }) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleNextStep = () => {
    nextStep();
  };

  return (
    <div>
      <h2>Step 1</h2>
      <input type="text" name="name" value={formData.name} onChange={handleInputChange} />
      <button onClick={handleNextStep}>Next</button>
    </div>
  );
};

// Componente del paso 2
const Step2: React.FC<StepProps> = ({ formData, setFormData, nextStep, prevStep }) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleNextStep = () => {
    nextStep();
  };

  const handlePrevStep = () => {
    prevStep();
  };

  return (
    <div>
      <h2>Step 2</h2>
      <input type="text" name="email" value={formData.email} onChange={handleInputChange} />
      <button onClick={handlePrevStep}>Back</button>
      <button onClick={handleNextStep}>Next</button>
    </div>
  );
};

// Componente del paso 3
const Step3: React.FC<StepProps> = ({ formData, setFormData, nextStep, prevStep }) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleNextStep = () => {
    nextStep();
  };

  const handlePrevStep = () => {
    prevStep();
  };

  return (
    <div>
      <h2>Step 3</h2>
      <input type="text" name="address" value={formData.address} onChange={handleInputChange} />
      <button onClick={handlePrevStep}>Back</button>
      <button onClick={handleNextStep}>Next</button>
    </div>
  );
};

// Componente del paso 4
const Step4: React.FC<{ formData: FormData; prevStep: () => void }> = ({ formData, prevStep }) => {
  const handlePrevStep = () => {
    prevStep();
  };

  return (
    <div>
      <h2>Step 4</h2>
      <p>Name: {formData.name}</p>
      <p>Email: {formData.email}</p>
      <p>Address: {formData.address}</p>
      <button onClick={handlePrevStep}>Back</button>
    </div>
  );
};

// Componente del asistente
const Wizard: React.FC = () => {
  const [step, setStep] = useState<number>(1);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    address: '',
  });

  const nextStep = () => {
    setStep(prevStep => prevStep + 1);
  };

  const prevStep = () => {
    setStep(prevStep => prevStep - 1);
  };

  // Renderizar el paso actual según el valor de 'step'
  switch (step) {
    case 1:
      return <Step1 formData={formData} setFormData={setFormData} nextStep={nextStep} prevStep={prevStep} />;
    case 2:
      return <Step2 formData={formData} setFormData={setFormData} nextStep={nextStep} prevStep={prevStep} />;
    case 3:
      return <Step3 formData={formData} setFormData={setFormData} nextStep={nextStep} prevStep={prevStep} />;
    case 4:
      return <Step4 formData={formData} prevStep={prevStep} />;
    default:
      return null;
  }
};

export default Wizard;
