<?php
/**
 * Template Name: Qvilibrio 2026 Landing Page
 * Description: Landing page para el evento Qvilibrio 2026
 * 
 * @package Universidad_Alquimia
 * @version 1.0.0
 */

// Encolar estilos y scripts específicos
function qvilibrio_enqueue_assets() {
    // Lenis Smooth Scroll
    wp_enqueue_script(
        'lenis-smooth-scroll',
        'https://cdn.jsdelivr.net/gh/studio-freight/lenis@1.0.29/bundled/lenis.min.js',
        array(),
        '1.0.29',
        true
    );
    
    // Estilos personalizados
    wp_enqueue_style(
        'qvilibrio-styles',
        get_template_directory_uri() . '/css/qvilibrio.css',
        array(),
        '1.0.0'
    );
    
    // JavaScript principal
    wp_enqueue_script(
        'qvilibrio-main',
        get_template_directory_uri() . '/js/qvilibrio.js',
        array('lenis-smooth-scroll'),
        '1.0.0',
        true
    );
    
    // Pasar datos de WordPress a JavaScript
    wp_localize_script('qvilibrio-main', 'qvilibrioData', array(
        'ajaxUrl' => admin_url('admin-ajax.php'),
        'nonce' => wp_create_nonce('qvilibrio_nonce'),
        'siteUrl' => get_site_url(),
    ));
}
add_action('wp_enqueue_scripts', 'qvilibrio_enqueue_assets');

// Deshabilitar header y footer de WordPress para esta página
get_header('qvilibrio'); // Usar header personalizado o vacío
?>

<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
    <meta charset="<?php bloginfo('charset'); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    
    <!-- SEO Meta Tags -->
    <title><?php wp_title('|', true, 'right'); bloginfo('name'); ?></title>
    <meta name="description" content="<?php bloginfo('description'); ?>">
    
    <?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>

<?php wp_body_open(); ?>

<!-- Header / Navigation -->
<header id="header" class="header">
    <nav class="nav-container">
        <div class="logo">
            <?php if (has_custom_logo()) : ?>
                <?php the_custom_logo(); ?>
            <?php else : ?>
                <img src="<?php echo get_template_directory_uri(); ?>/assets/174e3b42b6e852b56e5244f2aca1bb877cbabef0.svg" 
                     alt="<?php bloginfo('name'); ?>" width="120" height="auto">
            <?php endif; ?>
        </div>
        
        <button class="menu-toggle" id="menuToggle" aria-label="Toggle menu" aria-expanded="false">
            <span class="hamburger"></span>
            <span class="hamburger"></span>
            <span class="hamburger"></span>
        </button>
        
        <?php
        wp_nav_menu(array(
            'theme_location' => 'qvilibrio-menu',
            'menu_id'        => 'navMenu',
            'menu_class'     => 'nav-menu',
            'container'      => false,
            'fallback_cb'    => false,
        ));
        ?>
    </nav>
</header>

<!-- Hero Section -->
<section id="inicio" class="hero">
    <div class="hero__background">
        <?php 
        $hero_image = get_field('hero_background_image'); // ACF field
        if ($hero_image) :
        ?>
            <img src="<?php echo esc_url($hero_image['url']); ?>" 
                 alt="<?php echo esc_attr($hero_image['alt']); ?>" 
                 class="hero__bg-image">
        <?php else : ?>
            <img src="<?php echo get_template_directory_uri(); ?>/assets/3003acb134d9e4530071c8aeb3fa937aa0a5825a.png" 
                 alt="Qvilibrio 2026 Background" 
                 class="hero__bg-image">
        <?php endif; ?>
        <div class="hero__overlay"></div>
    </div>
    
    <div class="hero__content">
        <h1 class="hero__title" data-scroll-reveal>
            <?php echo get_field('hero_title') ?: 'Qvilibrio 2026'; ?>
        </h1>
        <p class="hero__subtitle" data-scroll-reveal>
            <?php echo get_field('hero_subtitle') ?: 'Un encuentro para reconectar con tu esencia'; ?>
        </p>
        <div class="hero__date" data-scroll-reveal>
            <span class="hero__date-text">
                <?php echo get_field('event_date') ?: '28 - 30 de marzo, 2026'; ?>
            </span>
        </div>
        <a href="#registro" class="btn btn--primary" data-scroll-reveal>
            <?php echo get_field('hero_cta_text') ?: 'Reserva tu lugar'; ?>
        </a>
    </div>
    
    <div class="scroll-indicator">
        <span class="scroll-indicator__text">Descubre más</span>
        <div class="scroll-indicator__arrow">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 5V19M12 19L5 12M12 19L19 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
        </div>
    </div>
</section>

<!-- About Event Section -->
<section id="evento" class="about-event">
    <div class="container">
        <span class="section-label" data-scroll-reveal>SOBRE NUESTRO EVENTO</span>
        
        <div class="about-event__content">
            <h2 class="section-title" data-scroll-reveal>
                <?php echo get_field('about_title') ?: 'Un espacio para la transformación interior'; ?>
            </h2>
            
            <div class="about-event__description" data-scroll-reveal>
                <?php 
                if (have_posts()) : 
                    while (have_posts()) : the_post();
                        the_content();
                    endwhile;
                endif;
                ?>
            </div>
            
            <?php 
            $tags = get_field('event_tags'); // ACF repeater
            if ($tags) :
            ?>
            <div class="about-event__tags" data-scroll-reveal>
                <?php foreach ($tags as $tag) : ?>
                    <span class="tag"><?php echo esc_html($tag['tag_name']); ?></span>
                <?php endforeach; ?>
            </div>
            <?php endif; ?>
        </div>
    </div>
