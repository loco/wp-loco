<?php
/**
 * System diagnostics
 */
$this->extend('../layout');

/* @var Loco_mvc_ViewParams $versions */
/* @var Loco_mvc_ViewParams $encoding */
?> 
    
        <div class="panel" id="loco-versions">
            <h3>
                Versions
                <a href="#loco-versions" class="loco-anchor" aria-hidden="true"></a>
            </h3>
            <dl><?php
            foreach( $versions as $key => $value ): if( $value ):?> 
                <dt>
                    <?php self::e($key)?>:
                </dt>
                <dd>
                    <code class="path" id="loco-vers-<?php self::e(strtolower(strtr($key,' ','-')))?>"><?php
                        $versions->e($key)?></code>
                </dd><?php
            endif; endforeach?> 
            </dl>
        </div>
    
        <div class="panel" id="loco-unicode">
            <h3>
                Unicode
                <a href="#loco-unicode" class="loco-anchor" aria-hidden="true"></a>
            </h3>
            <dl>
                <dt>UTF-8 rendering:</dt>
                <dd><?php echo $encoding->OK?> <span id="loco-utf8-check"><?php echo $encoding->tick?></span></dd>

                <dt>Multibyte support:</dt>
                <dd><?php $encoding->e('mbstring')?></dd>

                <dt>Site character set</dt>
                <dd><?php $encoding->e('charset')?></dd>
            </dl>
        </div>
    
        <div class="panel" id="loco-ajax">
            <h3>
                Ajax
                <a href="#loco-ajax" class="loco-anchor" aria-hidden="true"></a>
            </h3>
            <dl>
                <dt>Endpoint:</dt>
                <dd><code id="loco-ajax-url" class="path">/wp-admin/admin-ajax.php</code></dd>
                
                <dt>JSON decoding:</dt>
                <dd><?php echo $encoding->json?></dd>
    
                <dt class="jsonly">Ajax test result:</dt>
                <dd class="jsonly" id="loco-ajax-check"><span class="inline-spinner"> </span></dd>
            </dl>
        </div>

        <div class="panel" id="loco-apis">
            <h3>
                Translation APIs
                <a href="#loco-apis" class="loco-anchor" aria-hidden="true"></a>
            </h3>
            <dl><?php
                /* @var Loco_mvc_ViewParams[] $apis */
                foreach( $apis as $api ):?> 
                <dt><?php $api->e('name')?>:</dt>
                <dd class="jsonly" id="loco-api-<?php $api->e('id')?>"><span class="inline-spinner"> </span></dd><?php
                endforeach?> 
            </dl>
        </div>

        <div class="panel" id="loco-sizes">
            <h3>
                Limits
                <a href="#loco-sizes" class="loco-anchor" aria-hidden="true"></a>
            </h3>
            <dl><?php
            /* @var Loco_mvc_ViewParams $memory */    
            foreach( $memory as $key => $value ):?> 
                <dt>
                    <?php echo $memory->escape($key)?>:
                </dt>
                <dd>
                    <?php $memory->e($key)?> 
                </dd><?php
            endforeach?> 
            </dl>
        </div>
        
        <div class="panel" id="loco-files">
            <h3>
                Filesystem
                <a href="#loco-files" class="loco-anchor" aria-hidden="true"></a>
            </h3>
            <dl>
                <dt>File mods disallowed:</dt>
                <dd><?php echo $fs->disabled?'Yes':'No'?></dd>
                
                <dt>File mod safety level:</dt>
                <dd><?php $fs->e('fs_protect')?></dd><?php
                
                /* @var Loco_mvc_ViewParams[] $locations */
                foreach( $locations as $label => $f ):?> 
                <dt><?php echo $f->escape($label)?>:</dt>
                <dd><?php 
                    $f->e('path');
                    if( $f->writable ): echo ' ✓'; else:?> 
                    <span class="icon icon-warn" title="Not writable directly by PHP"></span><?php
                    endif?> 
                </dd><?php
                endforeach?> 
                <dt>PHP open_basedir:</dt>
                <dd><?php self::e(ini_get('open_basedir'))?></dd>
            </dl>
        </div>

        <div class="panel" id="loco-debug">
            <h3>
                Debug settings
                <a href="#loco-debug" class="loco-anchor" aria-hidden="true"></a>
            </h3>
            <dl><?php
            foreach( $debug as $key => $value ):?> 
                <dt>
                    <?php echo $debug->escape($key)?>:
                </dt>
                <dd>
                    <?php $debug->e($key)?> 
                </dd><?php
            endforeach?> 
            </dl>
        </div>
