import { useState } from "react";
import { useInterval } from "../hooks/useInterval";

export function MessageWriter({ message = "" }: { message: string }) {
  const [index, setIndex] = useState(0);
  const [written, setWritten] = useState("");
  const [running, setRunning] = useState(true);
  const parts = message.split(" ");

  useInterval(
    () => {
      console.log("I fire every second!", written, index);
      setWritten(`${written} ${parts[index]}`);
      if (index < parts.length - 1) {
        setIndex(index + 1);
      } else {
        setRunning(false);
      }
    },
    running ? 100 : null
  );

  return <>{written}</>;
}
