const GalleryItem = ({ data }) => {
  return (
    <div
      style={{
        border: "1px solid #ccc",
        margin: "10px",
        padding: "10px",
        textAlign: "center"
      }}
    >
      <img
        src={data.picture}
        alt={data.name}
        style={{ width: "100px", height: "100px", borderRadius: "50%" }}
      />
      <p style={{ margin: "5px", fontSize: "14px" }}>{data.name}</p>
    </div>
  );
};

export default GalleryItem;
