import { useEffect, useState } from "react";
import { Database, Mail, MessageSquare, ChevronDown, Save, X, Eye, EyeOff } from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";
import SettingCard from "../components/SettingCard";

const BASE_URL = import.meta.env.VITE_BASE_URL;

type ExpandedSections = {
    database: boolean;
    email: boolean;
    sms: boolean;
};

type ValidationErrors = {
    [key: string]: string;
};

const Setting = () => {
    const [expandedSections, setExpandedSections] = useState<ExpandedSections>({
        database: true,
        email: false,
        sms: false,
    });

    // Database Settings State
    const [dbHost, setDbHost] = useState("");
    const [dbUsername, setDbUsername] = useState("");
    const [dbPort, setDbPort] = useState("");
    const [dbPassword, setDbPassword] = useState("");
    const [dbName, setDbName] = useState("");
    const [databaseSettingList, setDatabaseSettingList] = useState<any[]>([]);

    // Email Settings State
    const [smtpHost, setSmtpHost] = useState("");
    const [smtpPort, setSmtpPort] = useState("");
    const [emailUsername, setEmailUsername] = useState("");
    const [emailPassword, setEmailPassword] = useState("");
    const [fromEmail, setFromEmail] = useState("");

    // SMS Settings State
    const [smsProvider, setSmsProvider] = useState("twilio");
    const [fromNumber, setFromNumber] = useState("");
    const [apiKey, setApiKey] = useState("");
    const [apiSecret, setApiSecret] = useState("");

    const [showPassword, setShowPassword] = useState(false);
    const [showEmailPassword, setShowEmailPassword] = useState(false);
    const [showApiSecret, setShowApiSecret] = useState(false);

    // Validation Errors
    const [dbErrors, setDbErrors] = useState<ValidationErrors>({});
    const [emailErrors, setEmailErrors] = useState<ValidationErrors>({});
    const [smsErrors, setSmsErrors] = useState<ValidationErrors>({});

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

    // Validation Functions
    const validatePassword = (password: string) => {
        if (!password) return "Password is required";
        if (password.length < 6) return "Password must be at least 6 characters";
        if (password.length > 12) return "Password must not exceed 12 characters";
        return "";
    };

    const validateEmail = (email: string): string => {
        if (!email) return "Email is required";
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) return "Invalid email format";
        return "";
    };

    const validatePort = (port: string): string => {
        if (!port) return "Port is required";
        const portNum = parseInt(port);
        if (isNaN(portNum) || portNum < 1 || portNum > 65535) return "Port must be between 1 and 65535";
        return "";
    };

    const validatePhoneNumber = (phone: string): string => {
        if (!phone) return "Phone number is required";
        const phoneRegex = /^\+?[1-9]\d{1,14}$/;
        if (!phoneRegex.test(phone)) return "Invalid phone number format (e.g., +1234567890)";
        return "";
    };

    const validateRequired = (value: string, fieldName: string): string => {
        if (!value || value.trim() === "") return `${fieldName} is required`;
        return "";
    };

    const validateDatabaseForm = (): boolean => {
        const errors: ValidationErrors = {};

        errors.dbName = validateRequired(dbName, "Database name");
        errors.dbUsername = validateRequired(dbUsername, "Username");
        errors.dbHost = validateRequired(dbHost, "Host");
        errors.dbPort = validatePort(dbPort);
        errors.dbPassword = validatePassword(dbPassword);

        setDbErrors(errors);
        return !Object.values(errors).some(error => error !== "");
    };

    const validateEmailForm = (): boolean => {
        const errors: ValidationErrors = {};

        errors.smtpHost = validateRequired(smtpHost, "SMTP Host");
        errors.smtpPort = validatePort(smtpPort);
        errors.emailUsername = validateRequired(emailUsername, "Username");
        errors.emailPassword = validatePassword(emailPassword);
        errors.fromEmail = validateEmail(fromEmail);

        setEmailErrors(errors);
        return !Object.values(errors).some(error => error !== "");
    };

    const validateSmsForm = (): boolean => {
        const errors: ValidationErrors = {};

        errors.smsProvider = validateRequired(smsProvider, "Provider");
        errors.fromNumber = validatePhoneNumber(fromNumber);
        errors.apiKey = validateRequired(apiKey, "API Key");
        errors.apiSecret = validatePassword(apiSecret);

        setSmsErrors(errors);
        return !Object.values(errors).some(error => error !== "");
    };

    const handleSave = async (section: keyof ExpandedSections) => {
        let payload: any = {};
        let isValid = false;

        if (section === "database") {
            isValid = validateDatabaseForm();
            if (!isValid) {
                toast.error("Please fill input fields !");
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
            isValid = validateEmailForm();
            if (!isValid) {
                toast.error("Please fix all validation errors");
                return;
            }
            payload = {
                smtpHost,
                smtpPort,
                username: emailUsername,
                password: emailPassword,
                fromEmail,
            };
        } else if (section === "sms") {
            isValid = validateSmsForm();
            if (!isValid) {
                toast.error("Please fix all validation errors");
                return;
            }
            payload = {
                provider: smsProvider,
                fromNumber,
                apiKey,
                apiSecret,
            };
        }

        try {
            const res = await axios.post(`${BASE_URL}/add`, payload);
            if (res.status === 200) {
                toast.success(res.data.message);
                if (section === "database") {
                    fetchSavedDatabaseSettings();
                }
                handleClear(section);
            } else {
                toast.error(res.data.message);
            }
        } catch (error: any) {
            toast.error(error?.response?.data?.message || "An error occurred");
        }
    };

    const handleClear = (section: keyof ExpandedSections) => {
        if (section === "database") {
            setDbHost("");
            setDbUsername("");
            setDbPort("");
            setDbPassword("");
            setDbName("");
            setDbErrors({});
        } else if (section === "email") {
            setSmtpHost("");
            setSmtpPort("");
            setEmailUsername("");
            setEmailPassword("");
            setFromEmail("");
            setEmailErrors({});
        } else if (section === "sms") {
            setSmsProvider("twilio");
            setFromNumber("");
            setApiKey("");
            setApiSecret("");
            setSmsErrors({});
        }
    };

    const handleBlur = (field: string, value: string, section: keyof ExpandedSections) => {
        let error = "";

        switch (field) {
            case "dbName":
                error = validateRequired(value, "Database name");
                setDbErrors(prev => ({ ...prev, [field]: error }));
                break;
            case "dbUsername":
                error = validateRequired(value, "Username");
                setDbErrors(prev => ({ ...prev, [field]: error }));
                break;
            case "dbHost":
                error = validateRequired(value, "Host");
                setDbErrors(prev => ({ ...prev, [field]: error }));
                break;
            case "dbPort":
                error = validatePort(value);
                setDbErrors(prev => ({ ...prev, [field]: error }));
                break;
            case "dbPassword":
                error = validatePassword(value);
                setDbErrors(prev => ({ ...prev, [field]: error }));
                break;
            case "smtpHost":
                error = validateRequired(value, "SMTP Host");
                setEmailErrors(prev => ({ ...prev, [field]: error }));
                break;
            case "smtpPort":
                error = validatePort(value);
                setEmailErrors(prev => ({ ...prev, [field]: error }));
                break;
            case "emailUsername":
                error = validateRequired(value, "Username");
                setEmailErrors(prev => ({ ...prev, [field]: error }));
                break;
            case "emailPassword":
                error = validatePassword(value);
                setEmailErrors(prev => ({ ...prev, [field]: error }));
                break;
            case "fromEmail":
                error = validateEmail(value);
                setEmailErrors(prev => ({ ...prev, [field]: error }));
                break;
            case "fromNumber":
                error = validatePhoneNumber(value);
                setSmsErrors(prev => ({ ...prev, [field]: error }));
                break;
            case "apiKey":
                error = validateRequired(value, "API Key");
                setSmsErrors(prev => ({ ...prev, [field]: error }));
                break;
            case "apiSecret":
                error = validatePassword(value);
                setSmsErrors(prev => ({ ...prev, [field]: error }));
                break;
        }
    };

    return (
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 bg-gray-50">
            <div className="max-w-7xl mx-auto space-y-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2 space-y-6">
                        {/* Database Settings */}
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
                                            <label className="block text-sm font-medium text-gray-700">
                                                Database Name <span className="text-red-500">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                className={`w-full px-3 py-2 border rounded-md ${dbErrors.dbName ? "border-red-500" : "border-gray-300"
                                                    }`}
                                                value={dbName}
                                                onChange={(e) => setDbName(e.target.value)}
                                                onBlur={(e) => handleBlur("dbName", e.target.value, "database")}
                                            />
                                            {dbErrors.dbName && (
                                                <p className="mt-1 text-sm text-red-500">{dbErrors.dbName}</p>
                                            )}
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">
                                                Username <span className="text-red-500">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                className={`w-full px-3 py-2 border rounded-md ${dbErrors.dbUsername ? "border-red-500" : "border-gray-300"
                                                    }`}
                                                value={dbUsername}
                                                onChange={(e) => setDbUsername(e.target.value)}
                                                onBlur={(e) => handleBlur("dbUsername", e.target.value, "database")}
                                            />
                                            {dbErrors.dbUsername && (
                                                <p className="mt-1 text-sm text-red-500">{dbErrors.dbUsername}</p>
                                            )}
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">
                                                Host <span className="text-red-500">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                className={`w-full px-3 py-2 border rounded-md ${dbErrors.dbHost ? "border-red-500" : "border-gray-300"
                                                    }`}
                                                value={dbHost}
                                                onChange={(e) => setDbHost(e.target.value)}
                                                onBlur={(e) => handleBlur("dbHost", e.target.value, "database")}
                                            />
                                            {dbErrors.dbHost && (
                                                <p className="mt-1 text-sm text-red-500">{dbErrors.dbHost}</p>
                                            )}
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">
                                                Port <span className="text-red-500">*</span>
                                            </label>
                                            <input
                                                type="number"
                                                className={`w-full px-3 py-2 border rounded-md ${dbErrors.dbPort ? "border-red-500" : "border-gray-300"
                                                    }`}
                                                value={dbPort}
                                                onChange={(e) => setDbPort(e.target.value)}
                                                onBlur={(e) => handleBlur("dbPort", e.target.value, "database")}
                                            />
                                            {dbErrors.dbPort && (
                                                <p className="mt-1 text-sm text-red-500">{dbErrors.dbPort}</p>
                                            )}
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">
                                                Password <span className="text-red-500">*</span>
                                            </label>
                                            <div className="relative mt-1">
                                                <input
                                                    type={showPassword ? "text" : "password"}
                                                    className={`w-full px-3 py-2 pr-10 border rounded-md ${dbErrors.dbPassword ? "border-red-500" : "border-gray-300"
                                                        }`}
                                                    value={dbPassword}
                                                    onChange={(e) => setDbPassword(e.target.value)}
                                                    onBlur={(e) => handleBlur("dbPassword", e.target.value, "database")}
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => setShowPassword(!showPassword)}
                                                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-gray-700 focus:outline-none"
                                                >
                                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                                </button>
                                            </div>
                                            {dbErrors.dbPassword && (
                                                <p className="mt-1 text-sm text-red-500">{dbErrors.dbPassword}</p>
                                            )}
                                        </div>
                                    </div>

                                    <div className="flex flex-col sm:flex-row gap-3 pt-6">
                                        <button
                                            onClick={() => handleSave("database")}
                                            className="flex items-center justify-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-green-400 hover:text-black text-white rounded-md transition-colors"
                                        >
                                            <Save className="w-4 h-4" />
                                            <span>Save</span>
                                        </button>
                                        <button
                                            onClick={() => handleClear("database")}
                                            className="flex items-center justify-center space-x-2 px-4 py-2 bg-white hover:bg-red-400 hover:text-white text-gray-700 border border-gray-300 rounded-md transition-colors"
                                        >
                                            <X className="w-4 h-4" />
                                            <span>Clear all</span>
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Email Settings */}
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
                                            <label className="block text-sm font-medium text-gray-700">
                                                SMTP Host <span className="text-red-500">*</span>
                                            </label>
                                            <input
                                                className={`w-full px-3 py-2 border rounded-md ${emailErrors.smtpHost ? "border-red-500" : "border-gray-300"
                                                    }`}
                                                value={smtpHost}
                                                placeholder="smtp.gmail.com"
                                                onChange={(e) => setSmtpHost(e.target.value)}
                                                onBlur={(e) => handleBlur("smtpHost", e.target.value, "email")}
                                            />
                                            {emailErrors.smtpHost && (
                                                <p className="mt-1 text-sm text-red-500">{emailErrors.smtpHost}</p>
                                            )}
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">
                                                SMTP Port <span className="text-red-500">*</span>
                                            </label>
                                            <input
                                                type="number"
                                                className={`w-full px-3 py-2 border rounded-md ${emailErrors.smtpPort ? "border-red-500" : "border-gray-300"
                                                    }`}
                                                value={smtpPort}
                                                placeholder="587"
                                                onChange={(e) => setSmtpPort(e.target.value)}
                                                onBlur={(e) => handleBlur("smtpPort", e.target.value, "email")}
                                            />
                                            {emailErrors.smtpPort && (
                                                <p className="mt-1 text-sm text-red-500">{emailErrors.smtpPort}</p>
                                            )}
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">
                                                Username <span className="text-red-500">*</span>
                                            </label>
                                            <input
                                                className={`w-full px-3 py-2 border rounded-md ${emailErrors.emailUsername ? "border-red-500" : "border-gray-300"
                                                    }`}
                                                value={emailUsername}
                                                placeholder="your-email@gmail.com"
                                                onChange={(e) => setEmailUsername(e.target.value)}
                                                onBlur={(e) => handleBlur("emailUsername", e.target.value, "email")}
                                            />
                                            {emailErrors.emailUsername && (
                                                <p className="mt-1 text-sm text-red-500">{emailErrors.emailUsername}</p>
                                            )}
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">
                                                Password <span className="text-red-500">*</span>
                                            </label>
                                            <div className="relative mt-1">
                                                <input
                                                    type={showEmailPassword ? "text" : "password"}
                                                    className={`w-full px-3 py-2 pr-10 border rounded-md ${emailErrors.emailPassword ? "border-red-500" : "border-gray-300"
                                                        }`}
                                                    value={emailPassword}
                                                    placeholder="Enter password"
                                                    onChange={(e) => setEmailPassword(e.target.value)}
                                                    onBlur={(e) => handleBlur("emailPassword", e.target.value, "email")}
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => setShowEmailPassword(!showEmailPassword)}
                                                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-gray-700 focus:outline-none"
                                                >
                                                    {showEmailPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                                </button>
                                            </div>
                                            {emailErrors.emailPassword && (
                                                <p className="mt-1 text-sm text-red-500">{emailErrors.emailPassword}</p>
                                            )}
                                        </div>
                                    </div>

                                    <div className="mt-4">
                                        <label className="block text-sm font-medium text-gray-700">
                                            From Email <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="email"
                                            className={`w-full px-3 py-2 border rounded-md ${emailErrors.fromEmail ? "border-red-500" : "border-gray-300"
                                                }`}
                                            value={fromEmail}
                                            placeholder="noreply@myapp.com"
                                            onChange={(e) => setFromEmail(e.target.value)}
                                            onBlur={(e) => handleBlur("fromEmail", e.target.value, "email")}
                                        />
                                        {emailErrors.fromEmail && (
                                            <p className="mt-1 text-sm text-red-500">{emailErrors.fromEmail}</p>
                                        )}
                                    </div>

                                    <div className="flex flex-col sm:flex-row gap-3 pt-6">
                                        <button
                                            onClick={() => handleSave("email")}
                                            className="flex items-center justify-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-green-400 hover:text-black text-white rounded-md transition-colors"
                                        >
                                            <Save className="w-4 h-4" />
                                            <span>Save</span>
                                        </button>
                                        <button
                                            onClick={() => handleClear("email")}
                                            className="flex items-center justify-center space-x-2 px-4 py-2 bg-white hover:bg-red-400 hover:text-white text-gray-700 border border-gray-300 rounded-md transition-colors"
                                        >
                                            <X className="w-4 h-4" />
                                            <span>Clear all</span>
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* SMS Settings */}
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
                                            <label className="block text-sm font-medium text-gray-700">Provider <span className="text-red-500">*</span></label>
                                            <select
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                                value={smsProvider}
                                                onChange={(e) => setSmsProvider(e.target.value)}
                                            >
                                                <option value="twilio">Twilio</option>
                                                <option value="nexmo">Nexmo</option>
                                                <option value="aws-sns">AWS SNS</option>
                                            </select>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">
                                                From Number <span className="text-red-500">*</span>
                                            </label>
                                            <input
                                                className={`w-full px-3 py-2 border rounded-md ${smsErrors.fromNumber ? "border-red-500" : "border-gray-300"
                                                    }`}
                                                value={fromNumber}
                                                placeholder="+1234567890"
                                                onChange={(e) => setFromNumber(e.target.value)}
                                                onBlur={(e) => handleBlur("fromNumber", e.target.value, "sms")}
                                            />
                                            {smsErrors.fromNumber && (
                                                <p className="mt-1 text-sm text-red-500">{smsErrors.fromNumber}</p>
                                            )}
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">
                                                API Key <span className="text-red-500">*</span>
                                            </label>
                                            <input
                                                className={`w-full px-3 py-2 border rounded-md ${smsErrors.apiKey ? "border-red-500" : "border-gray-300"
                                                    }`}
                                                value={apiKey}
                                                placeholder="Enter API key"
                                                onChange={(e) => setApiKey(e.target.value)}
                                                onBlur={(e) => handleBlur("apiKey", e.target.value, "sms")}
                                            />
                                            {smsErrors.apiKey && (
                                                <p className="mt-1 text-sm text-red-500">{smsErrors.apiKey}</p>
                                            )}
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">
                                                API Secret <span className="text-red-500">*</span>
                                            </label>
                                            <div className="relative mt-1">
                                                <input
                                                    type={showApiSecret ? "text" : "password"}
                                                    className={`w-full px-3 py-2 pr-10 border rounded-md ${smsErrors.apiSecret ? "border-red-500" : "border-gray-300"
                                                        }`}
                                                    value={apiSecret}
                                                    placeholder="********"
                                                    onChange={(e) => setApiSecret(e.target.value)}
                                                    onBlur={(e) => handleBlur("apiSecret", e.target.value, "sms")}
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => setShowApiSecret(!showApiSecret)}
                                                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-gray-700 focus:outline-none"
                                                >
                                                    {showApiSecret ? <EyeOff size={18} /> : <Eye size={18} />}
                                                </button>
                                            </div>
                                            {smsErrors.apiSecret && (
                                                <p className="mt-1 text-sm text-red-500">{smsErrors.apiSecret}</p>
                                            )}
                                        </div>
                                    </div>

                                    <div className="flex flex-col sm:flex-row gap-3 pt-6">
                                        <button
                                            onClick={() => handleSave("sms")}
                                            className="flex items-center justify-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-green-400 hover:text-black text-white rounded-md transition-colors"
                                        >
                                            <Save className="w-4 h-4" />
                                            <span>Save</span>
                                        </button>
                                        <button
                                            onClick={() => handleClear("sms")}
                                            className="flex items-center justify-center space-x-2 px-4 py-2 bg-white hover:bg-red-400 hover:text-white text-gray-700 border border-gray-300 rounded-md transition-colors"
                                        >
                                            <X className="w-4 h-4" />
                                            <span>Clear all</span>
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Saved Database Settings */}
                    <div className="bg-white rounded-xl shadow-lg">
                        <div className="px-4 sm:px-6 py-4 border-b border-gray-100">
                            <h3 className="text-lg font-semibold text-gray-900">Saved Settings</h3>
                        </div>

                        <div className="divide-y divide-gray-100 flex flex-col gap-4 p-4">
                            {databaseSettingList.length === 0 && (
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
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default Setting;