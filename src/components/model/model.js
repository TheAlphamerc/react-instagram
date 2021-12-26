import cx from "classnames";

export function Modal({
  children,
  className = "",
  width = 540,
  padding = true,
  active = false,
  setActive = (e) => {},
  ...props
}) {
  return (
    <div
      onClick={(e) => {
        if (active) {
          setActive(false);
        } else {
          setActive(true);
        }
      }}
      onKeyUp={(e) => {
        if (e.key === "Escape") {
          setActive(false);
        }
      }}
      className={cx(`Modal`, {
        active: active,
      })}
      {...props}
    >
      <Card
        onClick={(e) => {
          // stop the card being closed when we click on inner divs
          if (active) {
            e.stopPropagation();
          }
        }}
        padding={padding}
        className={`overflow-hidden ` }
        style={{ maxWidth: width }}
      >
        {children}
      </Card>
    </div>
  );
}

function Card({
  children,
  padding = true,
  className = "",
  style = {},
  onClick = (e) => {},
}) {
  return (
    <div
      onClick={onClick}
      style={style}
      className={cx("Card rounded shadow bg-white " , {
        "p-4": padding,
      })}
    >
      {children}
    </div>
  );
}
