/*
 * @Author: Mei Zhang micpearl@163.com
 * @Date: 2023-02-06 00:16:21
 * @LastEditors: Mei Zhang micpearl@163.com
 * @LastEditTime: 2023-02-06 01:10:04
 * @FilePath: \WebScrape\app.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
/*
 * @Author: Mei Zhang micpearl@163.com
 * @Date: 2023-01-31 10:44:18
 * @LastEditors: Mei Zhang micpearl@163.com
 * @LastEditTime: 2023-02-06 01:06:13
 */
const https = require('https');
const JSSoup = require('jssoup').default;
const fs = require('fs');

const url = "https://en.wikipedia.org/wiki/Government_by_algorithm"; // FIRST: find a url of a page you are interested in from wikipedia 
const jsonPath = "./json/";
const name = "";


/*
This web-scraping example is set up for working with wikipedia.If you want to adapt this
to scrape another site you should go and inspect the site in the browser first, then adapt this. 
*/

//returns one large string of all text
function getParagraphText(soupTag) {
    let paragraphs = soupTag.findAll('p');
    //let text = '';
    let text = [];
    for (let i = 0; i < paragraphs.length; i++) {
        //scrape all the text from the webpage
        //text += paragraphs[i].getText();


        //Search each paragraph for the keyword you want to retrieve
        let p = paragraphs[i].getText().toLowerCase();

        if (p.indexOf("blockchain") != -1) {
             console.log(p);
            text.push(p);
        }
        
    }



    return text;
}

//pass in Plain Old Javascript Object that's formatted as JSON
function writeJSON(data) {
    try {
        let path = jsonPath + name + ".json";
        fs.writeFileSync(path, JSON.stringify(data, null, 2), "utf8");
        console.log("JSON file successfully saved");
    } catch (error) {
        console.log("An error has occurred ", error);
    }
}

//create soup  
function createSoup(document) {

    let soup = new JSSoup(document);
    let data = {
        "name": name,
        "url": url,
        "content": {}
    };

    let main = soup.find('main');//only get the content from the main body of the page

    data.content = {
        "text": getParagraphText(main)//Stores the returned array in a data object
    };

    //output json
    writeJSON(data);

}

//Request the url
https.get(url, (res) => {
    console.log('statusCode:', res.statusCode);
    console.log('headers:', res.headers);

    let document = [];

    res.on('data', (chunk) => {
        document.push(chunk);
    }).on('end', () => {
        document = Buffer.concat(document).toString();
        // console.log(body);
        createSoup(document);
    });

}).on('error', (e) => {
    console.error(e);
});

//scraping a tags function
function getAllExternalLinks(soupTag){
    let aTags = soupTag.findAll('a'); // return an array of SoupTag object
    let links = [];
   
    for(let i = 0; i < aTags.length; i++){
        let attrs = aTags[i].attrs;// get a tag attributes


        // if there is an href attribute in attires let's get it
        if('href' in attrs){
            let hrefValue = attrs.href;
       
        }
 
    }

    return links;
}