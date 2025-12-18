import re
import os

files = ['style.css', 'alternate_style.css']

for file in files:
    if not os.path.exists(file):
        print(f"Skipping {file} (not found)")
        continue
    
    with open(file, 'r') as f:
        content = f.read()

    # Fix lint: background-clip
    # Simple check to avoid duplicating if already fixed
    if '-webkit-background-clip: text;' in content and 'background-clip: text;' not in content:
        content = content.replace('-webkit-background-clip: text;', '-webkit-background-clip: text; background-clip: text;')

    # Minify
    # Remove comments
    content = re.sub(r'/\*[\s\S]*?\*/', '', content)
    # Replace newlines and multi-spaces with single space
    content = re.sub(r'\s+', ' ', content)
    # Remove spaces around delimiters
    content = re.sub(r'\s?([\{\}\:\;\,])\s?', r'\1', content)
    # Remove last semicolon before closing brace
    content = re.sub(r';}', '}', content)
    
    with open(file, 'w') as f:
        f.write(content.strip())

print("Minification and lint fix complete.")
