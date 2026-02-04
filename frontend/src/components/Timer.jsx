import { useEffect, useState } from "react";

function Timer({ duration, onTimeUp }) {
  const [time, setTime] = useState(duration * 60);

  useEffect(() => {
    if (time === 0) onTimeUp();
    const timer = setInterval(() => setTime(t => t - 1), 1000);
    return () => clearInterval(timer);
  }, [time]);

  return <h3>Time Left: {Math.floor(time/60)}:{time%60}</h3>;
}

export default Timer;
