import React, { useEffect, useState } from 'react';

const Leaderboard = () => {
  const [leaders, setLeaders] = useState([]);
  useEffect(() => {
    const endpoint = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/leaderboard/`;
    console.log('Fetching Leaderboard from:', endpoint);
    fetch(endpoint)
      .then(res => res.json())
      .then(data => {
        const results = Array.isArray(data) ? data : data.results || [];
        setLeaders(results);
        console.log('Fetched Leaderboard:', data);
      })
      .catch(err => console.error('Error fetching leaderboard:', err));
  }, []);

  const allKeys = Array.from(
    leaders.reduce((keys, item) => {
      Object.keys(item).forEach(k => keys.add(k));
      return keys;
    }, new Set())
  );

  return (
    <div className="card mb-4">
      <div className="card-body">
        <h2 className="card-title display-6 mb-4">Leaderboard</h2>
        <div className="table-responsive">
          <table className="table table-striped table-bordered">
            <thead className="table-dark">
              <tr>
                {allKeys.length === 0 ? <th>No Data</th> : allKeys.map(key => <th key={key}>{key}</th>)}
              </tr>
            </thead>
            <tbody>
              {leaders.length === 0 ? (
                <tr><td colSpan={allKeys.length || 1} className="text-center">No leaderboard data found.</td></tr>
              ) : (
                leaders.map((leader, idx) => (
                  <tr key={leader.id || idx}>
                    {allKeys.map(key => <td key={key}>{String(leader[key])}</td>)}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
