import cx from 'classnames';
import { useEffect, useState } from 'react';

import styles from './Message.module.scss';

type MessageType = "Success" | "Error"

export interface Props {
  message: string | undefined;
  type: MessageType | undefined;
  onClosed?: () => void;
}

function Message({ message, type, onClosed }: Props) {
  const [isShowing, setIsShowing] = useState(true);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
      setTimeout(() => {
        setIsExiting(true);
        setTimeout(() => {
          setIsShowing(false);
          onClosed && onClosed();
        }, 300);
      }, 3000);
  }, []);

  if (isShowing === false) {
    return null;
  }

  return (
    <div
      className={cx(
        styles.message,
        {
          [styles[`message${type}`]]: type,
          [styles.messageIn]: !isExiting,
          [styles.messageOut]: isExiting
        }
      )}
    >
      { message }
    </div>
  );
}

export default Message;