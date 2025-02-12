# Citations

Project to test a CI/CD using GitHub Actions to deploy post-push on an Amazon Linux EC2 Instance

## Steps to do on EC2 Instance
- Create the required folder. In this test will be : `sudo mkdir -p /var/www/html/citations` (_not sure /citations is mandatory_)
- Give permissions: `sudo chown -R $USER:$USER /var/www`

NB: this commands can be put in the boostrap file of the instance (`sudo` is not required then)


