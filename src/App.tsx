import { useCallback, useState } from 'react';
import './App.css';
import Button from './components/Button';

import FileUpload from './components/FileUpload';
import Message from './components/Message';
import type { Props as MessageProps } from './components/Message/Message';
import Table from './components/Table';

function App() {
  const [tableData, setTableData] = useState(null);
  const [userMessage, setUserMessage] = useState<MessageProps|null>(null);

  const handleOnClick = useCallback(() => {
    const sendData = async () => {
      const request = await fetch('https://run.mocky.io/v3/cbca762d-3f84-4ae4-bb26-79fa774a6c72', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: tableData
      });

      const responseStatus = await request.status;

      if (responseStatus === 200) {
        setUserMessage({
          type: 'Success',
          message: 'Successfully submitted',
        });
      }
    }

    sendData();
  }, [tableData]);

  const handleError = (errorMessage: TypeError | null) => {
    console.log('hit error', errorMessage);

    setUserMessage({
      type: 'Error',
      message: errorMessage?.message || undefined,
    });
  }

  const handleClosedMessage = () => {
    setUserMessage(null);
  }

  return (
    <div className="App">
      {userMessage && (
        <Message message={userMessage.message} type={userMessage.type} onClosed={handleClosedMessage} />
      )}
      <FileUpload onSuccess={setTableData} onError={handleError}/>
      <Table data={tableData} />
      {tableData && (
        <Button onClick={handleOnClick}>Submit</Button>
      )}
    </div>
  );
}

export default App;
