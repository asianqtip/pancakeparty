//import('jest');

const timeout = 3000;
const puppeteer = require( "puppeteer" );

let browser, page;


describe( "Some Test Cases", () => {
    beforeAll( async () => {

        browser = await puppeteer.launch({

            headless: false,

            devtools: true

        });

        //SET UP SERVER HERE//

        page = await browser.newPage();

        await page.goto( "http://example.com/", { waitUntil: "networkidle2" } );

        //await page.goto( "http://localhost", { waitUntil: "networkidle2" } );
    });


    test( "Page Title Match to confirm navigation to \'Browse\'", async () => {
        await Promise.all([
            page.click('a'),
            //page.click( 'a[href=\"/browse\"]' ),
            page.waitForNavigation()
            //page.waitFor(3000)
        ]);
        const title = await page.title();
        expect( title ).toEqual( "IANA — IANA-managed Reserved Domains" );
        //expect( title ).toEqual(Whatever browse page title is)
    });

    afterAll( async () => {

        browser.close();

    });
});
//const puppeteer = require('puppeteer');
//import ('expect-puppeteer');
//setDefaultOptions({ timeout: timeout });
/*
(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('http://localhost');
    await page.screenshot({path: '/src/test/functional_test/home.png'});

    try {
        const [response] = await Promise.all([
            page.waitForNavigation({timeout: timeout}), // The promise resolves after navigation has finished
            //expect(page).toClick('button', {text: 'Browse'}),
            page.click('a[href="/browse"]'), // Clicking the link will indirectly cause a navigation
        ]).catch();
    }catch (e){
        console.log("Test failed");
    }
    await browser.close();
})();*/
/*
describe(
    '/ (Home Page)',
    () => {
        let page
        beforeAll(async () => {
            page = await global.browser.newPage()
            await page.goto('https://google.com')
        }, timeout)

        afterAll(async () => {
            await page.close()
        })

        it('should load without error', async () => {
            let text = await page.evaluate(() => document.body.textContent)
            expect(text).toContain('google')
        })
    },
    timeout
)*/