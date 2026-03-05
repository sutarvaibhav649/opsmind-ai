import React, { useEffect, useState } from "react";
import { getAdminAnalytics } from "../services/api";

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

    return (
        <div className="p-6 bg-[#05122b] min-h-screen text-white">

        {/* Header */}
        <h1 className="text-xl font-semibold mb-6">
            OpsMind-AI
        </h1>

        {/* KPI CARDS */}
        <div className="grid grid-cols-4 gap-4 mb-6">

            <div className="bg-[#122855] p-4 rounded-lg">
            <p className="text-sm text-gray-400">Total queries</p>
            <h2 className="text-2xl font-bold">{data?.overview.totalQueries || 0}</h2>
            </div>

            <div className="bg-[#122855] p-4 rounded-lg">
            <p className="text-sm text-gray-400">Unique Users</p>
            <h2 className="text-2xl font-bold">{data?.overview.totalUsers}</h2>
            </div>

            <div className="bg-[#122855] p-4 rounded-lg">
            <p className="text-sm text-gray-400">Documents</p>
            <h2 className="text-2xl font-bold">{data?.overview.totalDocuments}</h2>
            </div>

            <div className="bg-[#122855] p-4 rounded-lg">
            <p className="text-sm text-gray-400">Resp. Time</p>
            <h2 className="text-2xl font-bold">{data?.overview.activeUsers}</h2>
            </div>

        </div>


        {/* CHART + DOCUMENT USAGE */}
        <div className="grid grid-cols-3 gap-4 mb-6">

            <div className="col-span-2 bg-[#122855] p-4 rounded-lg">
            <h2 className="text-lg font-semibold mb-4">Query chart</h2>
            <div className="h-62.5 flex items-center justify-center text-gray-400">
                Chart goes here
            </div>
            </div>

            <div className="bg-[#122855] p-4 rounded-lg">
            <h2 className="text-lg font-semibold mb-4">
                Document Usage
            </h2>

            <div className="space-y-3 text-sm">

                {data?.topDocuments.map(doc => (
                    <div key={doc._id}>
                    {doc._id}
                    <div className="bg-gray-700 h-2 rounded mt-1">
                    <div
                    className="bg-white h-2 rounded"
                    style={{ width: `${doc.count * 10}%` }}
                    />
                    </div>
                    </div>
                ))}

            </div>

            </div>

        </div>


        {/* TABLE */}
        <div className="bg-[#122855] p-4 rounded-lg">

            <table className="w-full text-sm">

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

            {data?.recentQueries?.map((q) => (

                    <tr
                    key={q._id}
                    className="border-b border-white/5 hover:bg-[#11234a]/40 transition"
                    >

                    <td
                        className="py-3 pr-4 max-w-105 truncate text-gray-200"
                        title={q.query}
                        >
                        {q.query}
                    </td>

                    <td
                        className="py-3 pr-4 text-gray-400 truncate max-w-55"
                        title={q.userId?.email}
                        >
                        {q.userId?.email || "Unknown"}
                    </td>

                    <td className="py-3 pr-4 text-gray-400">
                    {new Date(q.timestamp).toLocaleDateString()}
                    </td>

                    <td className="py-3 pr-4">

                        <span className="
                            px-2 py-1
                            rounded-md
                            text-xs
                            bg-green-500/20
                            text-green-400
                            border border-green-500/30
                            ">
                            Answered
                        </span>

                    </td>

                    <td className="py-3 text-right text-gray-400">

                    <button className="hover:text-blue-400 transition">
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