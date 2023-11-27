import { useQuery } from '@tanstack/react-query';
import { PieChart, Pie, Cell, Legend } from 'recharts';
import useAxiosPublic from '../../Hooks/useAxiosPublic';

const BalanceChart = () => {
    const axiosPublic = useAxiosPublic();
    // call chart
    const { data: bookingsCount = [], isLoading: isLoadingBookingsCount } = useQuery({
        queryKey: ['bookingsCount'],
        queryFn: async () => {
            const res = await axiosPublic.get(`/bookingsCount`);
            return res.data;
        }
    });

    const { data: newsLetterCount = [], isLoading: isLoadingNewsLetterCount } = useQuery({
        queryKey: ['newsLetterCount'],
        queryFn: async () => {
            const res = await axiosPublic.get(`/newsLetterCount`);
            return res.data;
        }
    });
    const isLoading = isLoadingBookingsCount || isLoadingNewsLetterCount;
    if (isLoading) {
        return <p>Loading ... </p>;
    }
    console.log();
    console.log();

    const data = [
        { name: 'Payed User', value: bookingsCount.result },
        { name: 'News Letter subscriber', value: newsLetterCount.result },
    ];
    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

    const RADIAN = Math.PI / 180;
    const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);

        return (
            <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
                {`${(percent * 100).toFixed(0)}%`}
            </text>
        );
    };
    return (
        <div>
            <PieChart width={1000} height={300}>
                <Pie
                    data={data}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={renderCustomizedLabel}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                >
                    {data.map((entry, index) => (
                        <Cell className='w-52' key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                </Pie>
                <Legend></Legend>
            </PieChart>
        </div>
    );
};

export default BalanceChart;