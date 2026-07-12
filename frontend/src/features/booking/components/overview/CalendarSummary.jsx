import React from 'react';
import CalendarOverview from './CalendarOverview';

const CalendarSummary = ({ resources = [], className = '' }) => {
  return <CalendarOverview resources={resources} />;
};

export default CalendarSummary;
