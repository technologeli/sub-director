#!/bin/bash

sess="sub"

# attach and exit if exists
tmux attach -t "$sess" && exit 0

# start
tmux new-session -s "$sess" -d && tmux switch-client -t "$sess"

# window 1: nvim
tmux rename-window -t "$sess"
tmux rename-window -t "$sess" "nvim"
tmux send-keys -t "$sess:nvim" "nvim ." C-m # enter

# window 2 and 3: pscale
tmux new-window -t "$sess"
tmux rename-window -t "$sess" "main"
m="pscale connect sub-director main --port 3309"
tmux send-keys -t "$sess:main" "$m" C-m

tmux new-window -t "$sess"
tmux rename-window -t "$sess" "shadow"
s="pscale connect sub-director sub-director-shadow --port 3310"
tmux send-keys -t "$sess:shadow" "$s" C-m

# window 4: dev
tmux new-window -t "$sess"
tmux rename-window -t "$sess" "dev"
tmux send-keys -t "$sess:dev" "npm run dev" C-m

# window 5: prisma studio
tmux new-window -t "$sess"
tmux rename-window -t "$sess" "prisma"
tmux send-keys -t "$sess:prisma" "npx prisma studio" C-m


# display window 1
tmux select-window -t "$sess:nvim"

# attach
tmux attach -t "$sess"
