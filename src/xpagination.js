import React, { useEffect, useState } from "react";
import axios from 'axios';
import './Xpagination.css'; // Import the CSS file

function Xpagination() {
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);
  const [perPage] = useState(10); // Number of items per page
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    // Fetch data from API
    axios.get('https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json')
      .then(response => {
        setData(response.data);
        setTotalPages(Math.ceil(response.data.length / perPage));
      })
      .catch(error => {
        console.error('Failed to fetch data:', error);
      });
  }, [perPage]);

  const handlePrevious = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const handleNext = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };

  const currentData = data.slice((page - 1) * perPage, page * perPage);

  return (
    <div>
      <h1>Employee Data Table</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {currentData.map(item => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.email}</td>
              <td>{item.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={handlePrevious} disabled={page === 1}>Previous</button>
      <span>{page}</span>
      <button onClick={handleNext} disabled={page === totalPages}>Next</button>
    </div>
  );
}

export default Xpagination;
