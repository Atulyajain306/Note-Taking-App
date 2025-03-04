import { useParams } from "react-router-dom";

const DetailPage = () => {
  const { id } = useParams(); // Capture dynamic ID

  return (
    <div>
      <h1>Detail Page</h1>
      <p>Viewing details for ID: {id}</p>
    </div>
  );
};

export default DetailPage;
