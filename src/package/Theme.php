<?php
/**
 * Represents a bundle of type "theme"
 */
class Loco_package_Theme extends Loco_package_Bundle {

    /**
     * @var Loco_package_Theme|null
     */
    private $parent;


    /**
     * {@inheritdoc}
     */
    public function getSystemTargets():array {
        return  [ 
            trailingslashit( loco_constant('LOCO_LANG_DIR') ).'themes',
            trailingslashit( loco_constant('WP_LANG_DIR') ).'themes',
        ];
    }


    /**
     * {@inheritdoc}
     */
    public function isTheme():bool {
        return true;
    }


    /**
     * {@inheritdoc}
     */
    public function getType():string {
        return 'Theme';
    }


    /**
     * {@inheritDoc}
     */
    public function getDirectoryUrl(): string {
        $slug = $this->getHandle();
        return trailingslashit(get_theme_root_uri($slug)).$slug.'/';
    }


    /**
     * {@inheritdoc}
     */
    public function getHeaderInfo(): Loco_package_Header {
        $root = dirname( $this->getDirectoryPath() );
        $theme = new WP_Theme( $this->getSlug(), $root );
        return new Loco_package_Header( $theme );
    }


    /**
     * {@inheritdoc}
     */
    public function getMetaTranslatable(): array {
        return  [
            'Name'        => 'Name of the theme',
            'Description' => 'Description of the theme',
            'ThemeURI'    => 'URI of the theme',
            'Author'      => 'Author of the theme',
            'AuthorURI'   => 'Author URI of the theme',
            // 'Tags'        => 'Tags of the theme',
        ];
    }


    /**
     * @inheritDoc
     */
    public function getParent(): ?Loco_package_Theme {
        return $this->parent;
    }


    /**
     * @return static[]
     */
    public static function getAll(): array {
        $themes = [];
        foreach( wp_get_themes(['errors'=>null]) as $theme ){
            try {
                $themes[] = self::createFromTheme($theme);
            }
            catch( Exception $e ){
                // @codeCoverageIgnore
            }
        }
        return $themes;
    }


    /**
     * Create theme bundle definition from WordPress theme handle 
     * 
     * @param string $slug Short name of theme, e.g. "twentyfifteen"
     * @param string $root Theme root if known
     * @return self
     */
    public static function create( string $slug, string $root = '' ):self {
        return self::createFromTheme( wp_get_theme( $slug, $root ) );
    }


    /**
     * Create theme bundle definition from WordPress theme data 
     */
    public static function createFromTheme( WP_Theme $theme ):self {
        $slug = $theme->get_stylesheet();
        $base = $theme->get_stylesheet_directory();
        $name = $theme->get('Name') or $name = $slug;
        if( ! $theme->exists() ){
            throw new Loco_error_Exception('Theme not found: '.$name );
        }

        $bundle = new Loco_package_Theme( $slug, $name );
        
        // ideally theme has declared its TextDomain
        // if not, we can see if the Domain listener has picked it up 
        $domain = $theme->get('TextDomain') ?: Loco_package_Listener::singleton()->getDomain($slug);
        // otherwise we won't try to guess as it results in silent problems when guess is wrong
        
        // ideally theme has declared its DomainPath. if not, we can see if the listener has picked it up 
        // otherwise project will use theme root by default
        $target = $theme->get('DomainPath') ?: Loco_package_Listener::singleton()->getDomainPath($domain);

        $bundle->configure( $base,  [
            'Name' => $name,
            'TextDomain' => $domain,
            'DomainPath' => $target,
        ] );
        
        // parent theme inheritance:
        if( $parent = $theme->parent() ){
            try {
                $bundle->parent = self::createFromTheme($parent);
                $bundle->inherit( $bundle->parent );
            }
            catch( Loco_error_Exception $e ){
                Loco_error_AdminNotices::add($e);
            }
        }
        return $bundle;
    }


    /**
     * {@inheritDoc}
     */
    public static function fromFile( Loco_fs_File $file ):?Loco_package_Bundle {
        $find = $file->getPath();
        foreach( wp_get_themes( ['errors'=>null] ) as $theme ){
            $base = $theme->get_stylesheet_directory();
            $path = $base.substr( $find, strlen($base) );
            if( $find === $path ){
                return self::createFromTheme($theme);
            }
        }
        return null;
    }

}
