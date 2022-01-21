### Create user functions in zsh

1. Create a new folder called `.zshfunctions` in your home directory
    ```shell
    mkdir ~/.zshfunctions
    ```
2. Create a file in there of the function you would like, and inside define the function
    
    ```shell
    micro ~/.zshfunctions/test # Create File
    test() {
    	echo "test"
    }
    ```
    
3. Add to the bottom of your `.zshrc` file add the folder to the `fpath`, and autoload the file. To make every file in the folder autoload, you can copy/paste the following into your `.zshrc` file:
    
    ```shell
    fpath=( ~/.zshfunctions "${fpath[@]}" )
    autoload -Uz $fpath[1]/*(.:t)
    ```
    
4. Reboot the terminal, and now it should allow the function to be used.