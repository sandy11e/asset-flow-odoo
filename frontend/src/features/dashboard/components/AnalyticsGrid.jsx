export const AnalyticsGrid = ({ children, columns = 3 }) => {
  const colsClass = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
  }[columns] || 'grid-cols-1 lg:grid-cols-3';

  return (
    <div className={`grid gap-6 ${colsClass}`}>
      {children}
    </div>
  );
};
