import { useDUAProcess } from "../../hooks/useDUAProcess";

export const ProgressPage = () => {
  const { progress } = useDUAProcess();

  return <h2>Progress: {progress}%</h2>;
};