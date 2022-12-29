# بسم الله الرحمن الرحيم

import string

# -*- coding: utf-8 -*-
# Import Monkey module from gevent for monkey-patching
from gevent import monkey
# Monkey-patching standart Python library for async working
monkey.patch_all()
# Import WSGI server from Gevent
from gevent.pywsgi import WSGIServer
# Import Compress module from Flask-Compress for compress static
# content (HTML, CSS, JS)
from flask_compress import Compress

from flask import Flask, render_template

app = Flask(
    __name__,
    template_folder='templates',  # Name of html file folder
    static_folder='static',  # Name of directory for static files
    static_url_path='/static')
ok_chars = string.ascii_letters + string.digits

# Create Compress with default params
compress = Compress()
# Init compress for our Flask app
compress.init_app(app)


@app.route('/')  # What happens when the user visits the site
def base_page():
    from bs4 import BeautifulSoup
    import requests
    from lxml import etree

    URL = "https://mmic.org.uk"

    HEADERS = ({'User-Agent':
            'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 \
            (KHTML, like Gecko) Chrome/44.0.2403.157 Safari/537.36'                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              ,\
            'Accept-Language': 'en-US, en;q=0.5'})

    webpage = requests.get(URL, headers=HEADERS)
    soup = BeautifulSoup(webpage.content, "html.parser")
    dom = etree.HTML(str(soup))

    date = dom.xpath(
        '//*[@id="home-prayer-times-block"]/div/section/div/div/div/div/div/p'
    )[0].text
    date = date.replace(" - Oldham, UK", "")

    fajr = dom.xpath(
        '//*[@id="home-prayer-times-block"]/div/section/div/div/div/ul/li[1]/span[2]'
    )[0].text
    fajrj = dom.xpath(
        '//*[@id="home-prayer-times-block"]/div/section/div/div/div/ul/li[1]/i'
    )[0].text
    fajrj = fajrj.replace("Jama'at: ", "")

    zuhr = dom.xpath(
        '//*[@id="home-prayer-times-block"]/div/section/div/div/div/ul/li[2]/span[2]'
    )[0].text
    zuhrj = dom.xpath(
        '//*[@id="home-prayer-times-block"]/div/section/div/div/div/ul/li[2]/i'
    )[0].text
    zuhrj = zuhrj.replace("Jama'at: ", "")

    asr = dom.xpath(
        '//*[@id="home-prayer-times-block"]/div/section/div/div/div/ul/li[3]/span[2]'
    )[0].text
    asrj = dom.xpath(
        '//*[@id="home-prayer-times-block"]/div/section/div/div/div/ul/li[3]/i'
    )[0].text
    asrj = asrj.replace("Jama'at: ", "")

    maghrib = dom.xpath(
        '//*[@id="home-prayer-times-block"]/div/section/div/div/div/ul/li[4]/span[2]'
    )[0].text
    maghribj = dom.xpath(
        '//*[@id="home-prayer-times-block"]/div/section/div/div/div/ul/li[4]/i'
    )[0].text
    maghribj = maghribj.replace("Jama'at: ", "")

    isha = dom.xpath(
        '//*[@id="home-prayer-times-block"]/div/section/div/div/div/ul/li[5]/span[2]'
    )[0].text
    ishaj = dom.xpath(
        '//*[@id="home-prayer-times-block"]/div/section/div/div/div/ul/li[5]/i'
    )[0].text
    ishaj = ishaj.replace("Jama'at: ", "")

    fajrj = "7:30 AM"
    mysun = "8:16 AM"
    zuhrj = "1:00 PM"
    asrj = "2:45 PM"
    ishaj = "7:15 PM"

    ##FOR FETCHING SUNRISE
    # url = "https://www.timeanddate.com/sun/uk/oldham"
    # html_content = requests.get(url).text

    # soup = BeautifulSoup(html_content, "lxml")

    # rows = soup.find_all('td')
    #mysun = rows[5].text
    ##mysun = mysun[:4]
    #mysun = mysun + " AM"
    # print(mysun)

    ##FOR FETCHING Ayah of the Day
    # URL = "https://ayahaday.com/"

    # HEADERS = ({'User-Agent':
    #         'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 \
    #         (KHTML, like Gecko) Chrome/44.0.2403.157 Safari/537.36'                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             ,\
    #         'Accept-Language': 'en-US, en;q=0.5'})

    # webpage = requests.get(URL, headers=HEADERS)
    # soup = BeautifulSoup(webpage.content, "html.parser")
    #surah = soup.find('h1', class_='AyahText_surah__2HmXc')
    #ayah_num = dom.xpath('//*[@id="__next"]/div/div/div[2]/h2')[0].text
    #ayah = dom.xpath('//*[@id="__next"]/div/div/div[2]')[0].text
    #ayah_en = dom.xpath('//*[@id="__next"]/div/div/div[2]/p[2]')[0].text

    #print(surah)
    #print(ayah_num)
    #print(ayah)
    #print(ayah_en)

    #IS IT YAWMUL-JUMUAH?
    import datetime
    weekday = datetime.datetime.today().weekday()
    if weekday == 4:
        jumuah = "Jumu’ah"
    else:
        jumuah = "Zuhr"

    #TIMESTAMP OF WHEN EACH JAMAT HAPPENS
    from datetime import datetime, timedelta

    d = datetime.today().strftime("%b %d, %Y")
    print(d)
    d2 = datetime.today() + timedelta(1)
    d2 = d2.strftime("%b %d, %Y")

    def timeConversion(s):
        in_time = datetime.strptime(m2, "%I:%M %p")
        #print(in_time)
        out_time = datetime.strftime(in_time, "%H:%M:%S")
        return out_time

    m2 = " ".join(fajrj.split())
    fajrc = timeConversion(m2)
    m2 = " ".join(mysun.split())
    mysunc = timeConversion(m2)
    m2 = " ".join(zuhrj.split())
    zuhrc = timeConversion(m2)
    m2 = " ".join(asrj.split())
    asrc = timeConversion(m2)
    m2 = " ".join(maghribj.split())
    maghribc = timeConversion(m2)
    m2 = " ".join(ishaj.split())
    ishac = timeConversion(m2)
    m2 = " ".join(fajrj.split())
    fajrt = timeConversion(m2)
    

    fajrc = d + " " + fajrc
    mysunc = d + " " + mysunc
    zuhrc = d + " " + zuhrc
    asrc = d + " " + asrc
    maghribc = d + " " + maghribc
    ishac = d + " " + ishac
    fajrt = d2 + " " + fajrt

    print("today's date is:")
    print(date)
  
    # print(date, fajr, fajrj, mysun, zuhr, zuhrj, asr, asrj, maghrib, maghribj,
    #       isha, ishaj, jumuah, fajrc, mysunc, zuhrc, asrc, maghribc, ishac)

    return render_template('base.html',
                           date=date,
                           fajr=fajr,
                           fajrj=fajrj,
                           mysun=mysun,
                           zuhr=zuhr,
                           zuhrj=zuhrj,
                           asr=asr,
                           asrj=asrj,
                           maghrib=maghrib,
                           maghribj=maghribj,
                           isha=isha,
                           ishaj=ishaj,
                           jumuah=jumuah,
                           fajrc=fajrc,
                           mysunc=mysunc,
                           zuhrc=zuhrc,
                           asrc=asrc,
                           maghribc=maghribc,
                           ishac=ishac,
                           fajrt=fajrt)


# @app.route('/2')
# def page_2():
#     rand_ammnt = random.randint(10, 100)
#     random_str = ''.join(random.choice(ok_chars) for a in range(rand_ammnt))
#     return render_template('site_2.html', random_str=random_str)


if __name__ == '__main__':
    # Create WSGI server with params for Repl.it (IP 0.0.0.0, port 8080)
    # for our Flask app
    http_server = WSGIServer(('0.0.0.0', 8080), app)
    # Start WSGI server
    http_server.serve_forever()
