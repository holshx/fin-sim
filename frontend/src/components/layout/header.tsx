"use client"

interface HeaderProps {
  onMenuClick: () => void
}

export function Header({ onMenuClick }: HeaderProps) {
  return (
    <div className="header">
      <button className="mobile-menu-btn" onClick={onMenuClick}>
        <span className="hamburger-line"></span>
        <span className="hamburger-line"></span>
        <span className="hamburger-line"></span>
      </button>

      <div className="header-content">
        <div className="search-container">
          <input
            type="search"
            placeholder="Search..."
            className="search-input"
          />
          <span className="search-icon">⌕</span>
        </div>

        <div className="header-actions">
          <button className="notification-btn">
            ●
            <span className="notification-badge"></span>
          </button>

          <div className="user-menu">
            <div className="user-avatar">JD</div>
            <div className="user-info">
              <div className="user-name">John Doe</div>
              <div className="user-email">john@example.com</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
