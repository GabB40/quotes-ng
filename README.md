# Citations

Project to test a CI/CD using GitHub Actions to deploy post-push on an Amazon Linux EC2 Instance

## Steps to do on EC2 Instance
- Create the required folder. In this test will be : `sudo mkdir -p /var/www/html/citations`
- Give permissions: `sudo chown -R $USER:$USER /var/www/html`
- Install nginx : `sudo yum install nginx`
- Enable and start nginx : `sudo systemctl enable nginx && sudo systemctl start nginx`
- Configure nginx file: 
  - first : `sudo nano /etc/nginx/nginx.conf`
  - next, update the server part:
```
server {
    listen       80;
    listen       [::]:80;
    server_name  _;
    root         /var/www/html/citations/browser;
    index index.html index.htm index.nginx-debian.html;
    location / {
            try_files $uri $uri/ /index.html;
    }

    ...
}
```

NB: this commands can be put in the boostrap file of the instance (`sudo` is not required then)

## add a Domain Name and HTTPS 
see [this doc sheet](https://docs.google.com/document/d/153xiwPDP9nRiOI_pdhIQ2f63YyabFE8UJw6_kmPEiAw/edit?tab=t.0) or [this video](https://www.youtube.com/watch?v=lXUzMjCZvJY)

