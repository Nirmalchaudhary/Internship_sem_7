import React, { useEffect, useState } from 'react';

const Admin = () => {
  const [userAllData, setUserAllData] = useState([]);

  const callAdminPage = async () => {
    try {
      const res = await fetch('/admin', {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });

      const data = await res.json();
      setUserAllData(data);

      if (res.status !== 200) {
        const error = new Error(res.error);
        throw error;
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    callAdminPage();
  }, []);

  return (
    <div className='main-section1'>
    <div className='mt-5'>
    <table className="table table-dark table-striped">
    <thead>
    <tr>
      <th scope="col">Name</th>
      <th scope="col">Email ID</th>
      <th scope="col">Phone No.</th>
      <th scope="col">Profession</th>
    </tr>
  </thead>
      {userAllData.length === 0 ? (
        <p>Loading...</p>
      ) : (
        userAllData.map((ele)=>{
          
          return(
  <tbody>
    <tr>
      <td>{ele.name}</td>
      <td>{ele.email}</td>
      <td>{ele.phone}</td>
      <td>{ele.work}</td>
    </tr>
  </tbody>

          )
        })
      )}


      </table>
    </div>
    </div>
  );
};

export default Admin;
