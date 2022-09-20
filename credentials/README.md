# Credentials Folder

## The purpose of this folder is to store all credentials needed to log into your server and databases. This is important for many reasons. But the two most important reasons is
    1. Grading , servers and databases will be logged into to check code and functionality of application. Not changes will be unless directed and coordinated with the team.
    2. Help. If a class TA or class CTO needs to help a team with an issue, this folder will help facilitate this giving the TA or CTO all needed info AND instructions for logging into your team's server. 


# Below is a list of items required. Missing items will causes points to be deducted from multiple milestone submissions.

1. Server URL or IP: https://18.190.48.206
2. SSH username: ubuntu
3. SSH password or key.: rumi-20210906.pem
    <br> If a ssh key is used please upload the key to the credentials folder.
4. Database URL or IP and port used.: 127.0.0.1:3306
    <br><strong> NOTE THIS DOES NOT MEAN YOUR DATABASE NEEDS A PUBLIC FACING PORT.</strong> But knowing the IP and port number will help with SSH tunneling into the database. The default port is more than sufficient for this class.
5. Database username: rumiHost
6. Database password: csc648Rumi!
7. Database name (basically the name that contains all your tables): rumidb
8. Instructions on how to use the above information.: connect to the aws server using the command "ssh -i rumi-20210906.pem ubuntu@18.190.48.206" while in the same directory as the pem file in this folder. To access mysql from workbench, add a new connection switch Connection Method to SSH, add the following parameters:

SSH Hostname: 18.190.48.206
SSH Username: ubuntu
SSH password:
SSH key file: rumi-20210906.pem
MYSQL Hostname: 127.0.0.1
MYSQL Server Port: 3306
Username: rumiHost
Password: csc648Rumi!

# Most important things to Remember
## These values need to kept update to date throughout the semester. <br>
## <strong>Failure to do so will result it points be deducted from milestone submissions.</strong><br>
## You may store the most of the above in this README.md file. DO NOT Store the SSH key or any keys in this README.md file.
