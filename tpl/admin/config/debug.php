<?php
/**
 * System diagnostics
 */
$this->extend('../layout');
?> 

    <div class="panel">
        <h3>Versions</h3>
        <dl><?php
        foreach( $versions as $key => $value ):?> 
            <dt>
                <?php echo $versions->escape($key)?>:
            </dt>
            <dd>
                <code class="path"><?php $versions->e($key)?></code>
            </dd><?php
        endforeach?> 
        </dl>
    </div>

    <!--div class="panel">
        <h3>Memory</h3>
        <dl><?php
        foreach( $memory as $key => $value ):?> 
            <dt>
                <?php echo $memory->escape($key)?>:
            </dt>
            <dd>
                <?php $memory->e($key)?> 
            </dd><?php
        endforeach?> 
        </dl>
    </div-->
    
    <div class="panel">
        <h3>Unicode</h3>
        <dl>
            <dt>UTF-8 rendering:</dt>
            <dd><?php echo $encoding->OK?> <span id="loco-utf8-check"><?php echo $encoding->tick?></span></dd>
            
            <dt>Multibyte support:</dt>
            <dd><?php echo $encoding->mbstring?'Yes':'No'?></dd>
        </dl>
    </div>

    <div class="panel">
        <h3>Ajax</h3>
        <dl>
            <dt>Endpoint:</dt>
            <dd><code id="loco-ajax-url" class="path">/wp-admin/admin-ajax.php</code></dd>
            
            <dt>JSON decoding:</dt>
            <dd><?php echo $encoding->json?></dd>

            <dt>Ajax test result:</dt>
            <dd id="loco-ajax-check"><span class="inline-spinner"> </span></dd>
        </dl>
    </div>
    

