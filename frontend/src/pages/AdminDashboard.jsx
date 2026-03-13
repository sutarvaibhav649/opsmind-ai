import React, { useEffect, useState } from "react";
import { getAdminAnalytics } from "../services/api";
import QueryChart from "../components/QueryChart";

function AdminDashboard() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadData = async () => {
            try {
                const res = await getAdminAnalytics();
                setData(res);
            } catch (err) {
                console.error("Analytics error:", err);
            } finally {
                setLoading(false);
            }
        };
        loadData();
    }, []);

    if (loading) {
        return (
            <div className="flex items-center justify-center h-full bg-[#05122b] text-gray-400 text-sm">
                Loading dashboard...
            </div>
        );
    }

    return (
        <div className="p-4 sm:p-5 md:p-6 bg-[#05122b] h-full overflow-y-auto text-white">
            {/* Header */}
            <h1 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6">OpsMind-AI</h1>

            {/* KPI CARDS — 2 col on mobile, 4 col on lg */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 mb-3 sm:mb-4">
                <div className="bg-[#122855] p-3 sm:p-4 rounded-lg">
                    <p className="text-xs sm:text-sm text-gray-400">Total Queries</p>
                    <h2 className="text-xl sm:text-2xl font-bold mt-1">
                        {data?.overview?.totalQueries || 0}
                    </h2>
                </div>
                <div className="bg-[#122855] p-3 sm:p-4 rounded-lg">
                    <p className="text-xs sm:text-sm text-gray-400">Unique Users</p>
                    <h2 className="text-xl sm:text-2xl font-bold mt-1">
                        {data?.overview?.totalUsers || 0}
                    </h2>
                </div>
                <div className="bg-[#122855] p-3 sm:p-4 rounded-lg">
                    <p className="text-xs sm:text-sm text-gray-400">Documents</p>
                    <h2 className="text-xl sm:text-2xl font-bold mt-1">
                        {data?.overview?.totalDocuments || 0}
                    </h2>
                </div>
                <div className="bg-[#122855] p-3 sm:p-4 rounded-lg">
                    <p className="text-xs sm:text-sm text-gray-400">Active Users</p>
                    <h2 className="text-xl sm:text-2xl font-bold mt-1">
                        {data?.overview?.activeUsers || 0}
                    </h2>
                </div>
            </div>

            {/* CHART + DOCUMENT USAGE — stacked on mobile, side-by-side on lg */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 mb-3">
                {/* Query Chart */}
                <div className="lg:col-span-2 bg-[#122855] p-3 sm:p-4 rounded-lg">
                    <h2 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">Query Chart</h2>
                    <QueryChart data={data?.dailyQueries || []} />
                </div>

                {/* Document Usage */}
                <div className="bg-[#122855] p-3 sm:p-4 rounded-lg">
                    <h2 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">Document Usage</h2>
                    <div className="space-y-3 sm:space-y-4">
                        {(data?.topDocuments || []).map((doc, i) => {
                            const max = data?.topDocuments?.[0]?.count || 1;
                            const percentage = (doc.count / max) * 100;
                            return (
                                <div key={i}>
                                    <div className="flex justify-between text-xs sm:text-sm text-gray-300 mb-1">
                                        <span className="truncate max-w-[60%]">{doc._id}</span>
                                        <span className="text-blue-400 shrink-0 ml-2">{doc.count}</span>
                                    </div>
                                    <div className="w-full bg-[#0a1a3a] rounded-full h-2">
                                        <div
                                            className="bg-blue-500 h-2 rounded-full transition-all"
                                            style={{ width: `${percentage}%` }}
                                        />
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* TABLE — horizontally scrollable on mobile */}
            <div className="bg-[#122855] p-3 sm:p-4 rounded-lg overflow-x-auto">
                <table className="w-full text-xs sm:text-sm min-w-125">
                    <thead className="text-left text-gray-400 border-b border-white/10">
                        <tr>
                            <th className="py-3 pr-4 w-[40%]">Query</th>
                            <th className="py-3 pr-4 w-[25%]">User</th>
                            <th className="py-3 pr-4 w-[15%]">Date</th>
                            <th className="py-3 pr-4 w-[10%]">Status</th>
                            <th className="py-3 w-[10%] text-right">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {(data?.recentQueries || []).map((q) => (
                            <tr
                                key={q._id}
                                className="border-b border-white/5 hover:bg-[#11234a]/40 transition"
                            >
                                <td
                                    className="py-3 pr-4 max-w-50 truncate text-gray-200"
                                    title={q.query}
                                >
                                    {q.query}
                                </td>
                                <td
                                    className="py-3 pr-4 text-gray-400 truncate max-w-35"
                                    title={q.userId?.email}
                                >
                                    {q.userId?.email || "Unknown"}
                                </td>
                                <td className="py-3 pr-4 text-gray-400 whitespace-nowrap">
                                    {new Date(q.timestamp).toLocaleDateString()}
                                </td>
                                <td className="py-3 pr-4">
                                    <span className="px-2 py-1 rounded-md text-[10px] bg-green-500/20 text-green-400 border border-green-500/30 whitespace-nowrap">
                                        Answered
                                    </span>
                                </td>
                                <td className="py-3 text-right text-gray-400">
                                    <button className="hover:text-blue-400 transition text-xs sm:text-sm">
                                        View
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default AdminDashboard;