<?php
/**
 * Qvilibrio 2026 - WordPress Functions
 * 
 * Agregar este código a functions.php de tu tema de WordPress
 * o crear un plugin personalizado
 * 
 * @package Universidad_Alquimia
 * @version 1.0.0
 */

// ============================================
// Registrar Menús de Navegación
// ============================================
function qvilibrio_register_menus()
{
    register_nav_menus(array(
        'qvilibrio-menu' => __('Menú Qvilibrio', 'universidad-alquimia'),
        'footer-menu-1' => __('Footer Menu 1', 'universidad-alquimia'),
        'footer-menu-2' => __('Footer Menu 2', 'universidad-alquimia'),
    ));
}
add_action('after_setup_theme', 'qvilibrio_register_menus');

// ============================================
// Soporte para Logo Personalizado
// ============================================
function qvilibrio_custom_logo_setup()
{
    add_theme_support('custom-logo', array(
        'height' => 100,
        'width' => 400,
        'flex-height' => true,
        'flex-width' => true,
    ));
}
add_action('after_setup_theme', 'qvilibrio_custom_logo_setup');

// ============================================
// Encolar Estilos y Scripts
// ============================================
function qvilibrio_enqueue_assets()
{
    // Solo cargar en la página de Qvilibrio
    if (is_page_template('wordpress-template.php')) {

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
            get_template_directory_uri() . '/css/styles.css',
            array(),
            filemtime(get_template_directory() . '/css/styles.css')
        );

        // JavaScript principal
        wp_enqueue_script(
            'qvilibrio-main',
            get_template_directory_uri() . '/js/main.js',
            array('lenis-smooth-scroll'),
            filemtime(get_template_directory() . '/js/main.js'),
            true
        );

        // Pasar datos de WordPress a JavaScript
        wp_localize_script('qvilibrio-main', 'qvilibrioData', array(
            'ajaxUrl' => admin_url('admin-ajax.php'),
            'nonce' => wp_create_nonce('qvilibrio_nonce'),
            'siteUrl' => get_site_url(),
            'themePath' => get_template_directory_uri(),
        ));
    }
}
add_action('wp_enqueue_scripts', 'qvilibrio_enqueue_assets');

// ============================================
// AJAX Handler para Formulario de Registro
// ============================================
function qvilibrio_handle_registration()
{
    // Verificar nonce
    check_ajax_referer('qvilibrio_nonce', 'nonce');

    // Sanitizar datos
    $name = sanitize_text_field($_POST['name']);
    $email = sanitize_email($_POST['email']);
    $phone = sanitize_text_field($_POST['phone']);
    $message = sanitize_textarea_field($_POST['message']);

    // Validar datos
    if (empty($name) || empty($email) || empty($phone)) {
        wp_send_json_error(array(
            'message' => 'Por favor, completa todos los campos obligatorios.'
        ));
    }

    if (!is_email($email)) {
        wp_send_json_error(array(
            'message' => 'Por favor, ingresa un correo electrónico válido.'
        ));
    }

    // Guardar en base de datos
    global $wpdb;
    $table_name = $wpdb->prefix . 'qvilibrio_registrations';

    $result = $wpdb->insert(
        $table_name,
        array(
            'name' => $name,
            'email' => $email,
            'phone' => $phone,
            'message' => $message,
            'created_at' => current_time('mysql'),
        ),
        array('%s', '%s', '%s', '%s', '%s')
    );

    if ($result === false) {
        wp_send_json_error(array(
            'message' => 'Error al guardar el registro. Por favor, intenta nuevamente.'
        ));
    }

    // Enviar email de notificación
    $to = get_option('admin_email');
    $subject = 'Nuevo registro para Qvilibrio 2026';
    $body = "Nuevo registro recibido:\n\n";
    $body .= "Nombre: $name\n";
    $body .= "Email: $email\n";
    $body .= "Teléfono: $phone\n";
    $body .= "Mensaje: $message\n";

    $headers = array('Content-Type: text/plain; charset=UTF-8');

    wp_mail($to, $subject, $body, $headers);

    // Enviar email de confirmación al usuario
    $user_subject = 'Confirmación de registro - Qvilibrio 2026';
    $user_body = "Hola $name,\n\n";
    $user_body .= "Gracias por tu interés en Qvilibrio 2026.\n\n";
    $user_body .= "Hemos recibido tu solicitud de registro y nos pondremos en contacto contigo pronto.\n\n";
    $user_body .= "Saludos,\n";
    $user_body .= "Universidad Alquimia";

    wp_mail($email, $user_subject, $user_body, $headers);

    wp_send_json_success(array(
        'message' => '¡Gracias por tu registro! Te contactaremos pronto.'
    ));
}
add_action('wp_ajax_qvilibrio_register', 'qvilibrio_handle_registration');
add_action('wp_ajax_nopriv_qvilibrio_register', 'qvilibrio_handle_registration');

