import {
  LineChart,
  Line,
  XAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
const data = [
  {
    name: "Jan",
    activeUser: 4000,
  },
  {
    name: "Feb",
    activeUser: 1000,
  },
  {
    name: "Mar",
    activeUser: 2500,
  },
  {
    name: "Apl",
    activeUser: 2000,
  },
  {
    name: "May",
    activeUser: 2000,
  },
  {
    name: "Jun",
    activeUser: 3000,
  },
  {
    name: "July",
    activeUser: 4500,
  },
  {
    name: "Aug",
    activeUser: 4000,
  },
  {
    name: "Sep",
    activeUser: 5000,
  },
  {
    name: "Oct",
    activeUser: 1500,
  },
  {
    name: "Nom",
    activeUser: 2300,
  },
  {
    name: "Dec",
    activeUser: 4000,
  },
];
export const Charts = () => {
  return (
    <div className="chart md:p-5 p-2">
      <h1 className="capitalize text-2xl font-semibold tracking-wider">
        sales analytics
      </h1>
      <ResponsiveContainer width="100%" aspect={4 / 1} className="mt-7 p-1">
        <LineChart data={data}>
          <XAxis dataKey="name" stroke="#F7AB0A"></XAxis>
          <Line stroke="#F7AB0A" type={"monotone"} dataKey="activeUser"></Line>
          <Tooltip />
          <CartesianGrid stroke="#e0dfdf" strokeDasharray="5 5" />
          <Legend />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
