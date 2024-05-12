import styles from './main.module.css';
import { Test } from '@/main.ts';

const App = () => {
  return (
    <div className={styles.header}>
      <Test />
    </div>
  );
};

export default App;