// ============================================
// Crear Tabla de Base de Datos
// ============================================
function qvilibrio_create_database_table()
{
    global $wpdb;

    $table_name = $wpdb->prefix . 'qvilibrio_registrations';
    $charset_collate = $wpdb->get_charset_collate();

    $sql = "CREATE TABLE IF NOT EXISTS $table_name (
        id mediumint(9) NOT NULL AUTO_INCREMENT,
        name varchar(255) NOT NULL,
        email varchar(255) NOT NULL,
        phone varchar(50) NOT NULL,
        message text,
        created_at datetime DEFAULT CURRENT_TIMESTAMP NOT NULL,
        PRIMARY KEY  (id),
        KEY email (email)
    ) $charset_collate;";

    require_once(ABSPATH . 'wp-admin/includes/upgrade.php');
    dbDelta($sql);
}
register_activation_hook(__FILE__, 'qvilibrio_create_database_table');

// ============================================
// ACF Fields Configuration (si usas ACF)
// ============================================
if (function_exists('acf_add_local_field_group')) {
    acf_add_local_field_group(array(
        'key' => 'group_qvilibrio',
        'title' => 'Qvilibrio 2026 - Configuración',
        'fields' => array(
            array(
                'key' => 'field_hero_title',
                'label' => 'Título Hero',
                'name' => 'hero_title',
                'type' => 'text',
                'default_value' => 'Qvilibrio 2026',
            ),
            array(
                'key' => 'field_hero_subtitle',
                'label' => 'Subtítulo Hero',
                'name' => 'hero_subtitle',
                'type' => 'text',
                'default_value' => 'Un encuentro para reconectar con tu esencia',
            ),
            array(
                'key' => 'field_hero_background',
                'label' => 'Imagen de Fondo Hero',
                'name' => 'hero_background_image',
                'type' => 'image',
                'return_format' => 'array',
            ),
            array(
                'key' => 'field_event_date',
                'label' => 'Fecha del Evento',
                'name' => 'event_date',
                'type' => 'text',
                'default_value' => '28 - 30 de marzo, 2026',
            ),
            array(
                'key' => 'field_event_location',
                'label' => 'Ubicación del Evento',
                'name' => 'event_location',
                'type' => 'text',
                'default_value' => 'Centro de Retiros Alquimia',
            ),
            array(
                'key' => 'field_event_tags',
                'label' => 'Tags del Evento',
                'name' => 'event_tags',
                'type' => 'repeater',
                'sub_fields' => array(
                    array(
                        'key' => 'field_tag_name',
                        'label' => 'Nombre del Tag',
                        'name' => 'tag_name',
                        'type' => 'text',
                    ),
                ),
            ),
        ),
        'location' => array(
            array(
                array(
                    'param' => 'page_template',
                    'operator' => '==',
                    'value' => 'wordpress-template.php',
                ),
            ),
        ),
    ));

    // Options page para configuración global
    acf_add_options_page(array(
        'page_title' => 'Configuración Qvilibrio',
        'menu_title' => 'Qvilibrio Config',
        'menu_slug' => 'qvilibrio-config',
        'capability' => 'edit_posts',
        'redirect' => false
    ));

    acf_add_local_field_group(array(
        'key' => 'group_qvilibrio_options',
        'title' => 'Configuración Global',
        'fields' => array(
            array(
                'key' => 'field_phone_number',
                'label' => 'Número de Teléfono',
                'name' => 'phone_number',
                'type' => 'text',
            ),
            array(
                'key' => 'field_instagram_url',
                'label' => 'URL de Instagram',
                'name' => 'instagram_url',
                'type' => 'url',
            ),
            array(
                'key' => 'field_facebook_url',
                'label' => 'URL de Facebook',
                'name' => 'facebook_url',
                'type' => 'url',
            ),
        ),
        'location' => array(
            array(
                array(
                    'param' => 'options_page',
                    'operator' => '==',
                    'value' => 'qvilibrio-config',
                ),
            ),
        ),
    ));
}

