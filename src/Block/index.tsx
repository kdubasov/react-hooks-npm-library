import styles from './Block.module.css';

interface IProps {
  children: React.ReactNode;
}

const Index = ({ children }: IProps) => {
  return <div className={styles.wrapper}>{children}</div>;
};

export default Index;
