import BoxHeader from "@/components/BoxHeader";
import DashboardBox from "@/components/DashboardBox";
import { useGetKpisQuery } from "@/state/api";
import { useTheme } from "@mui/material";
import { useEffect, useMemo } from "react";
import {
  ResponsiveContainer,
  CartesianGrid,
  AreaChart,
  BarChart,
  Bar,
  LineChart,
  XAxis,
  YAxis,
  Legend,
  Line,
  Tooltip,
  Area,
} from "recharts";
const Row1 = () => {
  const { palette } = useTheme();

  const { data } = useGetKpisQuery();
  console.log("data:", data);

  useEffect(() => {
    console.log('Data', data)
  }, [data])

  const revenue = useMemo(() => {
    return (
      data &&
      data[0].monthlyData.map(({ month, revenue }) => {
        return {
          name: month.substring(0, 3),
          revenue: revenue,
        };
      })
    );
  }, [data]);

  const revenueExpenses = useMemo(() => {
    return (
      data &&
      data[0].monthlyData.map(({ month, revenue, expenses }) => {
        return {
          name: month.substring(0, 3),
          revenue: revenue,
          expenses: expenses,
        };
      })
    );
  }, [data]);

  const revenueProfit = useMemo(() => {
    if (!data || !Array.isArray(data) || !data[0] || !Array.isArray(data[0].monthlyData)) {
      console.error("Invalid data structure:", data);
      return [];
    }

    const transformedData = data[0].monthlyData.map(({ month, revenue, expenses }) => ({
      name: month.substring(0, 3),
      budget: revenue,
      actual: parseFloat((revenue - expenses).toFixed(2)),
    }));
    return transformedData;
  }, [data]);

  return (
    <>
      <DashboardBox gridArea="a" bgcolor={"#243256"} color={"white"}>
        <BoxHeader
          title="Income vs Expenses"
          subtitle="Top line represents income bottom line represents expenses"
          // sideText="+7.6%"
        />
        <ResponsiveContainer width="100%" height="95%">
          <AreaChart
            width={0}
            height={400}
            data={revenueExpenses}
            margin={{
              top: 15,
              right: 25,
              left: 0,
              bottom: 45,
            }}
          >
            <defs>
              <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor={palette.primary[300]}
                  stopOpacity={0.6}
                />
                <stop
                  offset="95%"
                  stopColor={palette.primary[300]}
                  stopOpacity={0}
                />
              </linearGradient>
              <linearGradient id="colorExpenses" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="35%"
                  stopColor={palette.secondary[500]}
                  stopOpacity={0.3}
                />
                <stop
                  offset="95%"
                  stopColor={palette.secondary[300]}
                  stopOpacity={0}
                />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="name"
              tickLine={false}
              style={{ fontSize: "13px" }}
              stroke={palette.secondary[300]}
            />
            <YAxis
              tickLine={false}
              axisLine={{ strokeWidth: "0" }}
              style={{ fontSize: "13px" }}
              domain={[8000, 23000]}
              stroke={palette.secondary[300]}
            />
            <Tooltip
  contentStyle={{ backgroundColor: '#000', color: '#fff', border: 'none' }}
/>
            <Area
              type="monotone"
              dataKey="revenue"
              dot={true}
              stroke={palette.primary.main}
              fillOpacity={1}
              fill="url(#colorRevenue)"
            />
            <Area
              type="monotone"
              dataKey="expenses"
              dot={true}
              stroke={palette.secondary[500]}
              stopColor={palette.secondary[500]}
              fillOpacity={1}
              fill="url(#colorExpenses)"
            />
          </AreaChart>
          
        </ResponsiveContainer>
      </DashboardBox>

      <DashboardBox gridArea="b" bgcolor={"#243256"}>
        <BoxHeader
          title="Budgets vs Actual expenses"
          subtitle="Top line represents Budgets, bottom line represents Actual expenses"
          // sideText="+4%"
        />
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            width={500}
            height={400}
            data={revenueProfit}
            margin={{
              top: 20,
              right: 0,
              left: 0,
              bottom: 50,
            }}
          >
            <CartesianGrid vertical={false} stroke={palette.grey[800]} />
            <XAxis
              dataKey="name"
              tickLine={false}
              axisLine={{ strokeWidth: "0" }}
              style={{ fontSize: "13px" }}
              stroke={palette.secondary[300]}
            />
            <YAxis
              yAxisId="left"
              tickLine={false}
              // axisLine={false}
              axisLine={{ strokeWidth: "0" }}
              style={{ fontSize: "13px" }}
              stroke={palette.secondary[300]}
            />
            <YAxis
              yAxisId="right"
              orientation="right"
              tickLine={false}
              axisLine={{ strokeWidth: "0" }}
              style={{ fontSize: "13px" }}
              stroke={palette.secondary[300]}
            />



            <Tooltip
  contentStyle={{ backgroundColor: '#000', color: '#fff', border: 'none' }}
/>
            <Legend
              height={20}
              wrapperStyle={{
                margin: "0 0 13px 0",
              }}
            />
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="budget"
              stroke={palette.primary.main}
            />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="actual"
              stroke={palette.secondary[500]}
            />
          </LineChart>
        </ResponsiveContainer>
      </DashboardBox>

      <DashboardBox gridArea="c" bgcolor={"#243256"}>
        <BoxHeader
          title="Total Income"
          subtitle="Graph representing Income history within 2 day to 6 months"
          // sideText="+6%"
        />
        <ResponsiveContainer width="100%" height="90%">
          <BarChart
            width={500}
            height={300}
            data={revenue}
            margin={{
              top: 17,
              right: 15,
              left: -5,
              bottom: 30,
            }}
          >
            <defs>
              <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor={palette.primary[300]}
                  stopOpacity={0.9}
                />
                <stop
                  offset="95%"
                  stopColor={palette.secondary[300]}
                  stopOpacity={0}
                />
              </linearGradient>
            </defs>



            <CartesianGrid vertical={false} stroke={palette.grey[800]} />
            <XAxis
              dataKey="name"
              // axisLine={false}
              tickLine={false}
              axisLine={{ strokeWidth: "0" }}
              style={{ fontSize: "13px" }}
              stroke={palette.secondary[300]}
            />
            <YAxis
              // axisLine={false}
              tickLine={false}
              axisLine={{ strokeWidth: "0" }}
              style={{ fontSize: "13px" }}
              stroke={palette.secondary[300]}
            />
            <Tooltip
  contentStyle={{ backgroundColor: '#000', color: '#fff', border: 'none' }}
/>
            <Bar dataKey="revenue" fill="url(#colorRevenue)" />
          </BarChart>
        </ResponsiveContainer>
      </DashboardBox>
    </>
  );
};

export default Row1;
