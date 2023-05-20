import React, { useState } from 'react';
import Modal from 'react-modal';

interface Item {
  id: string;
  nombre: string;
}

const BuscarDialog: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  onSelectItem: (item: Item) => void;
}> = ({ isOpen, onClose, onSelectItem }) => {
  const [items] = useState<Item[]>([
    { id: '1', nombre: 'Item 1' },
    { id: '2', nombre: 'Item 2' },
    { id: '3', nombre: 'Item 3' },
  ]);

  const handleItemClick = (item: Item) => {
    onSelectItem(item);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onClose}
    style={{
        content: {
          width: '500px',
          height: '300px',
        },
      }}
    >
        
      <div>
        <h2>Buscar Item</h2>
        <ul>
          {items.map((item) => (
            <li key={item.id} onClick={() => handleItemClick(item)}>
              {item.id} - {item.nombre}
            </li>
          ))}
        </ul>
      </div>
    </Modal>
  );
};

const SearchEntity: React.FC = () => {
  const [id, setId] = useState('');
  const [nombre, setNombre] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleBuscarClick = () => {
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const handleItemSelect = (item: Item) => {
    setId(item.id);
    setNombre(item.nombre);
  };

  return (
    <div>
      <input
        type="text"
        value={id}
        placeholder="ID"
        onChange={(e) => setId(e.target.value)}
      />
      <input
        type="text"
        value={nombre}
        placeholder="Nombre"
        onChange={(e) => setNombre(e.target.value)}
      />
      <button onClick={handleBuscarClick}>Buscar</button>

      <BuscarDialog
        isOpen={dialogOpen}
        onClose={handleDialogClose}
        onSelectItem={handleItemSelect}
      />
    </div>
  );
};

export default SearchEntity;
