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
        <tr>
          
        </tr>
      </thead>
    </Table>
  )
}

export default Tickets;