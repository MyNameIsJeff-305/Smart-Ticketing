import { useEffect } from 'react';
import './Tickets.css';
import { Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { getTicketsThunk } from '../../store/tickets';

function Tickets() {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const sessionUser = useSelector(state => state.session.user);
  const tickets = useSelector(state => state.tickets.allTickets);

  useEffect(() => {
    if (sessionUser) {
      dispatch(getTicketsThunk());
    }
  }, [dispatch, sessionUser]);

  if (!tickets) {
    return (
      <main>
        <h1>Tickets</h1>
        <h2>Loading...</h2>
      </main>
    )
  }



  return (
    <Table striped bordered hover variant="dark">
      <thead>
        <th>
          Order no.
        </th>
        <th>
          Date
        </th>
        <th>
          Name
        </th>
        <th>
          Technician
        </th>
      </thead>
      <tbody>
        {tickets.map(ticket => (
          <tr key={ticket.id} onClick={() => navigate(`/tickets/${ticket.id}`)}>
            <td>{ticket.id}</td>
            <td>{ticket.workOrderDate}</td>
            <td>{ticket.name}</td>
            <td>{ticket.technician}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  )
}

export default Tickets;