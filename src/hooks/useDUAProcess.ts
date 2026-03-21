import { useState } from "react";
import { DUAServiceFacade } from "../application/services/DUAServiceFacade";

export const useDUAProcess = () => {
  const [progress, setProgress] = useState(0);
  const facade = new DUAServiceFacade();

  const start = async (files: File[]) => {
    await facade.startDUAProcess(files, setProgress);
  };

  return { start, progress };
};