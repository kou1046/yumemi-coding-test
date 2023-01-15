import { Prefecture } from "../types/resas";

const NamedCheckBox = ({ label }: { label: string }) => {
  return (
    <>
      <div>
        <input type="checkbox" />
        <label htmlFor="label">{label}</label>
      </div>
    </>
  );
};

export default NamedCheckBox;