</section>

<!-- Registration Section with Contact Form 7 -->
<section id="registro" class="registration">
    <div class="container">
        <div class="registration__content">
            <div class="registration__info" data-scroll-reveal>
                <span class="section-label">REGISTRO</span>
                <h2 class="section-title">
                    Reserva tu lugar en <br>
                    <span class="text-highlight">Qvilibrio 2026</span>
                </h2>
                <p class="registration__description">
                    Los cupos son limitados para garantizar una experiencia íntima y transformadora. 
                    Asegura tu participación completando el formulario de registro.
                </p>
                
                <div class="registration__details">
                    <div class="detail-item">
                        <svg class="detail-icon" width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path d="M8 2V5M16 2V5M3.5 9.09H20.5M21 8.5V17C21 20 19.5 22 16 22H8C4.5 22 3 20 3 17V8.5C3 5.5 4.5 3.5 8 3.5H16C19.5 3.5 21 5.5 21 8.5Z" stroke="currentColor" stroke-width="1.5"/>
                        </svg>
                        <div>
                            <strong>Fecha:</strong>
                            <span><?php echo get_field('event_date') ?: '28-30 de Marzo, 2026'; ?></span>
                        </div>
                    </div>
                    
                    <div class="detail-item">
                        <svg class="detail-icon" width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path d="M12 13.43C13.7231 13.43 15.12 12.0331 15.12 10.31C15.12 8.58687 13.7231 7.19 12 7.19C10.2769 7.19 8.88 8.58687 8.88 10.31C8.88 12.0331 10.2769 13.43 12 13.43Z" stroke="currentColor" stroke-width="1.5"/>
                            <path d="M3.62 8.49C5.59 -0.169998 18.42 -0.159997 20.38 8.5C21.53 13.58 18.37 17.88 15.6 20.54C13.59 22.48 10.41 22.48 8.39 20.54C5.63 17.88 2.47 13.57 3.62 8.49Z" stroke="currentColor" stroke-width="1.5"/>
                        </svg>
                        <div>
                            <strong>Ubicación:</strong>
                            <span><?php echo get_field('event_location') ?: 'Centro de Retiros Alquimia'; ?></span>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="registration__form" data-scroll-reveal>
                <?php 
                // Contact Form 7 shortcode
                echo do_shortcode('[contact-form-7 id="123" title="Registro Qvilibrio"]');
                ?>
            </div>
        </div>
    </div>
</section>

<!-- Footer -->
<footer class="footer">
    <div class="container">
        <div class="footer__content">
            <div class="footer__brand">
                <?php if (has_custom_logo()) : ?>
                    <?php the_custom_logo(); ?>
                <?php else : ?>
                    <img src="<?php echo get_template_directory_uri(); ?>/assets/174e3b42b6e852b56e5244f2aca1bb877cbabef0.svg" 
                         alt="<?php bloginfo('name'); ?>" class="footer__logo">
                <?php endif; ?>
                <p class="footer__tagline"><?php bloginfo('description'); ?></p>
            </div>
            
            <div class="footer__links">
                <div class="footer__column">
                    <h4 class="footer__title">Navegación</h4>
                    <?php
                    wp_nav_menu(array(
                        'theme_location' => 'footer-menu-1',
                        'menu_class'     => 'footer__list',
                        'container'      => false,
                    ));
                    ?>
                </div>
                
                <div class="footer__column">
                    <h4 class="footer__title">Contacto</h4>
                    <ul class="footer__list">
                        <li><a href="mailto:<?php echo get_option('admin_email'); ?>" class="footer__link">
                            <?php echo get_option('admin_email'); ?>
                        </a></li>
                        <li><a href="tel:<?php echo get_field('phone_number', 'option'); ?>" class="footer__link">
                            <?php echo get_field('phone_number', 'option'); ?>
                        </a></li>
                    </ul>
                </div>
                
                <div class="footer__column">
                    <h4 class="footer__title">Síguenos</h4>
                    <ul class="footer__list footer__social">
                        <?php if (get_field('instagram_url', 'option')) : ?>
                            <li><a href="<?php echo esc_url(get_field('instagram_url', 'option')); ?>" 
                                   class="footer__link" target="_blank" rel="noopener">Instagram</a></li>
                        <?php endif; ?>
                        <?php if (get_field('facebook_url', 'option')) : ?>
                            <li><a href="<?php echo esc_url(get_field('facebook_url', 'option')); ?>" 
                                   class="footer__link" target="_blank" rel="noopener">Facebook</a></li>
                        <?php endif; ?>
                    </ul>
                </div>
            </div>
        </div>
        
        <div class="footer__bottom">
            <p class="footer__copyright">
                &copy; <?php echo date('Y'); ?> <?php bloginfo('name'); ?>. Todos los derechos reservados.
            </p>
            <div class="footer__legal">
                <a href="<?php echo get_privacy_policy_url(); ?>" class="footer__link">Política de Privacidad</a>
                <a href="<?php echo home_url('/terminos'); ?>" class="footer__link">Términos y Condiciones</a>
            </div>
        </div>
    </div>
</footer>

<?php wp_footer(); ?>

</body>
</html>

<?php
// No necesitamos get_footer() ya que tenemos el footer personalizado arriba
?>
