import { useDUAProcess } from "../../hooks/useDUAProcess";

export const GeneratorPage = () => {
  const { start } = useDUAProcess();

  const handleFiles = (e: any) => {
    const files = Array.from(e.target.files);
    start(files as File[]);
  };

  return (
    <div>
      <h2>Upload Documents</h2>
      <input type="file" multiple onChange={handleFiles} />
    </div>
  );
};