import { FormattedDate } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./OrderTime.module.css"
export const OrderTime: React.FC<{ time: string }> = ({ time }) => {
    const timeReal = new Date(time);
    const timeOffset = timeReal.getTimezoneOffset() / 60 * (-1);
    return (
        <div className={styles.timeBox}>
            <FormattedDate className="text text_type_main-default text_color_inactive" date={timeReal} />
            <p className="text text_type_main-default text_color_inactive pl-3">{`i-GMT${timeOffset < 0 ? timeOffset : `+${timeOffset}`}`}</p>
        </div>

    )
}