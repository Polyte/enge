<?php

extract( $atts );

$identities = vc_param_group_parse_atts( $identities );

if( empty( $identities ) )
	return;

$classes = array( 
	'social-icon',
	$style,
	$this->get_shape(),
	$size,
	$orientation,
	$this->get_id()
);

$this->generate_css();

?>
<div class="header-module no-rotate">
	<ul class="<?php echo ld_helper()->sanitize_html_classes( $classes ) ?>" id=<?php echo $this->get_id() ?>>
	<?php
		foreach ( $identities as $social ) {
			if ( empty( $social['url'] ) ) {
				continue;
			}
	
			$net = liquid_get_network_class( $social['network'] );
			$attr = array( 'href' => esc_url( $social['url'] ), 'target' => '_blank' );
	
			if( 'text-only' === $style ) {
				printf( '<li><a%s>%s</a></li>',
					ld_helper()->html_attributes( $attr ), $net['text']
				);
			}
			else {
				printf( '<li><a%s><i class="%s"></i></a></li>',
					ld_helper()->html_attributes( $attr ), $net['icon']
				);
			}
	
		}
	?>
	</ul>
</div>