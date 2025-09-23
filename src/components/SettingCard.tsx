import { Database, Plug, Server, X, Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

interface SettingCardProps {
    id: number;
    databaseName: string;
    username: string;
    host: string;
    port: number;
}

function SettingCard(props: SettingCardProps) {
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const [foundedData, setFoundedData] = useState({
        id: 0,
        databaseName: "",
        username: "",
        host: "",
        port: "",
        password: "",
    });

    const [updatedDatabaseName, setUpdatedDatabaseName] = useState("");
    const [updatedUsername, setUpdatedUsername] = useState("");
    const [updatedHost, setUpdatedHost] = useState("");
    const [updatedPort, setUpdatedPort] = useState("");
    const [updatedPassword, setUpdatedPassword] = useState("");

    // 👁️‍🗨️ NEW: toggle for showing/hiding password
    const [showPassword, setShowPassword] = useState(false);

    // Fetch single setting and prefill form
    const findOneSetting = async (num: number) => {
        try {
            const res = await axios.get(
                `http://localhost:8080/api/database/setting/get/${num}`
            );
            const data = res.data[0];
            setFoundedData({
                id: data.id,
                databaseName: data.databaseName,
                username: data.username,
                host: data.host,
                port: data.port,
                password: data.password,
            });

            // pre-fill editable fields
            setUpdatedDatabaseName(data.databaseName);
            setUpdatedUsername(data.username);
            setUpdatedHost(data.host);
            setUpdatedPort(data.port.toString());
            setUpdatedPassword(data.password);
        } catch (err) {
            console.error(err);
            toast.error("Failed to load database setting");
        }
    };

    // Update
    const updateDatabaseSetting = async (id: number) => {
        if (
            !updatedDatabaseName ||
            !updatedUsername ||
            !updatedHost ||
            !updatedPort ||
            !updatedPassword
        ) {
            toast.error("Please fill in all required fields");
            return;
        }

        try {
            const res = await axios.put(
                "http://localhost:8080/api/database/setting/update",
                {
                    id,
                    databaseName: updatedDatabaseName,
                    username: updatedUsername,
                    host: updatedHost,
                    port: Number(updatedPort),
                    password: updatedPassword,
                }
            );
            toast.success(res.data.message || "Database setting updated");
            setShowUpdateModal(false);
        } catch (error: any) {
            toast.error("Failed to update database setting: " + error.message);
        }
    };

    // Delete
    const deleteDatabaseSetting = async (id: number) => {
        try {
            await axios.delete(
                `http://localhost:8080/api/database/setting/remove/${id}`
            );
            toast.success("Database setting deleted successfully");
        } catch (error: any) {
            toast.error("Failed to delete database setting: " + error.message);
        }
        setShowDeleteModal(false);
    };

    return (
        <>
            <div className="p-4 sm:p-6 bg-[#E8F1FF] hover:bg-blue-50 transition-colors rounded-2xl">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                    <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-3 mb-2">
                            <span className="text-sm font-semibold text-blue-600">
                                {"DB0" + props.id}
                            </span>
                        </div>

                        <div className="space-y-2 mb-4">
                            <div className="flex items-center gap-2">
                                <Database className="w-4 h-4 text-gray-600" />
                                <h4 className="text-sm font-semibold text-gray-900">
                                    Database Name:{" "}
                                    <span className="font-normal text-gray-700">
                                        {props.databaseName || "Not set"}
                                    </span>
                                </h4>
                            </div>

                            <div className="flex items-center gap-2">
                                <Server className="w-4 h-4 text-gray-600" />
                                <h4 className="text-sm font-semibold text-gray-900">
                                    Host Name:{" "}
                                    <span className="font-normal text-gray-700">
                                        {props.host || "Not set"}
                                    </span>
                                </h4>
                            </div>

                            <div className="flex items-center gap-2">
                                <Plug className="w-4 h-4 text-gray-600" />
                                <h4 className="text-sm font-semibold text-gray-900">
                                    Port Number:{" "}
                                    <span className="font-normal text-gray-700">
                                        {props.port || "Not set"}
                                    </span>
                                </h4>
                            </div>
                        </div>

                        <div className="flex gap-2 justify-center">
                            <button
                                onClick={() => {
                                    setShowUpdateModal(true);
                                    findOneSetting(props.id);
                                }}
                                className="flex items-center justify-center space-x-2 px-4 py-2 bg-green-400 hover:bg-green-500 text-black rounded-md transition-colors"
                            >
                                Update
                            </button>

                            <button
                                onClick={() => setShowDeleteModal(true)}
                                className="flex items-center justify-center space-x-2 px-4 py-2 bg-red-400 hover:bg-red-500 text-black rounded-md transition-colors"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* ---------- Update Modal ---------- */}
            {showUpdateModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
                        <div className="flex items-center justify-between p-6 border-b">
                            <h2 className="text-lg font-semibold text-gray-900">
                                Update Database Settings
                            </h2>
                            <button
                                onClick={() => setShowUpdateModal(false)}
                                className="text-gray-400 hover:text-gray-600 transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="p-6 space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Database Name<span className="text-red-500"> *</span>
                                </label>
                                <input
                                    type="text"
                                    value={updatedDatabaseName}
                                    onChange={(e) => setUpdatedDatabaseName(e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Username<span className="text-red-500"> *</span>
                                </label>
                                <input
                                    type="text"
                                    value={updatedUsername}
                                    onChange={(e) => setUpdatedUsername(e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Host Name<span className="text-red-500"> *</span>
                                </label>
                                <input
                                    type="text"
                                    value={updatedHost}
                                    onChange={(e) => setUpdatedHost(e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Port Number<span className="text-red-500"> *</span>
                                </label>
                                <input
                                    type="number"
                                    value={updatedPort}
                                    onChange={(e) => setUpdatedPort(e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>

                            {/* ✅ PASSWORD FIELD WITH SHOW/HIDE TOGGLE */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Password<span className="text-red-500"> *</span>
                                </label>
                                <div className="relative">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        value={updatedPassword}
                                        onChange={(e) => setUpdatedPassword(e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-10"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword((prev) => !prev)}
                                        className="absolute inset-y-0 right-2 flex items-center text-gray-500 hover:text-gray-700"
                                    >
                                        {showPassword ? (
                                            <EyeOff className="w-5 h-5" />
                                        ) : (
                                            <Eye className="w-5 h-5" />
                                        )}
                                    </button>
                                </div>
                            </div>

                            <div className="flex gap-3 mt-6">
                                <button
                                    onClick={() => setShowUpdateModal(false)}
                                    className="flex-1 px-4 py-2 text-gray-700 bg-gray-200 hover:bg-gray-300 rounded-md transition-colors"
                                >
                                    Cancel
                                </button>

                                <button
                                    onClick={() => updateDatabaseSetting(foundedData.id)}
                                    className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors"
                                >
                                    Update Settings
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* ---------- Delete Confirmation Modal ---------- */}
            {showDeleteModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg shadow-xl w-full max-w-sm">
                        <div className="p-6">
                            <div className="flex items-center justify-center w-12 h-12 mx-auto mb-4 bg-red-100 rounded-full">
                                <X className="w-6 h-6 text-red-600" />
                            </div>

                            <h2 className="text-lg font-semibold text-gray-900 text-center mb-2">
                                Delete Database Setting
                            </h2>

                            <p className="text-gray-600 text-center mb-6">
                                Are you sure you want to delete this database setting? This action cannot be undone.
                            </p>

                            <div className="flex gap-3">
                                <button
                                    onClick={() => setShowDeleteModal(false)}
                                    className="flex-1 px-4 py-2 text-gray-700 bg-gray-200 hover:bg-gray-300 rounded-md transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={() => deleteDatabaseSetting(props.id)}
                                    className="flex-1 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md transition-colors"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default SettingCard;
