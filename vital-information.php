<?php
/**
 * Plugin Name: Vital Information
 * Plugin URI:  https://sortabrilliant.com/vital-information
 * Description: Display vital information for your everyday life in the block editor.
 * Author:      sorta brilliant
 * Author URI:  https://sortabrilliant.com/
 * Version:     1.0.1
 * License:     GPL-2.0-or-later
 * License URI: http://www.gnu.org/licenses/gpl-2.0.txt
 *
 * @package vital-information
 */

namespace SortaBrilliant\VitalInformation;

/**
 * Enqueue block editor assets.
 *
 * @return void
 */
function editor_script() {
	$asset_filepath = __DIR__ . '/build/index.asset.php';
	$asset_file     = file_exists( $asset_filepath ) ? include $asset_filepath : [
		'dependencies' => [],
		'version'      => false,
	];

	wp_enqueue_script(
		'vital-information',
		plugins_url( 'build/index.js', __FILE__ ),
		$asset_file['dependencies'],
		$asset_file['version']
	);
}
add_action( 'enqueue_block_editor_assets', __NAMESPACE__ . '\\editor_script' );
