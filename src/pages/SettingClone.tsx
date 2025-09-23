import { useEffect, useState } from "react";
import { Database, Mail, MessageSquare, ChevronDown, Save, X, Tag, Eye, EyeOff, Edit2, Trash2, Check } from "lucide-react";
import axios from "axios";

// Types
type ExpandedSections = {
    database: boolean;
    email: boolean;
    sms: boolean;
};

type DatabaseSetting = {
    id: string;
    databaseName: string;
    username: string;
    host: string;
    port: string;
    password?: string;
};

// Mock SettingCard component
const SettingCard = ({
    id,
    databaseName,
    username,
    host,
    port,
    onEdit,
    onDelete
}: DatabaseSetting & {
    onEdit: () => void;
    onDelete: () => void;
}) => (
    <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors">
        <div className="flex justify-between items-start">
            <div className="flex-1">
                <h4 className="font-medium text-gray-900 mb-1">{databaseName}</h4>
                <div className="space-y-1 text-sm text-gray-600">
                    <p className="flex flex-col items-center">
                        <span className="font-medium w-12">Host: {host}</span>
                    </p>
                    <p className="flex flex-row items-center">
                        <span className="font-medium w-12">Port: {port}</span>
                    </p>
                    <p className="flex items-center">
                        <span className="font-medium w-12">Username: {username}</span>
                    </p>
                </div>
            </div>
            <div className="flex items-center space-x-2 ml-4">
                <button
                    onClick={onEdit}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
                    title="Edit settings"
                >
                    <Edit2 className="w-4 h-4" />
                </button>
                <button
                    onClick={onDelete}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-md transition-colors"
                    title="Delete settings"
                >
                    <Trash2 className="w-4 h-4" />
                </button>
            </div>
        </div>
    </div>
);

