import Image from "next/image";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

const Button = ({ type }) => (
  <button
    className={`${
      type === "success"
        ? "bg-green-300/30 text-green-500"
        : "bg-red-300/30 text-red-500"
    } flex items-center capitalize text-center px-3 py-1 text-md font-normal tracking-normal rounded-xl`}
  >
    {type}
  </button>
);
export const RightWidget = () => {
  function createData(customer, date, amount, status) {
    return { customer, date, amount, status };
  }

  const rows = [
    createData("Frozen yoghurt", "2-01-2023", 2550, "pending.."),
    createData("Ice cream sandwich", "10-01-2023", 3000, "pending"),
    createData("Eclair", "16-01-2023", 5500, "success"),
    createData("Cupcake", "24-01-2023", 5500, "success"),
    createData("Gingerbread", "25-01-2023", 500, "success"),
    createData("Gingerbread", "25-01-2023", 500, "success"),
    createData("Gingerbread", "25-01-2023", 500, "success"),
    createData("Gingerbread", "25-01-2023", 500, "success"),
    createData("Gingerbread", "25-01-2023", 500, "success"),
    createData("Gingerbread", "25-01-2023", 500, "success"),
    createData("Gingerbread", "25-01-2023", 500, "success"),
    createData("Gingerbread", "25-01-2023", 500, "success"),
  ];
  return (
    <div className="flex-1 p-5 rounded-lg m-1 RightWidget">
      <h3 className="capitalize text-xl font-normal tracking-wide text-gray-400">
        Latest transactions.
      </h3>

      <TableContainer className="w-full">
        <Table aria-label="Latest Transactions">
          <TableHead>
            <TableRow>
              <TableCell className="text-left border-none capitalize tracking-wider font-normal md:text-xl text-lg text-gray-500">
                customer
              </TableCell>
              <TableCell className="text-left border-none capitalize tracking-wider font-normal md:text-xl text-lg text-gray-500">
                date
              </TableCell>
              <TableCell className="text-left border-none capitalize tracking-wider font-normal md:text-xl text-lg text-gray-500">
                amount
              </TableCell>
              <TableCell className="text-left border-none capitalize tracking-wider font-normal md:text-xl text-lg text-gray-500">
                status
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.customer}>
                <TableCell
                  component="th"
                  scope="row"
                  className="flex justify-start items-center border-none"
                >
                  <div className="h-8 w-8 rounded-full relative mr-1 flex-shrink-0">
                    {" "}
                    <Image
                      src={
                        "http://res.cloudinary.com/dcgmbgmyk/image/upload/v1675519945/hbzpauvy42df2xcuill7.jpg"
                      }
                      alt="userPic"
                      fill
                      className="rounded-full object-cover"
                    />
                  </div>
                  <span>{row.customer}</span>
                </TableCell>
                <TableCell align="left" className="border-none">
                  {row.date}
                </TableCell>
                <TableCell align="left" className="border-none">
                  {row.amount}
                </TableCell>
                <TableCell align="left" className="border-none">
                  <Button type={row.status} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};
