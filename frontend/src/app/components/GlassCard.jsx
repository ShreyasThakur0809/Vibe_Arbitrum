// This is a simple wrapper component that applies our consistent glass styling.
// We can reuse it for user profiles, event cards, match lists, etc.
const GlassCard = ({ children, className = '' }) => {
  return (
    <div className={`glass-card p-6 ${className}`}>
      {children}
    </div>
  );
};

export default GlassCard;