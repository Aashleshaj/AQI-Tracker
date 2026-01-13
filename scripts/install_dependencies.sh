#!/bin/bash

# Optional: update system and install Docker + Docker Compose
# (Skip if already installed on the AMI)
sudo yum update -y
sudo amazon-linux-extras install docker -y
sudo service docker start
sudo usermod -aG docker ec2-user

# Confirm docker compose availability (adjust if you use Docker plugin)
docker compose version