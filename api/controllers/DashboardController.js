/**
 * DashboardController
 *
 * @description :: Server-side logic for managing dashboards
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	default: (req, res) => {
		const { user } = req.session

	  let navigasi
	  let dashboardContent

		console.log({user});

		// NAVIGASI
		const navigasiStafGudang = require('../../navigasi/staf_gudang')
		const navigasiAdmin = require('../../navigasi/admin')
		const navigasiManajer = require('../../navigasi/manajer')
		const navigasiBendahara = require('../../navigasi/bendahara')
		const navigasiKasir = require('../../navigasi/kasir')

		// DASHBOARD
		const dashboardAdmin = require('../../dashboard/admin')
		const dashboardStafGudang = require('../../dashboard/staf_gudang')
		const dashboardManajer = require('../../dashboard/manajer')
		const dashboardBendahara = require('../../dashboard/bendahara')
		const dashboardKasir = require('../../dashboard/kasir')

	  if (user.role === 'Staf Gudang') {
	    navigasi = navigasiStafGudang
	    dashboardContent = dashboardStafGudang
	  } else if (user.role === 'Admin') {
	    navigasi = navigasiAdmin
	    dashboardContent = dashboardAdmin
	    navigasi[2].href = '/kelola_role'
	  } else if (user.role === 'Manajer') {
	    navigasi = navigasiManajer
	    dashboardContent = dashboardManajer
	  } else if (user.role === 'Bendahara') {
	    navigasi = navigasiBendahara
	    dashboardContent = dashboardBendahara
	  } else if (user.role === 'Kasir') {
	    navigasi = navigasiKasir
	    dashboardContent = dashboardKasir
	  }

		/**
		 * NAVIGATION HREF AND CLASS
		 */
		navigasi[0].class = 'active-collection'
	  navigasi[1].class = ''
	  navigasi[1].href = '/data'
	  navigasi[2].class = ''

		res.view('users/dashboard', {
			navigasi,
	    user: req.session.user,
	    dashboardContent,
			title: 'Dashboard'
		})
	}
};
