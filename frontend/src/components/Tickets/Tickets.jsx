import { useEffect, useState } from 'react';
import './Tickets.css';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { AgGridReact } from 'ag-grid-react'; // React Data Grid Component
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the Data Grid
import "ag-grid-community/styles/ag-theme-material.css"; // Optional Theme applied to the Data Grid

import { getTicketsThunk } from '../../store/tickets';

function Tickets() {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [rowData, setRowData] = useState([]);
  const [columnDefs, setColumnDefs] = useState([
    { field: 'Order no.', headerName: 'Order no.' },
    { field: 'Date', headerName: 'Date' },
    { field: 'Name', headerName: 'Name' },
    { field: 'Assignee', headerName: 'Assignee' },
  ]);

  const sessionUser = useSelector(state => state.session.user);
  const tickets = useSelector(state => state.tickets.allTickets);

  useEffect(() => {
    if (sessionUser) {
      dispatch(getTicketsThunk());
    }
  }, [dispatch, sessionUser]);

  useEffect(() => {
    if (tickets) {
      const updatedRowData = tickets.map(ticket => ({
        'Order no.': ticket.id,
        'Date': ticket.workOrderDate,
        'Name': ticket.name,
        'Assignee': ticket.technician
      }));
      setRowData(updatedRowData);
    }
  }, [tickets]);

  if (!tickets) {
    return (
      <main>
        <h1>Tickets</h1>
        <h2>Loading...</h2>
      </main>
    );
  }

  return (
    <main>
      <header className='title-header'>
        <h2>Tickets</h2>
        <button>Add Ticket</button>
      </header>
      <div className="ag-theme-material-auto-dark" style={{ height: '500px', width: '100%' }}>
        <AgGridReact
          rowData={rowData}
          columnDefs={columnDefs}
          onRowClicked={(event) => navigate(`/tickets/${event.data['Order no.']}`)}
        />
      </div>
    </main>
  );
}

export default Tickets;
