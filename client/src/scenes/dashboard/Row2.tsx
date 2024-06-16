import BoxHeader from "@/components/BoxHeader";
import DashboardBox from "@/components/DashboardBox";
import FlexBetween from "@/components/FlexBetween";
import { useGetKpisQuery, useGetProductsQuery } from "@/state/api";
import { Box, Typography, useTheme } from "@mui/material";
import { useEffect, useMemo } from "react";
import {
  Tooltip,
  CartesianGrid,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Line,
  PieChart,
  Pie,
  Cell,
  ScatterChart,
  Scatter,
  ZAxis,
} from "recharts";

const pieData = [
  { name: "Group A", value: 200 },
  { name: "Group B", value: 500 },
  {name: "Group C ", value: 300}
];

const Row2 = () => {
  const { palette } = useTheme();
  const pieColors = [palette.secondary[300], palette.secondary[700]];
  const { data: operationalData } = useGetKpisQuery();
  const { data: productData } = useGetProductsQuery();
  useEffect(() => {
    console.log("productData", productData);
  }, [productData]);

  const operationalExpenses = useMemo(() => {
    return (
      operationalData &&
      operationalData[0].monthlyData.map(
        ({ month, operationalExpenses, nonOperationalExpenses }) => {
          return {
            name: month.substring(0, 3),
            "Operational Expenses": operationalExpenses,
            "Non Operational Expenses": nonOperationalExpenses,
          };
        }
      )
    );
  }, [operationalData]);

  // Use useMemo to memoize the transformation of productData
  const productExpenseData = useMemo(() => {
    // Check if productData is valid
    if (!productData || !Array.isArray(productData)) {
      console.error("Invalid productData structure:", productData);
      return []; // Return an empty array if productData is invalid
    }

    // Transform the productData
    const transformedData = productData.map(({ _id, price, expense }) => ({
      id: _id,
      price: price,
      expense: expense,
    }));

    // Log the transformed data for debugging
    console.log("Transformed Product Data:", transformedData);
    return transformedData;
  }, [productData]);
  return (
    <>
      //d
      <DashboardBox gridArea="d" bgcolor={"#243256"}>
        <BoxHeader title="Investments vs expenditure"  />
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={operationalExpenses}
            margin={{
              top: 20,
              right: 0,
              left: 10,
              bottom: 55,
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
              orientation="left"
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
              contentStyle={{
                backgroundColor: "#000",
                color: "#fff",
                border: "none",
              }}
            />
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="Non Operational Expenses"
              stroke={palette.tertiary[100]}
            />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="Operational Expenses"
              stroke={palette.primary.main}
            />
          </LineChart>
        </ResponsiveContainer>
      </DashboardBox>
      //e
      <DashboardBox gridArea="e" bgcolor={"#243256"}>
        <BoxHeader title="Portfolio Breakdown" />
        <FlexBetween mt="0.15rem" gap="1.5rem" pr="1rem" pb="5rem">
          <PieChart
            width={130}
            height={100}
            margin={{
              top: 0,
              right: -10,
              left: 10,
              bottom: 0,
            }}
          >
            <Pie
              stroke="none"
              data={pieData}
              innerRadius={20}
              outerRadius={40}
              paddingAngle={2}
              dataKey="value"
            >
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={pieColors[index]} />
              ))}
            </Pie>
          </PieChart>
          <Box ml="-0.7rem" flexBasis="40%" textAlign="center">
            <Typography variant="h5">Mutual Funds</Typography>
            <Typography m="0.4rem 0" variant="h4" color={palette.primary[200]}>
              60%
            </Typography>
            <Typography variant="h6">
              User mainly spends 60% on Investments.
            </Typography>
          </Box>
          <Box flexBasis="40%">
            <Typography variant="h5">Stocks</Typography>
            <Typography variant="h6">Stocks occupy 40%</Typography>
            <Typography mt="0.5rem" variant="h5">
              Margins
            </Typography>
            <Typography variant="h6">
              Margins are up by 30% from last month.
            </Typography>
          </Box>
        </FlexBetween>
      </DashboardBox>
      //f
      <DashboardBox gridArea="f" bgcolor={"#243256"}>
        <BoxHeader title="Cash Flow Analysis In Rupees"  />
        <ResponsiveContainer width="100%" height="100%">
          <ScatterChart
            margin={{
              top: 20,
              right: 25,
              bottom: 40,
              left: -10,
            }}
          >
            <CartesianGrid stroke={palette.grey[800]} />
            <XAxis
              type="number"
              dataKey="price"
              name="price"
              // axisLine={false}
              tickLine={false}
              axisLine={{ strokeWidth: "0" }}
              style={{ fontSize: "13px" }}
              stroke={palette.secondary[300]}
              tickFormatter={(v) => `${v}`}
            />
            <YAxis
              type="number"
              dataKey="expense"
              name="expense"
              // axisLine={false}
              tickLine={false}
              axisLine={{ strokeWidth: "0" }}
              style={{ fontSize: "13px" }}
              stroke={palette.secondary[300]}
              tickFormatter={(v) => `${v}`}
            />
            <ZAxis type="number" range={[20]} />
            <Tooltip
              formatter={(v) => `$${v}`}
              contentStyle={{
                backgroundColor: "#fff",
                color: "#fff",
                border: "#fff",
              }}
            />
            <Scatter
              name="Product Expense Ratio"
              data={productExpenseData}
              fill={palette.tertiary[500]}
            />
          </ScatterChart>
        </ResponsiveContainer>
      </DashboardBox>
    </>
  );
};

export default Row2;
