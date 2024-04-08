import React from "react";

function Button(props: any) {
  return (
    <div>
      <a
        href={props.link}
        target="_blank"
        className="btn-primary-outline-hover"
      >
        {props.title}
      </a>
    </div>
  );
}

export default Button;
