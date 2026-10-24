import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useDispatch, useSelector } from "react-redux";
import { fetchSalonBookings } from "../../Redux/Booking/action";
import Button from "@mui/material/Button";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 16,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));


export default function BookingTable() {
  const dispatch = useDispatch();
  const { salon, booking } = useSelector((store) => store);
  React.useEffect(() => {
    if (salon.salon) {
      dispatch(fetchSalonBookings({ jwt: localStorage.getItem("jwt") }));
    }
  }, [salon.salon]);
  return (
    <>
      <h1 className="pb-5 font-bold text-2xl">Bookings</h1>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell sx={{ fontSize: "18px" }}>
                Services
              </StyledTableCell>
              <StyledTableCell sx={{ fontSize: "18px" }} align="center">
                Time & Date
              </StyledTableCell>
              <StyledTableCell sx={{ fontSize: "18px" }} align="center">
                Price
              </StyledTableCell>
              <StyledTableCell sx={{ fontSize: "18px" }} align="center">
                Customer
              </StyledTableCell>
              <StyledTableCell sx={{ fontSize: "18px" }} align="center">
                Status
              </StyledTableCell>
              <StyledTableCell sx={{ fontSize: "18px" }} align="center">
                Cancel
              </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {booking.bookings.map((booking) => (
              <StyledTableRow key={booking.id}>
                <StyledTableCell component="th" scope="booking">
                  {booking.serviceDTOS.map((service) => (
                    <li>
                      {service.name}-{service.duration} minutes
                    </li>
                  ))}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {booking.startTime}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {booking.totalPrice}
                </StyledTableCell>
                <StyledTableCell align="center">
                  <p>Name:{booking.userDTO.fullName}</p>
                  <p>Email:{booking.userDTO.email}</p>
                </StyledTableCell>
                <StyledTableCell align="center">
                  {booking.status}
                </StyledTableCell>
                <StyledTableCell align="center">
                  <Button color="error">Cancel</Button>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
