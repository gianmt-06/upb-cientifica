// components/FileComponent.tsx
import React from 'react';
import { FileModel } from '../../../Models/FileModel';

interface FileProps {
  file: FileModel; // Hacer que 'file' sea opcional
} 

const doAnything = () => {
  console.log("Doing anything");
}

const FileComponent: React.FC<FileProps> = ({ file }) => {
  const name = 'aa';
  const updatedAt = 'aa';
  const owner = 'aa';
  console.log(file);
  

//   const renderIcon = () => {
//     switch (type) {
//       case 'pdf':
//         return <FaFilePdf />;
//       case 'image':
//         return <FaFileImage />;
//       case 'word':
//         return <FaFileWord />;
//       default:
//         return <FaFilePdf />; // Un icono predeterminado
//     }
//   };

  return (
    <tr className="file-item" onClick={() => doAnything()}>
      <td>{name}</td>
      {/* <td>{renderIcon()} {type}</td> */}
      <td>{updatedAt}</td>
      <td>{owner}</td>
    </tr>
  );
};

export default FileComponent;
