export default function Page() {
  return (
    <div className="container">
      <div className="dashboard-header">
        <div>
          <h1 className="dashboard-title"></h1>
          <p className="dashboard-subtitle">
            Manage your settings.
          </p>
        </div>
        <button className="btn">
          Add 
        </button>
      </div>
      <div className="chart-placeholder" style={{height: '400px', margin: '2rem 0'}}>
        📋  management components will be added here
      </div>
    </div>
  )
}
