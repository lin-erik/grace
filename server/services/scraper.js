var cheerio = require('cheerio');
const puppeteer = require('puppeteer')
var model = require('../models/inventory')
var shopper = require('./shop_config.js')
// var { clarifai } = require('../index.js')
const { CLARIFAI_MODEL_ID } = require('../../config')

var scrape = async(site,clarifai,req,res)=>{
  var gender = 1
  let target = shopper[site]
  let { brandName, entry, searchInput, product, imgTag, imgUrlModifier, nameTag, priceTag} = target
  // var colors = ['white', 'black', 'blue', 'green', 'yellow', 'red', 'orange', 'purple', 'pink', 'gray']
  // var clothings = ['t-shirt', 'plaid-shirt', 'dress-shirt', 'polo-shirt', 'hoodie', 'sweater', 'cardigan', 'blouse', 'top', 'dress', 'jeans', 'pants', 'sweatpants', 'shorts', 'skirt', 'dress-pants', 'leggings', 'bomber-jacket','midweight-jacket', 'denim-jacket', 'leather-jacket', 'parka', 'puffer', 'vest', 'coat', 'suit-jacket', 'suit-vest']
  // var clothings = ['t-shirt', 'plaid-shirt', 'dress-shirt', 'polo-shirt', 'hoodie', 'sweater', 'cardigan', 'jeans', 'pants', 'sweatpants', 'shorts','dress-pants', 'bomber-jacket','midweight-jacket', 'denim-jacket', 'leather-jacket', 'parka', 'puffer', 'vest', 'coat', 'suit-jacket', 'suit-vest']

  var keywords = ['t-shirt','dress-shirt','hoodie','jeans','shorts','cardigan','suit-jacket','dress','skirt','coat']
  // clothings.forEach(clothing=>colors.forEach(color=> keywords.push(`${color} ${clothing}`)))
  var results = []
  const browser = await puppeteer.launch();
  // const browser = await puppeteer.launch({headless:false});
  const page = await browser.newPage();

  //bypass antiautomation test
  const userAgent = 'Mozilla/5.0 (X11; Linux x86_64)' + 
  'AppleWebKit/537.36 (KHTML, like Gecko) Chrome/64.0.3282.39 Safari/537.36';
  await page.setUserAgent(userAgent);
  await page.evaluateOnNewDocument(() => {
    Object.defineProperty(navigator, 'plugins', {
      get: () => [1, 2, 3, 4, 5],
    });
    Object.defineProperty(navigator, 'webdriver', {
      get: () => false,
    });
    window.chrome = {
      runtime: true
    };
    window.navigator.chrome = {
      runtime: true,
    };
    const originalQuery = window.navigator.permissions.query;
    return window.navigator.permissions.query = (parameters) => (
      parameters.name === 'notifications' ?
        Promise.resolve({ state: Notification.permission }) :
        originalQuery(parameters)
    );
  });

  await page.goto(entry,{timeout:0});
  keywords.reduce((accumulator,keyword)=>{
    let labels = keyword.split(' ')
    return  accumulator.then(async()=>{
        console.log({keyword})
        await page.$(searchInput)
        await page.click(searchInput,{clickCount: 3})
        await page.keyboard.type(`${keyword}\u000d`)
        await page.waitForNavigation()
        await page.evaluate(async () => {
          await new Promise((resolve, reject) => {
            let totalHeight = 0
            let count = 0;
            let distance = 100
            let timer = setInterval(() => {
              let scrollHeight = document.body.scrollHeight
              window.scrollBy(0, distance)
              totalHeight += distance
              if(totalHeight >= scrollHeight || ++count >= 100){
                clearInterval(timer)
                resolve()
              }
            }, 30)
          })
        })
        await page.waitFor(1000)
        if (await page.$('.shq_exit') !== null) await page.click('.shq_exit')
        // if (await page.$('.nextArrow') !== null) await page.click('.nextArrow')

        const bodyHandle = await page.$('body')
        const html = await page.evaluate(body => body.innerHTML, bodyHandle);
        var $ = cheerio.load(html);
        $(product).filter((i,el)=>{
          var data = $(el)
          var imageUrl = data.find(imgTag).first().attr('src')
          if(imageUrl){
            imageUrl = imageUrl.substring(0,imageUrl.indexOf('?'))
            if(imageUrl[0] === '/') imageUrl = imgUrlModifier + imageUrl
          }
          var name = data.find(nameTag).text().trim().replace(/\s\s+/g, ' ')
          var price = data.find(priceTag).text().match(/\d+\.\d\d/)
          if (price) price = price[0]
          var url = data.find('a').first().attr('href')
          if (url && url[0] === '/') url = entry + url
          if(url && imageUrl) {
            model.createEntry({name, brandName, url, imageUrl, price, gender},(err,result)=>{
              if(err) console.log(err)
              else console.log(result)
            })
          }
        })
    })
  }, Promise.resolve([])).then(()=>res.send("Finished"));
}

var getByTags = (req,res)=>{
  var tags = req.query.q.toLowerCase().split(" ")
  console.log(tags)
  model.getByTags(tags,(err,results)=>{
    res.send(results)
  })
}

module.exports = {
  scrape
  // googleScrape,
  // bloomingScrape,
  // macyScrape,
  // getByTags
};
