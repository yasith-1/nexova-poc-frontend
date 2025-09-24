import { useEffect, useState } from "react";
import { Database, Mail, MessageSquare, ChevronDown, Save, X, Eye, EyeOff } from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";
import SettingCard from "../components/SettingCard";

// base url from .env file
const BASE_URL = import.meta.env.VITE_BASE_URL;


// Types
type ExpandedSections = {
    database: boolean;
    email: boolean;
    sms: boolean;
};

const Setting = () => {
    const [expandedSections, setExpandedSections] = useState<ExpandedSections>({
        database: true,
        email: false,
        sms: false,
    });

    // ---- Database Settings State --------------
    const [dbHost, setDbHost] = useState("");
    const [dbUsername, setDbUsername] = useState("");
    const [dbPort, setDbPort] = useState("");
    const [dbPassword, setDbPassword] = useState("");
    const [dbName, setDbName] = useState("");

    const [databaseSettingList, setDatabaseSettingList] = useState<any[]>([]);

    // ---- Email Settings State --------------
    const [smtpHost, setSmtpHost] = useState("smtp.gmail.com");
    const [smtpPort, setSmtpPort] = useState("587");
    const [emailUsername, setEmailUsername] = useState("your-email@gmail.com");
    const [emailPassword, setEmailPassword] = useState("");
    const [fromEmail, setFromEmail] = useState("noreply@myapp.com");

    // ---- SMS Settings State ---------------
    const [smsProvider, setSmsProvider] = useState("twilio");
    const [fromNumber, setFromNumber] = useState("+1234567890");
    const [apiKey, setApiKey] = useState("");
    const [apiSecret, setApiSecret] = useState("");

    const [showPassword, setShowPassword] = useState(false);

    const fetchSavedDatabaseSettings = async () => {
        try {
            const res = await axios.get(`${BASE_URL}/get-all`);
            setDatabaseSettingList(res.data);
        } catch (error) {
            console.error("Error fetching database settings:", error);
        }
    };

    useEffect(() => {
        fetchSavedDatabaseSettings();
    }, []);


    const toggleSection = (section: keyof ExpandedSections) => {
        setExpandedSections((prev) => ({
            ...prev,
            [section]: !prev[section],
        }));
    };

    const handleSave = async (section: keyof ExpandedSections) => {

        let payload: any = {};

        if (section === "database") {

            if (!dbName || !dbUsername || !dbHost || !dbPort || !dbPassword) {
                // alert("Please fill in all required fields");
                toast.error("Please fill in all required fields");
                return;
            }

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

        // axioss POST (save) database settings -------------------------------------------------------

        try {
            const res = await axios.post(`${BASE_URL}/add`, payload);
            if (res.status == 200) {
                toast.success(res.data.message);
                fetchSavedDatabaseSettings();
                handleClear("database");
            } else {
                toast.error(res.data.message);
            }
        } catch (error: any) {
            // alert(error ?.response?.data?.message || "An error occurred");
            toast.error(error?.response?.data?.message || "An error occurred");
        }

        //------------------------------------------------------------------------------------------
    };

    const handleClear = (section: keyof ExpandedSections) => {
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
                                            <label className="block text-sm font-medium text-gray-700">Database Name <span className="text-red-500">*</span></label>
                                            <input
                                                type="text"
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                                value={dbName}
                                                onChange={(e: any) => setDbName(e.target.value)}
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">Username <span className="text-red-500">*</span></label>
                                            <input
                                                type="text"
                                                required
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                                value={dbUsername}
                                                onChange={(e: any) => setDbUsername(e.target.value)}
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">Host <span className="text-red-500">*</span></label>
                                            <input
                                                type="text"
                                                required
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                                value={dbHost}
                                                onChange={(e: any) => setDbHost(e.target.value)}
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">Port <span className="text-red-500">*</span></label>
                                            <input
                                                type="number"
                                                required
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                                value={dbPort}
                                                onChange={(e: any) => setDbPort(e.target.value)}
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">
                                                Password <span className="text-red-500">*</span>
                                            </label>

                                            <div className="relative mt-1">
                                                <input
                                                    type={showPassword ? "text" : "password"}
                                                    required
                                                    className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-md"
                                                    value={dbPassword}
                                                    onChange={(e: any) => setDbPassword(e.target.value)}
                                                />

                                                {/* Eye toggle button */}
                                                <button
                                                    type="button"
                                                    onClick={() => setShowPassword(!showPassword)}
                                                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-gray-700 focus:outline-none"
                                                >
                                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                                </button>
                                            </div>
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
                                            onClick={() => handleClear("database")}
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
                                            <label className="block text-sm font-medium text-gray-700">SMTP Host <span className="text-red-500">*</span></label>
                                            <input
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                                // value={smtpHost}
                                                placeholder="SMTP host"
                                                onChange={(e: any) => setSmtpHost(e.target.value)}
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">SMTP Port <span className="text-red-500">*</span></label>
                                            <input
                                                type="number"
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                                // value={smtpPort}
                                                placeholder="SMTP port"
                                                onChange={(e: any) => setSmtpPort(e.target.value)}
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">Username <span className="text-red-500">*</span></label>
                                            <input
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                                // value={emailUsername}
                                                placeholder="Email username"
                                                onChange={(e: any) => setEmailUsername(e.target.value)}
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">Password <span className="text-red-500">*</span></label>
                                            <input
                                                type="password"
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                                // value={emailPassword}
                                                placeholder="Email password"
                                                onChange={(e: any) => setEmailPassword(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <div className="mt-4">
                                        <label className="block text-sm font-medium text-gray-700">From Email <span className="text-red-500">*</span></label>
                                        <input
                                            type="email"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                            // value={fromEmail}
                                            placeholder="From email"
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
                                            onClick={() => handleClear("email")}
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
                                                // value={smsProvider}
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
                                                // value={fromNumber}
                                                placeholder="+1234567890"
                                                onChange={(e: any) => setFromNumber(e.target.value)}
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">API Key</label>
                                            <input
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                                placeholder="Api key"
                                                // value={apiKey}
                                                onChange={(e: any) => setApiKey(e.target.value)}
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">API Secret</label>
                                            <input
                                                type="password"
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                                placeholder="********"
                                                // value={apiSecret}
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
                                            onClick={() => handleClear("sms")}
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

                    {/* ---------- Saved database Settings ---------- */}
                    <div className="bg-white rounded-xl shadow-lg">
                        <div className="px-4 sm:px-6 py-4 border-b border-gray-100">
                            <h3 className="text-lg font-semibold text-gray-900">Saved Settings</h3>
                        </div>

                        <div className="divide-y divide-gray-100 flex flex-col gap-4 p-4">
                            {/* Placeholder for saved settings or tickets */}

                            {databaseSettingList.length === 0 && (
                                <p className="text-sm text-gray-500">No saved settings available.</p>
                            )}

                            {databaseSettingList.map((setting, index) => (
                                <SettingCard
                                    key={setting.id}
                                    id={setting.id}
                                    databaseName={setting.databaseName}
                                    username={setting.username}
                                    host={setting.host}
                                    port={setting.port}
                                />

                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default Setting;
