import re

css_file = 'src/style.css'
with open(css_file, 'r', encoding='utf-8') as f:
    content = f.read()

old_dark_mode = """/* ==========================================================================
   Dark Mode Theme (Zinc-950)
   ========================================================================== */
[data-theme="dark"] {
  --bg-body: #09090b; /* Zinc 950 */
  --bg-card: #18181b; /* Zinc 900 */
  --bg-card-hover: #27272a; /* Zinc 800 */
  --text-main: #f4f4f5; /* Zinc 50 */
  --text-muted: #a1a1aa; /* Zinc 400 */
  --border-color: #3f3f46; /* Zinc 700 */
  --accent-light: rgba(99, 102, 241, 0.15); /* Keep primary brand glow */
  --card-shadow: 0 4px 20px rgba(0, 0, 0, 0.4);
}"""

new_dark_mode = """/* ==========================================================================
   Dark Mode Theme (Zinc-950)
   ========================================================================== */
[data-theme="dark"] {
  --bg: #09090b; /* Zinc 950 */
  --bg-alt: #18181b; /* Zinc 900 */
  --bg-deep: #27272a; /* Zinc 800 */
  
  --text-main: #f4f4f5; /* Zinc 50 */
  --text-secondary: #e4e4e7;
  --text-muted: #a1a1aa; /* Zinc 400 */
  --text-dim: #71717a;
  
  --border-light: rgba(255, 255, 255, 0.06);
  --border-solid: #3f3f46; /* Zinc 700 */
  --border-hover: #52525b;
  
  --primary: #f4f4f5;
  --bg-card: var(--bg-alt);
  --border-color: var(--border-solid);
  
  --accent-light: rgba(99, 102, 241, 0.15);
  --card-shadow: 0 4px 20px rgba(0, 0, 0, 0.4);
}

[data-theme="dark"] body::before {
  background-image: 
    linear-gradient(to right, rgba(255,255,255,0.03) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(255,255,255,0.03) 1px, transparent 1px);
}
"""

if '[data-theme="dark"] {' in content:
    # Use regex to replace the old block
    # It might have slight whitespace differences, so we can use a more robust regex
    pattern = re.compile(r'/\* =+ \n\s*Dark Mode Theme.*?\[data-theme="dark"\]\s*\{.*?(?=\n/\*|\Z)', re.DOTALL)
    
    match = pattern.search(content)
    if match:
        content = content[:match.start()] + new_dark_mode + content[match.end():]
    else:
        # fallback string replace
        content = content.replace(old_dark_mode, new_dark_mode)

with open(css_file, 'w', encoding='utf-8') as f:
    f.write(content)
print("CSS updated for Dark Mode")
