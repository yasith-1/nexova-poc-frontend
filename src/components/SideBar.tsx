import React, { useState } from 'react'
import { Settings, User } from 'lucide-react'
import { useNavigate } from 'react-router-dom';

export function Sidebar() {
  const [activeItem, setActiveItem] = useState('Dashboard');
  const navigate = useNavigate();

  const menuItems = [
    { id: 'Database Setting', icon: <Settings size={20} />, label: 'Application Settings' },
    { id: 'User Management', icon: <User size={20} />, label: 'User Management' },
  ];

  const handleItemClick = (itemId: any) => {
    setActiveItem(itemId);

    switch (itemId) {
      case 'Database Setting': navigate('/setting');
        break;
      case 'User Management': navigate('/user');
        break;
    }
  };


  return (
    <div className="w-[250px] bg-white text-gray-800 h-screen fixed left-0">
      <div className="h-4" />
      <div className="h-4" />
      <nav className="flex-1">
        {menuItems.map((item) => (
          <SidebarItem
            key={item.id}
            icon={item.icon}
            label={item.label}
            active={activeItem === item.id}
            onClick={() => handleItemClick(item.id)}
          />
        ))}
      </nav>
    </div>
  )
}

type SidebarItemProps = {
  icon: React.ReactNode
  label: string
  active?: boolean
  onClick?: () => void
}

function SidebarItem({ icon, label, active, onClick }: SidebarItemProps) {
  return (
    <div
      className={`flex items-center gap-3 px-6 py-3 cursor-pointer transition-colors duration-200 ${active
        ? 'bg-[#476DFF]/10 text-[#476DFF] font-medium rounded-r-md'
        : 'hover:bg-gray-100 text-gray-700 rounded-r-md'
        }`}
      onClick={onClick}
    >
      <div className={active ? 'text-[#476DFF]' : 'text-gray-500'}>
        {icon}
      </div>
      <span>{label}</span>
    </div>
  )
}

export default SidebarItem

