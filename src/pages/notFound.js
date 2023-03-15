
import styles from './notFound.module.css';

function NotFound() {
    return (
          <main className={`${styles.main} pb-10`}>
            <h1 className="text text_type_main-large pb-10 pt-10">УПС! 404 Error</h1>
            <p className="text text_type_main-default">указанный вами адрес страницы не существует</p>
          </main>
    );
  }
  export {NotFound};