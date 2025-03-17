#!/bin/bash

# Get the last commit message and remove new lines
commit_message=$(git log -1 --pretty=%B | tr -d '\n')

# Check if the commit message matches the updated regex
if ! echo "$commit_message" | grep -qE '^\[Main-\d+\] - .+$'; then
    echo "ERROR: Commit message does not match format '[Main-xxxx] - Some message'."
    exit 1
fi

echo "Commit message is valid."