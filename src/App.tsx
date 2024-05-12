import Block from './Block';
import styles from './main.module.css';
import { useClickAway } from '@/hooks/useClickAway.ts';
import { useCopy } from '@/hooks/useCopy.ts';
import { useHover } from '@/hooks/useHover.ts';
import { useInterval } from '@/hooks/useInterval.ts';
import { useIsMounted } from '@/hooks/useIsMounted.ts';
import { useEventListener } from '@/main.ts';
import { useRef, useState } from 'react';

const App = () => {
  const [resizeData, setResizeData] = useState<{ width: number; height: number }[]>([]);
  const refShow = useRef<HTMLDivElement | null>(null);
  const [isShow, setIsShow] = useState<boolean>(false);
  const [intervalDelay, setIntervalDelay] = useState<undefined | 1000>(undefined);
  const isMounted = useIsMounted();
  const btnRef = useRef<null | HTMLButtonElement>(null);
  const isHovered = useHover(btnRef);
  useClickAway(refShow, isShow, setIsShow);
  const [text, copy] = useCopy();
  const [inputCopyValue, setInputCopyValue] = useState<null | string>(null);

  const resizeHandler = (event: Event) => {
    console.log(event.target);
    // @ts-expect-error
    setResizeData((prevData) => [...prevData, { width: event.target?.innerWidth, height: event.target?.innerHeight }]);
  };

  const intervalHandler = () => {
    console.log('Interval triggered');
  };

  useInterval(intervalHandler, intervalDelay);
  useEventListener('resize', resizeHandler);

  return (
    <div className={styles.main}>
      <Block>
        <span className={styles.name}>#useEventListener</span>
        <h3 style={{ margin: 0 }}>Resize window logs:</h3>
        {resizeData?.length ? JSON.stringify(resizeData) : 'Empty list'}
      </Block>

      <Block>
        <span className={styles.name}>#useClickAway</span>
        <button onClick={() => setIsShow(true)}>Show hidden block</button>
        {isShow && (
          <div className={styles.showBlock} ref={refShow}>
            <h3>Click away for hide this block</h3>
          </div>
        )}
      </Block>

      <Block>
        <span className={styles.name}>#useInterval</span>
        <button onClick={() => setIntervalDelay((prev) => (prev ? undefined : 1000))}>
          {intervalDelay ? 'Stop interval' : 'Start interval'}
        </button>
        <i style={{ margin: 0 }}>Check console after interval was started</i>
      </Block>

      <Block>
        <span className={styles.name}>#useIsMounted</span>
        <h3 style={{ margin: 0 }}>{isMounted ? 'Component was mounted' : 'Component was not Mounted'}</h3>
      </Block>

      <Block>
        <span className={styles.name}>#useHover</span>
        <button ref={btnRef}>{isHovered ? 'Button is hovered' : 'Button is not hovered'}</button>
      </Block>

      <Block>
        <span className={styles.name}>#useCopy</span>
        <form>
          <input
            placeholder={'Enter text for copy'}
            type="text"
            value={inputCopyValue ?? ''}
            onChange={(e) => setInputCopyValue(e.target.value)}
          />
          <button onClick={() => copy(inputCopyValue as string)} disabled={!inputCopyValue}>
            Copy
          </button>
        </form>
        <p style={{ margin: 0 }}>
          Text in clipboard:{' '}
          <b>
            <i>{text ?? 'None value'}</i>
          </b>
        </p>
      </Block>
    </div>
  );
};

export default App;
