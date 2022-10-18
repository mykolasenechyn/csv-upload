import React, { useCallback } from "react";

import styles from './FileUpload.module.scss';

interface Props {
  onSuccess: any;
  onError: (error: TypeError | null) => void;
}

const fileReader = new FileReader();

const csvFileToArray = (fileString: string) => {
  const csvHeader = fileString.slice(0, fileString.indexOf("\n")).split(",");
  const csvRows = fileString.slice(fileString.indexOf("\n") + 1).split("\n");

  const array = csvRows.map((item, rowIndex) => {
    const values = item.split(",");
    const obj = csvHeader.reduce((row, header, index) => {
      if (!values[index]) {
        throw new Error(`${header} on row ${rowIndex} is missing its value`);
      }

      row[header] = values[index];

      return row;
    }, {} as Record<string, string>);

    return obj ;
  });

  return array;
};

function FileUpload({ onSuccess, onError }: Props) {
  const handleFileUpload = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;

    if (files) {
      fileReader.onload = function (event) {
        const csvOutput = event.target?.result as string;
        console.log(csvOutput);

        try {
          onSuccess && onSuccess(csvFileToArray(csvOutput));
        } catch (error) {
          if (error instanceof Error) {
            onError && onError(error);
          }
        }
      };

      fileReader.readAsText(files[0]);
    }
  }, [onError, onSuccess]);

  return (
    <input type="file" className={styles.uploadContainer} onChange={handleFileUpload}/>
  );
}

export default FileUpload;