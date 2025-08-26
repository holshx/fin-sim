"use client"

import { useState, useEffect, useMemo } from 'react'

interface Expense {
  id: string
  date: string
  price: number
  currency: string
  type: string
  category: string
  subcategory: string
  account: string
  createdBy: string
  description?: string
  createdAt: string
}

// Sample data for demo
const sampleExpenses: Expense[] = [
  {
    id: '1',
    date: '2024-12-15',
    price: 85.50,
    currency: 'EUR',
    type: 'Business',
    category: 'Food',
    subcategory: 'Restaurant',
    account: 'Business Credit Card',
    createdBy: 'John Doe',
    description: 'Team lunch',
    createdAt: '2024-12-15T10:30:00Z'
  },
  {
    id: '2',
    date: '2024-12-14',
    price: 1200.00,
    currency: 'EUR',
    type: 'Business',
    category: 'Transportation',
    subcategory: 'Flight',
    account: 'Company Bank Account',
    createdBy: 'Jane Smith',
    description: 'Business trip to Berlin',
    createdAt: '2024-12-14T09:15:00Z'
  },
  {
    id: '3',
    date: '2024-12-13',
    price: 45.20,
    currency: 'EUR',
    type: 'Personal',
    category: 'Entertainment',
    subcategory: 'Movies',
    account: 'Personal Debit Card',
    createdBy: 'John Doe',
    description: 'Cinema tickets',
    createdAt: '2024-12-13T19:45:00Z'
  },
  {
    id: '4',
    date: '2024-12-12',
    price: 320.00,
    currency: 'EUR',
    type: 'Business',
    category: 'Office',
    subcategory: 'Equipment',
    account: 'Petty Cash',
    createdBy: 'Mike Johnson',
    description: 'Wireless mouse and keyboard',
    createdAt: '2024-12-12T14:20:00Z'
  },
  {
    id: '5',
    date: '2024-12-11',
    price: 67.80,
    currency: 'EUR',
    type: 'Personal',
    category: 'Food',
    subcategory: 'Groceries',
    account: 'Personal Credit Card',
    createdBy: 'Jane Smith',
    description: 'Weekly shopping',
    createdAt: '2024-12-11T16:30:00Z'
  },
  {
    id: '6',
    date: '2024-12-10',
    price: 150.00,
    currency: 'EUR',
    type: 'Business',
    category: 'Marketing',
    subcategory: 'Advertising',
    account: 'Marketing Budget',
    createdBy: 'John Doe',
    description: 'Google Ads campaign',
    createdAt: '2024-12-10T11:15:00Z'
  }
]

