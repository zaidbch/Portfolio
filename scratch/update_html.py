import os
import shutil
from bs4 import BeautifulSoup
import re

# 1. Create projets.html from a-propos.html
if not os.path.exists('projets.html'):
    shutil.copy('a-propos.html', 'projets.html')

html_files = [f for f in os.listdir('.') if f.endswith('.html')]

seo_tags = '''
    <!-- Open Graph / SEO -->
    <meta property="og:title" content="Zaid Bouchiar - Ingénieur IA & Data Science" />
    <meta property="og:description" content="Portfolio de Zaid Bouchiar, Ingénieur en IA & Data Science (EMSI). Découvrez mes projets, compétences et certificats." />
    <meta property="og:type" content="website" />
    <meta property="og:image" content="https://raw.githubusercontent.com/zaidbch/Portfolio_zaid/main/public/images/profile.jpg" />
    <meta property="og:url" content="https://zaidbch.github.io/Portfolio_zaid/" />
    <meta name="twitter:card" content="summary_large_image" />
'''

for file in html_files:
    with open(file, 'r', encoding='utf-8') as f:
        soup = BeautifulSoup(f.read(), 'html.parser')
    
    # Update page data for projets
    if file == 'projets.html':
        body = soup.find('body')
        if body:
            body['data-page'] = 'projects'
            
        # Update title and intro
        title = soup.find('title')
        if title:
            title.string = "Projets - Zaid Bouchiar | Ingénieur IA & Data"
            
        h1 = soup.find('h1', class_='page-title')
        if h1:
            h1.string = "Mes Projets & Réalisations"
            
        eyebrow = soup.find('span', class_='eyebrow')
        if eyebrow:
            eyebrow.string = "Portfolio"
            
        lead = soup.find('p', class_='page-lead')
        if lead:
            lead.string = "Découvrez une sélection de mes projets en Intelligence Artificielle, Data Science et Développement Logiciel."
            
        # We'll need a container for projects. The about page has an id="about-page-container".
        # Let's rename it to projects-page-container
        container = soup.find(id='about-page-container')
        if container:
            container['id'] = 'projects-page-container'
            container.clear()
            
    # Add SEO Tags
    head = soup.find('head')
    if head and not head.find('meta', property='og:title'):
        seo_soup = BeautifulSoup(seo_tags, 'html.parser')
        head.append(seo_soup)
        
    # Update Desktop Navigation
    nav_capsule = soup.find('div', class_='nav-capsule')
    if nav_capsule:
        if not nav_capsule.find('a', href='/projets.html'):
            projets_link = soup.new_tag('a', href='/projets.html', attrs={'class': 'nav-link'})
            projets_link.string = "Projets"
            about_link = nav_capsule.find('a', href='/a-propos.html')
            if about_link:
                about_link.insert_after(projets_link)
                # also add space if necessary, but bs4 formatting is okay

    # Update Mobile Navigation
    mobile_nav = soup.find('div', class_='mobile-nav-inner')
    if mobile_nav:
        if not mobile_nav.find('a', href='/projets.html'):
            projets_link_m = soup.new_tag('a', href='/projets.html', attrs={'class': 'mobile-link'})
            projets_link_m.string = "Projets"
            about_link_m = mobile_nav.find('a', href='/a-propos.html')
            if about_link_m:
                about_link_m.insert_after(projets_link_m)

    # Set active links for projets
    if file == 'projets.html':
        if nav_capsule:
            for a in nav_capsule.find_all('a'):
                if a['href'] == '/projets.html':
                    a['class'] = ['nav-link', 'is-active']
                else:
                    if 'is-active' in a.get('class', []):
                        a['class'].remove('is-active')
        if mobile_nav:
            for a in mobile_nav.find_all('a'):
                if 'btn' in a.get('class', []): continue
                if a['href'] == '/projets.html':
                    a['class'] = ['mobile-link', 'is-active']
                else:
                    if 'is-active' in a.get('class', []):
                        a['class'].remove('is-active')

    # Add header actions (Dark Mode, Lang)
    header_inner = soup.find('div', class_='header-inner')
    if header_inner:
        cta = header_inner.find('div', class_='header-cta')
        if cta and not header_inner.find('div', class_='header-actions'):
            actions_div = soup.new_tag('div', attrs={'class': 'header-actions'})
            
            theme_btn = soup.new_tag('button', attrs={
                'class': 'theme-toggle',
                'id': 'theme-toggle',
                'aria-label': 'Activer le mode sombre',
                'title': 'Mode sombre/clair'
            })
            theme_btn.append(BeautifulSoup('<span class="theme-icon moon-icon">🌙</span><span class="theme-icon sun-icon" style="display:none;">☀️</span>', 'html.parser'))
            
            lang_btn = soup.new_tag('button', attrs={
                'class': 'lang-toggle',
                'id': 'lang-toggle',
                'aria-label': 'Changer de langue',
                'title': 'FR / EN'
            })
            lang_btn.string = "FR"
            
            actions_div.append(theme_btn)
            actions_div.append(lang_btn)
            
            # Move CTA inside actions
            cta.extract()
            actions_div.append(cta)
            
            # insert actions_div before nav-toggle
            nav_toggle = header_inner.find('button', class_='nav-toggle')
            if nav_toggle:
                nav_toggle.insert_before(actions_div)

    # Save
    with open(file, 'w', encoding='utf-8') as f:
        f.write(str(soup))
    print(f"Updated {file}")

