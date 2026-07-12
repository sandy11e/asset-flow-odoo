import { SummaryCard } from './SummaryCard';

export const UpcomingTasks = () => {
  const tasks = [
    { id: 1, text: 'Audit Cycle 2026-Q3 starts tomorrow', type: 'warning' },
    { id: 2, text: 'Review pending maintenance requests', type: 'info' },
    { id: 3, text: 'Approve 5 laptop allocation transfers', type: 'primary' },
  ];

  return (
    <SummaryCard title="Upcoming Tasks">
      <ul className="space-y-3">
        {tasks.map(task => (
          <li key={task.id} className="flex items-start gap-3">
            <div className={`mt-1.5 w-2 h-2 rounded-full flex-shrink-0 bg-${task.type}-500`} />
            <span className="text-sm text-gray-700 leading-tight">{task.text}</span>
          </li>
        ))}
      </ul>
    </SummaryCard>
  );
};
