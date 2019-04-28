const { User, Appointments } = require('../models')

class AppointmentsController {
  async create (req, res) {
    const provider = await User.findByPk(req.params.provider)

    return res.render('appointments/create.njk', { provider })
  }

  async store (req, res) {
    const { date } = req.body
    const { id } = req.session.user
    const { provider } = req.params

    await Appointments.create({
      provider_id: provider,
      user_id: id,
      date
    })

    return res.redirect('/app/dashboard')
  }
}

module.exports = new AppointmentsController()
