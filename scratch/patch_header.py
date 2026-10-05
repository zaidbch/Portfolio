from pathlib import Path
import re

root = Path(__file__).resolve().parent.parent
theme_script = """<script>
(function(){try{if(localStorage.getItem("theme")==="dark")document.documentElement.setAttribute("data-theme","dark");if(localStorage.getItem("lang")==="en")document.documentElement.lang="en";}catch(e){}})();
</script>"""

old_btn = (
    '<button aria-label="Activer le mode sombre" class="theme-toggle" id="theme-toggle" '
    'title="Mode sombre/clair"><span class="theme-icon moon-icon">🌙</span>'
    '<span class="theme-icon sun-icon" style="display:none;">☀️</span></button>'
    '<div id="google_translate_element"></div>'
)
new_btn = (
    '<button aria-label="Activer le mode sombre" class="theme-toggle" id="theme-toggle" '
    'title="Mode sombre/clair" type="button"><span class="theme-icon moon-icon">🌙</span>'
    '<span class="theme-icon sun-icon" style="display:none;">☀️</span></button>'
    '<button type="button" class="lang-toggle" id="lang-toggle" '
    'aria-label="Switch to English" title="Switch to English">EN</button>'
)

gt_re = re.compile(
    r"\s*<!-- GTranslate -->.*?</script>\s*"
    r'<script src="//translate.google.com/translate_a/element.js\?cb=googleTranslateElementInit" '
    r'type="text/javascript"></script>',
    re.S,
)

for path in root.glob("*.html"):
    text = path.read_text(encoding="utf-8")
    orig = text
    if old_btn in text:
        text = text.replace(old_btn, new_btn)
    else:
        text = text.replace(
            '<div id="google_translate_element"></div>',
            '<button type="button" class="lang-toggle" id="lang-toggle" '
            'aria-label="Switch to English" title="Switch to English">EN</button>',
        )
    text = gt_re.sub("", text)
    if 'localStorage.getItem("theme")' not in text:
        text = text.replace(
            '<link href="/src/style.css" rel="stylesheet"/>',
            '<link href="/src/style.css" rel="stylesheet"/>\n' + theme_script,
        )
    if text != orig:
        path.write_text(text, encoding="utf-8")
        print("updated", path.name)
    else:
        print("unchanged", path.name)
