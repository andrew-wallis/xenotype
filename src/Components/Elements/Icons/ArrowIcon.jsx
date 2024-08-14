function ArrowIcon({direction}) {

  function getDirection() {
    switch (direction) {
      case "Left":
        return "rotate-90 -translate-x-px"
      case "Up":
        return "rotate-180"
      case "Right":
        return "-rotate-90 translate-x-px	"
    }
  }

  return (
    <div className={getDirection()}>
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M8 10L12 6H4L8 10Z" fill="currentColor"/>
      </svg>
    </div>
  );
}

export default ArrowIcon;