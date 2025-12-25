FROM hugomods/hugo:exts

WORKDIR /src

COPY . .

RUN find content -name "*.md" -type f | sort
RUN ls -la content/2025/12/25/database-indexes-gin/
RUN hugo --gc --minify
