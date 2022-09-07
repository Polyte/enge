<?php
/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the installation.
 * You don't have to use the web site, you can copy this file to "wp-config.php"
 * and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * Database settings
 * * Secret keys
 * * Database table prefix
 * * ABSPATH
 *
 * @link https://wordpress.org/support/article/editing-wp-config-php/
 *
 * @package WordPress
 */

// ** Database settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define( 'DB_NAME', 'dbs8077917' );

/** Database username */
define( 'DB_USER', 'root' );

/** Database password */
define( 'DB_PASSWORD', 'root' );

/** Database hostname */
define( 'DB_HOST', 'localhost' );

/** Database charset to use in creating database tables. */
define( 'DB_CHARSET', 'utf8mb4' );

/** The database collate type. Don't change this if in doubt. */
define( 'DB_COLLATE', '' );

/**#@+
 * Authentication unique keys and salts.
 *
 * Change these to different unique phrases! You can generate these using
 * the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}.
 *
 * You can change these at any point in time to invalidate all existing cookies.
 * This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define( 'AUTH_KEY',         '6qvp_tvFMAvNg}%%wR4J6Wgg(gy.-As8BpZK_xY(ckj2yiH%L^dSY|3i,eNwkecR' );
define( 'SECURE_AUTH_KEY',  'qK?LyYK0UAIsx+!]]!u|Nnrs otZS(K-.=?9~jf<TNe6{<U+.3lp:%|X#ahK7JHl' );
define( 'LOGGED_IN_KEY',    'V+#3*K8H.<=Qih.V*!Q* V&Pj`D9QzbxMxuj.?E^3|D8Bzwqcg$ui`_fvr]yCz(l' );
define( 'NONCE_KEY',        ']=U]]/AF)x#FV-TMXOig:px`JpjBD~5@!~2y%;+=8eP~H/XZ =`;B6%xgc]|-6T#' );
define( 'AUTH_SALT',        '?!$wPrpQ}&J>@a$kc{pto_/.tS+Ns>3mP]C@621xd(ETN]]P/Q??C x/A#3i8XuL' );
define( 'SECURE_AUTH_SALT', 'RYr/, LDZWU*nS<N2a,=hlJCRAxuR~run=*?`D}loz7!K$+11BdYfEB28Vm<;46e' );
define( 'LOGGED_IN_SALT',   '~1hR;FI)^zA%E]%PoLm!d:h0BLf`w#ssPgLE@6$hL`+aOU8O4*m} V97H7tY;!HG' );
define( 'NONCE_SALT',       'UfuLRK:x04q)Yz_#r6?q)uk ((`Or;44+T#1;S[rjhqXr,Tn00zy.BA8[;=o8f`p' );

/**#@-*/

/**
 * WordPress database table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 */
$table_prefix = 'GIdtchk';

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 *
 * For information on other constants that can be used for debugging,
 * visit the documentation.
 *
 * @link https://wordpress.org/support/article/debugging-in-wordpress/
 */
define( 'WP_DEBUG', false );

/* Add any custom values between this line and the "stop editing" line. */



/* That's all, stop editing! Happy publishing. */

/** Absolute path to the WordPress directory. */
if ( ! defined( 'ABSPATH' ) ) {
	define( 'ABSPATH', __DIR__ . '/' );
}

/** Sets up WordPress vars and included files. */
require_once ABSPATH . 'wp-settings.php';
