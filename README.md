# capture-SFTP-file-changes
 
This app will capture file changes between last runtime and current time. It will automatically adjust config.json file last_runtime accordingly.

## Method 1: Use npm
1. Configure config_result/config.json parameters according to your SFTP server configuration.
2. Run ```npm install``` to install all necessary packages.
3. Run ```npm start```.
4. The app will output config_result/list_of_file_change.json that contain list of file change since last runtime.

## Method 2: Use Docker
1. Configure config_result/config.json parameters according to your SFTP server configuration.
2. Create a docker image using the command ```docker build -t sftp-file-change-node .```.
3. Run the image and mount your local config_result folder using the following command ```docker run -d -v ./config_result/:/home/node/app/config_result/ sftp-file-change-node```.
4. After first run, a container will be created. You can run the container directly for next run.
5. The app will output config_result/list_of_file_change.json that contain list of file change since last runtime.
