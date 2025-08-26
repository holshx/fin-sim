"use client"

import { useState } from 'react'

interface User {
  id: string
  firstName: string
  lastName: string
  username: string
  password: string
  createdAt: string
}

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([])
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    password: ''
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validateForm = () => {
    const newErrors: Record<string, string> = {}
    
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required'
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required'
    if (!formData.username.trim()) newErrors.username = 'Username is required'
    if (formData.username.length < 3) newErrors.username = 'Username must be at least 3 characters'
    if (!formData.password.trim()) newErrors.password = 'Password is required'
    if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters'
    
    // Check if username already exists
    if (users.some(user => user.username.toLowerCase() === formData.username.toLowerCase())) {
      newErrors.username = 'Username already exists'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) return

    const newUser: User = {
      id: Date.now().toString(),
      firstName: formData.firstName.trim(),
      lastName: formData.lastName.trim(),
      username: formData.username.trim(),
      password: formData.password, // In real app, this would be hashed
      createdAt: new Date().toISOString().split('T')[0]
    }

    setUsers([...users, newUser])
    setFormData({ firstName: '', lastName: '', username: '', password: '' })
    setErrors({})
    setShowForm(false)
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value })
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors({ ...errors, [field]: '' })
    }
  }

  const deleteUser = (id: string) => {
    if (confirm('Are you sure you want to delete this user?')) {
      setUsers(users.filter(user => user.id !== id))
    }
  }

  return (
    <div className="container">
      {/* Header */}
      <div className="dashboard-header">
        <div>
          <h1 className="dashboard-title">User Management</h1>
          <p className="dashboard-subtitle">
            Create and manage user accounts
          </p>
        </div>
        <button 
          className="btn"
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? 'Cancel' : 'Add User'}
        </button>
      </div>

      {/* User Creation Form */}
      {showForm && (
        <div className="form-container">
          <div className="form-header">
            <h2 className="form-title">Create New User</h2>
            <p className="form-subtitle">Fill in the details to create a new user account</p>
          </div>
          
          <form onSubmit={handleSubmit} className="user-form">
            <div className="form-row">
              <div className="form-group">
                <label className="form-label" htmlFor="firstName">
                  First Name *
                </label>
                <input
                  type="text"
                  id="firstName"
                  className={`form-input ${errors.firstName ? 'form-input-error' : ''}`}
                  value={formData.firstName}
                  onChange={(e) => handleInputChange('firstName', e.target.value)}
                  placeholder="Enter first name"
                />
                {errors.firstName && (
                  <span className="form-error">{errors.firstName}</span>
                )}
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="lastName">
                  Last Name *
                </label>
                <input
                  type="text"
                  id="lastName"
                  className={`form-input ${errors.lastName ? 'form-input-error' : ''}`}
                  value={formData.lastName}
                  onChange={(e) => handleInputChange('lastName', e.target.value)}
                  placeholder="Enter last name"
                />
                {errors.lastName && (
                  <span className="form-error">{errors.lastName}</span>
                )}
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label" htmlFor="username">
                  Username *
                </label>
                <input
                  type="text"
                  id="username"
                  className={`form-input ${errors.username ? 'form-input-error' : ''}`}
                  value={formData.username}
                  onChange={(e) => handleInputChange('username', e.target.value)}
                  placeholder="Enter username (min 3 characters)"
                />
                {errors.username && (
                  <span className="form-error">{errors.username}</span>
                )}
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="password">
                  Password *
                </label>
                <input
                  type="password"
                  id="password"
                  className={`form-input ${errors.password ? 'form-input-error' : ''}`}
                  value={formData.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                  placeholder="Enter password (min 6 characters)"
                />
                {errors.password && (
                  <span className="form-error">{errors.password}</span>
                )}
              </div>
            </div>

            <div className="form-actions">
              <button 
                type="button" 
                className="btn-secondary"
                onClick={() => {
                  setShowForm(false)
                  setFormData({ firstName: '', lastName: '', username: '', password: '' })
                  setErrors({})
                }}
              >
                Cancel
              </button>
              <button type="submit" className="btn">
                Create User
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Users Table */}
      <div className="table-container">
        <div className="table-header">
          <h3 className="table-title">
            All Users ({users.length})
          </h3>
        </div>

        {users.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">👤</div>
            <h3 className="empty-title">No users found</h3>
            <p className="empty-subtitle">
              Create your first user account to get started
            </p>
            {!showForm && (
              <button 
                className="btn"
                onClick={() => setShowForm(true)}
              >
                Add First User
              </button>
            )}
          </div>
        ) : (
          <div className="table-wrapper">
            <table className="users-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Username</th>
                  <th>Created</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id}>
                    <td>
                      <div className="user-name-cell">
                        <div className="user-avatar-small">
                          {user.firstName[0]}{user.lastName[0]}
                        </div>
                        <div>
                          <div className="user-full-name">
                            {user.firstName} {user.lastName}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="username-cell">{user.username}</td>
                    <td className="date-cell">{user.createdAt}</td>
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
                          onClick={() => deleteUser(user.id)}
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
