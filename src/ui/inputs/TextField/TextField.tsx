import React, { HtmlHTMLAttributes } from 'react';
import styles from "./TextField.module.scss"

const TextField: React.FC<React.InputHTMLAttributes<HTMLInputElement>> = (props) => {
    return (
        <input type="text" className={styles.container} {...props} />
    );
};

export default TextField;