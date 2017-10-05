/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes map URLs to views and controllers.
 *
 * If Sails receives a URL that doesn't match any of the routes below,
 * it will check for matching files (images, scripts, stylesheets, etc.)
 * in your assets directory.  e.g. `http://localhost:1337/images/foo.jpg`
 * might match an image file: `/assets/images/foo.jpg`
 *
 * Finally, if those don't match either, the default 404 handler is triggered.
 * See `api/responses/notFound.js` to adjust your app's 404 logic.
 *
 * Note: Sails doesn't ACTUALLY serve stuff from `assets`-- the default Gruntfile in Sails copies
 * flat files from `assets` to `.tmp/public`.  This allows you to do things like compile LESS or
 * CoffeeScript for the front-end.
 *
 * For more information on configuring custom routes, check out:
 * http://sailsjs.org/#!/documentation/concepts/Routes/RouteTargetSyntax.html
 */

module.exports.routes = {

  /***************************************************************************
  *                                                                          *
  * Make the view located at `views/homepage.ejs` (or `views/homepage.jade`, *
  * etc. depending on your default view engine) your home page.              *
  *                                                                          *
  * (Alternatively, remove this and add an `index.html` file in your         *
  * `assets` directory)                                                      *
  *                                                                          *
  ***************************************************************************/

  '/': '/login',

  /**
   * LOGIN ROUTES GET AND POST
   */

  'get /login': {
    view: 'users/login',
    locals: {
      title: 'Log in'
    },
    policy: 'isNotLoggedIn'
  },
  'post /login': {
    controller: 'user', action: 'login'
  },

  /**
   * LOGOUT ROUTE GET
   */

  'get /logout': {
    controller: 'user', action: 'logout'
  },

  /**
   * DASHBOARD ROUTE GET
   */

  '/dashboard': [{
    controller: 'dashboard', action: 'default'
  }],

  /**
   * DATA ROUTE GET
   */

  '/data': {
    controller: 'data', action: 'default'
  },

  /**
   * HANDLE USER CRUD DATA -=USER=- REQUEST FROM AJAX
   */
  'post /create_data/user' : {
    controller: 'admin', action: 'createuser'
  },

  'post /delete_data/user': {
    controller: 'admin', action: 'deleteuser'
  },

  'post /edit_data/user/:fieldCount': {
    controller: 'admin', action: 'updateuser'
  },


  /**
   * POST to get DATA USER and BARANG
   */

  'post /get_data/user': {
    controller: 'user', action: 'getDataUser'
  },


  /**
   * POST to get COUNT DATA USER and BARANG
   */

  'post /get_count_dashboard/user': {
    controller: 'user', action: 'getCountDataUser'
  },

  /**
    * GET kelola_role
    */

  'get /kelola_role':{
    controller: 'admin', action: 'halamanKelolaRole'
  },

  /**
    * POST kelola_role
    */
  'post /kelola_role':{
    controller: 'admin', action: 'kelolaRole'
  },
  /**
    * POST edit_data
    */
  'post /edit_data/barang/:fieldCount': {
    controller: 'stafGudang', action: 'updatebarang'
  },

  /**
   * PEMBELIAN ROUTE GET
   */

   'get /pembelian': {
     controller : 'pembelian', action : 'halamanpembelian'
   },
   'post /pembelian': {
     controller: 'kasir', action: 'pembelian'
   },

   /*
    * GET ID BARANG
    */
   'get /get_id_barang': {
     controller: 'barang', action: 'getIdBarang'
   },

   /*
* POST  GET DATA BARANG
    */
    'post /get_data/barang' : {
      controller: 'barang', action: 'getDataBarang'
    }
  /***************************************************************************
  *                                                                          *
  * Custom routes here...                                                    *
  *                                                                          *
  * If a request to a URL doesn't match any of the custom routes above, it   *
  * is matched against Sails route blueprints. See `config/blueprints.js`    *
  * for configuration options and examples.                                  *
  *                                                                          *
  ***************************************************************************/

};
