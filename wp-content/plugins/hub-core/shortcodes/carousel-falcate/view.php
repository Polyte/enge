<?php

extract( $atts );

// Enqueue Conditional Script
$this->scripts();

$classes = array( 
	'carousel-container',
	'carousel-falcate',

	$el_class, 
	$this->get_id() 
);

$this->generate_css();

?>
<div id="<?php echo $this->get_id() ?>" class="<?php echo ld_helper()->sanitize_html_classes( $classes ); ?>">
	
	<div class="carousel-items">
		<?php
			$this->columnize_content( $content );
			echo ld_helper()->do_the_content( $content );
		?>
	</div> <!-- /.carousel-items -->	
	
</div><!-- /.carousel-container -->