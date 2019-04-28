module.exports = (sequelize, DataTypes) => {
  const Appointments = sequelize.define('Appointments', {
    date: DataTypes.STRING
  })

  Appointments.associate = models => {
    Appointments.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' })
    Appointments.belongsTo(models.User, {
      foreignKey: 'provider_id',
      as: 'provider'
    })
  }

  return Appointments
}
