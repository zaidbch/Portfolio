from bs4 import BeautifulSoup
import os

html_files = [f for f in os.listdir('.') if f.endswith('.html')]

gt_snippet = """
    <!-- GTranslate -->
    <script type="text/javascript">
      function googleTranslateElementInit() {
        new google.translate.TranslateElement({pageLanguage: 'fr', layout: google.translate.TranslateElement.InlineLayout.SIMPLE, autoDisplay: false}, 'google_translate_element');
      }
    </script>
    <script type="text/javascript" src="//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"></script>
"""

for file in html_files:
    with open(file, 'r', encoding='utf-8') as f:
        soup = BeautifulSoup(f.read(), 'html.parser')
    
    # We remove the dummy lang-toggle
    btn = soup.find('button', id='lang-toggle')
    if btn:
        btn.extract()
        
    # We add google_translate_element
    actions_div = soup.find('div', class_='header-actions')
    if actions_div and not actions_div.find('div', id='google_translate_element'):
        gt_div = soup.new_tag('div', id='google_translate_element')
        
        theme_btn = actions_div.find('button', id='theme-toggle')
        if theme_btn:
            theme_btn.insert_after(gt_div)
            
    # Inject the script at the end of body
    body = soup.find('body')
    if body and "googleTranslateElementInit" not in str(body):
        body.append(BeautifulSoup(gt_snippet, 'html.parser'))
        
    with open(file, 'w', encoding='utf-8') as f:
        f.write(str(soup))
    print(f"Added GTranslate to {file}")
