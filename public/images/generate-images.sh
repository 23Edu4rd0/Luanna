#!/bin/bash

# Generate beautiful placeholder images

# Timeline images
convert -size 800x600 gradient:faf9f6-f5f0eb \
  -gravity center \
  -fill '#c5b358' -pointsize 48 -font Serif -annotate +0+0 '💑 O Começo' \
  /home/edu4rd0/Projetos/Luanna/public/images/timeline-1.jpg

convert -size 800x600 gradient:f5f0eb-faf9f6 \
  -gravity center \
  -fill '#c5b358' -pointsize 48 -font Serif -annotate +0+0 '✨ Crescendo Juntos' \
  /home/edu4rd0/Projetos/Luanna/public/images/timeline-2.jpg

convert -size 800x600 gradient:faf9f6-f5f0eb \
  -gravity center \
  -fill '#c5b358' -pointsize 48 -font Serif -annotate +0+0 '💍 O Pedido' \
  /home/edu4rd0/Projetos/Luanna/public/images/timeline-3.jpg

convert -size 800x600 gradient:f5f0eb-faf9f6 \
  -gravity center \
  -fill '#c5b358' -pointsize 48 -font Serif -annotate +0+0 '👰 Nosso Grande Dia' \
  /home/edu4rd0/Projetos/Luanna/public/images/timeline-4.jpg

# Gift images
for i in {1..6}; do
  convert -size 400x400 \
    -background '#f5f0eb' \
    -fill '#c5b358' -pointsize 36 -font Serif \
    -gravity center \
    label:"🎁 Presente $i" \
    /home/edu4rd0/Projetos/Luanna/public/images/gift-$i.jpg
done

echo "✅ Images generated successfully!"
