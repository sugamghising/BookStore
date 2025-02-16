export const adminMiddleware = (req, res, next) => {
    // Check if the user is authenticated
    if (!req.user) {
      return res.status(401).json({ message: 'Access denied. User not authenticated.' });
    }
  
    // Check if the user is an admin
    if (!req.user.isAdmin) {
      return res.status(403).json({ message: 'Access denied. Admin privileges required.' });
    }
  
    // If the user is an admin, proceed to the next middleware or route handler
    next();
  };
  
