from bs4 import BeautifulSoup
import os
import re

html_files = [f for f in os.listdir('.') if f.endswith('.html')]

# We'll replace the old GTranslate script with the new one
new_gt_script = """
    <!-- GTranslate -->
    <script type="text/javascript">
      function googleTranslateElementInit() {
        new google.translate.TranslateElement({
          pageLanguage: 'fr', 
          includedLanguages: 'fr,en',
          layout: google.translate.TranslateElement.InlineLayout.SIMPLE, 
          autoDisplay: false
        }, 'google_translate_element');
      }
    </script>
    <script type="text/javascript" src="//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"></script>
"""

for file in html_files:
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # regex replace the old script block
    # It starts with <!-- GTranslate --> and ends with </script>\n    <script type="text/javascript" src="//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"></script>
    # We can just use string replace since it's a known string.
    old_gt_script = """    <!-- GTranslate -->
    <script type="text/javascript">
      function googleTranslateElementInit() {
        new google.translate.TranslateElement({pageLanguage: 'fr', layout: google.translate.TranslateElement.InlineLayout.SIMPLE, autoDisplay: false}, 'google_translate_element');
      }
    </script>
    <script type="text/javascript" src="//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"></script>"""
    
    if old_gt_script in content:
        content = content.replace(old_gt_script, new_gt_script.strip())
    else:
        # If it wasn't strictly matching, we can do a regex replace or bs4
        soup = BeautifulSoup(content, 'html.parser')
        # find the googleTranslateElementInit script and replace it
        scripts = soup.find_all('script')
        for s in scripts:
            if s.string and 'googleTranslateElementInit' in s.string:
                s.string = "\n      function googleTranslateElementInit() {\n        new google.translate.TranslateElement({\n          pageLanguage: 'fr', \n          includedLanguages: 'fr,en',\n          layout: google.translate.TranslateElement.InlineLayout.SIMPLE, \n          autoDisplay: false\n        }, 'google_translate_element');\n      }\n    "
        content = str(soup)
        
    with open(file, 'w', encoding='utf-8') as f:
        f.write(content)
print("HTML language toggle updated to only include FR & EN")
