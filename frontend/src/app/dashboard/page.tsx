export default function DashboardPage() {
  return (
    <div className="container">
      {/* Dashboard Header */}
      <div className="dashboard-header">
        <div>
          <h1 className="dashboard-title">Dashboard</h1>
          <p className="dashboard-subtitle">
            Financial overview and insights
          </p>
        </div>
        <button className="btn">
          Add Transaction
        </button>
      </div>

      {/* Stats Cards */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-header">
            <span className="stat-title">Total Balance</span>
          </div>
          <div className="stat-value">$45,231.89</div>
          <div className="stat-change positive">
            <span className="arrow-up">↗</span>
            +20.1% from last month
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-header">
            <span className="stat-title">Monthly Income</span>
          </div>
          <div className="stat-value">$12,234.00</div>
          <div className="stat-change positive">
            <span className="arrow-up">↗</span>
            +10.5% from last month
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-header">
            <span className="stat-title">Monthly Expenses</span>
          </div>
          <div className="stat-value">$8,456.00</div>
          <div className="stat-change negative">
            <span className="arrow-down">↘</span>
            +2.3% from last month
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-header">
            <span className="stat-title">Investments</span>
          </div>
          <div className="stat-value">$23,450.00</div>
          <div className="stat-change positive">
            <span className="arrow-up">↗</span>
            +15.2% from last month
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="charts-section">
        <div className="chart-card">
          <div className="chart-header">
            <h3 className="chart-title">Financial Overview</h3>
            <p className="chart-subtitle">
              Income vs expenses trend
            </p>
          </div>
          <div className="chart-placeholder">
            Chart will be displayed here
          </div>
        </div>

        <div className="chart-card">
          <div className="chart-header">
            <h3 className="chart-title">Recent Transactions</h3>
            <p className="chart-subtitle">
              Latest financial activities
            </p>
          </div>
          <div className="chart-placeholder">
            Transaction list will be displayed here
          </div>
        </div>
      </div>
    </div>
  )
}

