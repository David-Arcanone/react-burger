
import styles from './CustomScrollbar.module.css';
import Scrollbars from 'react-custom-scrollbars-2';
import { TCustomScrollbarProps } from '../../services/types/CustomScrollbar/CustomScrollbar';

const CustomScrollbar:React.FC<TCustomScrollbarProps> =({ customHeight, customOffsetBottom, children })=> {
    const heightWithOffset = customHeight - customOffsetBottom;
    return (
        <Scrollbars
            style={{
                height: `${customHeight}px`
            }}
            renderTrackVertical={() => <div
                className={styles.scrollbar}
                style={{
                    height: `${heightWithOffset}px`
                }} />}
            renderThumbVertical={() => <div
                className={styles.scrolltumb} />}
            renderTrackHorizontal={() => <div />}>
            {children}
        </Scrollbars>
    );
}
export default CustomScrollbar;
