const SectionTitle = ({ title }) => {
  const hrColor = "rgb(0, 0, 255)"; // RGB value for blue

  return (
    <div className="mx-auto text-center my-8">
      <hr
        className={`border-t-2 border-solid border-blue-500 w-32 mx-auto mb-4`}
        style={{ borderColor: hrColor }}
      />
      <h3 className="text-3xl font-bold text-blue-500">{title}</h3>
      <hr
        className={`border-t-2 border-solid border-blue-500 w-32 mx-auto mt-4`}
        style={{ borderColor: hrColor }}
      />
    </div>
  );
};

export default SectionTitle;
