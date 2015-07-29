# Loco WordPress Plugin

### Translate plugins and themes directly in your browser

Gitified version of the official Loco WordPress plugin:  
[http://wordpress.org/plugins/loco-translate/](http://wordpress.org/plugins/loco-translate/)

Please report issues in the WordPress plugin directory support forum:  
[http://wordpress.org/support/plugin/loco-translate](http://wordpress.org/support/plugin/loco-translate)

## Installation

Note that the actual name of the plugin is "loco-translate" not "wp-loco". It's renamed on Github to differentiate it as a WordPress plugin. 

Add the plugin to your WordPress project via Git as follows:

    $ git submodule add git@github.com:loco/wp-loco.git wp-content/plugins/loco-translate
    
If you want to use a stable release listed in the WordPress plugin directory, you can checkout by tag, e.g:

    $ cd wp-content/plugins/loco-translate 
    $ git fetch origin --tags
    $ git checkout tags/x.y.z
    
Be sure to check the latest version by typing `git tag` and replacing `x.y.z` in above example.
