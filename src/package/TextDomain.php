<?php
/**
 * Object represents a Text Domain within a bundle.
 */
class Loco_package_TextDomain extends ArrayIterator {

    /**
     * Actual Gettext-like name of Text Domain, e.g. "twentyfifteen"
     * @var string
     */
    private $name;

    /**
     * Whether this is the officially declared domain for a theme or plugin
     * @var bool
     */
    private $canonical = false;


    /**
     * Create new Text Domain from its name
     */
    public function __construct( $name ){
        parent::__construct();
        $this->name = (string) $name;
    }


    /**
     * @internal
     */
    public function __toString(){
        return $this->name;
    }


    /**
     * Get name of Text Domain, e.g. "twentyfifteen"
     * @return string
     */
    public function getName(){
        return $this->name;
    }


    /**
     * Create a named project in a given bundle for this Text Domain
     * @param Loco_package_Bundle $bundle of which this is one set of translations
     * @param string $name
     * @return Loco_package_Project
     */
    public function createProject( Loco_package_Bundle $bundle, $name ){
        $proj = new Loco_package_Project( $bundle, $this, $name );
        $this[] = $proj;

        return $proj;
    }


    /**
     * @param bool $bool
     * @return Loco_package_TextDomain
     */
    public function setCanonical( $bool ){
        $this->canonical = (bool) $bool;
        return $this;
    }


    /**
     * @return bool
     */
    public function isCanonical(){
        return $this->canonical;
    }

}
