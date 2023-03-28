import styles from "./LogOrderCardPics.module.css"


const LogOrderCardPic: React.FC<{ overflowNum: number; srcPic: string, partOfArray:boolean }> = ({ overflowNum, srcPic,partOfArray }) => {
    if (overflowNum > 0) {
        return (
            <div className={`${(partOfArray)?(styles.onePartOfArray):""} ${styles.framedPicture}`}>
                <img src={srcPic} alt="ингредиент" className={styles.insidePicture} />
                <div className={styles.dim}><p className="text text_type_main-default">{`+${overflowNum}`}</p></div>
            </div>
        )
    }

    return (
        <div className={`${(partOfArray)?(styles.onePartOfArray):""} ${styles.framedPicture}`}>
            <img src={srcPic} alt="ингредиент" className={styles.insidePicture} />
        </div>
    );
}
export default LogOrderCardPic;