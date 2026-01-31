#!/bin/bash
# Deployment script for portfolio-fe to Tencent Cloud
# Usage: ./deploy/deploy.sh [server-ip]

set -e  # Exit on error

# Configuration
SERVER_IP="${1:-124.220.28.49}"
SSH_KEY="~/.ssh/ssh_tencent.pem"
REMOTE_USER="ubuntu"
REMOTE_DIR="~/portfolio-fe"
CONTAINER_NAME="portfolio-fe"

echo "======================================"
echo "Deploying portfolio-fe to ${SERVER_IP}"
echo "======================================"

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Step 1: Build locally
echo -e "${YELLOW}[1/5] Building frontend locally...${NC}"
npm run build

# Step 2: Copy files to server
echo -e "${YELLOW}[2/5] Copying files to server...${NC}"
rsync -avz --exclude='node_modules' --exclude='.next' --exclude='out' \
  -e "ssh -i ${SSH_KEY}" \
  . ${REMOTE_USER}@${SERVER_IP}:${REMOTE_DIR}/

# Step 3: Rebuild and restart container
echo -e "${YELLOW}[3/5] Rebuilding Docker container...${NC}"
ssh -i ${SSH_KEY} ${REMOTE_USER}@${SERVER_IP} << 'ENDSSH'
cd ~/portfolio-fe
sudo docker-compose down
sudo docker-compose build
sudo docker-compose up -d
ENDSSH

# Step 4: Wait for container to be healthy
echo -e "${YELLOW}[4/5] Waiting for container to start...${NC}"
sleep 5

# Step 5: Verify deployment
echo -e "${YELLOW}[5/5] Verifying deployment...${NC}"
HTTP_STATUS=$(ssh -i ${SSH_KEY} ${REMOTE_USER}@${SERVER_IP} \
  "curl -s -o /dev/null -w '%{http_code}' http://localhost/")

if [ "$HTTP_STATUS" = "200" ]; then
  echo -e "${GREEN}✅ Deployment successful!${NC}"
  echo "Frontend is accessible at: http://${SERVER_IP}/"
  echo ""
  echo "To check logs:"
  echo "  ssh -i ${SSH_KEY} ${REMOTE_USER}@${SERVER_IP} 'sudo docker logs ${CONTAINER_NAME}'"
else
  echo -e "${YELLOW}⚠️  Deployment completed but frontend returned HTTP ${HTTP_STATUS}${NC}"
  echo "Check logs with:"
  echo "  ssh -i ${SSH_KEY} ${REMOTE_USER}@${SERVER_IP} 'sudo docker logs ${CONTAINER_NAME}'"
  exit 1
fi