// Input field with tags component
const TaggedInput = ({
    label,
    value,
    onChange,
    type = "text",
    placeholder = "",
    fromTag = "",
    toTag = "",
    required = false,
    isPassword = false,
    showPassword = false,
    onTogglePassword,
    isNumber = false
}: {
    label: string;
    value: string;
    onChange: (value: string) => void;
    type?: string;
    placeholder?: string;
    fromTag?: string;
    toTag?: string;
    required?: boolean;
    isPassword?: boolean;
    showPassword?: boolean;
    onTogglePassword?: () => void;
    isNumber?: boolean;
}) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.target.value;

        if (isNumber) {
            // Only allow numbers for port fields
            if (inputValue === '' || /^\d+$/.test(inputValue)) {
                onChange(inputValue);
            }
        } else {
            onChange(inputValue);
        }
    };

    return (
        <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
                {label}
                {required && <span className="text-red-500 ml-1">*</span>}
                {isNumber && <span className="text-blue-500 ml-1">(numbers only)</span>}
            </label>
            <div className="relative">
                <div className="relative mt-2">
                    <input
                        type={isPassword ? (showPassword ? "text" : "password") : type}
                        className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                        value={value}
                        onChange={handleChange}
                        placeholder={placeholder}
                        required={required}
                    />
                    {isPassword && (
                        <button
                            type="button"
                            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                            onClick={onTogglePassword}
                        >
                            {showPassword ? (
                                <EyeOff className="w-4 h-4" />
                            ) : (
                                <Eye className="w-4 h-4" />
                            )}
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

const SettingClone = () => {
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
    const [databaseSettingList, setDatabaseSettingList] = useState<DatabaseSetting[]>([]);

    // ---- Email Settings State --------------
    const [smtpHost, setSmtpHost] = useState("");
    const [smtpPort, setSmtpPort] = useState("");
    const [emailUsername, setEmailUsername] = useState("");
    const [emailPassword, setEmailPassword] = useState("");
    const [fromEmail, setFromEmail] = useState("");
    const [toEmail, setToEmail] = useState("");

    // ---- SMS Settings State ---------------
    const [smsProvider, setSmsProvider] = useState("twilio");
    const [fromNumber, setFromNumber] = useState("");
    const [toNumber, setToNumber] = useState("");
    const [apiKey, setApiKey] = useState("");
    const [apiSecret, setApiSecret] = useState("");

    // Password visibility states
    const [showDbPassword, setShowDbPassword] = useState(false);
    const [showEmailPassword, setShowEmailPassword] = useState(false);
    const [showApiSecret, setShowApiSecret] = useState(false);

    // Edit mode state
    const [isEditing, setIsEditing] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);

    // Mock data for demonstration
    useEffect(() => {
        // Simulating API call
        axios.get("http://localhost:8080/api/database/setting/get-all")
            .then(res => setDatabaseSettingList(res.data));
        // setDatabaseSettingList(mockData);
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
            // Validate required fields
            if (!dbName || !dbUsername || !dbHost || !dbPort || !dbPassword) {
                alert("Please fill in all required fields");
                return;
            }

            payload = {
                databaseName: dbName,
                username: dbUsername,
                host: dbHost,
                port: parseInt(dbPort), // Convert to number
                password: dbPassword
            };
        } else if (section === "email") {
            // Validate required fields
            if (!smtpHost || !smtpPort || !emailUsername || !emailPassword || !fromEmail) {
                alert("Please fill in all required fields");
                return;
            }

            payload = {
                smtpHost,
                smtpPort: parseInt(smtpPort), // Convert to number
                username: emailUsername,
                password: emailPassword,
                fromEmail,
                toEmail,
            };
        } else if (section === "sms") {
            // Validate required fields
            if (!smsProvider || !fromNumber || !apiKey || !apiSecret) {
                alert("Please fill in all required fields");
                return;
            }

            payload = {
                provider: smsProvider,
                fromNumber,
                toNumber,
                apiKey,
                apiSecret,
            };
        }

        // Simulate API call
        try {
            console.log(`${isEditing ? 'Updating' : 'Saving'} ${section} settings:`, payload);

            if (section === "database") {
                if (isEditing && editingId) {
                    // Update existing setting
                    setDatabaseSettingList(prev =>
                        prev.map(setting =>
                            setting.id === editingId
                                ? { ...setting, ...payload, id: editingId }
                                : setting
                        )
                    );
                    alert("Database settings updated successfully!");
                    setIsEditing(false);
                    setEditingId(null);
                } else {
                    // Add new setting
                    const newSetting: DatabaseSetting = {
                        id: Date.now().toString(),
                        databaseName: dbName,
                        username: dbUsername,
                        host: dbHost,
                        port: dbPort
                    };
                    setDatabaseSettingList(prev => [...prev, newSetting]);
                    alert("Database settings saved successfully!");
                }
            } else {
                // For email and SMS, just show success message
                alert(`${section.charAt(0).toUpperCase() + section.slice(1)} settings saved successfully!`);
            }

            // Clear all fields after successful save
            handleClear(section);

        } catch (error: any) {
            alert("An error occurred while saving settings");
        }
    };

    const handleClear = (section: keyof ExpandedSections) => {
        if (section === "database") {
            setDbHost("");
            setDbUsername("");
            setDbPort("");
            setDbPassword("");
            setDbName("");
            setShowDbPassword(false); // Reset password visibility
            setIsEditing(false); // Exit edit mode
            setEditingId(null);
        } else if (section === "email") {
            setSmtpHost("");
            setSmtpPort("");
            setEmailUsername("");
            setEmailPassword("");
            setFromEmail("");
            setToEmail("");
            setShowEmailPassword(false); // Reset password visibility
        } else if (section === "sms") {
            setSmsProvider("twilio");
            setFromNumber("");
            setToNumber("");
            setApiKey("");
            setApiSecret("");
            setShowApiSecret(false); // Reset password visibility
        }
    };

    const handleEdit = (setting: DatabaseSetting) => {
        // Fill form with existing data
        setDbName(setting.databaseName);
        setDbUsername(setting.username);
        setDbHost(setting.host);
        setDbPort(setting.port);
        setDbPassword(""); // Don't populate password for security

        // Set edit mode
        setIsEditing(true);
        setEditingId(setting.id);

        // Expand database section
        setExpandedSections(prev => ({ ...prev, database: true }));

        // Scroll to form
        setTimeout(() => {
            const databaseSection = document.querySelector('[data-section="database"]');
            if (databaseSection) {
                databaseSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }, 100);
    };

    const handleDelete = (settingId: string) => {
        if (window.confirm("Are you sure you want to delete this database setting? This action cannot be undone.")) {
            setDatabaseSettingList(prev => prev.filter(setting => setting.id !== settingId));

            // If we're editing the deleted item, clear the form
            if (editingId === settingId) {
                handleClear("database");
            }

            alert("Database setting deleted successfully!");
        }
    };

    const handleCancelEdit = () => {
        setIsEditing(false);
        setEditingId(null);
        handleClear("database");
    };

    return (
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 bg-gray-50 min-h-screen">
            <div className="max-w-7xl mx-auto space-y-8">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">Settings Configuration</h1>
                    <p className="text-gray-600 mt-2">Configure your database, email, and SMS settings</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Settings (2/3 on desktop) */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* ---------- Database Settings ---------- */}
                        <div className="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow" data-section="database">
                            <button
                                onClick={() => toggleSection("database")}
                                className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition-colors duration-200 rounded-t-lg"
                            >
                                <div className="flex items-center space-x-3">
                                    <Database className="w-5 h-5 text-blue-500" />
                                    <h3 className="text-lg font-medium text-gray-900">
                                        Database Settings
                                        {isEditing && (
                                            <span className="ml-2 text-sm bg-orange-100 text-orange-800 px-2 py-1 rounded-full">
                                                Editing
                                            </span>
                                        )}
                                    </h3>
                                </div>
                                <ChevronDown
                                    className={`w-5 h-5 text-gray-400 transform transition-transform duration-200 ${expandedSections.database ? "rotate-180" : ""
                                        }`}
                                />
                            </button>

                            {expandedSections.database && (
                                <div className="px-4 pb-4 border-t border-gray-100">
                                    <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 gap-6">
                                        <TaggedInput
                                            label="Database Name"
                                            value={dbName}
                                            onChange={setDbName}
                                            placeholder="Enter database name"
                                            fromTag="Application"
                                            toTag="Database Server"
                                            required
                                        />

                                        <TaggedInput
                                            label="Username"
                                            value={dbUsername}
                                            onChange={setDbUsername}
                                            placeholder="Database username"
                                            fromTag="Client"
                                            toTag="Database"
                                            required
                                        />

                                        <TaggedInput
                                            label="Host"
                                            value={dbHost}
                                            onChange={setDbHost}
                                            placeholder="localhost or IP address"
                                            fromTag="App Server"
                                            toTag="DB Server"
                                            required
                                        />

                                        <TaggedInput
                                            label="Port"
                                            value={dbPort}
                                            onChange={setDbPort}
                                            placeholder="5432"
                                            fromTag="App"
                                            toTag="DB Port"
                                            required
                                            isNumber={true}
                                        />

                                        <div className="sm:col-span-2">
                                            <TaggedInput
                                                label="Password"
                                                value={dbPassword}
                                                onChange={setDbPassword}
                                                placeholder="Database password"
                                                fromTag="Encrypted"
                                                toTag="Secure Store"
                                                required
                                                isPassword={true}
                                                showPassword={showDbPassword}
                                                onTogglePassword={() => setShowDbPassword(!showDbPassword)}
                                            />
                                        </div>
                                    </div>

                                    <div className="flex flex-col sm:flex-row gap-3 pt-6">
                                        <button
                                            onClick={() => handleSave("database")}
                                            className="flex items-center justify-center space-x-2 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors shadow-sm"
                                        >
                                            {isEditing ? <Check className="w-4 h-4" /> : <Save className="w-4 h-4" />}
                                            <span>{isEditing ? 'Update Database Config' : 'Save Database Config'}</span>
                                        </button>

                                        {isEditing ? (
                                            <button
                                                onClick={handleCancelEdit}
                                                className="flex items-center justify-center space-x-2 px-6 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-md transition-colors"
                                            >
                                                <X className="w-4 h-4" />
                                                <span>Cancel Edit</span>
                                            </button>
                                        ) : (
                                            <button
                                                onClick={() => handleClear("database")}
                                                className="flex items-center justify-center space-x-2 px-6 py-2 bg-white hover:bg-gray-50 text-gray-700 border border-gray-300 rounded-md transition-colors"
                                            >
                                                <X className="w-4 h-4" />
                                                <span>Clear All</span>
                                            </button>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* ---------- Email Settings ---------- */}
                        <div className="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                            <button
                                onClick={() => toggleSection("email")}
                                className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition-colors duration-200 rounded-t-lg"
                            >
                                <div className="flex items-center space-x-3">
                                    <Mail className="w-5 h-5 text-green-500" />
                                    <h3 className="text-lg font-medium text-gray-900">Email Settings</h3>
                                </div>
                                <ChevronDown
                                    className={`w-5 h-5 text-gray-400 transform transition-transform duration-200 ${expandedSections.email ? "rotate-180" : ""
                                        }`}
                                />
                            </button>

                            {expandedSections.email && (
                                <div className="px-4 pb-4 border-t border-gray-100">
                                    <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 gap-6">
                                        <TaggedInput
                                            label="SMTP Host"
                                            value={smtpHost}
                                            onChange={setSmtpHost}
                                            placeholder="smtp.gmail.com"
                                            fromTag="App"
                                            toTag="SMTP Server"
                                            required
                                        />

                                        <TaggedInput
                                            label="SMTP Port"
                                            value={smtpPort}
                                            onChange={setSmtpPort}
                                            placeholder="587"
                                            fromTag="Client"
                                            toTag="SMTP Port"
                                            required
                                            isNumber={true}
                                        />

                                        <TaggedInput
                                            label="Email Username"
                                            value={emailUsername}
                                            onChange={setEmailUsername}
                                            placeholder="your-email@gmail.com"
                                            fromTag="Auth"
                                            toTag="SMTP Server"
                                            required
                                        />

                                        <TaggedInput
                                            label="Email Password"
                                            value={emailPassword}
                                            onChange={setEmailPassword}
                                            placeholder="App password"
                                            fromTag="Encrypted"
                                            toTag="SMTP Auth"
                                            required
                                            isPassword={true}
                                            showPassword={showEmailPassword}
                                            onTogglePassword={() => setShowEmailPassword(!showEmailPassword)}
                                        />

                                        <TaggedInput
                                            label="From Email"
                                            value={fromEmail}
                                            onChange={setFromEmail}
                                            placeholder="noreply@myapp.com"
                                            fromTag="System"
                                            toTag="Recipients"
                                            required
                                        />

                                        <TaggedInput
                                            label="To Email (Default)"
                                            value={toEmail}
                                            onChange={setToEmail}
                                            placeholder="admin@myapp.com"
                                            fromTag="Notifications"
                                            toTag="Admin"
                                        />
                                    </div>

                                    <div className="flex flex-col sm:flex-row gap-3 pt-6">
                                        <button
                                            onClick={() => handleSave("email")}
                                            className="flex items-center justify-center space-x-2 px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md transition-colors shadow-sm"
                                        >
                                            <Save className="w-4 h-4" />
                                            <span>Save Email Config</span>
                                        </button>
                                        <button
                                            onClick={() => handleClear("email")}
                                            className="flex items-center justify-center space-x-2 px-6 py-2 bg-white hover:bg-gray-50 text-gray-700 border border-gray-300 rounded-md transition-colors"
                                        >
                                            <X className="w-4 h-4" />
                                            <span>Clear All</span>
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* ---------- SMS Settings ---------- */}
                        <div className="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                            <button
                                onClick={() => toggleSection("sms")}
                                className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition-colors duration-200 rounded-t-lg"
                            >
                                <div className="flex items-center space-x-3">
                                    <MessageSquare className="w-5 h-5 text-purple-500" />
                                    <h3 className="text-lg font-medium text-gray-900">SMS Settings</h3>
                                </div>
                                <ChevronDown
                                    className={`w-5 h-5 text-gray-400 transform transition-transform duration-200 ${expandedSections.sms ? "rotate-180" : ""
                                        }`}
                                />
                            </button>

                            {expandedSections.sms && (
                                <div className="px-4 pb-4 border-t border-gray-100">
                                    <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="block text-sm font-medium text-gray-700">
                                                SMS Provider
                                                <span className="text-red-500 ml-1">*</span>
                                            </label>
                                            <div className="flex items-center space-x-2 mb-2">
                                                <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-blue-100 text-blue-800">
                                                    <Tag className="w-3 h-3 mr-1" />
                                                    From: Service
                                                </span>
                                                <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-green-100 text-green-800">
                                                    <Tag className="w-3 h-3 mr-1" />
                                                    To: Provider API
                                                </span>
                                            </div>
                                            <select
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors"
                                                value={smsProvider}
                                                onChange={(e) => setSmsProvider(e.target.value)}
                                            >
                                                <option value="twilio">Twilio</option>
                                                <option value="nexmo">Nexmo (Vonage)</option>
                                                <option value="aws-sns">AWS SNS</option>
                                                <option value="messagebird">MessageBird</option>
                                            </select>
                                        </div>

                                        <TaggedInput
                                            label="From Number"
                                            value={fromNumber}
                                            onChange={setFromNumber}
                                            placeholder="+1234567890"
                                            fromTag="Provider"
                                            toTag="Recipients"
                                            required
                                        />

                                        <TaggedInput
                                            label="To Number (Default)"
                                            value={toNumber}
                                            onChange={setToNumber}
                                            placeholder="+1987654321"
                                            fromTag="Notifications"
                                            toTag="Admin Phone"
                                        />

                                        <TaggedInput
                                            label="API Key"
                                            value={apiKey}
                                            onChange={setApiKey}
                                            placeholder="Your API key"
                                            fromTag="App"
                                            toTag="Provider API"
                                            required
                                        />

                                        <div className="sm:col-span-2">
                                            <TaggedInput
                                                label="API Secret"
                                                value={apiSecret}
                                                onChange={setApiSecret}
                                                placeholder="Your API secret"
                                                fromTag="Encrypted"
                                                toTag="Secure Auth"
                                                required
                                                isPassword={true}
                                                showPassword={showApiSecret}
                                                onTogglePassword={() => setShowApiSecret(!showApiSecret)}
                                            />
                                        </div>
                                    </div>

                                    <div className="flex flex-col sm:flex-row gap-3 pt-6">
                                        <button
                                            onClick={() => handleSave("sms")}
                                            className="flex items-center justify-center space-x-2 px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-md transition-colors shadow-sm"
                                        >
                                            <Save className="w-4 h-4" />
                                            <span>Save SMS Config</span>
                                        </button>
                                        <button
                                            onClick={() => handleClear("sms")}
                                            className="flex items-center justify-center space-x-2 px-6 py-2 bg-white hover:bg-gray-50 text-gray-700 border border-gray-300 rounded-md transition-colors"
                                        >
                                            <X className="w-4 h-4" />
                                            <span>Clear All</span>
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* ---------- Saved Settings ---------- */}
                    <div className="bg-white rounded-xl shadow-lg">
                        <div className="px-4 sm:px-6 py-4 border-b border-gray-100">
                            <div className="flex items-center space-x-2">
                                <Database className="w-5 h-5 text-blue-500" />
                                <h3 className="text-lg font-semibold text-gray-900">Saved Database Settings</h3>
                            </div>
                            <p className="text-sm text-gray-600 mt-1">Previously configured database connections</p>
                        </div>

                        <div className="divide-y divide-gray-100 p-4 space-y-4 max-h-96 overflow-y-auto">
                            {databaseSettingList.length === 0 ? (
                                <div className="text-center py-8">
                                    <Database className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                                    <p className="text-sm text-gray-500">No saved database settings</p>
                                    <p className="text-xs text-gray-400 mt-1">Configure and save a database to see it here</p>
                                </div>
                            ) : (
                                databaseSettingList.map((setting, index) => (
                                    <div key={setting.id} className="pt-4 first:pt-0">
                                        <SettingCard
                                            {...setting}
                                            onEdit={() => handleEdit(setting)}
                                            onDelete={() => handleDelete(setting.id)}
                                        />
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default SettingClone; 