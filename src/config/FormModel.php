<?php
/**
 * Provides a bridge between the full serializable array model and POSTDATA array.
 * 
 * Key differences between form data and the DOM are:
 * - form fields cannot express attributes
 * - form fields uses line breaks to separate multiple nodes
 */
class Loco_config_FormModel extends Loco_config_ArrayModel {


    /**
     * Export array data that matches the format used in postdata
     * @return Loco_mvc_PostParams
     */
    public function getPost(){
        $dom = $this->getDom();
        $root = $dom->documentElement;
        $post = new Loco_mvc_PostParams(  [
            'name' => $root->getAttribute('name'),
            'exclude' =>  [
                'path' => '',
            ],
            'conf' => [],
        ] );
        /* @var LocoConfigElement $domain */
        foreach( $this->query('domain',$root) as $domain ){
            $domainName = $domain->getAttribute('name');
            /* @var LocoConfigElement $project */
            foreach( $domain as $project ){
                $tree =  [
                    'name' => $project->getAttribute('name'),
                    'slug' => $project->getAttribute('slug'),
                    'domain' => $domainName,
                    'source' =>  [
                        'path' => '',
                        'exclude' => [ 'path' => '' ],
                    ],
                    'target' =>  [
                        'path' => '',
                        'exclude' => [ 'path' => '' ],
                    ],
                    'template' => [ 'path' => '', 'locked' => false ],
                ];
                $post['conf'][] = $this->collectPaths( $project, $tree );
            }
        }
        /* @var LocoConfigElement $paths */
        foreach( $this->query('exclude',$root) as $paths ){
            $post['exclude'] = $this->collectPaths( $paths, $post['exclude'] );
        }
        
        return $post;
    }



    private function collectPaths( LocoConfigElement $parent, array $branch ){
        $texts = [];
        foreach( $parent as $child ){
            $name = $child->nodeName;
            // all file types as "path" in form model
            if( 'file' === $name || 'directory' === $name ){
                $name = 'path';
            }
            if( isset($branch[$name]) ){
                // collect text if child is a <path> node
                if( 'path' === $name ){
                    $file = $this->evaluateFileElement($child);
                    $path = $file->getRelativePath( $this->getDirectoryPath() );
                    if( '' === $path ){
                        $path = '.';
                    }
                    $texts[] = $path;
                }
                // else could be simple key to next depth
                else if( is_array($branch[$name]) ){
                    $branch[$name] = $this->collectPaths( $child, $branch[$name] );
                }
            }
            // @codeCoverageIgnoreStart
            else {
                throw new Exception('Unexpected structure: '.$name.' not in '.json_encode($branch) );
            }
            // @codeCoverageIgnoreEnd
        }
        // parent may have attributes we can set in branch data
        foreach( $branch as $name => $default ){
            if( $parent->hasAttribute($name) ){
                if( is_bool($default) ){
                    $branch[$name] = $this->evaluateBooleanAttribute($parent, $name);
                }
                else {
                    $branch[$name] = $parent->getAttribute($name);
                }
            }
        }
        // set compiled path values if any collected
        if( $texts ){
            $value = implode("\n", $texts );
            // display single root path as empty, but not when additional paths defined
            if( '.' === $value ){
                $branch['path'] = '';
            }
            else {
                $branch['path'] = $value;
            }
        }
        return $branch;
    }



    /**
     * Construct model from posted form data.
     * @return void
     */
    public function loadForm( Loco_mvc_PostParams $post ){
        // basic validation unlikely to fail when posted from UI
        $name = $post->name;
        if( ! $name ){
            throw new InvalidArgumentException('Bundle must have a name');
        }
        $confs = $post->conf;
        if( ! $confs || ! is_array($confs) ){
            throw new InvalidArgumentException('Bundle must have at least one definition');
        }
        // transform posted data into internal model:
        // deliberately not configuring bundle object at this point. simply converting data for storage.
        $dom = $this->getDom();
        $root = $dom->createElement('bundle');
        $root->setAttribute( 'name', $name );
        $dom->appendChild($root);
        
        // bundle level excluded paths
        if( $nodes = array_intersect_key( $post->getArrayCopy(), [ 'exclude' => '' ] ) ) {
            $this->loadStruct( $root, $nodes );
        }
        
        // collect all projects grouped by domain
        $domains = [];
        foreach( $confs as $conf ){
            if( ! empty($conf['removed']) ){
                continue;
            }
            if( empty($conf['domain']) ){
                throw new InvalidArgumentException( __('Text Domain cannot be empty','loco-translate') );
            }
            $domains[ $conf['domain'] ][] = $project = $dom->createElement('project');
            // project attributes
            foreach( ['name','slug'] as $attr ){
                if( isset($conf[$attr]) ){
                    $project->setAttribute( $attr, $conf[$attr] );
                }
            }
            // project children
            if( $nodes = array_intersect_key( $conf, [ 'source' => '', 'target' => '', 'template' => '' ] ) ) {
                $this->loadStruct( $project, $nodes );
            }
        }
        // add all domains and their projects 
        foreach( $domains as $name => $projects ){
            $parent = $dom->createElement('domain');
            $parent->setAttribute('name',$name);
            $root->appendChild($parent);
            /* @var $project LocoConfigElement */
            foreach( $projects as $project ){
                $parent->appendChild( $project );
            }
        }
    }


    
    /**
     * Recursively add array structure into model.
     * - Text nodes are split into one parent element per line.
     * - Elements added here cannot have attributes, but are not expected to as they came from form fields
     */
    private function loadStruct( LocoConfigElement $parent, array $nodes ){
        $dom = $this->getDom();
        foreach( $nodes as $name => $data ){
            if( is_string($data) ){
                // support common path containing elements
                if( 'file' === $name || 'directory' === $name || 'path' === $name ){
                    // form model has multiline "path" nodes which we'll expand from non-empty lines
                    // resolving empty paths to "." must be done elsewhere. here empty means ignore.
                    foreach( preg_split('/[\\r\\n]+/', trim( $data,"\n\r"), -1, PREG_SPLIT_NO_EMPTY ) as $path ){
                        $ext = pathinfo( $path, PATHINFO_EXTENSION );
                        $child = $parent->appendChild( $dom->createElement( $ext ? 'file' : 'directory' ) );
                        $child->appendChild( $dom->createTextNode($path) );
                    }
                }
                // else assume value is an attribute
                else {
                    $parent->setAttribute( $name, $data );
                }
            }
            else if( is_bool($data) ){
                $data ? $parent->setAttribute($name,'true') : $parent->removeAttribute($name);
            }
            else if( ! is_array($data) ){
                throw new InvalidArgumentException('Invalid datatype');
            }
            else {
                $child = $dom->createElement($name);
                $parent->appendChild($child);
                $this->loadStruct( $child, $data );
            }
        }
     }    
    
    
}
