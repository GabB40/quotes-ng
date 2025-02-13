# Citations

Project to test a CI/CD using GitHub Actions to deploy post-push on an Amazon Linux EC2 Instance

## Steps to do on EC2 Instance
- Create the required folder. In this test will be : `sudo mkdir -p /var/www/html/citations` (_not sure /citations is mandatory_)
- Give permissions: `sudo chown -R $USER:$USER /var/www`
- Install nginx : `sudo yum install nginx`
- Enable and start nginx : `sudo systemctl enable nginx && sudo systemctl start nginx`
- COnfigure nginx file: 
  - first : `sudo nano /etc/nginx/nginx.conf`
  - next, update the server part:
```
server {
    listen       80;
    listen       [::]:80;
    server_name  _;
    root         /var/www/html/citations;
    location / {
            try_files $uri /index.html;
    }

    ...
}
```
**Cette partie ne marche pas ! que ça soit avec try_files $uri $uri/ /index.html (=403) ou sans $uri/ (=500)**

NB: this commands can be put in the boostrap file of the instance (`sudo` is not required then)


