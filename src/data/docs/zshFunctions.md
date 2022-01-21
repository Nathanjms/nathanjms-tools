### Create user functions in zsh

1. Create a new folder called `.zshfunctions` in your home directory
    1. `mkdir ~/.zshfunctions`
2. Create a file in there of the function you would like, and inside define the function
    1. i.e. `micro ~/.zshfunctions/test`
    
    ```bash
    test() {
    	echo "test"
    }
    ```
    
3. Add to the bottom of your `.zshrc` file add the folder to the `fpath`, and autoload the file. To make every file in the folder autoload, you can use the following:
    
    ```bash
    fpath=( ~/.zshfunctions "${fpath[@]}" )
    autoload -Uz $fpath[1]/*(.:t)
    ```
    
4. Reboot the terminal, and now it should allow the function to be used.