const DashboardPage = () => {
    return (
        <div className="p-8">
            <h1 className="text-2xl font-semibold mb-6">Dashboard</h1>
            <div className="grid grid-cols-4 gap-4">
                <div className="bg-gray-800 p-4 rounded-2xl">Card</div>
                <div className="bg-gray-800 p-4 rounded-2xl">Card</div>
                <div className="bg-gray-800 p-4 rounded-2xl">Card</div>
                <div className="bg-gray-800 p-4 rounded-2xl">Card</div>
            </div>
        </div>
    );
};

export default DashboardPage;