export default function ExpensesPage() {
  const [expenses, setExpenses] = useState<Expense[]>(sampleExpenses)
  const [showForm, setShowForm] = useState(false)
  const [showFilters, setShowFilters] = useState(false)
  
  // Date range filter
  const [dateRange, setDateRange] = useState({
    startDate: '2024-12-01',
    endDate: '2024-12-31'
  })
  
  // Other filters
  const [filters, setFilters] = useState({
    priceMin: '',
    priceMax: '',
    type: '',
    category: '',
    account: '',
    createdBy: ''
  })

  // Get unique values for filter dropdowns
  const uniqueTypes = useMemo(() => [...new Set(expenses.map(e => e.type))], [expenses])
  const uniqueCategories = useMemo(() => [...new Set(expenses.map(e => e.category))], [expenses])
  const uniqueAccounts = useMemo(() => [...new Set(expenses.map(e => e.account))], [expenses])
  const uniqueCreatedBy = useMemo(() => [...new Set(expenses.map(e => e.createdBy))], [expenses])

  // Filter expenses based on all filters
  const filteredExpenses = useMemo(() => {
    return expenses.filter(expense => {
      const expenseDate = new Date(expense.date)
      const startDate = new Date(dateRange.startDate)
      const endDate = new Date(dateRange.endDate)
      
      // Date range filter
      if (expenseDate < startDate || expenseDate > endDate) return false
      
      // Price range filter
      if (filters.priceMin && expense.price < parseFloat(filters.priceMin)) return false
      if (filters.priceMax && expense.price > parseFloat(filters.priceMax)) return false
      
      // Other filters
      if (filters.type && expense.type !== filters.type) return false
      if (filters.category && expense.category !== filters.category) return false
      if (filters.account && expense.account !== filters.account) return false
      if (filters.createdBy && expense.createdBy !== filters.createdBy) return false
      
      return true
    })
  }, [expenses, dateRange, filters])

  // Chart data for bar chart
  const chartData = useMemo(() => {
    const categoryTotals = filteredExpenses.reduce((acc, expense) => {
      acc[expense.category] = (acc[expense.category] || 0) + expense.price
      return acc
    }, {} as Record<string, number>)
    
    return Object.entries(categoryTotals)
      .map(([category, total]) => ({ category, total }))
      .sort((a, b) => b.total - a.total)
  }, [filteredExpenses])

  const deleteExpense = (id: string) => {
    if (confirm('Are you sure you want to delete this expense?')) {
      setExpenses(expenses.filter(expense => expense.id !== id))
    }
  }

  const clearFilters = () => {
    setFilters({
      priceMin: '',
      priceMax: '',
      type: '',
      category: '',
      account: '',
      createdBy: ''
    })
    setDateRange({
      startDate: '2024-12-01',
      endDate: '2024-12-31'
    })
  }

  const totalAmount = filteredExpenses.reduce((sum, expense) => sum + expense.price, 0)

  return (
    <div className="container">
      {/* Header */}
      <div className="dashboard-header">
        <div>
          <h1 className="dashboard-title">Expenses</h1>
          <p className="dashboard-subtitle">
            Track and analyze your expenses
          </p>
        </div>
        <div className="header-actions-expenses">
          <button 
            className="btn-secondary"
            onClick={() => setShowFilters(!showFilters)}
          >
            {showFilters ? 'Hide Filters' : 'Show Filters'}
          </button>
          <button 
            className="btn"
            onClick={() => setShowForm(!showForm)}
          >
            {showForm ? 'Cancel' : 'Add Expense'}
          </button>
        </div>
      </div>

      {/* Filters Section */}
      {showFilters && (
        <div className="filters-container">
          <div className="filters-header">
            <h3 className="filters-title">Filters</h3>
            <button className="btn-clear" onClick={clearFilters}>
              Clear All
            </button>
          </div>
          
          <div className="filters-grid">
            {/* Date Range */}
            <div className="filter-group">
              <label className="filter-label">Date Range</label>
              <div className="date-range-inputs">
                <input
                  type="date"
                  value={dateRange.startDate}
                  onChange={(e) => setDateRange({...dateRange, startDate: e.target.value})}
                  className="form-input"
                />
                <span className="date-separator">to</span>
                <input
                  type="date"
                  value={dateRange.endDate}
                  onChange={(e) => setDateRange({...dateRange, endDate: e.target.value})}
                  className="form-input"
                />
              </div>
            </div>

            {/* Price Range */}
            <div className="filter-group">
              <label className="filter-label">Price Range (EUR)</label>
              <div className="price-range-inputs">
                <input
                  type="number"
                  placeholder="Min"
                  value={filters.priceMin}
                  onChange={(e) => setFilters({...filters, priceMin: e.target.value})}
                  className="form-input"
                />
                <span className="price-separator">-</span>
                <input
                  type="number"
                  placeholder="Max"
                  value={filters.priceMax}
                  onChange={(e) => setFilters({...filters, priceMax: e.target.value})}
                  className="form-input"
                />
              </div>
            </div>

            {/* Type Filter */}
            <div className="filter-group">
              <label className="filter-label">Type</label>
              <select
                value={filters.type}
                onChange={(e) => setFilters({...filters, type: e.target.value})}
                className="form-select"
              >
                <option value="">All Types</option>
                {uniqueTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>

            {/* Category Filter */}
            <div className="filter-group">
              <label className="filter-label">Category</label>
              <select
                value={filters.category}
                onChange={(e) => setFilters({...filters, category: e.target.value})}
                className="form-select"
              >
                <option value="">All Categories</option>
                {uniqueCategories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>

            {/* Account Filter */}
            <div className="filter-group">
              <label className="filter-label">Account</label>
              <select
                value={filters.account}
                onChange={(e) => setFilters({...filters, account: e.target.value})}
                className="form-select"
              >
                <option value="">All Accounts</option>
                {uniqueAccounts.map(account => (
                  <option key={account} value={account}>{account}</option>
                ))}
              </select>
            </div>

            {/* Created By Filter */}
            <div className="filter-group">
              <label className="filter-label">Created By</label>
              <select
                value={filters.createdBy}
                onChange={(e) => setFilters({...filters, createdBy: e.target.value})}
                className="form-select"
              >
                <option value="">All Users</option>
                {uniqueCreatedBy.map(user => (
                  <option key={user} value={user}>{user}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      )}

      {/* Summary Stats */}
      <div className="stats-summary">
        <div className="summary-card">
          <div className="summary-label">Total Expenses</div>
          <div className="summary-value">€{totalAmount.toFixed(2)}</div>
        </div>
        <div className="summary-card">
          <div className="summary-label">Number of Expenses</div>
          <div className="summary-value">{filteredExpenses.length}</div>
        </div>
        <div className="summary-card">
          <div className="summary-label">Average Amount</div>
          <div className="summary-value">
            €{filteredExpenses.length ? (totalAmount / filteredExpenses.length).toFixed(2) : '0.00'}
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="charts-section">
        {/* Category Chart */}
        <div className="chart-container">
          <div className="chart-header">
            <h3 className="chart-title">Expenses by Category</h3>
            <p className="chart-subtitle">Total amount per category</p>
          </div>
          <div className="bar-chart">
            {chartData.length === 0 ? (
              <div className="chart-empty">
                No data available for selected filters
              </div>
            ) : (
              chartData.map((item, index) => {
                const maxValue = Math.max(...chartData.map(d => d.total))
                const percentage = (item.total / maxValue) * 100
                
                return (
                  <div key={item.category} className="bar-item">
                    <div className="bar-label">
                      <span className="bar-category">{item.category}</span>
                      <span className="bar-value">€{item.total.toFixed(2)}</span>
                    </div>
                    <div className="bar-wrapper">
                      <div 
                        className="bar-fill" 
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                )
              })
            )}
          </div>
        </div>

        {/* Account Chart */}
        <div className="chart-container">
          <div className="chart-header">
            <h3 className="chart-title">Expenses by Account</h3>
            <p className="chart-subtitle">Total amount per account</p>
          </div>
          <div className="bar-chart">
            {(() => {
              const accountTotals = filteredExpenses.reduce((acc, expense) => {
                acc[expense.account] = (acc[expense.account] || 0) + expense.price
                return acc
              }, {} as Record<string, number>)
              
              const accountData = Object.entries(accountTotals)
                .map(([account, total]) => ({ account, total }))
                .sort((a, b) => b.total - a.total)

              if (accountData.length === 0) {
                return (
                  <div className="chart-empty">
                    No data available for selected filters
                  </div>
                )
              }

              const maxValue = Math.max(...accountData.map(d => d.total))

              return accountData.map((item) => {
                const percentage = (item.total / maxValue) * 100
                
                return (
                  <div key={item.account} className="bar-item">
                    <div className="bar-label">
                      <span className="bar-category">{item.account}</span>
                      <span className="bar-value">€{item.total.toFixed(2)}</span>
                    </div>
                    <div className="bar-wrapper">
                      <div 
                        className="bar-fill account-bar" 
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                )
              })
            })()}
          </div>
        </div>
      </div>

      {/* Expenses Table */}
      <div className="table-container">
        <div className="table-header">
          <h3 className="table-title">
            All Expenses ({filteredExpenses.length})
          </h3>
        </div>

        {filteredExpenses.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">💳</div>
            <h3 className="empty-title">No expenses found</h3>
            <p className="empty-subtitle">
              {expenses.length === 0 
                ? "Add your first expense to get started"
                : "Try adjusting your filters to see more results"
              }
            </p>
          </div>
        ) : (
          <div className="table-wrapper">
            <table className="expenses-table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Amount</th>
                  <th>Type</th>
                  <th>Category</th>
                  <th>Subcategory</th>
                  <th>Account</th>
                  <th>Created By</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredExpenses.map((expense) => (
                  <tr key={expense.id}>
                    <td className="date-cell">
                      {new Date(expense.date).toLocaleDateString('en-GB')}
                    </td>
                    <td className="amount-cell">
                      <span className="amount">€{expense.price.toFixed(2)}</span>
                    </td>
                    <td>
                      <span className={`type-badge ${expense.type.toLowerCase()}`}>
                        {expense.type}
                      </span>
                    </td>
                    <td className="category-cell">{expense.category}</td>
                    <td className="subcategory-cell">{expense.subcategory}</td>
                    <td className="account-cell">
                      <span className="account-badge">
                        {expense.account}
                      </span>
                    </td>
                    <td className="user-cell">{expense.createdBy}</td>
                    <td>
                      <div className="table-actions">
                        <button 
                          className="btn-action edit"
                          onClick={() => alert('Edit functionality will be added later')}
                        >
                          Edit
                        </button>
                        <button 
                          className="btn-action delete"
                          onClick={() => deleteExpense(expense.id)}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
