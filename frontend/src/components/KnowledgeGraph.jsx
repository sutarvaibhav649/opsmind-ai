import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { getAdminAnalytics } from '../services/api';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { Shield, Users, FileText, Activity } from 'lucide-react';

const AdminKnowledgeGraph = () => {
    const { user, isAdmin } = useAuth();
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (isAdmin) {
            fetchAnalytics();
        }
    }, [isAdmin]);

    const fetchAnalytics = async () => {
        try {
            setLoading(true);
            const analyticsData = await getAdminAnalytics();
            setData(analyticsData);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    // Don't render anything for non-admins
    if (!isAdmin) return null;

    if (loading) {
        return (
            <div className="bg-[#091837] rounded-xl p-4 border border-white/5">
                <div className="animate-pulse space-y-3">
                    <div className="h-4 bg-gray-700 rounded w-1/3"></div>
                    <div className="grid grid-cols-3 gap-3">
                        <div className="h-16 bg-gray-700 rounded"></div>
                        <div className="h-16 bg-gray-700 rounded"></div>
                        <div className="h-16 bg-gray-700 rounded"></div>
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-[#091837] rounded-xl p-4 border border-red-500/20">
                <div className="flex items-center gap-2 text-red-400">
                    <Shield size={16} />
                    <p className="text-xs">{error}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-[#091837] rounded-xl border border-white/5 overflow-hidden">
            {/* Header with Admin Badge */}
            <div className="p-3 border-b border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <Shield className="w-4 h-4 text-blue-400" />
                    <h3 className="text-xs font-bold text-white uppercase tracking-wider">
                        Admin Knowledge Graph
                    </h3>
                </div>
                <span className="text-[10px] bg-blue-500/20 text-blue-400 px-2 py-0.5 rounded-full">
                    Admin Only
                </span>
            </div>

            {/* Stats Cards */}
            <div className="p-3 grid grid-cols-3 gap-2">
                <div className="bg-[#0a1a3a] p-2 rounded-lg">
                    <Users size={12} className="text-blue-400 mb-1" />
                    <p className="text-[10px] text-gray-400">Users</p>
                    <p className="text-sm font-bold text-white">{data?.overview?.totalUsers || 0}</p>
                </div>
                <div className="bg-[#0a1a3a] p-2 rounded-lg">
                    <FileText size={12} className="text-green-400 mb-1" />
                    <p className="text-[10px] text-gray-400">Documents</p>
                    <p className="text-sm font-bold text-white">{data?.overview?.totalDocuments || 0}</p>
                </div>
                <div className="bg-[#0a1a3a] p-2 rounded-lg">
                    <Activity size={12} className="text-purple-400 mb-1" />
                    <p className="text-[10px] text-gray-400">Queries</p>
                    <p className="text-sm font-bold text-white">{data?.overview?.totalQueries || 0}</p>
                </div>
            </div>

            {/* Top Documents */}
            {data?.topDocuments?.length > 0 && (
                <div className="p-3 border-t border-white/10">
                    <h4 className="text-[10px] font-semibold text-gray-400 mb-2">
                        🔥 Most Accessed Documents
                    </h4>
                    <div className="space-y-1.5">
                        {data.topDocuments.slice(0, 3).map((doc, i) => (
                            <div key={i} className="flex items-center justify-between text-[10px]">
                                <span className="text-gray-300 truncate max-w-30">
                                    {doc._id.substring(0, 20)}...
                                </span>
                                <span className="text-blue-400">{doc.count} queries</span>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminKnowledgeGraph;