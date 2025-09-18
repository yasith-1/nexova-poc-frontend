import { useState } from "react";
import {
    Database,
    Mail,
    MessageSquare,
    ChevronDown,
    Save,
    X,
    User,
    Calendar,
    Clock,
} from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";

// Types
type ExpandedSections = {
    database: boolean;
    email: boolean;
    sms: boolean;
};



const Dashboard = () => {
    const [expandedSections, setExpandedSections] = useState<ExpandedSections>({
        database: true,
        email: false,
        sms: false,
    });

    // ---- Database Settings State ----
    const [dbHost, setDbHost] = useState("localhost");
    const [dbUsername, setDbUsername] = useState("admin");
    const [dbPort, setDbPort] = useState("5432");
    const [dbPassword, setDbPassword] = useState("");
    const [dbName, setDbName] = useState("myapp_db");

    // ---- Email Settings State ----
    const [smtpHost, setSmtpHost] = useState("smtp.gmail.com");
    const [smtpPort, setSmtpPort] = useState("587");
    const [emailUsername, setEmailUsername] = useState("your-email@gmail.com");
    const [emailPassword, setEmailPassword] = useState("");
    const [fromEmail, setFromEmail] = useState("noreply@myapp.com");

    // ---- SMS Settings State ----
    const [smsProvider, setSmsProvider] = useState("twilio");
    const [fromNumber, setFromNumber] = useState("+1234567890");
    const [apiKey, setApiKey] = useState("");
    const [apiSecret, setApiSecret] = useState("");

    const toggleSection = (section: keyof ExpandedSections) => {
        setExpandedSections((prev) => ({
            ...prev,
            [section]: !prev[section],
        }));
    };

    const handleSave = async (section: keyof ExpandedSections) => {
        let payload: any = {};
        if (section === "database") {
            payload = {
                databaseName: dbName,
                username: dbUsername,
                host: dbHost,
                port: dbPort,
                password: dbPassword
            };
        } else if (section === "email") {
            payload = {
                smtpHost,
                smtpPort,
                username: emailUsername,
                password: emailPassword,
                fromEmail,
            };
        } else if (section === "sms") {
            payload = {
                provider: smsProvider,
                fromNumber,
                apiKey,
                apiSecret,
            };
        }

        try {
            const res = await axios.post('http://localhost:8080/api/database/setting/add', payload);
            // console.log(`${section} settings saved`, res.data.message);
            // alert(res.data.message);
            if (res.status == 200) {
                toast.success(res.data.message);
            } else {
                toast.error(res.data.message);
            }
        } catch (error: any) {
            // alert(error ?.response?.data?.message || "An error occurred");
            toast.error(error?.response?.data?.message || "An error occurred");
        }
    };

    const handleCancel = (section: keyof ExpandedSections) => {
        if (section === "database") {
            setDbHost("");
            setDbUsername("");
            setDbPort("");
            setDbPassword("");
            setDbName("");
        } else if (section === "email") {
            setSmtpHost("");
            setSmtpPort("");
            setEmailUsername("");
            setEmailPassword("");
            setFromEmail("");
        } else if (section === "sms") {
            setSmsProvider("");
            setFromNumber("");
            setApiKey("");
            setApiSecret("");
        }
    };

    return (
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 bg-gray-50">
            <div className="max-w-7xl mx-auto space-y-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                    {/* Settings (2/3 on desktop) */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* ---------- Database Settings ---------- */}
                        <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
                            <button
                                onClick={() => toggleSection("database")}
                                className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition-colors duration-200 rounded-t-lg"
                            >
                                <div className="flex items-center space-x-3">
                                    <Database className="w-5 h-5 text-blue-500" />
                                    <h3 className="text-lg font-medium text-gray-900">Database Settings</h3>
                                </div>
                                <ChevronDown
                                    className={`w-5 h-5 text-gray-400 transform transition-transform duration-200 ${expandedSections.database ? "rotate-180" : ""
                                        }`}
                                />
                            </button>

                            {expandedSections.database && (
                                <div className="px-4 pb-4 border-t border-gray-100">
                                    <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">Database Name</label>
                                            <input
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                                value={dbName}
                                                onChange={(e: any) => setDbName(e.target.value)}
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">Username</label>
                                            <input
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                                value={dbUsername}
                                                onChange={(e: any) => setDbUsername(e.target.value)}
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">Host</label>
                                            <input
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                                value={dbHost}
                                                onChange={(e: any) => setDbHost(e.target.value)}
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">Port</label>
                                            <input
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                                value={dbPort}
                                                onChange={(e: any) => setDbPort(e.target.value)}
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">Password</label>
                                            <input
                                                type="password"
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                                value={dbPassword}
                                                onChange={(e: any) => setDbPassword(e.target.value)}
                                            />
                                        </div>
                                    </div>

                                    <div className="flex flex-col sm:flex-row gap-3 pt-6">
                                        <button
                                            onClick={() => handleSave("database")}
                                            className="flex items-center justify-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-green-400 hover:text-black text-white rounded-md"
                                        >
                                            <Save className="w-4 h-4" />
                                            <span>Save</span>
                                        </button>
                                        <button
                                            onClick={() => handleCancel("database")}
                                            className="flex items-center justify-center space-x-2 px-4 py-2 bg-white hover:bg-red-400 text-gray-700 border border-gray-300 rounded-md"
                                        >
                                            <X className="w-4 h-4" />
                                            <span>Clear all</span>
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* ---------- Email Settings ---------- */}
                        <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
                            <button
                                onClick={() => toggleSection("email")}
                                className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition-colors duration-200 rounded-t-lg"
                            >
                                <div className="flex items-center space-x-3">
                                    <Mail className="w-5 h-5 text-blue-500" />
                                    <h3 className="text-lg font-medium text-gray-900">Email Settings</h3>
                                </div>
                                <ChevronDown
                                    className={`w-5 h-5 text-gray-400 transform transition-transform duration-200 ${expandedSections.email ? "rotate-180" : ""
                                        }`}
                                />
                            </button>

                            {expandedSections.email && (
                                <div className="px-4 pb-4 border-t border-gray-100">
                                    <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">SMTP Host</label>
                                            <input
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                                value={smtpHost}
                                                onChange={(e: any) => setSmtpHost(e.target.value)}
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">SMTP Port</label>
                                            <input
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                                value={smtpPort}
                                                onChange={(e: any) => setSmtpPort(e.target.value)}
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">Username</label>
                                            <input
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                                value={emailUsername}
                                                onChange={(e: any) => setEmailUsername(e.target.value)}
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">Password</label>
                                            <input
                                                type="password"
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                                value={emailPassword}
                                                onChange={(e: any) => setEmailPassword(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <div className="mt-4">
                                        <label className="block text-sm font-medium text-gray-700">From Email</label>
                                        <input
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                            value={fromEmail}
                                            onChange={(e: any) => setFromEmail(e.target.value)}
                                        />
                                    </div>
                                    <div className="flex flex-col sm:flex-row gap-3 pt-6">
                                        <button
                                            onClick={() => handleSave("email")}
                                            className="flex items-center justify-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-green-400 hover:text-black text-white rounded-md"
                                        >
                                            <Save className="w-4 h-4" />
                                            <span>Save</span>
                                        </button>
                                        <button
                                            onClick={() => handleCancel("email")}
                                            className="flex items-center justify-center space-x-2 px-4 py-2 bg-white hover:bg-red-400 text-gray-700 border border-gray-300 rounded-md"
                                        >
                                            <X className="w-4 h-4" />
                                            <span>Clear all</span>
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* ---------- SMS Settings ---------- */}
                        <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
                            <button
                                onClick={() => toggleSection("sms")}
                                className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition-colors duration-200 rounded-t-lg"
                            >
                                <div className="flex items-center space-x-3">
                                    <MessageSquare className="w-5 h-5 text-blue-500" />
                                    <h3 className="text-lg font-medium text-gray-900">SMS Settings</h3>
                                </div>
                                <ChevronDown
                                    className={`w-5 h-5 text-gray-400 transform transition-transform duration-200 ${expandedSections.sms ? "rotate-180" : ""
                                        }`}
                                />
                            </button>

                            {expandedSections.sms && (
                                <div className="px-4 pb-4 border-t border-gray-100">
                                    <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">Provider</label>
                                            <select
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                                value={smsProvider}
                                                onChange={(e: any) => setSmsProvider(e.target.value)}
                                            >
                                                <option value="twilio">Twilio</option>
                                                <option value="nexmo">Nexmo</option>
                                                <option value="aws-sns">AWS SNS</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">From Number</label>
                                            <input
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                                value={fromNumber}
                                                onChange={(e: any) => setFromNumber(e.target.value)}
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">API Key</label>
                                            <input
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                                value={apiKey}
                                                onChange={(e: any) => setApiKey(e.target.value)}
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">API Secret</label>
                                            <input
                                                type="password"
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                                value={apiSecret}
                                                onChange={(e: any) => setApiSecret(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <div className="flex flex-col sm:flex-row gap-3 pt-6">
                                        <button
                                            onClick={() => handleSave("sms")}
                                            className="flex items-center justify-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-green-400 hover:text-black text-white rounded-md"
                                        >
                                            <Save className="w-4 h-4" />
                                            <span>Save</span>
                                        </button>
                                        <button
                                            onClick={() => handleCancel("sms")}
                                            className="flex items-center justify-center space-x-2 px-4 py-2 bg-white hover:bg-red-400 text-gray-700 border border-gray-300 rounded-md"
                                        >
                                            <X className="w-4 h-4" />
                                            <span>Clear all</span>
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* ---------- Saved Settings / Tickets ---------- */}
                    <div className="bg-white rounded-xl shadow-lg">
                        <div className="px-4 sm:px-6 py-4 border-b border-gray-100">
                            <h3 className="text-lg font-semibold text-gray-900">Saved Settings</h3>
                        </div>

                        <div className="divide-y divide-gray-100 flex flex-col gap-4 p-4">
                            {/* Placeholder for saved settings or tickets */}
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default Dashboard;
