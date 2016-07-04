<?php
/**
 * File information for ony type of file. Extended by specific views for supported types
 */
$this->extend('../layout');
echo $header;
?> 

  
    <?php
    if( ! $file->existant ):?> 
    <div class="notice inline notice-error">
        <h3 class="has-icon">
            File doesn't exist
        </h3>
        <p>
            <code><?php $file->e('relpath')?></code>
        </p>
    </div><?php    
    elseif( $file->writable ):?> 
    <div class="notice inline notice-success">
        <h3 class="has-icon">
            <?php printf('%s file is writable',$file->type)?> 
        </h3>
        <p>
            File can be overwritten by the web server, so you can save translations directory from the editor.
        </p>
        <p>
            <code><?php $file->ls()?></code>
        </p>
    </div><?php
    else:?> 
    <div class="notice inline notice-locked">
        <h3 class="has-icon">
            File is write-protected
        </h3>
        <p>
            This file isn't writable by the web server. 
            You won't be able to save it through WordPress unless you alter its file permissions.
        </p>
        <p>
            <code><?php $file->ls()?></code>
        </p>
    </div><?php
    endif;


    if( ! $dir->existant ):?> 
    <div class="notice inline notice-error">
        <h3 class="has-icon">
            Directory doesn't exist
        </h3>
        <p>
            The containing directory for this file doesn't exist either
        </p>
        <p>
            <code><?php $dir->e('relpath')?></code>
        </p>
    </div><?php

    elseif( $dir->writable ):?> 
    <div class="notice inline notice-success">
        <h3 class="has-icon">
            Directory is writable
        </h3>
        <p>
            The containing directory is writable by the web server, so you can add new files in the same location.
        </p>
        <p>
            <code><?php $dir->ls()?></code>
        </p><?php
        if( ! $file->deletable ):?> 
        <p>
            <span class="has-icon icon-warn"></span>
            Note that the file can't be deleted due to additional ownership permissions.
        </p><?php
        endif;?> 
    </div><?php

    else:?> 
    <div class="notice inline notice-locked">
        <h3 class="has-icon">
            Directory is write-protected
        </h3>
        <p>
            You won't be able to create new files here unless you change the directory permissions.
        </p>
        <p>
            <code><?php $dir->ls()?></code>
        </p>
    </div><?php
    endif; 

    
    