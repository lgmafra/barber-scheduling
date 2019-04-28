const { User, Appointments } = require('../models')
const { Op } = require('sequelize')
const moment = require('moment')

class DashboardController {
  async index (req, res) {
    const providers = await User.findAll({ where: { provider: true } })

    return res.render('dashboard', { providers })
  }

  async provider (req, res) {
    if (req.query.date) {
      const { id } = req.session.user
      const date = moment(parseInt(req.query.date))

      const appointments = await Appointments.findAll({
        where: {
          provider_id: id,
          date: {
            [Op.between]: [
              date.startOf('day').format(),
              date.endOf('day').format()
            ]
          }
        },
        include: [
          {
            model: User,
            as: 'user'
          }
        ]
      })

      return res.render('appointments/schedule', { appointments })
    }

    return res.render('dashboard_provider')
  }
}

module.exports = new DashboardController()
