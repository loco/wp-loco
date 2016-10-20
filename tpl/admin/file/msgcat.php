
    <div class="panel loading" id="loco-po">
        <ol class="msgcat"><?php
            foreach( $lines as $i => $line ):?> 
            <li id="po-l<?php printf('%u',$i+1)?>"><?php
            // may be totally blank line
            if( '' === $line ){
                echo '<span></span>';
                continue;
            }
            // may be a comment line
            if( '#' === $line{0} ){
                // may be able to parse out references
                if( isset($line{1}) ){
                    $symbol = $line{1};
                    if( ':' === $symbol ){
                        echo '<span class="po-refs">',preg_replace('/\\S+:\d+/', '<a href="/#\\0">\\0</a>', $params->escape($line) ),'</span>';
                        continue;
                    }
                    // parse out flags and formatting directives
                    else if( ',' === $symbol ){
                        echo '<span class="po-flags">',preg_replace('/[-a-z]+/', '<em>\\0</em>', $params->escape($line) ),'</span>';
                        continue;
                    }
                }
                // else treat as normal comment even if empty
                echo '<span class="po-comment">',$params->escape($line),'</span>';
                continue;
            }
            // grab keyword if there is one before quoted string
            if( preg_match('/^(msg[_a-z0-9\\[\\]]+)(\s+)/', $line, $r ) ){
                echo '<span class="po-word">',$params->escape($r[1]),'</span><span class="po-space">',$params->escape($r[2]),'</span>';
                $line = substr( $line, strlen($r[0]) );
            }
            // remainder of line (or whole line) should be a quoted string
            if( preg_match('/^"(.*)"\s*$/', $line, $r ) ){
                echo '<span class="po-string">&quot;<span>',$params->escape($r[1]),'</span>&quot;</span>';
                continue;
            }
            
            // else print whatever junk is left of line
            echo '<span class="po-junk">',$params->escape($line),'</span>';
            
            ?></li><?php
            endforeach?>
        </ol>
    </div>
