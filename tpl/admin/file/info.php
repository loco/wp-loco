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
            You can update these translations directly from the editor to the file system.
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
            This file can't be updated directly by the web server.
        </p>
        <p>
            To make changes you'll have to connect to the remote file system, or make the file writable by <?php $params->e('httpd')?>.
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
            The containing directory is writable by <?php $params->e('httpd')?>, so you can add new files in the same location.
        </p>
        <p>
            <code><?php $dir->ls()?></code>
        </p><?php
        if( ! $file->deletable ):?> 
        <p>
            <span class="has-icon icon-warn"></span>
            Note that the file may not be deletable due to additional ownership permissions.
        </p><?php
        endif;?> 
    </div><?php

    else:?> 
    <div class="notice inline notice-locked">
        <h3 class="has-icon">
            Directory is write-protected
        </h3>
        <p>
            This directory can't be written to directly by the web server.
        </p>
        <p>
            To create new files here you'll have to connect to the remote file system, or make the directory writable by <?php $params->e('httpd')?>.
        </p>
        <p>
            <code><?php $dir->ls()?></code>
        </p>
    </div><?php
    endif; 

    
    