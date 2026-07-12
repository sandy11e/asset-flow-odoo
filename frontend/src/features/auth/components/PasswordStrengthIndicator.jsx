import { useMemo } from 'react';

export const PasswordStrengthIndicator = ({ password = '' }) => {
  const strength = useMemo(() => {
    let score = 0;
    if (!password) return score;
    if (password.length >= 8) score += 1;
    if (/[A-Z]/.test(password)) score += 1;
    if (/[a-z]/.test(password)) score += 1;
    if (/[0-9]/.test(password)) score += 1;
    if (/[^A-Za-z0-9]/.test(password)) score += 1;
    return Math.min(score, 4); // Max score of 4
  }, [password]);

  const getStrengthConfig = () => {
    switch (strength) {
      case 0: return { label: 'Very Weak', color: 'bg-gray-200', text: 'text-gray-500' };
      case 1: return { label: 'Weak', color: 'bg-red-500', text: 'text-red-500' };
      case 2: return { label: 'Fair', color: 'bg-yellow-500', text: 'text-yellow-500' };
      case 3: return { label: 'Good', color: 'bg-blue-500', text: 'text-blue-500' };
      case 4: return { label: 'Strong', color: 'bg-green-500', text: 'text-green-500' };
      default: return { label: '', color: 'bg-gray-200', text: '' };
    }
  };

  const config = getStrengthConfig();

  return (
    <div className="mt-2">
      <div className="flex gap-1 mb-1">
        {[1, 2, 3, 4].map((level) => (
          <div
            key={level}
            className={`h-1.5 w-full rounded-full transition-colors duration-300 ${
              level <= strength ? config.color : 'bg-gray-200'
            }`}
          />
        ))}
      </div>
      {password.length > 0 && (
        <p className={`text-xs font-medium text-right ${config.text}`}>
          {config.label}
        </p>
      )}
    </div>
  );
};
