<?php
if ( ! defined( 'ABSPATH' ) ) {
	die( '-1' );
}
?>
<div class="vc_ui-panel-window vc_preset-panel vc_media-xs vc_ui-panel"
	data-vc-panel=".vc_ui-panel-header-header" data-vc-ui-element="panel-preset" id="vc_ui-panel-preset">
	<div class="vc_ui-panel-window-inner">
		<?php
		vc_include_template( 'editors/popups/vc_ui-header.tpl.php', array(
			'title' => esc_html__( 'My Elements', 'js_composer' ),
			'controls' => array( 'close' ),
			'header_css_class' => 'vc_ui-preset-panel-header-container',
		) );
		?>
		<!-- param window footer-->
		<div class="vc_ui-panel-content-container">
			<div class="vc_ui-panel-content vc_properties-list vc_row"
					data-vc-ui-element="panel-content">
				<div class="vc_column vc_col-sm-12">
					<h3><?php esc_html_e( 'Manage My Elements', 'js_composer' ); ?></h3>
					<p class="vc_description"><?php esc_html_e( 'Remove existing elements', 'js_composer' ); ?></p>
				</div>
				<div class="vc_column vc_col-sm-12">
					<div class="vc_ui-template-list vc_ui-list-bar" data-vc-action="collapseAll" data-vc-presets-list-content>
						<div class="vc_ui-template" style="display:none;">
							<div class="vc_ui-list-bar-item">
								<button type="button" class="vc_ui-list-bar-item-trigger" title="" data-vc-ui-element="template-title"></button>
								<div class="vc_ui-list-bar-item-actions">
									<button type="button" class="vc_general vc_ui-control-button" title="<?php esc_attr_e( 'Add element', 'js_composer' ); ?>" data-template-handler data-vc-ui-add-preset><i class="la la-plus"></i></button>
									<button type="button" class="vc_general vc_ui-control-button" data-vc-ui-delete="preset-title" data-preset="" data-preset-parent="" title="<?php esc_attr_e( 'Delete element', 'js_composer' ); ?>">
										<i class="la la-times"></i></button>
								</div>
							</div>
						</div>
						<?php
						// @codingStandardsIgnoreLine
						print $box->getPresets();
						?>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
<!--/ temp content -->