<?php
/**
 * Object represents a Text Domain within a bundle.
 */
class Loco_package_TextDomain extends ArrayIterator {

    /**
     * Actual Gettext-like name of Text Domain, e.g. "twentyfifteen"
     */
    private string $name;

    /**
     * Whether this is the officially declared domain for a theme or plugin
     */
    private bool $canonical = false;


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
     */
    public function getName():string {
        return $this->name;
    }


    /**
     * Create a named project in a given bundle for this Text Domain
     * @param Loco_package_Bundle $bundle of which this is one set of translations
     */
    public function createProject( Loco_package_Bundle $bundle, string $name ): Loco_package_Project {
        $proj = new Loco_package_Project( $bundle, $this, $name );
        $this[] = $proj;

        return $proj;
    }


    /**
     * Set whether this is the officially declared domain
     */
    public function setCanonical( bool $bool ): self {
        $this->canonical = $bool;
        return $this;
    }


    /**
     * Check whether this is the officially declared domain
     */
    public function isCanonical():bool {
        return $this->canonical;
    }

}
