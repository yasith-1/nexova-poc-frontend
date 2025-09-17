import React, { useState } from 'react';
import {
    Users,
    Search,
    Plus,
    Trash2,
    MoreHorizontal,
    Edit,
    Calendar,
    Shield,
    Eye
} from 'lucide-react';

const Role = () => {
    const [searchQuery, setSearchQuery] = useState('');

    const roles = [
        {
            id: 1,
            name: 'Administrator',
            description: 'Full system access with all administrative privileges including user management, system settings, and security controls.',
            users: 5,
            createdOn: '2023-01-15',
            permissions: ['User Management', 'System Settings', 'Security', 'Reports', 'Billing']
        },
        {
            id: 2,
            name: 'Manager',
            description: 'Supervisory role with team management capabilities and access to departmental resources and reporting tools.',
            users: 12,
            createdOn: '2023-02-20',
            permissions: ['Team Management', 'Reports', 'Project Access', 'Resource Management']
        },
        {
            id: 3,
            name: 'Employee',
            description: 'Standard user role with basic access to company resources, personal dashboard, and collaboration tools.',
            users: 45,
            createdOn: '2023-01-10',
            permissions: ['Dashboard', 'Profile', 'Basic Reports', 'Collaboration Tools']
        }
    ];

    const getPermissionColor = (permission: string): string => {
        const colors: Record<string, string> = {
            'User Management': 'bg-purple-100 text-purple-700 border border-purple-200',
            'System Settings': 'bg-red-100 text-red-700 border border-red-200',
            'Security': 'bg-orange-100 text-orange-700 border border-orange-200',
            'Reports': 'bg-blue-100 text-blue-700 border border-blue-200',
            'Billing': 'bg-green-100 text-green-700 border border-green-200',
            'Team Management': 'bg-indigo-100 text-indigo-700 border border-indigo-200',
            'Project Access': 'bg-cyan-100 text-cyan-700 border border-cyan-200',
            'Resource Management': 'bg-teal-100 text-teal-700 border border-teal-200',
            'Dashboard': 'bg-gray-100 text-gray-700 border border-gray-200',
            'Profile': 'bg-pink-100 text-pink-700 border border-pink-200',
            'Basic Reports': 'bg-yellow-100 text-yellow-700 border border-yellow-200',
            'Collaboration Tools': 'bg-emerald-100 text-emerald-700 border border-emerald-200'
        };
        return colors[permission] || 'bg-gray-100 text-gray-700 border border-gray-200';
    };

    const getRoleIcon = (roleName: string): string => {
        if (roleName === 'Administrator') return '👑';
        if (roleName === 'Manager') return '🎯';
        return '👤';
    };



    return (
        <div className="flex flex-col md:flex-row bg-[#E8F1FF] rounded-2xl min-h-screen">
            {/* Main Content */}
            <div className="flex-1 w-full">
                {/* Page Content */}
                <main className="flex-1 overflow-y-auto">
                    {/* Top Bar with Search and Add Button */}
                    <div className="bg-[#E8F1FF] px-4 sm:px-6 py-4">
                        <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-4">
                            <div className="relative w-full sm:max-w-md">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                                <input
                                    type="text"
                                    placeholder="Search roles..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
                                />
                            </div>
                            <button className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center justify-center space-x-2 text-sm font-medium transition-colors">
                                <Plus className="w-4 h-4" />
                                <span>Add Role</span>
                            </button>
                        </div>
                    </div>

                    {/* Roles List */}
                    <div className="p-4 sm:p-6 space-y-4">
                        <div className="space-y-6">
                            {roles.map((role) => (
                                <div
                                    key={role.id}
                                    className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 sm:p-8 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 relative overflow-hidden group"
                                >
                                    {/* Decorative gradient */}
                                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>

                                    {/* Header */}
                                    <div className="flex flex-col sm:flex-row items-start justify-between gap-4 mb-6">
                                        <div className="flex items-center space-x-4">
                                            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-white text-xl font-bold shadow-lg">
                                                {getRoleIcon(role.name)}
                                            </div>
                                            <div>
                                                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-1">{role.name}</h3>
                                                <div className="flex flex-wrap gap-2 text-sm text-gray-500">
                                                    <div className="flex items-center space-x-1">
                                                        <Users className="w-4 h-4" />
                                                        <span className="font-semibold text-gray-700">{role.users}</span> users
                                                    </div>
                                                    <div className="flex items-center space-x-1">
                                                        <Calendar className="w-4 h-4" />
                                                        <span>Created {role.createdOn}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex items-center space-x-1 ">
                                            <button className="p-2 hover:bg-blue-50 rounded-xl transition-colors duration-200 group/btn">
                                                <Edit className="w-4 h-4 text-gray-400 group-hover/btn:text-blue-600" />
                                            </button>
                                            <button className="p-2 hover:bg-red-50 rounded-xl transition-colors duration-200 group/btn">
                                                <Trash2 className="w-4 h-4 text-gray-400 group-hover/btn:text-red-600" />
                                            </button>
                                            <button className="p-2 hover:bg-gray-50 rounded-xl transition-colors duration-200 group/btn">
                                                <MoreHorizontal className="w-4 h-4 text-gray-400 group-hover/btn:text-gray-600" />
                                            </button>
                                        </div>
                                    </div>

                                    {/* Description */}
                                    <p className="text-gray-600 mb-6 leading-relaxed text-sm">{role.description}</p>

                                    {/* Permissions */}
                                    <div className="mb-8">
                                        <div className="flex items-center space-x-2 mb-4">
                                            <Shield className="w-4 h-4 text-gray-600" />
                                            <h4 className="text-sm font-semibold text-gray-900">Permissions</h4>
                                            <span className="text-xs text-gray-500">({role.permissions.length})</span>
                                        </div>
                                        <div className="flex flex-wrap gap-2">
                                            {role.permissions.map((permission, index) => (
                                                <span
                                                    key={index}
                                                    className={`px-3 py-2 text-xs font-medium rounded-lg transition-all duration-200 hover:scale-105 cursor-default ${getPermissionColor(permission)}`}
                                                >
                                                    {permission}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Actions */}
                                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-4 border-t border-gray-100">
                                        <button className="flex items-center justify-center sm:justify-start space-x-2 px-4 py-2 text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg text-sm font-medium transition-all duration-200 group/action">
                                            <Eye className="w-4 h-4 group-hover/action:scale-110 transition-transform" />
                                            <span>View Details</span>
                                        </button>
                                        <button className="flex items-center justify-center sm:justify-start space-x-2 px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-black rounded-lg text-sm font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-105 shadow-md hover:shadow-lg">
                                            <Shield className="w-4 h-4" />
                                            <span>Edit Permissions</span>
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </main>
            </div>
        </div>

    );
};

export default Role;