import { PropsWithChildren } from 'react';
import styles from './Button.module.scss';

interface Props {
  onClick?: React.MouseEventHandler<HTMLElement>;
}

function Button({ children, onClick }: PropsWithChildren<Props>) {
  return (
    <button onClick={onClick} className={styles.button}>{children}</button>
  );
}

export default Button;