// ============================================
// Shortcode para Mostrar Formulario
// ============================================
function qvilibrio_registration_form_shortcode()
{
    ob_start();
    ?>
    <form class="qvilibrio-form" id="qvilibrioRegistrationForm">
        <div class="form-group">
            <label for="qv_name" class="form-label">Nombre completo *</label>
            <input type="text" id="qv_name" name="name" class="form-input" required>
        </div>

        <div class="form-group">
            <label for="qv_email" class="form-label">Correo electrónico *</label>
            <input type="email" id="qv_email" name="email" class="form-input" required>
        </div>

        <div class="form-group">
            <label for="qv_phone" class="form-label">Teléfono *</label>
            <input type="tel" id="qv_phone" name="phone" class="form-input" required>
        </div>

        <div class="form-group">
            <label for="qv_message" class="form-label">¿Por qué quieres participar en Qvilibrio?</label>
            <textarea id="qv_message" name="message" class="form-input form-textarea" rows="4"></textarea>
        </div>

        <div class="form-group form-checkbox">
            <input type="checkbox" id="qv_terms" name="terms" required>
            <label for="qv_terms" class="form-checkbox-label">
                Acepto los términos y condiciones y la política de privacidad
            </label>
        </div>

        <button type="submit" class="btn btn--primary btn--full">
            Enviar solicitud
        </button>
    </form>

    <script>
        jQuery(document).ready(function ($) {
            $('#qvilibrioRegistrationForm').on('submit', function (e) {
                e.preventDefault();

                var formData = {
                    action: 'qvilibrio_register',
                    nonce: qvilibrioData.nonce,
                    name: $('#qv_name').val(),
                    email: $('#qv_email').val(),
                    phone: $('#qv_phone').val(),
                    message: $('#qv_message').val(),
                    terms: $('#qv_terms').is(':checked')
                };

                var $button = $(this).find('button[type="submit"]');
                var originalText = $button.text();
                $button.text('Enviando...').prop('disabled', true);

                $.ajax({
                    url: qvilibrioData.ajaxUrl,
                    type: 'POST',
                    data: formData,
                    success: function (response) {
                        if (response.success) {
                            alert(response.data.message);
                            $('#qvilibrioRegistrationForm')[0].reset();
                        } else {
                            alert(response.data.message);
                        }
                    },
                    error: function () {
                        alert('Error al enviar el formulario. Por favor, intenta nuevamente.');
                    },
                    complete: function () {
                        $button.text(originalText).prop('disabled', false);
                    }
                });
            });
        });
    </script>
    <?php
    return ob_get_clean();
}
add_shortcode('qvilibrio_form', 'qvilibrio_registration_form_shortcode');

// ============================================
// Admin Page para Ver Registros
// ============================================
function qvilibrio_admin_menu()
{
    add_menu_page(
        'Registros Qvilibrio',
        'Qvilibrio',
        'manage_options',
        'qvilibrio-registrations',
        'qvilibrio_registrations_page',
        'dashicons-tickets-alt',
        30
    );
}
add_action('admin_menu', 'qvilibrio_admin_menu');

