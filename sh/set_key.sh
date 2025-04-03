#!/bin/bash

# 1. Generate a 64-character random alphanumeric string
SECRET_KEY=$(LC_ALL=C tr -dc 'A-Za-z0-9' </dev/urandom | head -c 64)

# 2. Remove any existing SECURITY_SECRET_KEY entries from .bashrc
sed -i '/export SECURITY_SECRET_KEY=/d' ~/.bashrc

# 3. Append the new key to .bashrc
echo "export SECURITY_SECRET_KEY=$SECRET_KEY" >> ~/.bashrc

# 4. Apply it to the current session
export SECURITY_SECRET_KEY=$SECRET_KEY

# 5. Output result
echo "✅ SECURITY_SECRET_KEY has been generated and added to ~/.bashrc"
echo "🔐 Generated Key: $SECRET_KEY"
echo "🔑 To use this key, run 'source ~/.bashrc' or restart your terminal."
