import { ReactNode } from 'react';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: ReactNode;
  bgColor?: string;
  textColor?: string;
}

const StatCard = ({ title, value, icon, bgColor = "bg-white", textColor = "text-gray-700" }: StatCardProps) => {
  return (
    <div className={`card ${bgColor} rounded-lg p-6 shadow-md transition-transform hover:shadow-lg hover:-translate-y-1 duration-300`}>
      <div className="flex items-start justify-between">
        <div>
          <h3 className={`text-sm font-medium ${textColor} opacity-80`}>{title}</h3>
          <p className={`text-2xl font-bold mt-2 ${textColor}`}>{value}</p>
        </div>
        <div className={`${textColor} opacity-80`}>{icon}</div>
      </div>
    </div>
  );
};

export default StatCard;