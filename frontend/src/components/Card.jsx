import './Card.css';

function Card({ 
  title, 
  description, 
  image, 
  icon, 
  iconClass,
  tags = [], 
  badge,
  children,
  onClick,
  className = ''
}) {
  return (
    <div className={`card ${className}`} onClick={onClick}>
      {image && (
        <div className="card-image">
          <img src={image} alt={title} />
          {badge && <span className="card-badge">{badge}</span>}
        </div>
      )}
      
      {icon && !image && (
        <div className={`card-icon ${iconClass || ''}`}>
          {iconClass ? '' : icon}
        </div>
      )}
      
      <div className="card-content">
        {title && <h3 className="card-title">{title}</h3>}
        {description && <p className="card-description">{description}</p>}
        
        {tags.length > 0 && (
          <div className="card-tags">
            {tags.map((tag, index) => (
              <span key={index} className="tag">{tag}</span>
            ))}
          </div>
        )}
        
        {children}
      </div>
    </div>
  );
}

export default Card;



