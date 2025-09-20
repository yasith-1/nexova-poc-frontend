import { Database, ChevronDown, Save, X, } from 'lucide-react';

const UserManagement = () => {

    return (
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 bg-gray-50">
            <div className="max-w-7xl mx-auto space-y-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                    {/* Settings (2/3 on desktop) */}
                    <div className="lg:col-span-2 space-y-6">

                        {/* ---------- Database Settings ---------- */}
                        <div className="bg-white rounded-lg border border-gray-200 shadow-sm">

                            <button
                                // onClick={() => toggleSection("database")}
                                className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition-colors duration-200 rounded-t-lg"
                            >
                                <div className="flex items-center space-x-3">
                                    <Database className="w-5 h-5 text-blue-500" />
                                    <h3 className="text-lg font-medium text-gray-900">User Management</h3>
                                </div>
                                <ChevronDown
                                    className={`w-5 h-5 text-gray-400 transform transition-transform duration-200 "rotate-180" : ""
                                        }`}
                                />
                            </button>


                            <div className="px-4 pb-4 border-t border-gray-100">
                                <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">User Name</label>
                                        <input
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                        // value={dbName}
                                        // onChange={(e: any) => setDbName(e.target.value)}
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Email</label>
                                        <input
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                        // value={dbUsername}
                                        // onChange={(e: any) => setDbUsername(e.target.value)}
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Address</label>
                                        <input
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                        // value={dbHost}
                                        // onChange={(e: any) => setDbHost(e.target.value)}
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Mobile</label>
                                        <input
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                        // value={dbPort}
                                        // onChange={(e: any) => setDbPort(e.target.value)}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Password</label>
                                        <input
                                            type="password"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                        // value={dbPassword}
                                        // onChange={(e: any) => setDbPassword(e.target.value)}
                                        />
                                    </div>
                                </div>

                                <div className="flex flex-col sm:flex-row gap-3 pt-6">
                                    <button
                                        // onClick={() => handleSave("database")}
                                        className="flex items-center justify-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-green-400 hover:text-black text-white rounded-md"
                                    >
                                        <Save className="w-4 h-4" />
                                        <span>Save</span>
                                    </button>
                                    <button
                                        // onClick={() => handleCancel("database")}
                                        className="flex items-center justify-center space-x-2 px-4 py-2 bg-white hover:bg-red-400 text-gray-700 border border-gray-300 rounded-md"
                                    >
                                        <X className="w-4 h-4" />
                                        <span>Clear all</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* ---------- Saved database Settings ---------- */}
                    <div className="bg-white rounded-xl shadow-lg">
                        <div className="px-4 sm:px-6 py-4 border-b border-gray-100">
                            <h3 className="text-lg font-semibold text-gray-900">Saved users</h3>
                        </div>

                        <div className="divide-y divide-gray-100 flex flex-col gap-4 p-4">
                            {/* Placeholder for saved settings or tickets */}

                            {/* {databaseSettingList.length === 0 && (
                                <p className="text-sm text-gray-500">No saved settings available.</p>
                            )}

                            {databaseSettingList.map((setting) => (
                                <SettingCard
                                    key={setting.id}
                                    id={setting.id}
                                    databaseName={setting.databaseName}
                                    username={setting.username}
                                    host={setting.host}
                                    port={setting.port}
                                />

                            ))} */}
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default UserManagement;