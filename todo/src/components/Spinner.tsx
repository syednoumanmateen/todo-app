import { FC, memo } from 'react'

interface props { }

const Spinner: FC<props> = ({ }) => {
  return (
    <div className="spinner-overlay">
      <div className="spinner"></div>
    </div>
  );
}

export default memo(Spinner)  