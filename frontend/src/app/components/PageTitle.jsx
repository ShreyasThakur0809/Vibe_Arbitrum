const PageTitle = ({ title, subtitle }) => {
  return (
    <div className="mb-8">
      <h1 className="text-4xl font-bold text-pink-500">{title}</h1>
      {subtitle && <p className="text-lg opacity-70 mt-1">{subtitle}</p>}
    </div>
  );
};

export default PageTitle;