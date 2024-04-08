import React from "react";
import styles from '../components/PricingPink.module.css'
function ButtonPink(props: any) {
  return (
    <div>
      <a
        href={props.link}
        target="_blank"
        className={styles.btn}
      >
        {props.title}
      </a>
    </div>
  );
}

export default ButtonPink;
