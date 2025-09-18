
function SettingCard(props: any) {
    return (
        <>
            <div
                key={props.id}
                className="p-4 sm:p-6 bg-[#E8F1FF] hover:bg-blue-50 transition-colors rounded-2xl"
            >
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                    <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-3 mb-2">
                            <span className="text-sm font-semibold text-blue-600">
                                {props.id}
                            </span>
                        </div>
                        <h4 className="text-sm font-semibold text-gray-900 mb-1">
                            Database Name :
                        </h4>

                        <h4 className="text-sm font-semibold text-gray-900 mb-1">
                            Host Name :
                        </h4>

                        <h4 className="text-sm font-semibold text-gray-900 mb-1">
                            Port Name :
                        </h4>

                        <div className="flex gap-2 justify-center">
                            <button className="flex items-center justify-center space-x-2 px-3 py-1 mt-3 bg-green-400 hover:bg-green-500 rounded-md">
                                Update
                            </button>

                            <button className="flex items-center justify-center space-x-2 px-3 py-1 mt-3 bg-red-400 hover:bg-red-500  rounded-md">
                                Delete
                            </button>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}

export default SettingCard