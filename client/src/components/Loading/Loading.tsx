import loading from "../../assets/img/loading.gif";

import "./Loading.css";

export default function Loading() {
  return (
    <div className="loading">
      <img src={loading} alt="loading" />
    </div>
  );
}