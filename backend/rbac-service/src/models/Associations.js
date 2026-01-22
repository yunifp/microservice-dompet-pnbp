const User = require('./User');
const UserRole = require('./UserRole');

User.hasOne(UserRole, { foreignKey: 'user_id', as: 'roleData' });
UserRole.belongsTo(User, { foreignKey: 'user_id' });

module.exports = { User, UserRole };