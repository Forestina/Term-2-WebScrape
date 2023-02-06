/*
 * @Author: Mei Zhang micpearl@163.com
 * @Date: 2023-01-31 10:44:18
 * @LastEditors: Mei Zhang micpearl@163.com
 * @LastEditTime: 2023-02-03 17:44:14
 * @FilePath: \node-web-scrape-simple\app.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const https = require('https');
const JSSoup = require('jssoup').default;
const fs = require('fs');
//先填写想要搜索的网址
const url = "https://en.wikipedia.org/wiki/Pink"; // FIRST: find a url of a page you are interested in from wikipedia 
const jsonPath = "./json/";
const name = "";


/*
This web-scraping example is set up for working with wikipedia.If you want to adapt this
to scrape another site you should go and inspect the site in the browser first, then adapt this. 
*/

//returns one large string of all text
function getParagraphText(soupTag) {
    let paragraphs = soupTag.findAll('p');//自己设定的tag变量
    //let text = '';
    let text = [];
    for (let i = 0; i < paragraphs.length; i++) {
        //获取全文text
        //text += paragraphs[i].getText();


        //在每一段（paragraphs）中搜索想要获取的关键词（在indexOf中设置），并存储到最终结果text数组中
        //let p = paragraphs[i].getText().toLowerCase();

        //if (p.indexOf("color") != -1) {//找到相应字符
        //     console.log(p);
        //    text.push(p);//不能用等于，不然text里是空的，要用push将符合条件字符压到数组的末尾
        //}
        
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
        "text": getParagraphText(main)//将返回的数组存储在数据对象中
    };

    //output json
    writeJSON(data);//写入 JSON

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

//抓取标签（scraping a tags）函数，在createSoup()中调用
function getAllExternalLinks(soupTag){
    let aTags = soupTag.findAll('a'); // return an array of SoupTag object
    let links = [];
   
    for(let i = 0; i < aTags.length; i++){
        let attrs = aTags[i].attrs;// get a tag attributes

       // let text = aTags[i].getText();//按照lab文档加的

        // if there is an href attribute in attires let's get it
        if('href' in attrs){
            let hrefValue = attrs.href;
           // let hrefTest = text.href;//按照lab文档加的
       
        }
 
    }

    return links;
}