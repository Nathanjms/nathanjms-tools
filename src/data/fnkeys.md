### To make FN keys work properly
 
 Run the following:
 
1. `echo options hid_apple fnmode=0 | sudo tee -a /etc/modprobe.d/hid_apple.conf`
2. `sudo mkinitcpio -p linuxX`, where `X` is the linux kernel (eg linux59 for v5.9).


___

### Sources

* [https://help.ubuntu.com/community/AppleKeyboard#Change_Function_Key_behavior](https://help.ubuntu.com/community/AppleKeyboard#Change_Function_Key_behavior)
* [https://classicforum.manjaro.org/index.php?topic=25467.0](https://classicforum.manjaro.org/index.php?topic=25467.0)