function qvilibrio_registrations_page()
{
    global $wpdb;
    $table_name = $wpdb->prefix . 'qvilibrio_registrations';

    $registrations = $wpdb->get_results("SELECT * FROM $table_name ORDER BY created_at DESC");

    ?>
    <div class="wrap">
        <h1>Registros de Qvilibrio 2026</h1>

        <table class="wp-list-table widefat fixed striped">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Nombre</th>
                    <th>Email</th>
                    <th>Teléfono</th>
                    <th>Mensaje</th>
                    <th>Fecha</th>
                </tr>
            </thead>
            <tbody>
                <?php if ($registrations): ?>
                    <?php foreach ($registrations as $reg): ?>
                        <tr>
                            <td>
                                <?php echo esc_html($reg->id); ?>
                            </td>
                            <td>
                                <?php echo esc_html($reg->name); ?>
                            </td>
                            <td><a href="mailto:<?php echo esc_attr($reg->email); ?>">
                                    <?php echo esc_html($reg->email); ?>
                                </a></td>
                            <td>
                                <?php echo esc_html($reg->phone); ?>
                            </td>
                            <td>
                                <?php echo esc_html(wp_trim_words($reg->message, 10)); ?>
                            </td>
                            <td>
                                <?php echo esc_html($reg->created_at); ?>
                            </td>
                        </tr>
                    <?php endforeach; ?>
                <?php else: ?>
                    <tr>
                        <td colspan="6">No hay registros aún.</td>
                    </tr>
                <?php endif; ?>
            </tbody>
        </table>

        <p>
            <a href="<?php echo admin_url('admin.php?page=qvilibrio-registrations&export=csv'); ?>"
                class="button button-primary">
                Exportar a CSV
            </a>
        </p>
    </div>
    <?php
}

// ============================================
// Exportar Registros a CSV
// ============================================
function qvilibrio_export_csv()
{
    if (
        isset($_GET['page']) && $_GET['page'] === 'qvilibrio-registrations' &&
        isset($_GET['export']) && $_GET['export'] === 'csv'
    ) {

        if (!current_user_can('manage_options')) {
            wp_die('No tienes permisos para realizar esta acción.');
        }

        global $wpdb;
        $table_name = $wpdb->prefix . 'qvilibrio_registrations';
        $registrations = $wpdb->get_results("SELECT * FROM $table_name ORDER BY created_at DESC", ARRAY_A);

        header('Content-Type: text/csv; charset=utf-8');
        header('Content-Disposition: attachment; filename=qvilibrio-registrations-' . date('Y-m-d') . '.csv');

        $output = fopen('php://output', 'w');

        // Headers
        fputcsv($output, array('ID', 'Nombre', 'Email', 'Teléfono', 'Mensaje', 'Fecha'));

        // Data
        foreach ($registrations as $reg) {
            fputcsv($output, $reg);
        }

        fclose($output);
        exit;
    }
}
add_action('admin_init', 'qvilibrio_export_csv');

// ============================================
// Seguridad: Deshabilitar XML-RPC
// ============================================
add_filter('xmlrpc_enabled', '__return_false');

// ============================================
// Optimización: Remover jQuery Migrate
// ============================================
function qvilibrio_remove_jquery_migrate($scripts)
{
    if (!is_admin() && isset($scripts->registered['jquery'])) {
        $script = $scripts->registered['jquery'];
        if ($script->deps) {
            $script->deps = array_diff($script->deps, array('jquery-migrate'));
        }
    }
}
add_action('wp_default_scripts', 'qvilibrio_remove_jquery_migrate');

// ============================================
// Optimización: Defer JavaScript
// ============================================
function qvilibrio_defer_scripts($tag, $handle, $src)
{
    $defer_scripts = array('qvilibrio-main', 'lenis-smooth-scroll');

    if (in_array($handle, $defer_scripts)) {
        return str_replace(' src', ' defer src', $tag);
    }

    return $tag;
}
add_filter('script_loader_tag', 'qvilibrio_defer_scripts', 10, 3);
