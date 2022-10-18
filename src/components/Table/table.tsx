import styles from './table.module.scss';

interface Props {
  data: {[key: string]: string}[] | null;
}

function Table({ data }: Props){
  if (!data) {
    return null;
  }

  return (
    <table className={styles.table}>
      <thead>
        <tr>
        {Object.keys(data[0]).map((key) => (
          <th>{key}</th>
        ))}
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <tr key={item['Beneficiary ID']}>
            {Object.values(item).map((val) => (
              <td>{val}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Table;