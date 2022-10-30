# FINTEPLA NOW SITE QA TOOL

#### Steps to use the Backstop JS Tool:

1.  You need to have the following tools installed into your computer:
    [iTerm Console](https://www.iterm2.com/downloads.html).

2.  Disable the Netscope Client to do the following steps:
    [NVM](https://github.com/nvm-sh/nvm)

3.  Backstop JS (https://garris.github.io/BackstopJS/) use this command in console to install
    `nvm use --lts`
    `npm install -g backstopjs`

4.  On the source.txt file you can customize the URLs without the domain (/industries) in order to validate the urls. Note: both environments requires the same url structure.

5.  On the .env file you can edit the reference and source Environments. Also, you can edit the viewports to show any viewport in the results.

6.  If the server has a password-protected, you can type in the reference and source Environments, the following instruction: https://user:password@{URL}

7.  On the iTem console types the following instruction:
    `sh /{FOLDER-PATH}/backstop-generate.sh`

8.  When the script is ready, a report like this is opened on the Internet browser.

9.  On this report you can find 3 columns (Reference, Test and Difference) in the Difference Column you can see the differences between Reference and Test Environments. At the top in the left side, you can select the All, Passed or Failed Pages.

Note: check that your netskope client is disabled.
