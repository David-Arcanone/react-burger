
import styles from './CustomScrollbar.module.css';
import PropTypes from "prop-types";
import Scrollbars from 'react-custom-scrollbars-2';

function CustomScrollbar({ customHeight, customOffsetBottom, children }) {
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
CustomScrollbar.propTypes = {
    customHeight: PropTypes.number.isRequired,
    customOffsetBottom: PropTypes.number.isRequired,
    children: PropTypes.node.isRequired
}
export default CustomScrollbar;
