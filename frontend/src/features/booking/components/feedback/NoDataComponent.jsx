import React from 'react';
import EmptyState from './EmptyState';

const NoDataComponent = ({
  message = 'No records available in this reservation category.',
  onAction,
  actionLabel,
  className = '',
}) => {
  return (
    <EmptyState
      title="No Records"
      description={message}
      onAction={onAction}
      actionLabel={actionLabel}
      className={className}
    />
  );
};

export default NoDataComponent;
