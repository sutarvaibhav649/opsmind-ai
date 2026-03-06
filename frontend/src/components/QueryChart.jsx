import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
    ResponsiveContainer
} from "recharts";

const QueryChart = ({ data = [] }) => {

  // Create last 7 days timeline
    const last7Days = [];

    for (let i = 6; i >= 0; i--) {

        const d = new Date();
        d.setDate(d.getDate() - i);

        const dateStr = d.toISOString().split("T")[0];

        const found = data.find(item => item.date === dateStr);

        last7Days.push({
        date: dateStr.slice(5), // MM-DD
            queries: found ? found.queries : 0
            });

    }

    return (
        <div className="w-full h-75">

        <ResponsiveContainer width="100%" height="100%">

            <LineChart data={last7Days}>

            <CartesianGrid stroke="#1e3a8a" strokeDasharray="3 3" />

            <XAxis
                dataKey="date"
                stroke="#94a3b8"
            />

            <YAxis stroke="#94a3b8" />

            <Tooltip
                contentStyle={{
                backgroundColor: "#0a192f",
                border: "1px solid #1e40af"
                }}
            />

            <Line
                type="monotone"
                dataKey="queries"
                stroke="#3b82f6"
                strokeWidth={3}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
            />

            </LineChart>

        </ResponsiveContainer>

        </div>
    );
};

export default QueryChart;