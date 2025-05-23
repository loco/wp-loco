<?php
/**
 * Common access to bundle headers.
 * Because access to theme and plugin header data via WordPress is a total mess.
 * 
 * @property-read string $Name
 * @property-read string $Version
 * @property-read string $Author
 * @property-read string $AuthorURI
 * @property-read string $PluginURI
 * @property-read string $ThemeURI
 * @property-read string $TextDomain
 * @property-read string $DomainPath
 */
class Loco_package_Header {
    
    /**
     * WordPress's internal data
     * @var array|ArrayAccess
     */
    private $wp;    

    
    public function __construct( $header ){
        $this->wp = $header;
    }


    /**
     * @param string $prop
     * @return string
     */
    public function __get( $prop ){
        $wp = $this->wp;
        // prefer "get" method to access raw properties (WP_Theme)
        if( is_object($wp) && method_exists($wp,'get') ){
            $value = $wp->get($prop);
            if( is_string($value) && '' !== $value ){
                return $value;
            }
        }
        // may have key directly, e.g. TextDomain in plugin array
        if( isset($wp[$prop]) ){
            return $wp[$prop];
        }
        // else header not defined, which is probably fine
        return '';
    }


    /**
     * @param string $prop  
     * @param mixed $value
     * @codeCoverageIgnore
     */
    public function __set( $prop, $value ){
        throw new LogicException('Read only');
    }


    /**
     * Get bundle author as linked text, just like the WordPress plugin list does
     * @return string escaped HTML
     */
    public function getAuthorLink():string {
        if( ( $link = $this->AuthorURI ) || ( $link = $this->PluginURI ) || ( $link = $this->ThemeURI ) ){
            $author = $this->Author or $author = $link;
            return '<a href="'.esc_url($link).'" target="_blank">'.esc_html($author).'</a>';
        }
        return '';
    }


    /**
     * Get "name" by <author> credit
     * @return string escaped HTML
     */
    public function getAuthorCredit(): string {
        if( $author = $this->Author ){
            $author = esc_html( strip_tags($author) );
            if( $link = $this->AuthorURI ){
                $author = '<a href="'.esc_url($link).'" target="_blank">'.$author.'</a>';
            }
        }
        else {
            $author = __('Unknown author','loco-translate');
        }
        // translators: Author credit: (1) Product name (2) version number, (3) author name.
        $html = wp_kses( sprintf( __('"%1$s" %2$s by %3$s','loco-translate'), $this->Name, $this->Version, $author ), ['a'=>['href'=>true,'target'=>true]], ['http','https'] );
        
        $link = $this->PluginURI ?: $this->ThemeURI;
        if( $link ){
            $html .= sprintf( ' &mdash; <a href="%s" target="_blank">%s</a>', esc_url($link), esc_html(__('Visit official site','loco-translate')) );
        }
        
        return $html;
    }


    /**
     * Get hostname of vendor that hosts theme/plugin
     * @return string e.g. "wordpress.org"
     */
    public function getVendorHost(): string {
        $host = '';
        if( ( $url = $this->PluginURI ) || ( $url = $this->ThemeURI ) ){
            if( $host = parse_url($url,PHP_URL_HOST) ){
                $bits = explode( '.', $host );
                $host = implode( '.', array_slice($bits,-2) );
            }
        }
        return $host;
    }

}